const mongoose = require('mongoose');

class DbConnection {
  constructor(url) {
    this.url = url;
    this.connection = null;
  }

  async connect() {
    try {
      await mongoose.connect(this.url);
      console.log(`Successfuly connected to ${this.url}`);
    } catch (err) {
      console.log(
        `Connection to ${this.url} has failed. With error code: \n${err}`
      );
    }
  }

  getConnection() {
    if (this.connection == null) {
      this.connect();
      this.connection = mongoose.connection;
    }
    return this.connection;
  }
}

module.exports = DbConnection;
