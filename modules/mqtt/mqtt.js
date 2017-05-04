/**
 * Created by Mars on 2017/5/4.
 */
var config = require('../config');
var mqtt = require('mqtt');

module.exports = function (callback) {
    var client = mqtt.connect(config.mqtt.url);

    client.on('connect', function () {
        console.log('mqtt has connected.')
        client.subscribe('presence')
        client.publish('presence', 'Hello mqtt')
    })

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(message.toString())
        client.end()
    })
    callback(null, client);
}