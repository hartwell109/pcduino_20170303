/**
 * Created by Mars on 2017/3/9.
 */
var express = require('express');
var router = express.Router();
var motor2 = require('../modules/pcduino/motor2');

router.get('/', function (req, res, next) {
    var pin_pul = parseInt(req.query.pin_pul);
    var pin_dir = parseInt(req.query.pin_dir);
    var dir = parseInt(req.query.direction);
    var peroid = parseInt(req.query.peroid);
    motor2.run(pin_pul, pin_dir, dir, peroid, function (err) {
        if (err) {
            console.log(err);
        }
    })
    res.send('The motor2 is ring.')
})

module.exports = router;