var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var child_process = require('child_process');

var index = require('./routes/index');
var users = require('./routes/users');
var socket = require('./routes/socketio');

/**
 * 加载通讯模块
 */
var xmpp = child_process.fork('./modules/xmpp/xmpp');
var serialport = child_process.fork('./modules/serialport/serialport');
var socketio = child_process.fork('./modules/socketio/socketio');
var mqtt = child_process.fork('./modules/mqtt/mqtt');

xmpp.on('message', function (msg) {
    console.log(msg);
    serialport.send(msg);
})

socketio.on('message', function (msg) {
    socketio.send(msg)
    console.log(msg)
})

serialport.on('message', function (msg) {
    console.log(msg)
    socketio.send(msg);
})

mqtt.on('message', function (msg) {
    console.log(msg)
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(url.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/socket', socket);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
