import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogDetails() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/blogs/${id}`, { withCredentials: true });
                setBlog(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <div>
            {blog ? (
                <>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <p>Author: {blog.author.username}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BlogDetails;
