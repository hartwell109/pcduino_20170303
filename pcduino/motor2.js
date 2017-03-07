/**
 * Created by Mars on 2017/3/6.
 */
var pcduino = require("./pcduino");

//初始化部分
var setup = function (pin_pul, pin_dir) {
    console.log("pin-setup=" + pin_pul);
    pcduino.pinMode(pin_pul, pcduino.OUTPUT);
    pcduino.pinMode(pin_dir, pcduino.OUTPUT);
    pcduino.digitalWrite(pin_dir, pcduino.HIGH);
}

//循环部分
var loop = function (pin, ms) {
    pcduino.digitalWrite(pin, pcduino.HIGH);
    pcduino.delay(ms);
    pcduino.digitalWrite(pin, pcduino.LOW);
    pcduino.delay(ms);
}

//执行函数部分
var execute = function execute(pin, ms, period) {
    var i = 0;
    while (i < period) {
        loop(pin, ms);
        ++i;
    }
}

var led = function (pin_pul, pin_dir, ms, period, callback) {
    setup(pin_pul, pin_dir);
    execute(pin_pul, ms, period);
    callback;
}

led(13, 12, 1, 1000, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("success")
    }
})

module.exports = {
    run: led
}
