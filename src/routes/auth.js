const express = require('express');
const passportGoogle = require('../utils/google');
const passportLocal = require('../utils/localAuth');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.get(
  '/google',
  passportGoogle.authenticate('google', {
    scope: ['profile', 'email', 'openid'],
  })
);

router.get(
  '/google/callback',
  passportGoogle.authenticate('google', {
    failureRedirect: '/',
    failureMessage: true,
  }),
  authControllers.callback
);

router.post(
  '/signin',
  passportLocal.authenticate('local', {
    failureRedirect: '/auth/signin',
    failureMessage: true,
  }),
  authControllers.callback
);

router.post('/signup/volunteer', authControllers.volunteerSignup);
router.post('/signup/organization', authControllers.organizationSignup);
router.get('/signout', authControllers.signout);

module.exports = router;
