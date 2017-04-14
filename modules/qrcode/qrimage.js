/**
 * Created by Mars on 2017/3/22.
 */
var qrImage = require('qr-image');
//var png = qrImage.image('It is a QRcode', {type: 'png'});
//svg.pipe(require('fs').createWriteStream('a.png'));
var display = function (text) {
    var svg_string = qrImage.imageSync(text, {type: 'svg'});
    console.log(svg_string);
    return svg_string;
}

module.exports = display;