const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile');

router.get('/filter', profileController.filterProfiles);
router.get('/:id', profileController.getOneProfile);
module.exports = router;
