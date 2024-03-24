import React from 'react';
import MovieList from '../components/MovieList';

function Home({ searchText }) {
  return (
    <div>
      <MovieList searchText={searchText} />
    </div>
  );
}

export default Home;
