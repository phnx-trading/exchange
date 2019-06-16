'use strict';

const ccxt = require(`ccxt`);

const getPublicExchangeClient = (req, res, next) => {
  if (ccxt.exchanges.includes(req.params.exchange)) {
    req.exchangeClient = new ccxt[req.params.exchange]();
    next();
  } else {
    res.send({
      success: false,
      error: `Exchange not supported.`,
      result: null
    });
  }
};

module.exports = getPublicExchangeClient;
