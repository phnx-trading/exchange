'use strict';

const express = require(`express`),
      v1 = require(`./v1`);

const app = express(),
      PORT = process.env.PORT || 3000;

app.use(`/v1`, v1);

app.listen(PORT, () => {
  console.log(`http server listening on port ${ PORT }`)
});
