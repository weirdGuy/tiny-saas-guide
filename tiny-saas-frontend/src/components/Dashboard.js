// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${config.API_ENDPOINT}/dashboard`, {
          headers: { token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert('Please login to access this page');
        window.location = '/login';
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-2xl font-bold mb-4'>Dashboard</h2>
      {user ? (
        <div className='flex flex-col items-center justify-center w-full max-w-md p-4 bg-white rounded-lg shadow-lg'>
          <p className='text-center mb-4'>Welcome, <b>{user.email}</b></p>
          <button onClick={handleLogout} className='w-full p-2 bg-blue-500 text-white rounded-lg'>Logout</button>
        </div>
      ) : (
        <p className='text-center'>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
