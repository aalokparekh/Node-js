import React, { useState } from 'react';
import axios from 'axios';

function BlogForm({ blog, setEditMode }) {
    const [formData, setFormData] = useState(blog || { title: '', content: '', tags: [] });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (blog) {
                // Update existing post
                await axios.put(`http://localhost:3000/blogs/${blog._id}`, formData, { withCredentials: true });
                alert('Blog post updated!');
            } else {
                // Create new post
                await axios.post('http://localhost:3000/blogs', formData, { withCredentials: true });
                alert('New blog post created!');
            }
        } catch (error) {
            console.error(error);
            alert('Action failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
            <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange}></textarea>
            <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} />
            <button type="submit">{blog ? 'Update' : 'Create'} Post</button>
            {blog && <button onClick={() => setEditMode(false)}>Cancel</button>}
        </form>
    );
}

export default BlogForm;
