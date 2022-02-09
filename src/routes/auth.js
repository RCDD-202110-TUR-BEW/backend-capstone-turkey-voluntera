const express = require('express');
const passportGoogle = require('../utils/google');
const authControllers = require('../controllers/auth');

const router = express.Router();

router.get(
  '/signin',
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

router.get('/signout', authControllers.signout);

module.exports = router;
