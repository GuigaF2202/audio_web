const { createServer } = require('http');
const app = require('../src/app');
const redis = require('../src/config/redis');

module.exports = async () => {
  global.server = createServer(app);
  await new Promise(resolve => global.server.listen(0, resolve));
  await redis.connect();
};
