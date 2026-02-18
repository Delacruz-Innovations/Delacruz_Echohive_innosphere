import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-yellow-500 rounded-full opacity-20 blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-600 rounded-full opacity-10 blur-lg animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-yellow-600 rounded-full opacity-10 blur-lg animate-bounce delay-500"></div>
      </div>

      <div className="text-center relative z-10 mt-16 max-w-2xl">
        {/* 404 Number */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4 md:space-x-8">
            <span className="text-8xl md:text-9xl font-bold text-blue-500 animate-bounce">4</span>
            <span className="text-8xl md:text-9xl font-bold text-yellow-500 animate-bounce delay-200">0</span>
            <span className="text-8xl md:text-9xl font-bold text-blue-500 animate-bounce delay-400">4</span>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Countdown Section */}
        <div className="mb-8">
          <p className="text-gray-400 mb-2">
            Redirecting to homepage in{' '}
            <span className="text-yellow-500 font-bold text-xl">{countdown}</span>{' '}
            seconds
          </p>
          <div className="w-64 md:w-80 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Go Home Now
          </button>
          <button
            onClick={handleGoBack}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
          >
            Go Back
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 border border-gray-700 rounded-lg bg-gray-900/50 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">
            If you believe this is an error, please check the URL or contact support.
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 2 === 0 ? 'bg-blue-400' : 'bg-yellow-400'
            } opacity-30 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;