'use strict';

const express = require(`express`),
      v1 = require(`./v1`);

const app = express();

app.use(`/v1`, v1);

if (!!process.env.LAMBDA_TASK_ROOT) {
  const serverlessExpress = require('aws-serverless-express'),
        server = serverlessExpress.createServer(app);

  exports.main = (event, context) => serverlessExpress.proxy(server, event, context);
} else {
  app.listen(3000, () => console.log(`Listening on 3000`));
}
