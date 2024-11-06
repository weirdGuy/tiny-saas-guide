// src/components/Home.js
import React from 'react';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-md p-4 bg-white rounded-lg shadow-lg'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Tiny SaaS</h1>
      <p className='text-gray-500'>A simple SaaS starter template for small businesses</p>
    </div>
  );
}

export default Home;
