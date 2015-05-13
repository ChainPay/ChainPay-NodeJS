var signatureValidation = require('../../lib/SignatureValidation')
var assert = require("assert")

describe('Signature Validation', function () {
    describe('Unit Tests', function () {

        it('should return true for a correct signature', function() {
            var signature = 'GHZxSwfh0bssRHTrVy8t1/EK6vZyi2QzxnIEMrDqBG8=';
            var salt = '46BS362cUUOYDutikexQGA==';
            var body = '{"Expired":"\\/Date(1431520314735)\\/","InvoiceId":"2c14914383064dbea21e694e22ef2b2f","Reference":"Acceptance:1431519718999","State":"Expired"}';

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

            assert.equal(isValid, true);
        });

    });
});