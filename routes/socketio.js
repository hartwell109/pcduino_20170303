/**
 * Created by Mars on 2017/4/23.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.sendfile("./views/socketio.html");
});

module.exports = router;