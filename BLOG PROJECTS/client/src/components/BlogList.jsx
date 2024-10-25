import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <Link to="/create">Create New Post</Link>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <Link to={`/post/${post._id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
