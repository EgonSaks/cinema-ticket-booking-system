import React from 'react';
import { Link } from 'react-router-dom'; 

const MovieCard = ({ movie }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <Link
      to={{ pathname: `/movie/${movie.id}`, state: { movie } }}
      className='bg-white shadow-md rounded-lg overflow-hidden flex'
    >
      <div className='relative w-1/2'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='p-4 flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-2xl font-semibold text-left'>{movie.title}</h3>
        </div>
        <div className='text-left text-sm'>
          <div>
            <span className='text-gray-500'>
              Release Date: {formatDate(movie.release_date)}
            </span>
          </div>
          <div>
            <span className='text-gray-500'>
              Rating: {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
