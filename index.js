var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.set('port', (process.env.PORT || 5000))

//Temporarily disabled as there are no public assets
//app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '/', 'index.html'));
})

http.listen(app.get('port'), function () {
    console.log('listening on port: ' + app.get('port'));
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});