import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>by {post.author}</p>
                    <p>{post.content}</p>
                    <p>Tags: {post.tags.join(', ')}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BlogDetails;
