const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

const Database = require('./db');
const authRouter = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const swaggerDocument = require('./api-documentation.json');

const app = express();

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
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPMENT_PORT
    : process.env.PORT;
const dbUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DB_DEV_URL
    : process.env.DB_PRODUCTION_URL;

if (process.env.NODE_ENV !== 'test') {
  const db = new Database(dbUrl);
  db.getConnection();

  app.listen(port, () => {
    logger.info(`Server is listening on port: ${port}`);
  });
}
