var proxyquire = require('proxyquire');
var assert = require("assert")

describe('ChainPayClient', function () {
    describe('Unit Tests', function () {
        var constructor = function (fakes) {
            fakes = fakes || {};

            return proxyquire('../../lib/ChainPayClient', {
                'restler-q': fakes.restler || {}
            });
        };

        describe('Configuration', function () {
            it('should default BaseUri to Live API', function () {
                var config = {};
                var client = new (constructor())(config);
                assert.equal(client.BaseUri, 'https://api.chainpay.com');
            });

            it('should save ApiKey to object', function () {
                var config = {ApiKey: 'TestApiKey'};
                var client = new (constructor())(config);
                assert.equal(client.ApiKey, 'TestApiKey');
            });
        });

        describe('REST', function () {
            describe('GET Operations', function () {
                it('should set Method to GET', function (done) {

                    var fakes = {
                        restler: {
                            get: function (path, options) {
                                assert.equal(options.method, 'GET');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.get('/test');
                });

                it('should set Header Content Type as JSON', function (done) {

                    var fakes = {
                        restler: {
                            get: function (path, options) {
                                assert.equal(options.headers['Content-Type'], 'application/json');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.get('/test');
                });

                it('should set Header Accept as JSON', function (done) {

                    var fakes = {
                        restler: {
                            get: function (path, options) {
                                assert.equal(options.headers['Accept'], 'application/json');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.get('/test');
                });

                it('should set Header Authorization as ApiKey', function (done) {

                    var fakes = {
                        restler: {
                            get: function (path, options) {
                                assert.equal(options.headers['Authorization'], 'TestApiKey');
                                done();
                            }
                        }
                    };

                    var config = {ApiKey: 'TestApiKey'};
                    var client = new (constructor(fakes))(config);
                    client.get('/test');
                });

                it('should pass BaseUri and Operation as path', function (done) {

                    var fakes = {
                        restler: {
                            get: function (path, options) {
                                assert.equal(path, 'https://api.chainpay.com/test');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.get('/test');
                });

                it('should pass query object in options', function (done) {

                    var testQuery = {Hello: 'World'};

                    var fakes = {
                        restler: {
                            get: function (path, options) {
                                assert.equal(options.query, testQuery);
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.get('/test', testQuery);
                });


            });

            describe('POST Operations', function () {
                it('should set Method to POST', function (done) {

                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(options.method, 'POST');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.post('/test');
                });

                it('should set Header Content Type as JSON', function (done) {

                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(options.headers['Content-Type'], 'application/json');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.post('/test');
                });

                it('should set Header Accept as JSON', function (done) {

                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(options.headers['Accept'], 'application/json');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.post('/test');
                });

                it('should set Header Authorization as ApiKey', function (done) {

                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(options.headers['Authorization'], 'TestApiKey');
                                done();
                            }
                        }
                    };

                    var config = {ApiKey: 'TestApiKey'};
                    var client = new (constructor(fakes))(config);
                    client.post('/test');
                });

                it('should pass BaseUri and Operation as path', function (done) {

                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(path, 'https://api.chainpay.com/test');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.post('/test');
                });

                it('should pass data object in options', function (done) {

                    var testQuery = {Hello: 'World'};

                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(options.data, JSON.stringify(testQuery));
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.post('/test', testQuery);
                });


            });
        });

        describe('Operations', function () {
            describe('Get Rates', function () {

                it('should call the correct endpoint', function (done) {
                    var fakes = {
                        restler: {
                            get: function (path, options) {
                                assert.equal(path, 'https://api.chainpay.com/currencyrates');
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    client.getRates();
                });

            });

            describe('Create Invoice', function () {
                var invoice = {
                    RequestAmount: 100,
                    RequestCurrency: 'GBP',
                    Reference: 'Unit Test'
                };

                it('should call the correct endpoint', function (done) {
                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(path, 'https://api.chainpay.com/invoice');
                                done();
                            }
                        }
                    };

                    var config = {ApiKey: 'TestApiKey'};
                    var client = new (constructor(fakes))(config);
                    client.newInvoice(invoice.RequestAmount, invoice.RequestCurrency, invoice.Reference);
                });

                it('should pass the correct data', function (done) {
                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(path, 'https://api.chainpay.com/invoice');
                                assert.deepEqual(JSON.parse(options.data), invoice);
                                done();
                            }
                        }
                    };

                    var config = {ApiKey: 'TestApiKey'};
                    var client = new (constructor(fakes))(config);
                    client.newInvoice(invoice.RequestAmount, invoice.RequestCurrency, invoice.Reference);
                });

                it('should error when no ApiKey was provided', function () {
                    var fakes = {
                        restler: {
                            post: function (path, options) {
                                assert.equal(path, 'https://api.chainpay.com/invoice');
                                assert.deepEqual(JSON.parse(options.data), invoice);
                                done();
                            }
                        }
                    };

                    var config = {};
                    var client = new (constructor(fakes))(config);
                    assert.throws(
                        function () {
                            client.newInvoice(invoice.RequestAmount, invoice.RequestCurrency, invoice.Reference)
                        }, /ApiKey/);
                });

            });

        });
    });
});