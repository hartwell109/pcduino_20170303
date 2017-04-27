/**
 * Created by Mars on 2017/4/25.
 */
var io = require('socket.io');
var config = require('../config');
var socketio;
//socket部分
io.on('connection', function (socket) {
    //接收并处理客户端的hi事件
    socketio = socket;
    socketio.on('hi', function (data) {
        global.socket = socket;
        console.log(data);

        //触发客户端事件c_hi
        socketio.emit('news', 'hello too!')
    })

    //断开事件
    socketio.on('disconnect', function (data) {
        console.log('断开', data)
        socket.emit('c_leave', '离开');
    })
});