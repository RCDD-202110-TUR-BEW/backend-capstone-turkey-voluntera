const logger = require('pino');

module.exports = logger(
  {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  },
  logger.destination('../voluntera.log')
);
