/**
 * Created by Mars on 2017/2/22.
 */
var xmppClient = require('simple-xmpp');
var config = require('/modules/config');

xmppClient.on("online", function (data) {
    console.log(data.jid.user);
    console.log(data.jid.domain);
    console.log(data.jid.resource);
})
xmppClient.connect({
    jid: config.xmpp.jid,
    password: config.xmpp.password,
    host: config.xmpp.host,
    port: config.xmpp.port
});

module.exports = xmppClient