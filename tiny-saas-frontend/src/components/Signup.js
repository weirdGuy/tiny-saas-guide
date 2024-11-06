// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function Signup() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.API_ENDPOINT}/auth/signup`, inputs);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error during signup');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-full max-w-md p-4 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4'>Signup</h2>
      <input type="email" name="email" placeholder="Email" required onChange={handleChange}  className='w-full p-2 border-2 border-gray-300 rounded-lg mb-2' />
      <input type="password" name="password" placeholder="Password" required onChange={handleChange} className='w-full p-2 border-2 border-gray-300 rounded-lg mb-2' />
      <button type="submit" className='w-full p-2 bg-blue-500 text-white rounded-lg'>Signup</button>
    </form>
  );
}

export default Signup;
