const mongoose = require('mongoose');
const cron = require('node-cron');
const sendEmail = require('./mailer');
const logger = require('./logger');

const today = new Date();

async function initializeCronTasks() {
  cron.schedule(
    '0 9 * * *',
    () => {
      const upcomingProjects = async () => {
        const projects = await Project.find();
        const titles = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].date.toString() > today.toString()) {
            titles.push(projects[i].title);
          }
        }
        sendEmail(
          'm.cankisi@gmail.com',
          'Upcoming Voluntera Projects',
          titles.join()
        );
      };
      upcomingProjects();
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
