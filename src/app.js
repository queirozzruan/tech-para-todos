const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { apiRouter } = require('./interfaces/http/routes');
const { notFoundHandler } = require('./interfaces/http/middlewares/notFoundHandler');
const { errorHandler } = require('./interfaces/http/middlewares/errorHandler');

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '100kb' }));

  app.use('/api/v1', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
