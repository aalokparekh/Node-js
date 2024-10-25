import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { title, author, content, tags: tags.split(',') };
        await axios.post('http://localhost:5000/posts', newPost);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BlogForm;
