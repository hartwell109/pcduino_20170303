/**
 * Created by Mars on 2017/5/2.
 */
var mac = require('getmac');
var getMac = mac.getMac(function (err, macAddress) {
    if (err) {
        console.log(err)
    }
    return macAddress;
})

module.exports = {
    getMac: getMac
}