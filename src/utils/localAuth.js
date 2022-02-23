const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const { User } = require('../models/user');
const logger = require('./logger');

passport.use(
  new LocalStrategy(async (username, password, callback) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return callback(null, false, {
          message: 'Incorrect username or password',
        });
      }

      const isCorrectPw = bcrypt.compare(password, user.password);
      if (!isCorrectPw) {
        return callback(null, false, {
          message: 'Incorrect username or password',
        });
      }

      return callback(null, user);
    } catch (err) {
      logger.error(err);
      return callback(null, false, err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
