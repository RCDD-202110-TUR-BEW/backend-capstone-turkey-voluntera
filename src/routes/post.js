const express = require('express');

const router = express.Router();

const postController = require('../controllers/post');

router.get('/', postController.getAllPosts);
router.post('/add', postController.addPost);
router.get('/filter', postController.filterPosts);
router.get('/:id', postController.getOnePost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.removePost);
router.post('/like/:id', postController.updateLikes);
module.exports = router;
