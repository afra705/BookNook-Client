import React from 'react';
import Navbar from './shared/Navbar';
import Banner from './home/Banner';
import NewArrivalsPage from './home/NewArrivalsCard';

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <NewArrivalsPage/>
    </div>
  );
};

export default HomePage;