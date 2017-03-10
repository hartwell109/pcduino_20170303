/**
 * Created by Mars on 2017/2/16.
 */
var pcduino = require("./pcduino");

var RIGHT = 1;
var LEFT = 0;
var pins;

//初始化部分
var setup = function (pins, direction) {
    switch (direction) {
        case RIGHT:
            this.pins = pins;
            break;
        case LEFT:
            this.pins = pins.reverse();
            break;
    }
    console.log("pins=setup=" + pins);
    var length = pins.length;
    for (var i = 0; i < length; ++i) {
        pcduino.pinMode(pins[i], pcduino.OUTPUT);
    }
}

//循环部分
var loop = function (pins) {
    console.log("pins=loop=" + pins);
    pcduino.digitalWrite(pins[0], pcduino.HIGH);
    pcduino.digitalWrite(pins[1], pcduino.LOW);
    pcduino.digitalWrite(pins[2], pcduino.LOW);
    pcduino.digitalWrite(pins[3], pcduino.HIGH);
    pcduino.delay(2);
    pcduino.digitalWrite(pins[0], pcduino.HIGH);
    pcduino.digitalWrite(pins[1], pcduino.HIGH);
    pcduino.digitalWrite(pins[2], pcduino.LOW);
    pcduino.digitalWrite(pins[3], pcduino.LOW);
    pcduino.delay(2);
    pcduino.digitalWrite(pins[0], pcduino.LOW);
    pcduino.digitalWrite(pins[1], pcduino.HIGH);
    pcduino.digitalWrite(pins[2], pcduino.HIGH);
    pcduino.digitalWrite(pins[3], pcduino.LOW);
    pcduino.delay(2);
    pcduino.digitalWrite(pins[0], pcduino.LOW);
    pcduino.digitalWrite(pins[1], pcduino.LOW);
    pcduino.digitalWrite(pins[2], pcduino.HIGH);
    pcduino.digitalWrite(pins[3], pcduino.HIGH);
    pcduino.delay(2);
}

//执行部分
var execute = function (pins, peroid) {
    console.log("pins=execute=" + pins);
    for (var i = 0; i < peroid; ++i) {
        loop(pins);
    }
}

//输出部分
var run = function (pins, direction, peroid, callback) {
    console.log("pins=motor=" + pins);
    setup(pins, direction);
    execute(pins, peroid);
    callback;
}
module.exports =
    {
        run: run,
        RIGHT: RIGHT,
        LEFT: LEFT
    }

// motor([8, 9, 10, 11], 1, 1000, function () {
//     console.log("Motor is runing finished!")
// })

