import React, { useEffect, useState } from 'react';

const Genres = ({ genreIds }) => {
  const [genres, setGenres] = useState([]);
  const [clickedGenres, setClickedGenres] = useState([]);

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
        setClickedGenres(Array(data.genres.length).fill(false));
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

  const handleGenreClick = (index) => {
    setClickedGenres((prevClickedGenres) => {
      const newClickedGenres = [...prevClickedGenres];
      newClickedGenres[index] = !newClickedGenres[index];
      return newClickedGenres;
    });
  };

  return (
    <div className='flex flex-wrap mb-2 justify-between'>
      {genreIds &&
        genreIds.length > 0 &&
        genreIds.map((genreId, index) => (
          <span
            key={index}
            className={`inline-block ${
              clickedGenres[index]
                ? 'bg-red-700'
                : 'bg-red-500 hover:bg-red-700'
            } text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer`}
            onClick={() => handleGenreClick(index)}
          >
            {getGenreName(genreId)}
          </span>
        ))}
    </div>
  );
};

export default Genres;
