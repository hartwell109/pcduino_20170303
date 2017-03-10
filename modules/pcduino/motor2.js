/**
 * Created by Mars on 2017/3/6.
 */
var pcduino = require("./pcduino");
var RIGHT = pcduino.LOW;
var LEFT = pcduino.HIGH;

//初始化部分
var setup = function (pin_pul, pin_dir, direction) {
    console.log("pin-setup=" + pin_pul);
    pcduino.pinMode(pin_pul, pcduino.OUTPUT);
    pcduino.pinMode(pin_dir, pcduino.OUTPUT);
    pcduino.digitalWrite(pin_dir, direction);
}

//循环部分
var loop = function (pin) {
    pcduino.digitalWrite(pin, pcduino.HIGH);
    pcduino.digitalWrite(pin, pcduino.LOW);
}

//执行函数部分
var execute = function execute(pin, period) {
    var i = 0;
    while (i < period) {
        loop(pin);
        ++i;
    }
}

var run = function (pin_pul, pin_dir, direction, period, callback) {
    setup(pin_pul, pin_dir, direction);
    execute(pin_pul, period);
    callback;
}


module.exports = {
    run: run,
    RIGHT: RIGHT,
    LEFT:LEFT
}
