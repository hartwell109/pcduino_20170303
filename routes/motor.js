/**
 * Created by Mars on 2017/2/20.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var pins = [parseInt(req.query.pin0), parseInt(req.query.pin1), parseInt(req.query.pin2), parseInt(req.query.pin3)];
    console.log("pins=" + pins);
    var direction = req.query.direction;
    var peroid = req.query.peroid;
    var motor = require('../pcduino/motor');
    motor.run(pins, direction, peroid, function (err) {
        if (err) {
            console.log("err:" + err);
        }
    });
    res.send("Motor is running")
})
module.exports = router;