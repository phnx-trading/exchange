'use strict';

const ccxt = require(`ccxt`);

const getPrivateExchangeClient = (req, res, next) => {
  if (ccxt.exchanges.includes(req.params.exchange)) {
    if (!req.body.apiKey || !req.body.apiSecret) {
      res.send({
        success: false,
        error: `API Key and Secret are required in POST body on all private endpoints.`,
        result: null
      });
    } else {
      req.exchangeClient = new ccxt[req.params.exchange]({
        apiKey: req.body.apiKey,
        secret: req.body.apiSecret
      });

      next();
    }
  } else {
    res.send({
      success: false,
      error: `Exchange not supported.`,
      result: null
    });
  }
};

module.exports = getPrivateExchangeClient;
