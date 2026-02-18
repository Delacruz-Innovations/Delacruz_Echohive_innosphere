import React, { useState, useEffect } from 'react';
import image1 from '../assets/Certified/image1.png'
import image2 from '../assets/Certified/image2.png'
import image3 from '../assets/Certified/image3.png'
import image4 from '../assets/Certified/image4.jpg'
import image5 from '../assets/Certified/image5.png'
import image6 from '../assets/Certified/image6.png'
import image7 from '../assets/Certified/image7.png'


const BrandEcoSystem = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const brands = [
    { logo: image1, name: 'Brand 1' },
    { logo: image2, name: 'Brand 2' },
    { logo: image3, name: 'Brand 3' },
    { logo: image4, name: 'Brand 4' },
    { logo: image5, name: 'Brand 5' },
    { logo: image6, name: 'Brand 6' },
    { logo: image7, name: 'Brand 7' },
  ];

  return (
    <div className="relative bg-black py-12 md:py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-8 md:mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-50 mb-3 md:mb-4 px-4">
            Trusted and <span className="text-purple-600">Certified</span>
          </h2>
          <p className="text-gray-200 text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Delivering quality digital solutions with recognisable international certification bodies.
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative overflow-hidden mb-12 md:mb-16">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-40 h-24 sm:w-48 sm:h-28 md:w-56 md:h-32 lg:w-64 lg:h-36 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain transition-all duration-300"
                />
              </div>
            ))}
            {/* Second set for seamless loop */}
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-40 h-24 sm:w-48 sm:h-28 md:w-56 md:h-32 lg:w-64 lg:h-36 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain  transition-all duration-300"
                />
              </div>
            ))}
            {/* Third set for seamless loop */}
            {brands.map((brand, index) => (
              <div
                key={`third-${index}`}
                className="flex-shrink-0 w-40 h-24 sm:w-48 sm:h-28 md:w-56 md:h-32 lg:w-64 lg:h-36 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-full object-containtransition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Join the Movement */}
        <section className="px-4 sm:px-6 py-12 md:py-16 bg-opacity-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-700 mb-4 md:mb-6">
              Join the Movement
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 px-2">
              Whether you are a growing business, a sector public agency, or a multinational enterprise expanding into Africa, 
              Delacruz Innovations is your trusted partner for digital evolution.
            </p>
            <p className="text-xl sm:text-2xl font-bold text-white mb-6 md:mb-8">
              Innovation tomorrow, Delivering today!
            </p>
            <button className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors w-full sm:w-auto">
              Work with Us
            </button>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll {
          animation: scroll 50s linear infinite;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 640px) {
          .animate-scroll {
            animation: scroll 35s linear infinite;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .animate-scroll {
            animation: scroll 42s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default BrandEcoSystem;