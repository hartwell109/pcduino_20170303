/**
 * Created by Mars on 2017/3/22.
 */
require(['qr-code-scanner'], function (QRScanner) {

    QRScanner.initiate({
        match: /^[a-zA-Z0-9]{16,18}$/, // optional
        onResult: function (result) {
            console.info('DONE: ', result);
        },
        onError: function (err) {
            console.error('ERR :::: ', err);
        }, // optional
        onTimeout: function () {
            console.warn('TIMEDOUT');
        } // optional
    })
});
window.QRScanner;