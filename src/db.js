const mongoose = require('mongoose');

class Database {
  #connection = null;

  constructor(url) {
    this.url = url;
  }

  async #connect() {
    try {
      await mongoose.connect(this.url);
      console.log(`Successfully connected to ${this.url}`);
    } catch (err) {
      console.log(
        `Connection to ${this.url} has failed. With error code: \n${err}`
      );
    }
  }

  getConnection() {
    if (this.#connection == null) {
      this.#connect();
      this.#connection = mongoose.connection;
    }
    return this.#connection;
  }

  closeConnection() {
    this.#connection.close().then(() => {
      this.#connection = null;
    });
  }

  dropDatabase() {
    if (this.#connection !== null) {
      this.#connection.dropDatabase();
    }
  }
}

module.exports = Database;
