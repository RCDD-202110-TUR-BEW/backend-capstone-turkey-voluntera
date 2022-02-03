const express = require('express');
require('dotenv').config();
const Database = require('./db');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', authRouter);

/* app.get('/', async (req, res) => {
  res.render('/');
}); */

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPMENT_PORT
    : process.env.PRODUCTION_PORT;
const dbUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV_URL
    : process.env.DB_PRODUCTION_URL;

if (process.env.NODE_ENV !== 'test') {
  const db = new Database(dbUrl);
  db.getConnection();
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}
