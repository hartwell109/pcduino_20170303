/**
 * Created by Mars on 2017/2/21.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var mac = require('../pcduino/mac');
    var macAddress;
    mac.run(function (err, macAddress) {
            if (err) {
                console.log(err);
            } else {
                this.macAddress = macAddress;
                console.log("macAddress=" + macAddress);
            }
            res.send("This matchion's MAC is " + this.macAddress)
        }
    );
})
module.exports = router;