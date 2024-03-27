import React, { useState } from 'react';
import BuyTickets from '../API/BuyTickets';
import updateOccupiedSeats from '../API/UpdateOccupiedSeats';
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
  const [popupVisible, setPopupVisible] = useState(false);

  let selectedSeatText = '';
  if (selectedSeats.length > 0) {
    selectedSeatText = selectedSeats.map((seat) => seat + 1).join(', ');
  }

  let totalPrice = selectedSeats.length * movies[0].price;

  const isAnySeatSelected = selectedSeats.length > 0;

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const isAnySeatSelected = selectedSeats.length > 0;

    if (!isAnySeatSelected) {
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 2000);
    } else {
      const orderSeats = selectedSeats;
      const occupiedSeats = movies[0].occupied;
      const updatedOccupiedSeats = [...orderSeats, ...occupiedSeats];

      const order = {
        orderId: Math.floor(Math.random() * 1000000),
        customerID: Math.floor(Math.random() * 1000000),
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
        orderId: order.orderId,
        customerID: order.customerID,
        orderDate: order.orderDate,
        seat: order.seat,
        movieTitle: order.movie.title,
        movieGenres: order.movie.genres,
        movieRuntime: order.movie.runtime,
        movieLanguage: order.movie.language,
        moviePrice: order.movie.price,
      };

      console.log('Buying tickets:', myOrder);

      const hallUpdate = {
        movieId: movie.id,
        date: new Date().toISOString(),
        updatedOccupiedSeats,
      };

      const updateSuccess = await updateOccupiedSeats(BASE_URL, hallUpdate);

      if (updateSuccess) {
        const buyTickets = await BuyTickets(BASE_URL, myOrder);
        if (buyTickets) {
          console.log('Tickets bought successfully');
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
          movie={movies[0]}
          selectedSeats={selectedSeats}
          onSelectedSeatsChange={(selectedSeats) =>
            setSelectedSeats(selectedSeats)
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
            <button className='bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2 text-sm font-semibold mr-2 mb-4 mt-4 cursor-pointer'>
              Log in for discount!
            </button>
            <p className='text-xs'>Don't want discounts?</p>
            <a
              className='text-red-500 rounded px-3 text-sm mr-2 mb-2 cursor-pointer'
              onClick={handleButtonClick}
            >
              Buy without logging in at{' '}
              <span className='total font-semibold'>{totalPrice}€</span>
            </a>
          </div>
        ) : (
          <div>
            <button
              className='bg-gray-400 text-white rounded px-3 py-2 text-sm font-semibold mr-2 mb-4 mt-4 cursor-not-allowed'
              onClick={handleButtonClick}
            >
              Log in for discount
            </button>
            <p className='text-xs'>Don't want discounts?</p>
          </div>
        )}

        {popupVisible && (
          <div className='bg-red-500 text-white px-4 py-2 text-sm md:text-sm lg:text-base rounded absolute bottom-44 mb-8 mr-8'>
            Please select a seat before you could continue
          </div>
        )}
      </div>
    </div>
  );
}

export default SeatPlan;
