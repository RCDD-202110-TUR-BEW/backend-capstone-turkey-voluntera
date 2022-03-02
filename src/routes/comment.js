const express = require('express');
const { checkAuthentication } = require('../middlewares/checkAuth');

const router = express.Router();

const commentController = require('../controllers/comment');
const postController = require('../controllers/comment');

router.post('/:id', checkAuthentication, postController.addComment);
router.get('/:commentid', commentController.getOneComment);
router.delete(
  '/:commentid',
  checkAuthentication,
  commentController.removeComment
);
module.exports = router;
