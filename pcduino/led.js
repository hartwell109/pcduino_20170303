/**
 * Created by Mars on 2017/2/14.
 */
var pcduino = require("./pcduino");

//初始化部分
var setup = function (pin) {
    console.log("pin-setup=" + pin);
    pcduino.pinMode(pin, pcduino.OUTPUT);
}

//循环部分
var loop = function (pin) {
    console.log("pin-loop=" + pin);
    pcduino.digitalWrite(pin, pcduino.HIGH);
    pcduino.delay(1000);
    pcduino.digitalWrite(pin, pcduino.LOW);
    pcduino.delay(1000);
}
//执行函数部分
var execute = function execute(pin, period) {
    console.log("pin-execute=" + pin);
    var i = 0;
    while (i < period) {
        loop(pin);
        ++i;
    }
}

var led = function (pin, period, callback) {
    setup(pin);
    execute(pin, period);
    callback;
}

module.exports = {
    run: led
}
