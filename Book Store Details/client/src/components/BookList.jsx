import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div>
      <h2>Book List</h2>
      <Link to="/add-book">Add Book</Link>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Link to={`/book/${book._id}`}>{book.title}</Link>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
            <Link to={`/edit-book/${book._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
