'use strict';

const ccxt = require(`ccxt`);

const symbolLookup = (req, res, next) => {
  if (!req.exchangeClient) throw Error(`symbolLookup middleware requires getExchangeClient`);

  let symbol = `${ req.params.primary }/${ req.params.quote }`;

  req.exchangeClient.loadMarkets().then((markets) => {
    symbol = Object.keys(markets).find((m) => m.toLowerCase() == symbol.toLowerCase());

    if (!markets.hasOwnProperty(symbol)) {
      res.send({
        success: false,
        error: `Symbol not found.`,
        result: null
      });
    } else {
      req.symbol = markets[symbol];
      next();
    }
  });
};

module.exports = symbolLookup;
