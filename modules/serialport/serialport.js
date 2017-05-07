/**
 * Created by Mars on 2017/5/2.
 */
var config = require('../config');
var SerialPort = require('serialport');

module.exports = function (callback) {
    var serialport = new SerialPort(config.serialport.url, {
        autoOpen: false,
        baudRate: config.serialport.baudRate,
        dataBits: config.serialport.dataBits,
        stopBits: config.serialport.stopBits
    });
    serialport.open(function (err) {
        if (err) {
            console.log(err)
            callback(err, null);
        } else {
            console.log('serialport has connected.');
            callback(null, serialport);
        }
    });
}