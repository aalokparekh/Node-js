const Blog = require('../models/blog');

// Get All Posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Blog.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create New Post
exports.createPost = async (req, res) => {
    const { title, author, content, tags } = req.body;
    const newPost = new Blog({ title, author, content, tags });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Post by ID
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Post by ID
exports.deletePost = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
