import React, { useEffect, useState } from 'react';

const Genres = ({ genreIds }) => {
  const [genres, setGenres] = useState([]);

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN || '';

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?language=en',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + ACCESS_TOKEN,
            },
          },
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);

  const getGenreName = (genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : '';
  };

  return (
    <div className='flex flex-wrap mb-2 justify-between'>
      {genreIds &&
        genreIds.length > 0 &&
        genreIds.map((genreId, index) => (
          <span
            key={index}
            className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
          >
            {getGenreName(genreId)}
          </span>
        ))}
    </div>
  );
};

export default Genres;
