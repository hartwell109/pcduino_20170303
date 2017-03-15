var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var xmppClient = require('./modules/xmpp/xmppClient');
var microswitch = require('./modules/pcduino/microswitch')(3);

global.xmppClient = xmppClient;

microswitch.on('switch_on', function (switch_pin) {
    console.log('The switch ' + switch_pin + 'is opened.');
})

//接收消息
xmppClient.on('chat', function (from, message) {
    console.log("from:" + from + ";message:" + message);
    xmppClient.send(from, "echo:" + message);
})
xmppClient.on('error', function (err) {
    console.err(err)
});

var index = require('./routes/index');
var users = require('./routes/users');
var led = require('./routes/led');
var motor = require('./routes/motor');
var relay = require('./routes/relay');
var macAdress = require('./routes/mac');
var motor2 = require('./routes/motor2');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
