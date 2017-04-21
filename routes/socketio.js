/**
 * Created by Mars on 2017/4/21.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendfile(__dirname + 'views/socketio.html');
});

module.exports = router;