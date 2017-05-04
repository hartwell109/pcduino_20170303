/**
 * Created by Mars on 2017/5/2.
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
var loop = function (pin_pul) {
    pcduino.digitalWrite(pin_pul, pcduino.HIGH);
    pcduino.delay(10)
    pcduino.digitalWrite(pin_pul, pcduino.LOW);
    pcduino.delay(10)
}

//执行函数部分
var execute = function execute(pin_pul, period) {
    var i = 0;
    while (i < period) {
        loop(pin_pul);
        ++i;
    }
}

var run = function (pin_pul, pin_dir, direction, period, callback) {
    setup(pin_pul, pin_dir, direction);
    execute(pin_pul, period);
    callback;
}

//
module.exports = {
    run: run,
    RIGHT: RIGHT,
    LEFT: LEFT
}

//
run(8, 7, 1, 200 * 5, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('sucess')
    }
})