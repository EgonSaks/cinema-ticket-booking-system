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
  const currentTime = new Date(); 
  const sessionStartTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0); 
  const sessionEndTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 0, 0, 0); 
  const sessionDuration = 195;
  const movieSessions = [];

  const seed = hallNumber * 100;

  while (sessionStartTime <= sessionEndTime) {
    const offsetMinutes = getRandomOffset(hallNumber, seed);
    const sessionTime = new Date(sessionStartTime);
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

    sessionStartTime.setMinutes(sessionStartTime.getMinutes() + sessionDuration);
  }

  return movieSessions;
}

export default MovieSessions;
