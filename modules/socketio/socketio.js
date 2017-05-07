/**
 * Created by Mars on 2017/5/2.
 */
var config = require('../config');

module.exports = function (server, callback) {
    var io = require('socket.io')(server);
    // // io.of('/chat');
    // io.on('connection', function (socket) {
    //     console.log('socket.io is connected');
    // })

    io.on('disconnect', function () {
        console.log('socket.io disconnect')
    })
    callback(null, io);
}