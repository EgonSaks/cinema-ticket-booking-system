const removeUnwantedGenres = (genres) => {
  return genres.filter(
    (genre) =>
      genre.name !== 'Documentary' &&
      genre.name !== 'TV Movie' &&
      genre.name !== 'Western',
  );
};

export default removeUnwantedGenres;
