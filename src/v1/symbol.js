'use strict';

const express = require(`express`),
      ccxt = require(`ccxt`);

const router = express.Router();

router.get(`/`, (req, res) => {
  res.send({
    success: true,
    error: null,
    result: req.symbol
  });
});

router.get(`/orderbook`, (req, res) => {
  req.exchangeClient[req.query.agg !== undefined ? `fetchL2OrderBook` : `fetchOrderBook`](req.symbol.symbol).then((data) => {
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

router.get(`/trades`, (req, res) => {
  req.exchangeClient.fetchTrades(req.symbol.symbol).then((data) => {
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

router.get(`/ticker`, (req, res) => {
  req.exchangeClient.fetchTicker(req.symbol.symbol).then((data) => {
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

router.get(`/ohlcv`, (req, res) => {
  req.exchangeClient.fetchOHLCV(req.symbol.symbol).then((data) => {
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
