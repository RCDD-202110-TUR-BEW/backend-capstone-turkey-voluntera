const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const { User } = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT,
      clientSecret: process.env.GAPP_SECRET,
      callbackURL: process.env.GAPP_CALLBACK_URL,
      scope: ['profile', 'email', 'openid'],
    },
    async (_, profile, cb) => {
      /* 
    Check if a user with googleId or email exists. 
    Create user if there is no user associated with credentials 
    */
      try {
        const usr = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
        });
        if (!usr) {
          const newUser = {
            email: profile.emails[0].value,
            googleId: profile.id,
          };
          const createdUser = await User.create(newUser);
          return cb(null, createdUser);
        }
        return cb(null, usr);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
