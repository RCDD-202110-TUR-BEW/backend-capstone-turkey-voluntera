const mongoose = require('mongoose');
const cron = require('node-cron');
const sendEmail = require('./mailer');
const logger = require('./logger');
const Project = require('../models/project');
const { Volunteer } = require('../models/user');

async function initializeCronTasks() {
  cron.schedule(
    '0 9 * * *',
    async () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      const projectTitles = await Project.find({
        createdAt: { $gte: date },
      }).select({ titles: 1 });
      const titlesArr = projectTitles.map((el) => el.title);

      const userEmails = await Volunteer.find().select({ email: 1 });
      const emailsArr = userEmails.map((el) => el.email);

      const htmlTemplate = `<p>${titlesArr.join('\n')}</p>`;

      await sendEmail(emailsArr, 'Upcoming Voluntera Projects', htmlTemplate);
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
