/* eslint-disable import/extensions */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable node/no-missing-require */
/* eslint-disable import/no-unresolved */

const mongoose = require('mongoose');
const cron = require('node-cron');
const sendEmail = require('../utils/mailer');
const logger = require('../utils/logger');
const Project = require('../models/project');

const today = new Date();

async function initializeCronTasks() {
  cron.schedule(
    '0 9 * * *',
    async () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const projectTitles = await Project.find({
        createdAt: { $gte: date },
      }).select({ titles: 1 });
      const htmlTemplate = `<p>${projectTitles.join('\n')}</p>`;
      // eslint-disable-next-line no-plusplus
      sendEmail(
        'nodemailervoluntera@gmail.com',
        'Upcoming Voluntera Projects',
        htmlTemplate
      );
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
