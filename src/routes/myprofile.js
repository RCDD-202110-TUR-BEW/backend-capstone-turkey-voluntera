const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile');

router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.removePost);
module.exports = router;
