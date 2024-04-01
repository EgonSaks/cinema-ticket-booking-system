async function FetchMoviesByGenre(ACCESS_TOKEN, page, genreIds) {
  const genreIdsURL = genreIds.length > 0 ? genreIds.join(',') : '';
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIdsURL}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();

    const filteredMovies = data.results.filter(
      (movie) => movie.backdrop_path !== null,
    );

    return { filteredMovies, totalPages: data.total_pages };
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return null;
  }
}

export default FetchMoviesByGenre;
