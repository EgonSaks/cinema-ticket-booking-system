import React, { useEffect, useState } from 'react';
import FetchMoviesFromAPI from '../API/GetMovies';
import Genres from './Genre';
import MovieCard from './MovieCard';

const MovieList = ({ searchText }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreIds, setGenreIds] = useState([]);

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || '';

  useEffect(() => {
    fetchMovies();
  }, [page, genreIds, searchText]);

  const fetchMovies = async () => {
    const response = await FetchMoviesFromAPI(
      ACCESS_TOKEN,
      page,
      genreIds,
      searchText,
    );
    if (response) {
      const { filteredMovies, totalPages } = response;
      setMovies(filteredMovies);
      setTotalPages(totalPages);
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
      <Genres setGenreIds={setGenreIds} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <button
          onClick={handlePrevPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`bg-red-500 hover:bg-red-700 text-white rounded px-3 py-1 text-sm font-semibold mx-2 my-2 cursor-pointer ${
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
