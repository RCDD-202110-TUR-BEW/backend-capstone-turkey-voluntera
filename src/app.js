const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const Database = require('./db');
const authRouter = require('./routes/auth');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 3600 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);

module.exports = app;
app.get('/', (req, res) => {
  res.render('main');
});
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
