const express = require('express');
const blogController = require('../controllers/blogController');
const { checkRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Anyone logged in can create, read, update, or delete posts (with restrictions)
router.post('/', blogController.createPost);
router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);
router.put('/:id', blogController.updatePost);
router.delete('/:id', blogController.deletePost);

// Only admins can delete any post, whereas regular users can only delete their own posts
router.delete('/:id', checkRole('admin'), blogController.deletePost);

module.exports = router;
