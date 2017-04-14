/**
 * Created by Mars on 2017/3/22.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Welcome to QRcode!')
});

router.get('/qrimage', function (req, res) {
    var text = req.query.text;
    var svg = require('../modules/qrcode/qrimage')(text);
    res.send(svg);
});

router.get('qrscanner', function (req, res) {

});

module.exports = router