import React from 'react';
import MovieSessions from '../mockData/MovieSessions';
import FormatDate from '../utils/FormatDate';
import RecommendedSessionInfo from './RecommendedSessionInfo';

const RecommendedMovieCard = ({ movie, hallNumber }) => {
  const movieSessions = MovieSessions(movie, hallNumber);
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden flex'>
      <div className='relative w-1/2 h-72'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className='w-full h-full object-cover' 
        />
      </div>
      <div className='p-2 flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-[14px] font-semibold text-left'>{movie.title}</h3> 
        </div>
        <div className='text-left text-xs'> 
          <div>
            <div>
              <RecommendedSessionInfo movieSessions={movieSessions} movieId={movie.id} />
            </div>
          </div>
          <div>
            <span className='text-gray-500'>
              Release Date: {FormatDate(movie.release_date)}
            </span>
          </div>
          <div>
            <span className='text-gray-500'>
              Rating: {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedMovieCard;
