/**
 * Created by Mars on 2017/5/2.
 */
var pcduino = {
    //基础变量
    INPUT: 0,
    OUTPUT: 1,
    HIGH: 1,
    LOW: 0,
    TURN_ON: 1,
    TURN_OFF: 0,
    RIGHT: 1,
    LEFT: 0,

    //基础函数
    digitalWrite: function (pin, value) {
        var fs = require('fs');
        fs.writeFileSync("/sys/devices/virtual/misc/gpio/pin/gpio" + pin, String(value));
    },

    digitalRead: function (pin) {
        var fs = require('fs');
        var result = fs.readFileSync("/sys/devices/virtual/misc/gpio/pin/gpio" + pin);
        return result;
    },

    pinMode: function (pin, mode) {
        var fs = require('fs');
        fs.writeFileSync("/sys/devices/virtual/misc/gpio/mode/gpio" + pin, String(mode));
    },

    delay: function (ms) {
        var start = new Date().get;
        for (var i = 0; i < 1e7; ++i) {
            if ((new Date().getTime() - start) > ms) break;
        }
    },
    
    delayMili:function () {
        
    }
    
}
module.exports = pcduino;