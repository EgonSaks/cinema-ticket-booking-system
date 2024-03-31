import React, { useState } from 'react';
import Login from '../API/Login';

function LoginForm({ onClose }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Login(BASE_URL, formData.email, formData.password);
      setFormData({
        email: '',
        password: '',
      });
      onClose();
    } catch (error) {
      console.error(error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div className='container mx-auto mt-5'>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm  mb-2'
          ></label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email Address'
            value={formData.email}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-gray-700 text-sm  mb-2'
          ></label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='text-center'>
          <button
            type='submit'
            className='bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
