function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomOffset(hallNumber, seed) {
  const offsets = [
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
    [0, 15, 45],
  ];

  if (offsets[hallNumber]) {
    const options = offsets[hallNumber];
    return options[Math.floor(seededRandom(seed) * options.length)];
  } else {
    return 0;
  }
}

function MovieSessions(movie, hallNumber) {
  const language = '🔊 ' + movie.original_language.toUpperCase();
  const sessionStartTime = new Date('2024-01-01T09:00');
  const sessionEndTime = new Date('2024-01-02T00:00');
  const sessionDuration = 195;
  const movieSessions = [];

  let currentTime = new Date(sessionStartTime);

  const seed = hallNumber * 100;

  while (currentTime <= sessionEndTime) {
    const offsetMinutes = getRandomOffset(hallNumber, seed);
    const sessionTime = new Date(currentTime);
    sessionTime.setMinutes(sessionTime.getMinutes() + offsetMinutes);

    if (sessionTime <= sessionEndTime) {
      movieSessions.push({
        time: sessionTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        language,
      });
    }

    currentTime.setMinutes(currentTime.getMinutes() + sessionDuration);
  }

  return movieSessions;
}

export default MovieSessions;
