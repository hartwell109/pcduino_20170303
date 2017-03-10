/**
 * Created by Mars on 2017/2/14.
 */
var mac = require('getmac');
var getMacAddress = function (cb) {
    mac.getMac(function (error, macAddress) {
        if (error) {
            cb(error, null);
        } else {
            global.macAddress=macAddress;
            cb(null, macAddress);
        }
    })
}

module.exports = {
    run: getMacAddress
}