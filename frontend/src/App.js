import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
