const express = require('express');
const checkAuthentication = require('../middlewares/checkAuth');

const router = express.Router();

const profileController = require('../controllers/profile');

router.put('/:id', checkAuthentication, profileController.updateProfile);
router.delete('/:id', checkAuthentication, profileController.removePost);
module.exports = router;
