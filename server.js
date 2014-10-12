/**
 * Created by Benson on 10/11/2014.
 */

'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));


var users = {};
var userIdCounter = 0;
var userCount = 0;

io.on('connection', function (socket) {
    userCount++;

    // initialize empty object for each connection using a counter as unique ID
    users[userIdCounter] = {};
    socket.userId = userIdCounter;

    socket.emit('user data', {
        userCount : userCount
    });
    socket.broadcast.emit('user data', {
        userCount : userCount
    });

    socket.on('user login', function (data) {

    });


    socket.on('hit success', function (username) {

    });


    socket.on('disconnect', function () {
        // retrieves userId from the socket disconnecting
        var userId = socket.userId;

        if (users[userId]){
            delete users[userId];
            userCount--;

            socket.broadcast.emit('user data', {
                userCount : userCount
            });
        }
    });
});


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



