async function updateOccupiedSeatsInHall(BASE_URL, hallUpdate) {
  const url = `${BASE_URL}/movie/${hallUpdate.movieId}/${hallUpdate.movieSession}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hallUpdate),
    });

    if (!response.ok) {
      throw new Error('Failed to update occupied seats in the cinema hall');
    }

    return true;
  } catch (error) {
    console.error('Error updating occupied seats:', error);
    return false;
  }
}

export default updateOccupiedSeatsInHall;
