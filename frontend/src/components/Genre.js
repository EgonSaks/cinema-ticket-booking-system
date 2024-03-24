import React, { useEffect, useState } from 'react';
import removeUnwantedGenres from '../utils/removeNonCinemaGenres';

const Genres = ({ setGenreIds }) => {
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
        const filteredGenres = removeUnwantedGenres(data.genres);

        setGenres(filteredGenres);
        setClickedGenres(Array(filteredGenres.length).fill(false));
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, [ACCESS_TOKEN]);

  const handleGenreClick = (index) => {
    setClickedGenres((prevClickedGenres) => {
      const newClickedGenres = [...prevClickedGenres];
      newClickedGenres[index] = !newClickedGenres[index];

      const updatedGenreIds = newClickedGenres
        .map((clicked, index) => (clicked ? genres[index].id : null))
        .filter((id) => id !== null);
      setGenreIds(updatedGenreIds);

      return newClickedGenres;
    });
  };

  const genreEmojis = {
    28: '💥', // Action
    12: '🏞️', // Adventure
    16: '📽️', // Animation
    35: '😂', // Comedy
    10751: '❤️', // Family
    14: '🧙‍♂️', // Fantasy
    9648: '🔍', // Mystery
    878: '🤖', // Science Fiction
    18: '🎭', // Drama
    27: '👻', // Horror
    53: '😱', // Thriller
    10402: '🎵', // Music
    36: '📜', // History
    10752: '⚔️', // War
    10749: '💑', // Romance
    80: '🔫', // Crime
  };

  return (
    <div className='flex flex-wrap m-4 justify-between'>
      {genres.map((genre, index) => (
        <span
          key={index}
          className={`inline-block ${
            clickedGenres[index] ? 'bg-red-700' : 'bg-red-500 hover:bg-red-700'
          } text-white rounded px-3 py-1 text-sm font-semibold mr-2 mb-2 cursor-pointer`}
          onClick={() => handleGenreClick(index)}
        >
          {genreEmojis[genre.id]} {genre.name}
        </span>
      ))}
    </div>
  );
};

export default Genres;
