const request = require('supertest');
const app = require('../../../src/app');
const redis = require('../../../src/config/redis');

describe('Middlewares', () => {
  beforeEach(async () => {
    await redis.flushAll();
  });

  it('should return 408 on request timeout', async () => {
    // Rota de teste lenta
    app.get('/slow-test-route', (req, res) => {
      setTimeout(() => res.sendStatus(200), 35000);
    });

    const response = await request(app)
      .get('/slow-test-route')
      .timeout(40000);

    expect(response.status).toBe(408);
    expect(response.body.error).toMatch(/Request timeout/);
  }, 40000);

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
    expect(res.body.error.message).toBe('Rota não encontrada');
  });

  it('should handle internal server errors', async () => {
    const res = await request(app).get('/error-route');
    expect(res.statusCode).toBe(500);
    expect(res.body.error.message).toBe('Erro interno do servidor');
  });
});
