import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';

const CTABanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="relative bg-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient Blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 opacity-20 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            {/* Decorative Element */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-700 to-purple-600 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-700 to-purple-600 opacity-30 blur-xl animate-pulse"></div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Start Your{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                  Transformation
                </span>
                {/* Underline Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-full"></div>
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-100 text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
              Partner with us to build competitive advantage through{' '}
              <span className="text-purple-400 font-semibold">strategy</span> and{' '}
              <span className="text-purple-400 font-semibold">technology</span>.
            </p>


            {/* CTA Button */}
            <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`} style={{ transitionDelay: '300ms' }}>
              <CalendlyPopup
                text="Book A Free Consultation"
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-700 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-700/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Book A Free Consultation
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 to-purple-600 opacity-0 blur-xl group-hover:opacity-50 transition-opacity duration-300"></div>
              </CalendlyPopup>
            </div>

            {/* Trust Indicators */}
            <div className={`flex flex-wrap justify-center items-center gap-6 mt-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '600ms' }}>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span className="text-sm">Trusted by 20+ Companies</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-sm">98% Client Satisfaction</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm">Award-Winning Solutions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent"></div>
      </div>
    </>
  );
};

export default CTABanner;