/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-useless-path-segments */
const mongoose = require('mongoose');
const cron = require('node-cron');
const sendEmail = require('../utils/mailer');
// eslint-disable-next-line import/extensions
const logger = require('../utils/logger');

function initializeCronTasks(title, target, html) {
  cron.schedule(
    '0 9 * * *',
    () => {
      sendEmail(title, target, html);
    },
    {
      scheduled: true,
      timezone: 'Europe/Istanbul',
    }
  );
  cron.schedule(
    '0 0-23 * * *',
    () => {
      logger.info('Server is up and running');
      // eslint-disable-next-line prefer-destructuring
      const connection = mongoose.connection;
      if (!connection) {
        logger.error(`Db connection not found`);
      } else {
        logger.info(connection);
      }
    },
    {
      scheduled: true,
      timezone: 'Europe/Istanbul',
    }
  );
}

module.exports = initializeCronTasks;
