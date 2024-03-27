const updateOccupiedSeats = async (BASE_URL, hallUpdate) => {
  try {
    console.log('Updating occupied seats:', hallUpdate);
    const response = await fetch(`${BASE_URL}/updateOccupiedSeats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hallUpdate }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.success;
    } else {
      throw new Error('Failed to update occupied seats');
    }
  } catch (error) {
    console.error('Error updating occupied seats:', error);
    return false;
  }
};

export default updateOccupiedSeats;
