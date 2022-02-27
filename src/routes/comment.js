const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment');
const postController = require('../controllers/comment');

router.post('/:id', postController.addComment);
router.get('/:postid/:commentid', commentController.getOneComment);
router.delete('/:postid/:commentid', commentController.removeComment);
module.exports = router;
