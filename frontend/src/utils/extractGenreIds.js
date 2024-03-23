const extractGenreIds = (moviesData) => {
  const allGenreIds = moviesData.flatMap((movie) => movie.genre_ids);
  return [...new Set(allGenreIds)];
 
};

export default extractGenreIds;
