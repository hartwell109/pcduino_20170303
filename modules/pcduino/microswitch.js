/**
 * Created by Mars on 2017/3/13.
 */
var pcduino = require('./pcduino');

//初始化部分
var setup = function (switch_pin) {
    console.log('switch_pin=' + switch_pin);
    pcduino.pinMode(switch_pin, pcduino.INPUT);
}

//循环部分
var loop = function (switch_pin) {
    while (true) {
        var result = pcduino.digitalRead(switch_pin);
        console.log('result=' + result);
    }
}

//执行部分
var execute = function (switch_pin) {
    setup(switch_pin);
    loop(switch_pin);
}
var microswitch = function (switch_pin) {
    execute(switch_pin);
}
microswitch(13);

module.exports = {
    run: microswitch
}