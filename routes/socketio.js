/**
 * Created by Mars on 2017/5/4.
 */
var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'socketio.html'));
});

module.exports = router;