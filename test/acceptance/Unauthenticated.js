var ChainPayClient = require('../../lib/ChainPayClient');
var assert = require("assert")
var Enumerable = require('linq');

describe('Unauthenticated Acceptance Tests', function () {

    var getClient = function() {
        var config = { BaseUri: 'https://testapi.chainpay.com' };
        return new ChainPayClient(config);
    }

    it('Should retrieve Currency Rates', function(done) {
        getClient().getRates().then(function(response) {

            var rates = Enumerable.from(response.Rates);
            assert.equal(rates.any('$.Code=="GBP"'), true)
            assert.equal(rates.any('$.Code=="USD"'), true)
            assert.equal(rates.any('$.Code=="EUR"'), true)
            assert.equal(rates.any('$.Code=="BTC"'), true)

            done();
        });
    });

});