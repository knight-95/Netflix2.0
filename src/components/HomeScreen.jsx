import React from 'react'
import Banner from './Banner';
import './HomeScreen.css';
import Navbar from './Navbar';

const HomeScreen = () => {
  return (
    <div className='homescreen'>
        <Navbar/>
        <Banner/>
        
    </div>
  )
}

export default HomeScreen