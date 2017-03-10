/**
 * Created by Mars on 2017/3/9.
 */
var express = require('express');
var router = express.Router();
var motor2 = require('../modules/pcduino/motor2');

router.get('/', function (req, res, next) {
    motor2.run(13, 12, motor2.RIGHT, 1000, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send('The motor is ring.')
        }
    })
})

module.exports = router;