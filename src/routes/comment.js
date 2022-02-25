const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment');
const postController = require('../controllers/comment');

router.post('/:id', postController.addComment);
router.get('/:postid', commentController.getOneComment);
router.delete('/:postid', commentController.removeComment);
module.exports = router;
