function generateRandomOccupiedSeats(minCount, maxCount, maxSeat) {
  const count =
    Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  const occupiedSeats = [];
  while (occupiedSeats.length < count) {
    const seat = Math.floor(Math.random() * maxSeat) + 1;
    if (!occupiedSeats.includes(seat)) {
      occupiedSeats.push(seat);
    }
  }
  return occupiedSeats;
}

export default generateRandomOccupiedSeats;
