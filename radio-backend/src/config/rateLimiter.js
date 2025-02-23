const rateLimit = require('express-rate-limit');
const redisStore = require('rate-limit-redis');
const redisClient = require('./redis');

const apiLimiter = rateLimit({
  store: new redisStore({
    client: redisClient,
    expiry: 60,
    prefix: 'rl:'
  }),
  windowMs: 60 * 1000,
  max: 100,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Limite de requisições excedido'
    });
  }
});

module.exports = apiLimiter;
