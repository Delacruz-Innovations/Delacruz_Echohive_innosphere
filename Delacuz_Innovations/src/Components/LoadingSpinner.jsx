import React from 'react';
import Logo from '../assets/Images/logo.png';

const LoadingSpinner = () => (
  <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-black">
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500 motion-reduce:animate-none" />
      <img src={Logo} alt="Delacruz Innovations" className="h-10 w-10 animate-pulse object-contain motion-reduce:animate-none" />
    </div>
  </div>
);

export default LoadingSpinner;
