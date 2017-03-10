/**
 * Created by Mars on 2017/2/20.
 */
var express = require('express');
var router = express.Router();
var relay = require('../modules/pcduino/relay');

router.get('/', function (req, res, next) {
    var pins = [parseInt(req.query.pin0), parseInt(req.query.pin1), parseInt(req.query.pin2)];
    console.log(pins);
    var action = parseInt(req.query.action);
    console.log("action=" + action)
    relay.run(pins, action, function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.send("The relay is Close or Release.");
})

module.exports = router;