import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import Search from '../components/Search';
import { logout } from '../utils/Auth';

function NavBar({ user, onSearch, onLogin, onLogout }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div>
      <div className='navbar flex flex-col lg:flex-row container mx-auto py-4 bg-red-500 rounded relative z-10'>
        <div className='mx-5 mb-2 lg:mb-0'>
          <a
            className='text-4xl font-bold border border-red-200 bg-white rounded px-2 py-1'
            href='/'
          >
            Cinema 🍿
          </a>
        </div>
        <div className='flex-grow lg:flex lg:justify-end items-center'>
          <Search onSearch={onSearch} />
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center mr-5'>
          <div className='lg:flex lg:justify-center min-[200px]:space-x-8 sm:space-x-8 lg:space-x-4'>
            {user ? (
              <button
                className={`bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold cursor-pointer h-9`}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className={`bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold cursor-pointer h-9`}
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </button>
                <button
                  className={`bg-white text-red-500 hover:text-white hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold cursor-pointer h-9`}
                  onClick={() => setShowRegistrationForm(true)}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {(showLoginForm || showRegistrationForm) && (
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg popup'>
            {showLoginForm && (
              <LoginForm
                onClose={() => setShowLoginForm(false)}
                onLogin={onLogin}
              />
            )}
            {showRegistrationForm && (
              <RegistrationForm
                onClose={() => setShowRegistrationForm(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
