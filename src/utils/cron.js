/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-useless-path-segments */
const cron = require('node-cron');
const sendEmail = require('../utils/mailer');
const logger = require('../utils/logger');

const newsletter = (content) => {
  cron.schedule(
    '0 9 * * *',
    () => {
      sendEmail(content);
    },
    {
      scheduled: true,
      timezone: 'Europe/Istanbul',
    }
  );
};

const serverStatus = (content, details) => {
  cron.schedule(
    '0 0-23 * * *',
    () => {
      logger.info(content, {
        details,
      });
    },
    {
      scheduled: true,
      timezone: 'Europe/Istanbul',
    }
  );
};

module.exports = { newsletter, serverStatus };
