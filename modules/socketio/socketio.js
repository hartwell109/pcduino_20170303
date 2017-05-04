/**
 * Created by Mars on 2017/5/2.
 */
var config = require('../config');
module.exports = function (server, callback) {
    var io = require('socket.io')(server);
    //io.set('origins', 'localhost:3000');
    io.on('connection', function (socket) {
        socket.on('hi', function (data) {
            console.log(data);
            io.sockets.emit('news', 'echo:' + data + new Date())
        })
        console.log('socket.io is connected');
        callback(null, io);
    })
    io.on('error', function (err) {
        console.log(err);
        callback(err, null);
    })
}


