const request = require('supertest');
const app = require('../../../src/app');
const redis = require('../../../src/config/redis');

describe('Rate Limiting', () => {
  const TEST_ENDPOINT = '/api/users';
  const MAX_REQUESTS = 100;

  beforeEach(async () => {
    await redis.flushAll();
  });

  const fireRequests = async (count) => {
    const promises = [];
    for (let i = 0; i < count; i++) {
      promises.push(request(app).get(TEST_ENDPOINT));
    }
    return Promise.all(promises);
  };

  it('should enforce rate limits', async () => {
    const responses = await fireRequests(MAX_REQUESTS + 10);
    
    const success = responses.filter(res => res.status === 200);
    const blocked = responses.filter(res => res.status === 429);

    expect(success.length).toBe(MAX_REQUESTS);
    expect(blocked.length).toBe(10);
  });
});
