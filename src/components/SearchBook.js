import React, { useEffect, useState } from 'react';
import BookCard from './BookCards';
import { baseUrl } from '../assets/config';
import { search_icon, user_icon } from '../assets/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css';

export default function SearchBook() {
  const [query, setQuery] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  async function getBooks(searchQuery, page) {
    try {
      const url = searchQuery
        ? `${baseUrl}?search=${searchQuery}&page=${page}`
        : `${baseUrl}?page=${page}`;
      const res = await fetch(url);
      const data = await res.json();
      if (page === 1) {
        setBooksData(data?.results);
      } else {
        setBooksData([...booksData, ...data?.results]);
      }
      setLoading(false);
      setHasMore(data?.next !== null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      setCurrentPage(1);
      setBooksData([]);
      setHasMore(true);
      setSearchQuery('');
      getBooks('', 1);
    }
  };

  const searchBooks = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    setCurrentPage(1);
    setBooksData([]);
    setHasMore(true);
    getBooks(query.toLowerCase(), 1);
  };

  useEffect(() => {
    setLoading(true);
    getBooks(query.toLowerCase(), currentPage);
  }, [currentPage]);

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
      <h6>
        {searchQuery
          ? `Searched Books : ${booksData?.length}`
          : `Number of Books :${booksData?.length}`}
      </h6>
      <InfiniteScroll
        dataLength={booksData.length}
        next={() => setCurrentPage(currentPage + 1)}
        hasMore={hasMore}
        loader={
          <h2 className='infinite-loader-container'>
            Loading more books............
          </h2>
        }
        endMessage={
          <h3 className='infinite-loader-container'>No more books to show</h3>
        }
      >
        <div className='row'>
          <>
            {booksData?.length > 0 ? (
              booksData?.map((book) => <BookCard book={book} key={book.id} />)
            ) : (
              <div className='loader-container'>
                <div className='loader'></div>
              </div>
            )}
          </>
        </div>
      </InfiniteScroll>
    </>
  );
}
