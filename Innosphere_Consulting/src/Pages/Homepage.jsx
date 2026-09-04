import React from 'react';
import Hero from '../Components/Hero';
import StatsBar from '../Components/StatsBar';
import Testimonials from '../Components/Testimonials';
import RequestCallBack from '../Components/CTABanner1';

const Homepage = () => {
  return (
    <div className="bg-[#080f1d] min-h-screen text-[#ffffff]">
      <Hero />
      <StatsBar />
      <Testimonials />
      <RequestCallBack />
    </div>
  );
};

export default Homepage;