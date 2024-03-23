import React from 'react';

export default function NavBar() {
  return (
    <div>
      <div className='navbar flex justify-between container mx-auto py-4 bg-red-500 rounded'>
        <div className='mx-5'>
          <a className='text-4xl font-bold border border-red-200 bg-white rounded px-2 py-1' href='/'>
            Cinema 🍿
          </a>
        </div>
        <div className='mx-5'>
          <input
            type='text'
            placeholder='Search...'
            className='border-2 border-red-500 px-2 py-1 rounded'
          />
        </div>
      </div>
      {/* <div className="line w-full border-t"></div> */}
    </div>
  );
}
