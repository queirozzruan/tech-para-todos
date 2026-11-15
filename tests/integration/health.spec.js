const request = require('supertest');

const { createApp } = require('../../src/app');

describe('GET /api/v1/health', () => {
  it('returns the API health status', async () => {
    const response = await request(createApp()).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      service: 'tech-para-todos-api',
    });
  });
});

describe('unknown route', () => {
  it('returns a standardized 404 response', async () => {
    const response = await request(createApp()).get('/api/v1/unknown');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: {
        code: 'ROUTE_NOT_FOUND',
        message: 'Rota não encontrada.',
        details: [],
      },
    });
  });
});

