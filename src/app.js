const express = require('express');
require('dotenv').config();
const Database = require('./db');

const app = express();
const projectRoutes = require('./routes/project');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/project', projectRoutes);

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPMENT_PORT
    : process.env.PRODUCTION_PORT;
const dbUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV_URL
    : process.env.DB_PRODUCTION_URL;

const db = new Database(dbUrl);
db.getConnection();

const server = app.listen(port, () => {
  console.log(`Server is listening on port: 3000`);
});

module.exports = { server, db };
