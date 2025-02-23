const createTimeout = (ms) => {
    return (req, res, next) => {
      const timeout = setTimeout(() => {
        if (!res.headersSent) {
          res.status(408).json({ 
            error: 'Request timeout',
            message: `Response not received within ${ms}ms`
          });
        }
      }, ms);
  
      res.on('finish', () => clearTimeout(timeout));
      next();
    };
  };
  
  module.exports = createTimeout;
  