const GoogleStrategy = require('passport-google-oidc');
const { User, Volunteer } = require('../models/user');

const googleStr = new GoogleStrategy(
  {
    clientID: process.env.GAPP_CLIENT,
    clientSecret: process.env.GAPP_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
    scope: ['profile', 'email', 'openid'],
  },
  async (_, profile, cb) => {
    /* 
    Check if a user with googleId or email exists. 
    Create user if there is no user associated with credentials 
    */
    User.findOne(
      {
        $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
      },
      (err, user) => {
        if (err) return cb(err);

        if (!user) {
          const newUser = {
            email: profile.emails[0].value,
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastname: profile.name.familyName,
          };
          const createdUser = Volunteer.create(newUser);
          return cb(null, createdUser);
        }

        return cb(null, user);
      }
    );
  }
);

module.exports = googleStr;
