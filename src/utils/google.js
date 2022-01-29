const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GAPP_CLIENT,
      clientSecret: process.env.GAPP_SECRET,
      callBackUrl: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email', 'openid'],
    },
    (accessToken, refreshToken, profile, cb) => {}
  )
);
