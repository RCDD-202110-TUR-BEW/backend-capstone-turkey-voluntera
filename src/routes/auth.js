const express = require('express');
const passport = require('passport');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.get(
  '/signin',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    failureMessage: true,
  }),
  authControllers.callback
);

module.exports = router;
