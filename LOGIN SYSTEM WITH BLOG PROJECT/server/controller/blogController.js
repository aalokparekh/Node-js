const Blog = require('../models/blog');

// Create a new blog post
exports.createPost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const blog = await Blog.create({ title, author: req.user.id, content, tags });
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all blog posts
exports.getAllPosts = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single blog post by ID
exports.getPostById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username');
        if (!blog) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a blog post
exports.updatePost = async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Post not found' });

        // Allow only admins or the owner to update
        if (req.user.role === 'admin' || blog.author.equals(req.user.id)) {
            blog.title = title || blog.title;
            blog.content = content || blog.content;
            blog.tags = tags || blog.tags;
            await blog.save();
            res.status(200).json(blog);
        } else {
            res.status(403).json({ message: 'Not authorized to update this post' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Post not found' });

        // Allow only admins or the owner to delete
        if (req.user.role === 'admin' || blog.author.equals(req.user.id)) {
            await blog.remove();
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(403).json({ message: 'Not authorized to delete this post' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
