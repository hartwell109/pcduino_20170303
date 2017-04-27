#!/usr/bin/env node

/**
 * Module dependencies.
 */

var debug = require('debug')('pcduino-20170214:server');
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//派生子线程对指定pin监听
var childProcess = require('child_process');
var microswitch = childProcess.fork('modules/pcduino/microswitch.js');
microswitch.on('message', function (msg) {
    console.log('message=' + JSON.stringify(msg));
})

//XMPP消息接收监听
var xmppClient = require('./modules/xmpp/xmppClient');
global.xmppClient = xmppClient;

var index = require('./routes/index');
var users = require('./routes/users');
var led = require('./routes/led');
var motor = require('./routes/motor');
var relay = require('./routes/relay');
var macAdress = require('./routes/mac');
var motor2 = require('./routes/motor2');
var socketio = require('./routes/socketio');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/led', led);
app.use('/motor', motor);
app.use('/motor2', motor2);
app.use('/mac', macAdress);
app.use('/relay', relay);
app.use('/socketio', socketio);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require("socket.io")(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//socket部分
io.on('connection', function (socket) {
    //接收并处理客户端的hi事件
    socket.on('hi', function (data) {
        global.socket = socket;
        console.log(data);

        //触发客户端事件c_hi
        socket.emit('news', 'hello too!')
    })

    //断开事件
    socket.on('disconnect', function (data) {
        console.log('断开', data)
        socket.emit('c_leave', '离开');
        //socket.broadcast用于向整个网络广播(除自己之外)
        //socket.broadcast.emit('c_leave','某某人离开了')
    })

});

var xmppClient = global.xmppClient;
xmppClient.on('chat', function (from, message) {
    console.log("from:" + from + ";message:" + message);
    xmppClient.send(from, "echo:" + message);
    var socket = global.socket;
    socket.emit('news', message);
})
xmppClient.on('error', function (err) {
    console.log(err)
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
