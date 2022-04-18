const express = require('express');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const initializeCronTasks = require('./utils/cron');
const Database = require('./db');
const authRouter = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const swaggerDocument = require('./api-documentation.json');
const projectRoutes = require('./routes/project');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const profileRoutes = require('./routes/profile');
const myprofileRoutes = require('./routes/myprofile');

const app = express();
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
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
app.use('/api/projects', projectRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/myprofile', myprofileRoutes);
app.use('/auth', authRouter);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.render('main');
});
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

  initializeCronTasks();
}

module.exports = app;
