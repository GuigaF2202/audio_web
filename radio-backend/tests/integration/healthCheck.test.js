import request from 'supertest';
import app from '../../src/app.js';

describe('GET /health', () => {
  it('should return health check data', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
    expect(res.body.uptime).toBeDefined();
    expect(res.body.environment).toBeDefined();
    expect(res.body.cloudflare).toBeDefined();
  });
});
