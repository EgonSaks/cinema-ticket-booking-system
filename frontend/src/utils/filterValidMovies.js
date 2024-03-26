const FilterValidMovies = (movies) => {
  return movies.filter((movie) => {
    return (
      movie.media_type === 'movie' &&
      movie.backdrop_path !== null &&
      movie.belongs_to_collection !== null &&
      movie.poster_path !== null &&
      movie.release_date !== ''
    );
  });
};

export default FilterValidMovies;
