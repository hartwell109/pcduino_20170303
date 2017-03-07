/**
 * Created by Mars on 2017/2/14.
 */
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    var pin = req.query.pin;
    var peroid = req.query.peroid;
    var led = require("../pcduino/led");
    led.run(pin, peroid, function (err) {
        if (err) {
            console.log(err)
        }
    });
    res.send('starting......' + 'pin=' + pin + ';' + 'period=' + peroid);
});

module.exports = router;