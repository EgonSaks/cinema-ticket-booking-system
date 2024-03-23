import React, { useEffect, useState } from 'react';
import extractGenreIds from '../utils/extractGenreIds';
import Genres from './Genre'; // Import Genres component
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreIds, setGenreIds] = useState([]);

  const ACCESS_TOKE = process.env.REACT_APP_ACCESS_TOKEN || '';
  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKE}`,
        },
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${ACCESS_TOKE}&language=en-US&page=${page}`,
        options,
      );
      const data = await response.json();

      setTotalPages(data.total_pages);
      setMovies(data.results);
      console.log('Movies:', data.results);

      const genreIds = extractGenreIds(data.results);
      setGenreIds(genreIds);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='container mx-auto px-4 py-4'>
      <Genres genreIds={genreIds} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <button
          onClick={handlePrevPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer ${
            page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
