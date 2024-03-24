import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY || '';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
  };

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className='container mx-auto px-4 py-8 h-[85.5vh]'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex flex-wrap justify-center items-start'>
          <div className='w-full md:w-1/2 lg:w-1/3 flex justify-center mb-8 md:mb-0'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className='w-full h-auto rounded'
            />
          </div>
          <div className='w-full md:w-1/2 lg:w-2/3 px-6 text-left'>
            <h2 className='text-3xl font-semibold'>{movie.title}</h2>
            <p className='text-gray-800 mt-2 text-justify text-sm md:text-sm lg:text-base'>
              {movie.overview}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Genres:</b>{' '}
              {movie.genres.map((genre) => genre.name).join(', ')}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Tagline:</b> {movie.tagline}
            </p>
            <p className='text-gray-800 mt-1 text-sm md:text-sm lg:text-base'>
              <b>Runtime:</b> {formatRuntime(movie.runtime)}
            </p>
            <p className='text-gray-800 mt-1 text-sm md:text-sm lg:text-base'>
              <b>Rating:</b> {movie.vote_average.toFixed(1)}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Release Date:</b> {formatDate(movie.release_date)}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Production Companies:</b>{' '}
              {movie.production_companies
                .map((company) => company.name)
                .join(', ')}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Production Countries:</b>{' '}
              {movie.production_countries
                .map((country) => country.name)
                .join(', ')}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Spoken Languages:</b>{' '}
              {movie.spoken_languages
                .map((lang) => lang.english_name)
                .join(', ')}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Budget:</b> ${movie.budget.toLocaleString()}
            </p>
            <p className='text-gray-800 mt-2 text-sm md:text-sm lg:text-base'>
              <b>Revenue:</b> ${movie.revenue.toLocaleString()}
            </p>
            <a
              className='text-blue-500 mt-2 block'
              href={movie.homepage}
              target='_blank'
              rel='noopener noreferrer'
            >
              Visit Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
