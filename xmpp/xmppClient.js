/**
 * Created by Mars on 2017/2/22.
 */
var xmppClient = require('simple-xmpp');
xmppClient.on("online", function (data) {
    console.log(data.jid.user);
    console.log(data.jid.domain);
    console.log(data.jid.resource);
})
xmppClient.connect({
    jid: "pcduino@localhost",
    password: 'pcduino',
    host: "115.182.16.117",
    port: 5222
});

module.exports = xmppClient