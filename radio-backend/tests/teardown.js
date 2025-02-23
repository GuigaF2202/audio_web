const mongoose = require('mongoose');
const redis = require('../src/config/redis');

module.exports = async () => {
  await mongoose.disconnect();
  await redis.quit();
  await new Promise(resolve => global.server.close(resolve));
};
