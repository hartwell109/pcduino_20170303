/**
 * Created by Mars on 2017/3/13.
 */
var events = require('events');
var pcduino = require('./pcduino');

//初始化部分
var setup = function (switch_pin) {
    console.log("switch_pin=" + pcduino.digitalRead(switch_pin));
    pcduino.pinMode(switch_pin, pcduino.INPUT);
    pcduino.pinMode(13, pcduino.OUTPUT);
}

//循环部分
var loop = function (switch_pin) {
    var light = 0;
    while (true) {
        var result = pcduino.digitalRead(switch_pin);
        if (result == 1 && light == 0) {
            light = result;
            pcduino.digitalWrite(13, pcduino.HIGH);
            //向主进程发送消息
            process.send({payload: switch_pin, light: '1', time: (new Date()).toLocaleString()});
        }
        if (result == 0 && light == 1) {
            light = result;
            pcduino.digitalWrite(13, pcduino.LOW);
            process.send({payload: switch_pin, light: '0', time: (new Date()).toLocaleString()});
        }
    }
}

//执行部分
var microswitch = function (switch_pin) {
    setup(switch_pin);
    loop(switch_pin);
}

microswitch(2);