const express = require('express');
const { checkAuthentication } = require('../middlewares/checkAuth');

const router = express.Router();

const postController = require('../controllers/post');

router.get('/', postController.getAllPosts);
router.post('/', checkAuthentication, postController.addPost);
router.get('/filter', postController.filterPosts);
router.get('/:id', postController.getOnePost);
router.put('/:id', checkAuthentication, postController.updatePost);
router.delete('/:id', checkAuthentication, postController.removePost);
router.post('/:id/likes', checkAuthentication, postController.updateLikes);
module.exports = router;
