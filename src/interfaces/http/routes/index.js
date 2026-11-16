const { Router } = require('express');

const apiRouter = Router();

apiRouter.get('/health', (request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'tech-para-todos-api',
  });
});

module.exports = { apiRouter };
