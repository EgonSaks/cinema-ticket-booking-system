import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

function App() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (searchQuery) => {
    setSearchText(searchQuery);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar onSearch={handleSearch} />
        <Routes>
          <Route path='/' element={<Home searchText={searchText} />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
