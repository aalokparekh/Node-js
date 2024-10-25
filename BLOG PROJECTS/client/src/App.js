import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogDetails from './components/BlogDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/create" element={<BlogForm />} />
                <Route path="/edit/:id" element={<BlogForm />} />
                <Route path="/post/:id" element={<BlogDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
