import React, { useState, useEffect } from 'react';
import { Home, ArrowRight, AlertCircle } from 'lucide-react';

const Notfound = () => {
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible(true);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Redirect to homepage
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-6 overflow-hidden relative py-20">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"
          style={{
            filter: 'blur(120px)',
            opacity: 0.15,
            animation: 'float 8s ease-in-out infinite'
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-purple-500 to-pink-600"
          style={{
            filter: 'blur(100px)',
            opacity: 0.15,
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Number with Animation */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
          }`}
        >
          <div className="relative inline-block mb-8">
            <h1 className="text-[150px] md:text-[250px] lg:text-[300px] font-bold leading-none bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 blur-2xl opacity-30 pointer-events-none">
              <h1 className="text-[150px] md:text-[250px] lg:text-[300px] font-bold leading-none text-cyan-400">
                404
              </h1>
            </div>
          </div>
        </div>

        {/* Alert Icon with Animation */}
        <div 
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-full mb-6 animate-pulse">
            <AlertCircle className="w-10 h-10 text-cyan-400" />
          </div>
        </div>

        {/* Title and Description */}
        <div 
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Page <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Not Found</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, we'll guide you back home.
          </p>
        </div>

        {/* Countdown Timer */}
        <div 
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-xl">{countdown}</span>
            </div>
            <span className="text-gray-300 text-sm md:text-base">
              Redirecting to homepage in <span className="text-cyan-400 font-bold">{countdown}</span> seconds...
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div 
          className={`transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <button
            onClick={handleGoHome}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Additional Helpful Links */}
        <div 
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="/service" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Our Solutions
            </a>
            <a 
              href="/about" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              About Us
            </a>
            <a 
              href="/contact" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Contact
            </a>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-20 w-5 h-5 bg-purple-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-500 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Notfound;