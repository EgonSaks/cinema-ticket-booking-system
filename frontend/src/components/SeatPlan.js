import React, { useState } from 'react';
import SeatSelector from './SeatSelector';
import SeatShowcase from './SeatShowcase';

const movies = [
  {
    title: '',
    price: 10,
    occupied: [1, 2, 4, 20, 25, 63],
  },
];

function SeatPlan() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  let selectedSeatText = '';
  if (selectedSeats.length > 0) {
    selectedSeatText = selectedSeats.map((seat) => seat + 1).join(', ');
  }

  let totalPrice = selectedSeats.length * movies[0].price; 

  const isAnySeatSelected = selectedSeats.length > 0;

  const handleButtonClick = () => {
    if (!isAnySeatSelected) {
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 2000);
    } else {
      // Add logic to handle the button click when seats are selected
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
          <>
            <button className='bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2 text-sm font-semibold mr-2 mb-4 mt-4 cursor-pointer'>
              Log in for discount!
            </button>
            <p className='text-xs'>Don't want discounts?</p>
            <a
              href='#'
              className='text-red-500 rounded px-3 text-sm mr-2 mb-2 cursor-pointer'
            >
              Buy without logging in at{' '}
              <span className='total font-semibold'>{totalPrice}€</span>
            </a>
          </>
        ) : (
          <>
            <button
              className='bg-gray-400 text-white rounded px-3 py-2 text-sm font-semibold mr-2 mb-4 mt-4 cursor-not-allowed'
              onClick={handleButtonClick}
            >
              Log in for discount
            </button>
            <p className='text-xs'>Don't want discounts?</p>
          </>
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
