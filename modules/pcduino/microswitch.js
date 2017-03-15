/**
 * Created by Mars on 2017/3/13.
 */
var events = require('events');
var pcduino = require('./pcduino');

//初始化部分
var setup = function (switch_pin) {
    console.log('switch_pin=' + switch_pin);
    pcduino.pinMode(switch_pin, pcduino.INPUT);
    pcduino.pinMode(13, pcduino.OUTPUT);
}

//循环部分
var loop = function (switch_pin) {
    var result = pcduino.digitalRead(switch_pin);
    pcduino.delay(1000);
    console.log('result=' + result);
    // pcduino.delay(500);
    if (result > 0) {
        pcduino.digitalWrite(13, pcduino.HIGH);
        pcduino.delay(500);
    } else {
        pcduino.digitalWrite(13, pcduino.LOW);
        pcduino.delay(500);
    }
}

//执行部分
var execute = function (switch_pin) {
    setup(switch_pin);
    while (true) {
        loop(switch_pin);
    }
}
var microswitch = function (switch_pin) {
    execute(switch_pin);
}
// microswitch(3);

module.exports = microswitch