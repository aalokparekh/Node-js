import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/blogs', { withCredentials: true });
                setBlogs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            <h2>All Blog Posts</h2>
            {blogs.map((blog) => (
                <div key={blog._id}>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <p>By: {blog.author.username}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
