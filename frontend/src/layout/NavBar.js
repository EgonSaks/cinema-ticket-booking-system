import React from 'react';
import Search from '../components/Search';

function NavBar({ onSearch }) {
  return (
    <div>
      <div className='navbar flex flex-col lg:flex-row justify-between container mx-auto py-4 bg-red-500 rounded'>
        <div className='mx-5 mb-2 lg:mb-0'>
          <a
            className='text-4xl font-bold border border-red-200 bg-white rounded px-2 py-1'
            href='/'
          >
            Cinema 🍿
          </a>
        </div>
        <Search onSearch={onSearch} />
      </div>
    </div>
  );
}

export default NavBar;
