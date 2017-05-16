/**
 * Created by Mars on 2017/5/2.
 */
var config = {
    xmpp: {
        jid: 'pcduino@t1.xmpp.yibeikafei.cn',
        password: 'pcduino',
        host: '47.93.49.110',
        port: 5222
    },
    serialport: {
        url: "COM1",
        baudRate: 9600,
        dataBits: 8,
        stopBits: 1,
        parity: 'none'
    },
    socketio: {
        port: 3333
    },
    mqtt: {
        url: 'mqtt://test.mosquitto.org',
        topic: 'topic'
    }
}

module.exports = config