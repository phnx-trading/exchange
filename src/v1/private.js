'use strict';

const express = require(`express`),
      ccxt = require(`ccxt`),
      symbolLookup = require(`./middleware/symbolLookup.js`);

const router = express.Router();

router.get(`*`, (req, res) => {
  res.send({
    success: false,
    error: `All private endpoint requests must be sent as POST`,
    result: null
  });
});

router.post(`/balances`, (req, res) => {
  req.exchangeClient.fetchBalance().then((data) => {
    res.send({
      success: true,
      error: null,
      result: data
    });
  }).catch((err) => {
    console.error(err);

    res.send({
      success: false,
      error: `Internal error`,
      result: null
    });
  });
});

router.post(`/markets/:primary/:quote/orders`, symbolLookup, (req, res) => {
  req.exchangeClient.fetchOrders(req.symbol.symbol).then((data) => {
    res.send({
      success: true,
      error: null,
      result: data
    });
  }).catch((err) => {
    console.error(err);

    res.send({
      success: false,
      error: `Internal error`,
      result: null
    });
  });
});

router.post(`/markets/:primary/:quote/order/:id/cancel`, symbolLookup, (req, res) => {
  req.exchangeClient.cancelOrder(req.params.id, req.symbol.symbol).then((data) => {
    res.send({
      success: true,
      error: null,
      result: data
    });
  }).catch((err) => {
    console.error(err);

    res.send({
      success: false,
      error: `Internal error`,
      result: null
    });
  });
});

router.post(`/markets/:primary/:quote/order/:type/:side`, symbolLookup, (req, res) => {
  if (![`limit`, `market`].includes(req.params.type)) {
    res.send({
      success: false,
      error: `Type must be "limit" or "market".`,
      result: null
    });
    return;
  }

  if (![`buy`, `sell`].includes(req.params.side)) {
    res.send({
      success: false,
      error: `Side must be "buy" or "sell".`,
      result: null
    });
    return;
  }

  let method = `create${ req.params.type == `market` ? `Market` : `Limit` }${ req.params.side == `buy` ? `Buy` : `Sell` }Order`;

  req.exchangeClient[method](req.symbol.symbol, req.body.amount, req.body.price).then((data) => {
    res.send({
      success: true,
      error: null,
      result: data
    });
  }).catch((err) => {
    console.error(err);

    res.send({
      success: false,
      error: `Internal error`,
      result: null
    });
  });
});

module.exports = router;
