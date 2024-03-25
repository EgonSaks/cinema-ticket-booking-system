import React from 'react';
import Search from '../components/Search';

function NavBar({ onSearch }) {
  return (
    <div>
      <div className='navbar flex flex-col lg:flex-row container mx-auto py-4 bg-red-500 rounded'>
        <div className='mx-5 mb-2 lg:mb-0'>
          <a
            className='text-4xl font-bold border border-red-200 bg-white rounded px-2 py-1'
            href='/'
          >
            Cinema 🍿
          </a>
        </div>
        <div className="flex-grow lg:flex lg:justify-end items-center">
          <Search onSearch={onSearch} />
          <button className={`bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold mr-5 cursor-pointer h-9`} >
            My Cinema
          </button>

        </div>
      </div>
    </div>
  );
}

export default NavBar;
