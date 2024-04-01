import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyTickets from '../API/BuyTickets';
import getSeatPlan from '../API/GetSeatPlan';
import updateSeatsInHall from '../API/UpdateSeatsInHall';
import generateRandomOccupiedSeats from '../utils/GenerateRandomOccupiedSeats';
import SeatSelector from './SeatSelector';
import SeatShowcase from './SeatShowcase';

const movies = [
  {
    title: '',
    price: 10,
    occupied: generateRandomOccupiedSeats(1, 64, 64),
  },
];

function SeatPlan({ movie }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [recommendedSeat, setRecommendedSeat] = useState(null);
  const navigate = useNavigate();
  const [movieSession, setMovieSession] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const [seatPlan, setSeatPlan] = useState(null);

  useEffect(() => {
    const storedMovieSession = JSON.parse(localStorage.getItem('movieSession'));
    if (storedMovieSession) {
      setMovieSession(storedMovieSession);
    }
  }, []);

  useEffect(() => {
    const fetchSeatPlan = async () => {
      try {
        if (movieSession && movieSession.time) {
          const data = await getSeatPlan(movie.id, movieSession);
          setSeatPlan(data);
        }
      } catch (error) {
        console.error('Error fetching seat plan:', error);
      }
    };

    if (movieSession) {
      fetchSeatPlan();
    }
  }, [movie.id, movieSession]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserName(storedUser.userName);
      setUserId(storedUser.userId);
    }
  }, []);

  const occupiedSeats =
    seatPlan && seatPlan.length > 0 ? seatPlan : movies[0].occupied;

  const availableSeats = [27, 28, 29, 30, 35, 36, 37, 38, 43, 44, 45, 46];

  const filteredAvailableSeats = availableSeats.filter(
    (seat) => !occupiedSeats.includes(seat),
  );

  useEffect(() => {
    let recommended = null;
    for (let i = 0; i < filteredAvailableSeats.length; i++) {
      const seat = filteredAvailableSeats[i];
      if (!occupiedSeats.includes(seat)) {
        recommended = seat;
        break;
      }
    }
    setRecommendedSeat(recommended);
  }, [filteredAvailableSeats, occupiedSeats]);

  let selectedSeatText = '';
  if (selectedSeats.length > 0) {
    selectedSeatText = selectedSeats.map((seat) => seat + 1).join(', ');
  }

  let totalPrice = selectedSeats.length * movies[0].price;

  const isAnySeatSelected = selectedSeats.length > 0;

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const isAnySeatSelected = selectedSeats.length > 0;

    if (isAnySeatSelected) {
      const orderSeats = selectedSeats;
      const updatedOccupiedSeats = [...orderSeats, ...occupiedSeats];

      const order = {
        customerId: userId || Math.floor(Math.random() * 1000000),
        userName: userName || '',
        orderDate: new Date().toISOString(),
        seats: [...orderSeats, ...occupiedSeats],
        seat: orderSeats,
        movie: {
          id: movie.id,
          title: movie.title,
          genres: movie.genres.map((genre) => genre.name).join(', '),
          runtime: movie.runtime,
          language: movie.original_language,
          price: movies[0].price,
        },
      };

      const myOrder = {
        customerId: order.customerId,
        orderDate: order.orderDate,
        movieId: order.movie.id,
        movieTitle: order.movie.title,
        movieGenres: order.movie.genres,
        movieRuntime: order.movie.runtime,
        movieLanguage: order.movie.language,
        moviePrice: order.movie.price,
        seat: order.seat,
        userName: order.userName,
      };

      const hallUpdate = {
        movieId: movie.id,
        movieSession: movieSession.time,
        orderTime: order.orderDate,
        updatedSeats: updatedOccupiedSeats,
      };

      const updateSuccess = await updateSeatsInHall(BASE_URL, hallUpdate);

      if (updateSuccess) {
        const buyTickets = await BuyTickets(BASE_URL, myOrder);
        if (buyTickets) {
          setSuccessPopupVisible(true);
          setTimeout(() => {
            setSuccessPopupVisible(false);
            navigate('/');
          }, 2000);
        }
      } else {
        console.error('Failed to update occupied seats in the database');
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full md:w-1/2 lg:w-2/3 px-6'>
        <h2 className='mb-8 text-2xl font-semibold text-center'>
          Choose your seats by clicking on the available seats
        </h2>
      </div>

      <div className='CinemaPlan'>
        <SeatSelector
          movie={{ ...movies[0], occupied: occupiedSeats }}
          selectedSeats={selectedSeats}
          recommendedSeat={recommendedSeat}
          onSelectedSeatsChange={(selectedSeats) =>
            setSelectedSeats(selectedSeats)
          }
          onRecommendedSeatChange={(recommendedSeat) =>
            setRecommendedSeat(recommendedSeat)
          }
        />
        <SeatShowcase />

        <p className='info mb-2 text-sm md:text-sm lg:text-base'>
          You have selected{' '}
          <span className='count font-semibold'>{selectedSeats.length}</span>{' '}
          seat{selectedSeats.length !== 1 ? 's' : ''}
          {selectedSeats.length === 0 ? '' : ':'}{' '}
          {selectedSeatText ? (
            <span className='selected-seats font-semibold'>
              {' '}
              {selectedSeatText}
            </span>
          ) : (
            <span></span>
          )}{' '}
          {selectedSeats.length > 0 && (
            <>
              for the price of{' '}
              <span className='total font-semibold'>{totalPrice}€</span>
            </>
          )}
        </p>

        {isAnySeatSelected ? (
          <div>
            <button
              className='bg-green-500 hover:bg-green-700 text-white rounded px-3 py-2 text-sm font-semibold cursor-pointer'
              onClick={handleButtonClick}
            >
              Buy at <span className='total font-semibold'>{totalPrice}€</span>
            </button>
          </div>
        ) : (
          <div>
            <p className='info text-sm md:text-sm lg:text-base'>
              Please select a seat
            </p>
          </div>
        )}

        {successPopupVisible && (
          <div className='bg-green-500 text-white px-4 py-2 text-sm md:text-sm lg:text-base rounded absolute bottom-1/2 mb-8 mr-8 flex justify-center'>
            Order Successful
          </div>
        )}
      </div>
    </div>
  );
}

export default SeatPlan;
