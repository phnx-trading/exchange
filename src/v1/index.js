'use strict';

const express = require(`express`),
      ccxt = require(`ccxt`),
      bodyParser = require(`body-parser`),
      getPublicExchangeClient = require(`./middleware/publicExchangeClient.js`),
      getPrivateExchangeClient = require(`./middleware/privateExchangeClient.js`),
      symbolLookup = require(`./middleware/symbolLookup.js`),
      symbolRouter = require(`./symbol.js`),
      privateRouter = require(`./private.js`);

const router = express.Router();

router.use(bodyParser.json());

router.get(`/exchanges`, (req, res) => {
  res.send({
    success: true,
    error: null,
    result: ccxt.exchanges
  });
});

router.get(`/exchanges/:exchange/markets`, getPublicExchangeClient, (req, res) => {
  req.exchangeClient.loadMarkets().then((markets) => {
    res.send({
      success: true,
      error: null,
      result: Object.keys(markets)
    });
  }).catch((err) => {
    console.error(err);

    res.send({
      success: false,
      error: `Internal error`,
      result: null
    });
  });
})

router.use(`/exchanges/:exchange/markets/:primary/:quote`, getPublicExchangeClient, symbolLookup, symbolRouter);

router.use(`/private/exchanges/:exchange`, getPrivateExchangeClient, privateRouter);

module.exports = router;
