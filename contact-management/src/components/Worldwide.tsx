import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import "./worldwide.css";

const Worldwide = () => {  
  const query = useQuery({ queryKey: ['globaldata'], queryFn: async ()=> {
    const result = await axios('https://disease.sh/v3/covid-19/all');
    return result.data;
  } });

  return (
    <div className=' cases text-xl font-semibold text-black flex flex-row justify-evenly mt-8 mb-5 flex-wrap'>
      <div className='border-2 border-yellow-700 bg-yellow-300 rounded-lg p-3 mb-2'>Cases: {query.data?.cases}</div>
      <div className='border-2 border-yellow-700 bg-yellow-300 rounded-lg p-3 mb-2'>Death: {query.data?.deaths}</div>
      <div className='border-2 border-yellow-700 bg-yellow-300 rounded-lg p-3 mb-2'>Recovered: {query.data?.recovered}</div>
      <div className='border-2 border-yellow-700 bg-yellow-300 rounded-lg p-3 mb-2'>Active: {query.data?.active}</div>
    </div>
  );
};

export default Worldwide;