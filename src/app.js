const express = require('express');
require('dotenv').config();
const partials = require('express-partials');
const path = require('path');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const Database = require('./db');
const authRouter = require('./routes/auth');

const app = express();
app.set('view engine', 'ejs');

const middleware = [
  partials(), // allows layouts
  express.static(path.join(__dirname, 'public')), // serve static paths in /public
  express.urlencoded({ extended: false }), // parses urlencoded forms
  methodOverride('_method'), // adds other rest http methods
  fileUpload({ createParentPath: true }), // parses file posts (uploads)
  // eslint-disable-next-line no-use-before-define
  attachUser, // adds user to each response template
];
function attachUser(req, res, next) {
  res.locals.user = req.session?.user ?? null;
  console.log(res.locals);
  next();
}
middleware.forEach((item) => {
  // in order
  app.use(item);
  console.log(item);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', authRouter);

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
