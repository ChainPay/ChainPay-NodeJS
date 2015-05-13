var rest = require('restler-q');

function ChainPayClient(config) {
    if(config === null || config === undefined)
        throw new Error("No config argument passed or was null.");

    this.BaseUri = config.BaseUri || 'https://api.chainpay.com';
    this.ApiKey = config.ApiKey;
    this.PrivateKey = config.PrivateKey;
};

ChainPayClient.prototype.get = function (operation, query) {
    var options = {
        method: 'GET',
        query: query,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    };

    if(this.ApiKey)
        options.headers.Authorization = this.ApiKey;

    return rest.get(this.BaseUri + operation, options);
};

ChainPayClient.prototype.post = function (operation, query) {
    var options = {
        method: 'POST',
        query: query,
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    };

    if(query)
        options.data = JSON.stringify(query);

    if(this.ApiKey)
        options.headers.Authorization = this.ApiKey;

    return rest.post(this.BaseUri + operation, options);
};

ChainPayClient.prototype.getRates = function getRates() {
    return this.get('/currencyrates');
};

ChainPayClient.prototype.createInvoice = function createInvoice(request) {
    if(!this.ApiKey)
        throw new Error('No ApiKey was provided, this operation requires a valid ApiKey.')

    return this.post('/invoice', request);
};

ChainPayClient.prototype.newInvoice = function newInvoice(requestAmount, requestCurrency, reference) {
    return this.createInvoice(
        {
            RequestAmount: requestAmount,
            RequestCurrency: requestCurrency,
            Reference: reference
        }
    );
};

ChainPayClient.prototype.getInvoice = function newInvoice(id) {
    return this.get('/invoice/' + id);
};

ChainPayClient.prototype.validateCallback = function(callbackHeaders) {
    if(!callbackHeaders['X-AltXE-Signature'])
        throw new Error("X-AltXE-Signature not provided, mandatory.");
    if(!callbackHeaders['X-AltXE-Salt'])
        throw new Error("X-AltXE-Salt not provided, mandatory.");


}

module.exports = ChainPayClient;