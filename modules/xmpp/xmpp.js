/**
 * Created by Mars on 2017/5/2.
 */
var config = require('../config');
var xmpp = require('simple-xmpp');
module.exports = function (callback) {
    xmpp.on('online', function (data) {
        console.log('Connected with JID ' + config.xmpp.jid);
        callback(null, xmpp);
    });

    xmpp.on('error', function (err) {
        console.error(err);
        callback(err, null);
    });

    xmpp.on('chat', function (from, message) {
        console.log('from:' + from + '\n' + 'message:' + message);
        xmpp.send(from, 'echo:' + message);
    })

    xmpp.connect({
        jid: config.xmpp.jid,
        password: config.xmpp.password,
        host: config.xmpp.host,
        port: config.xmpp.port
    });


}