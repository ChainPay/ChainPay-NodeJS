var ChainPayClient = require('../../lib/ChainPayClient');
var assert = require("assert")
var Enumerable = require('linq');

describe('Authenticated Acceptance Tests', function () {

    var getClient = function() {
        var config = {
            BaseUri: 'https://testapi.chainpay.com',
            ApiKey: '062d9556a32843468c7ebb111dffcf38'
        };
        return new ChainPayClient(config);
    }

    it('Can create simple invoice', function(done) {

        var amount = 100;
        var currency = 'GBP';
        var reference = 'Acceptance:' + (new Date).getTime();

        getClient().newInvoice(amount, currency, reference).then(function(invoice) {

            assert.equal(invoice.RequestAmount, amount);
            assert.equal(invoice.RequestCurrency, currency);
            assert.equal(invoice.Reference, reference);

            done();
        })
    });

    it('Can create complex invoice', function(done) {

        var invoiceRequest = {
            RequestAmount: 100,
            RequestCurrency: 'GBP',
            Reference: 'Acceptance:' + (new Date).getTime(),
            ForwardOnPaidUri: 'http://chainpay.com/paid',
            ForwardOnCancelUri: 'http://chainpay.com/cancel',
            CallbackUri: 'http://requestb.in/ohvk9coh',
            CustomData: { UnitTest: true },
            Metadata: {
                PayerName: 'Unit Test',
                PayerEmail: 'unit@test.com'
            }
        };

        getClient().createInvoice(invoiceRequest).then(function(invoice) {

            assert.equal(invoice.RequestAmount, invoiceRequest.RequestAmount);
            assert.equal(invoice.RequestCurrency, invoiceRequest.RequestCurrency);
            assert.equal(invoice.Reference, invoiceRequest.RequestCurrency);

            done();
        }).catch(function(e) {
            throw new Error(e);
        })
    });

});