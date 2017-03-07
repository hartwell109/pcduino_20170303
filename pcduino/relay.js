/**
 * Created by Mars on 2017/2/17.
 */
var pcduino = require("./pcduino");

//初始化部分
var RELEASED = 0;
var CLOSED = 1;

var setup = function (pins) {
    console.log("pins-setup=" + pins);
    for (var i = 0; i < pins.length; ++i) {
        pcduino.pinMode(pins[i], pcduino.OUTPUT);
    }
}

//循环部分
var loop = function (pins, action) {
    console.log("pins-loop=" + pins);
    for (var i = 0; i < pins.length; ++i) {
        pcduino.digitalWrite(pins[i], action);
        pcduino.delay(2);
    }
}

//执行部分
var excute = function (pins, action) {
    console.log("pins-execute=" + pins);
    setup(pins);
    pcduino.delay(2)
    loop(pins, action);
    pcduino.delay(2)
}

//输出部分
var relay = function (pins, action, callback) {
    excute(pins, action);
    callback;
}
module.exports = {
    run: relay,
    RELEASED: RELEASED,
    CLOSED: CLOSED
}