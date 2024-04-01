async function GetRecommendedMovies(userId) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/order/${userId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (response.status === 404) {
      console.log('User not found');
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default GetRecommendedMovies;
