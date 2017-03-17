/**
 * Created by Mars on 2017/3/13.
 */
var events = require('events');
var pcduino = require('./pcduino');

//初始化部分
var setup = function (switch_pin) {
    console.log("Listening the switch pin " + pcduino.digitalRead(switch_pin));
    pcduino.pinMode(switch_pin, pcduino.INPUT);
    pcduino.pinMode(13, pcduino.OUTPUT);
}

//循环部分
var loop = function (switch_pin) {
    var status = 0;
    var result = 0;
    while (true) {
        result = pcduino.digitalRead(switch_pin);
        console.log(result)
        if (result == 1 && status === 0) {
            status = 1;
            pcduino.digitalWrite(13, pcduino.HIGH);
            //向主进程发送消息
            process.send({payload: switch_pin, light: '1', time: (new Date()).toLocaleString()});
        }
        if (result == 0 && status === 1) {
            status = 0;
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