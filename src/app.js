const express = require('express');
require('dotenv').config();
const Database = require('./db');

const app = express();
const projectRoutes = require('./routes/project');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const profileRoutes = require('./routes/profile');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/project', projectRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/profile', profileRoutes);

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPMENT_PORT
    : process.env.PRODUCTION_PORT;
const dbUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV_URL
    : process.env.DB_PRODUCTION_URL;

if (process.env.NODE_ENV !== 'test') {
  console.log('logged');
  const db = new Database(dbUrl);
  db.getConnection();

  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}

module.exports = app;
