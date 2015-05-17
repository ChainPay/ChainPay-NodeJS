var crypto = require('crypto');

var validateSignature = function validateSignature(privateKey, signature, salt, body) {
    var privBuffer = new Buffer(privateKey, 'base64');
    var saltBuffer = new Buffer(salt, 'base64');
    var sigBuffer = new Buffer(signature, 'base64');
    var bodyBuffer = new Buffer(body, 'ascii');

    var keyBuffer = new Buffer(privBuffer.length + saltBuffer.length);
    privBuffer.copy(keyBuffer, 0, 0, privBuffer.length);
    saltBuffer.copy(keyBuffer, privBuffer.length, 0, saltBuffer.length);
    var hmacResult = crypto.createHmac('sha256', keyBuffer)
        .update(bodyBuffer)
        .digest();

    return sigBuffer.equals(hmacResult);
}

module.exports = {
    validate: validateSignature
}