/**
 * Created by Benson on 10/11/2014.
 */

'use strict';

// ------------ BASE SERVER CONFIGURATION -------------------
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(server);

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));



// ---------- LOAD SOCKET.IO RELATED SCRIPTS ------------

// to move to external script later
(function(socketIO){
    var users = {};
    var userIdCounter = 0;
    var onlineUserCount = 0;

    var onConnection = function(socket){
        var initializeUser = function(socket){
            // increases current user counter for each socket connection
            onlineUserCount++;

            // initialize an user object for each connection using a counter as unique ID
            // the socket connection is stored inside the user
            var user = {
                id: userIdCounter,
                socket: socket,
                score: 0
            };

            // stores the user using the unique user id in the global users data
            users[userIdCounter] = user;

            // increase counter to use as unique user ID
            userIdCounter++;
            console.log("User #"+userIdCounter+" has connected");

            // notify all clients of current online user count
            notifyOnlineUserCount();
        };
        var notifyOnlineUserCount = function(){
            io.sockets.emit('user data', {
                onlineUserCount : onlineUserCount
            });
        };

        // Based on user result success or fail, score is updated and broadcast to all clients
        var updateScore = function(userResult){
            var isSuccess = userResult.sucess;
            var userId = userIdCounter;

            var user = users[userId];
            if (isSuccess){
                user.score += 1000; // temp. hard-code score for successful result
            }
            // after score updates, broadcast scores to all clients
            broadcastScore();
        };

        var onDisconnect = function(){
            // the current userIdCounter is the userId used for initialization
            var userId = userIdCounter;

            // if the user object exists, delete the user from users data and decrease current user counter
            if (users[userId]){
                delete users[userId];
                onlineUserCount--;

                socket.broadcast.emit('user data', {
                    userCount: userCount
                });

                console.log("User #"+userId+" has disconnected");
            }
        };
        socket.on('send score', updateScore);
        socket.on('disconnect', onDisconnect);
        initializeUser(socket);
    };

    // Emits an action signal event to all clients with a data interval
    var signalAction = function(){
        var actionData = {
            interval: 2000 //ms
        };
        io.sockets.emit('action signal', actionData)
        console.log("An action signal is emitted to all clients");
    };

    var broadcastScore = function(){
        var userScores = [];
        for (var id in users){
            if (users.hasOwnProperty(prop)){
                var user = users[id];
                var result = {
                    score: user.score
                };
                userScores.push(result);
            }
        }
        io.sockets.emit('score update', userScores);
    };

    io.on('connection', onConnection);

    // For testing purposes, set an interval for repeat signaling action
    setInterval(signalAction, 4000);
}(io));

/*
 io.on('connection', function (socket) {
 var addedUser = false;

 // when the client emits 'new message', this listens and executes
 socket.on('new message', function (data) {
 // we tell the client to execute 'new message'
 socket.broadcast.emit('new message', {
 username: socket.username,
 message: data
 });
 });

 // when the client emits 'add user', this listens and executes
 socket.on('add user', function (username) {
 // we store the username in the socket session for this client
 socket.username = username;
 // add the client's username to the global list
 usernames[username] = username;
 ++numUsers;
 addedUser = true;
 socket.emit('login', {
 numUsers: numUsers
 });
 // echo globally (all clients) that a person has connected
 socket.broadcast.emit('user joined', {
 username: socket.username,
 numUsers: numUsers
 });
 });

 // when the client emits 'typing', we broadcast it to others
 socket.on('typing', function () {
 socket.broadcast.emit('typing', {
 username: socket.username
 });
 });

 // when the client emits 'stop typing', we broadcast it to others
 socket.on('stop typing', function () {
 socket.broadcast.emit('stop typing', {
 username: socket.username
 });
 });

 // when the user disconnects.. perform this
 socket.on('disconnect', function () {
 // remove the username from global usernames list
 if (addedUser) {
 delete usernames[socket.username];
 --numUsers;

 // echo globally that this client has left
 socket.broadcast.emit('user left', {
 username: socket.username,
 numUsers: numUsers
 });
 }
 });
 });


 */



