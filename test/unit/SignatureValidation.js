var signatureValidation = require('../../lib/SignatureValidation')
var assert = require("assert")

describe('Signature Validation', function () {
    describe('Unit Tests', function () {

        it('should return true for a correct signature', function() {
            var signature = 'BCDdxnIzzFwd5kw9opFKeTuxD4A/PDcO0J/GsdieerE=';
            var salt = 'wzGe4Bl3ZkeNA+UcWzRMzA==';
            var body = '{"Created":"\\\/Date(1431820018154)\\\/","InvoiceId":"26a12255073744d5bd2e0ef10c25a8a8","Reference":"Acceptance:1431820014822","State":"Created"}';

            var privKey = 'jP0GyySl7EqND9Aar4H7FA==';

            var isValid = signatureValidation.validate(privKey, signature, salt, body);

            assert.equal(isValid, true);
        });

        it('should return false for an incorrect signature', function() {
            var signature = 'GHZxSwfh0bssRHTrVy8t1/EK6vZyi2QzxnIEMrDqBG8=';
            var salt = '46BS362cUUOYDutikexQGA==';
            var body = 'Different data, signature will not validate.';

            var privKey = 'jP0GyySl7EqND9Aar4H7FA==';

            var isValid = signatureValidation.validate(privKey, signature, salt, body);

            assert.equal(isValid, false);
        });

    });
});