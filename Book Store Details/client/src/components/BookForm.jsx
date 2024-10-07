import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '', author: '', price: '', description: '', isbn: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/books/${id}`)
        .then(response => setBook(response.data))
        .catch(error => console.error('Error fetching book:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id ? `http://localhost:5000/books/${id}` : 'http://localhost:5000/books';
    const method = id ? 'put' : 'post';

    axios[method](url, book)
      .then(() => navigate('/'))
      .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" />
      <input type="number" name="price" value={book.price} onChange={handleChange} placeholder="Price" />
      <input type="text" name="description" value={book.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="isbn" value={book.isbn} onChange={handleChange} placeholder="ISBN" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default BookForm;
