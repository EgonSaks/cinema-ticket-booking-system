import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    const searchText = event.target.value;
    setSearch(searchText);
    onSearch(searchText); 
  };

  return (
    <div className='mx-5'>
      <input
        type='text'
        placeholder='Search...'
        className='border-2 border-red-500 px-2 py-1 rounded-md h-10' 
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
