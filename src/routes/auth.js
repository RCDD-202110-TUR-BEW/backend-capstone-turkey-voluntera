const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signin', authController.generalsignin);
router.post('/signupvolunteer', authController.volunteersignup);
router.post('/signupvolunteer', authController.volunteersignup);
router.get('/signout', authController.signout);
router.get('/authenticated', authController.authenticated);

module.exports = router;
