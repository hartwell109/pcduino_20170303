/**
 * Created by Mars on 2017/5/2.
 */
var config = require('../config');
var SerialPort = require('serialport');

var serialport = new SerialPort(config.serialport.url, {
    autoOpen: false,
    baudRate: config.serialport.baudRate,
    dataBits: config.serialport.dataBits,
    stopBits: config.serialport.stopBits
});

serialport.open(function (err) {
    if (err) {
        console.log(err);
        process.send({channel: 'serialport', title: 'error', payload: err});
    }
});

process.on('message',function (data) {
    serialport.println(data.payload);
})

serialport.on('data', function (data) {
    process.send({channel: 'serialport', title: 'data', payload: data});

});

serialport.on('open', function () {
    process.send({channel: 'serialport', title: 'open', payload: 'SerialPort has been opened.'});
});


serialport.on('error', function () {
    process.send({channel: 'serialport', title: 'error', payload: error});
})