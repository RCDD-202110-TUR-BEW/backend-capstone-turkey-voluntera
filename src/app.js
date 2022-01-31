const express = require('express');
const Database = require('./db');

const app = express();
const devPort = process.env.PORT;
const prodPort = process.env.PRODUCTION_PORT;

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  const db = new Database(process.env.DB_DEV_URL);
  db.connect();

  app.listen(devPort, () => {
    console.log(`Server is listening on port: ${devPort}`);
  });
}

if (process.env.NODE_ENV === 'production') {
  const db = new Database(process.env.DB_PRODUCTION_URL);
  db.connect();

  app.listen(prodPort, () => {
    console.log(`Server is listening on port: ${prodPort}`);
  });
}
