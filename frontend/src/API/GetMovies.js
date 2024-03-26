import FilterValidMovies from '../utils/FilterValidMovies';

async function FetchMoviesFromAPI(ACCESS_TOKEN, page, genreIds, searchText) {
  let url;

  if (searchText) {
    url = `https://api.themoviedb.org/3/search/multi?api_key=${ACCESS_TOKEN}&language=en-US&query=${encodeURIComponent(
      searchText,
    )}&page=${page}&include_adult=false`;
  } else {
    const genreIdsURL = genreIds.length > 0 ? genreIds.join(',') : '';
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${ACCESS_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIdsURL}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();

    let filteredMovies = data.results;

    if (searchText) {
      filteredMovies = FilterValidMovies(data.results);
    }

    filteredMovies = filteredMovies.filter(
      (movie) => movie.backdrop_path !== null,
    );

    return { filteredMovies, totalPages: data.total_pages };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return null;
  }
}

export default FetchMoviesFromAPI;
