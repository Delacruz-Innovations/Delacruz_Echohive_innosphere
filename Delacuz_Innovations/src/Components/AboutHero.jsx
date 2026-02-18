import React, { useEffect, useState } from 'react';
import { ArrowRight, Users, Target, Award } from 'lucide-react';

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="bg-black py-18">
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop" 
            alt="Collaborative team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-purple-700/20 border border-purple-700/30 rounded-full mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
            >
              <Users className="w-4 h-4 text-purple-300" />
              <span className="text-purple-300 text-sm font-semibold tracking-wide uppercase">
                About Us
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Shaping Africa’s Digital Future {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
               One Solution at a Time.

              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-gray-300 text-lg md:text-xl leading-relaxed mb-8 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
             A digitally empowered Africa where innovation drives inclusion, efficiency, and sustainable growth.

            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl"></div>
      </div>

  
    </div>
  );
};

export default AboutHero;