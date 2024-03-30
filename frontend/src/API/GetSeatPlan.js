async function GetSeatPlan(movieId, movieSession = {}) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/movie/${movieId}/${movieSession.time}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      },
    );

    if (response.status === 404) {
      console.log('Pre-saved seat plan not found');
      return null;
    }

    const data = await response.json();
    console.log('Seat plan:', data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default GetSeatPlan;
