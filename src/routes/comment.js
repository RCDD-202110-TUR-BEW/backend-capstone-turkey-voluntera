const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment');
const postController = require('../controllers/comment');

router.post('/:id', postController.addComment);
router.get('/:commentid', commentController.getOneComment);
router.delete('/:commentid', commentController.removeComment);
module.exports = router;
