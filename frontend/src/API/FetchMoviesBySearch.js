import FilterValidMovies from '../utils/FilterValidMovies';
async function FetchMoviesBySearch(ACCESS_TOKEN, page, searchText) {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${ACCESS_TOKEN}&language=en-US&query=${encodeURIComponent(
    searchText,
  )}&page=${page}&include_adult=false`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();

    const filteredMovies = FilterValidMovies(data.results).filter(
      (movie) => movie.backdrop_path !== null,
    );

    return { filteredMovies, totalPages: data.total_pages };
  } catch (error) {
    console.error('Error fetching movies by search:', error);
    return null;
  }
}

export default FetchMoviesBySearch;
