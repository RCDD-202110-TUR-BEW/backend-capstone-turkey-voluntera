const mongoose = require('mongoose');
const logger = require('./utils/logger');

class Database {
  #connection = null;

  constructor(url) {
    this.url = url;
  }

  async #connect() {
    try {
      await mongoose.connect(this.url);
      logger.info(`Successfuly connected to ${this.url}`);
    } catch (err) {
      logger.error(
        `Connection to ${this.url} has failed. With error code: \n${err}`
      );
    }
  }

  async getConnection() {
    if (this.#connection == null) {
      await this.#connect();
      this.#connection = mongoose.connection;
    }
    return this.#connection;
  }

  closeConnection() {
    this.#connection.close().then(() => {
      this.#connection = null;
    });
  }

  async dropDatabase() {
    if (this.#connection !== null) {
      await this.#connection.dropDatabase();
    }
  }
}

module.exports = Database;
