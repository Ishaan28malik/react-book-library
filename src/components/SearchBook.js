import React, { useEffect, useState } from 'react';
import BookCard from './BookCards';
import { baseUrl } from '../assets/config';
import { search_icon, user_icon } from '../assets/data';
import './style.css';

export default function SearchBook() {
  const [query, setQuery] = useState('');
  const [booksData, setBooksData] = useState([]);

  async function getBooks() {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      setBooksData(data?.results);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    if (e.target.value === '') getBooks();
  };

  const searchBooks = (e) => {
    e.preventDefault();
    const filteredData = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.authors.some((author) =>
          author.name.toLowerCase().includes(query.toLowerCase())
        )
    );
    setBooksData(filteredData);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <form className='form' onSubmit={searchBooks}>
        <div className='searchBar'>
          <div className='searchBar-div'>
            <label className='label' htmlFor='query'>
              {'Book Library:'}
            </label>
            <div className='searchBox'>
              <input
                className='input'
                type='text'
                name='query'
                placeholder='Search'
                value={query}
                onChange={handleSearchInput}
              />
              <span className='input-search-icon'>
                <img
                  src={search_icon}
                  className='search-icon-img'
                  alt='search-icon'
                />
              </span>
            </div>
            <button className='button-search'>Search</button>
          </div>
          <div className='user-div'>
            <div className='user-icon'>
              <img src={user_icon} className='user-icon-img' alt='user-icon' />
            </div>
            <span className='user-name'>{'username'}</span>
          </div>
        </div>
      </form>
      <div className='row'>
        {booksData.length > 0 ? (
          booksData.map((book) => <BookCard book={book} key={book.id} />)
        ) : (
          <div className='loader-container'>
            <div className='loader'></div>
          </div>
        )}
      </div>
    </>
  );
}
