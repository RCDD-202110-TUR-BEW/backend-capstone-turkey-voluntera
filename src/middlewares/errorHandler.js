const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err);

  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ message: 'Server ran into an error', err });
};
