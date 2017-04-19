/**
 * Created by Mars on 2017/4/19.
 */
var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1
});
port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }
    port.write('main screen turn on');
});
port.on('open', function () {
    port.write('h', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
});