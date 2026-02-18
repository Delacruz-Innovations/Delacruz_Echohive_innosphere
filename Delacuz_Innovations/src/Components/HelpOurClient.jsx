import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Globe, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
const HelpOurClient = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Digital Transformation & Process Automation – Streamline operations, cut waste, and boost productivity.',
      description:
        'Streamline operations, cut waste, and boost productivity.From manual chaos to digital clarity — we design smarter systems that help your business move faster, stronger, and smarter',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
      gradient: 'from-[#4a90b8] to-[#6bb3d8]',
      delay: '0ms',
      link: '/services/technology-it-services'
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: 'SaaS / PaaS Development – Tailored platforms built for Nigerian markets.',
      description:
        'At Delacruz, we design and develop custom SaaS and PaaS solutions that solve real business problems in Nigeria’s fast-evolving digital economy. Our platforms are locally optimized — built to handle regional infrastructure challenges, payment systems, and user behaviors.',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
      gradient: 'from-[#6bb3d8] to-[#87ceeb]',
      delay: '200ms',
      link: '/services/cyber-security-consultation'
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: 'IT Consulting & Change Management – Strategy, migration, and user adoption that stick.',
      description:
        'Enhance organizational performance and efficiency through strategic planning, process optimization, and leadership development.',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
      gradient: 'from-[#6bb3d8] to-[#87ceeb]',
      delay: '200ms',
      link: '/services/cyber-security-consultation'
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % services.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}>
          <p className="text-[#6bb3d8] text-sm font-semibold tracking-widest uppercase mb-3">
            Services Highlights
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Let's turn your biggest opportunities
            <br />
            <span className="text-purple-500">
              into your next big moves.
            </span>
          </h1>
        </div>

        {/* Mobile Card Shuffle */}
        <div className="md:hidden">
          <div className="relative">
            {services.map((service, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${index === currentCard
                  ? 'opacity-100 scale-100 relative z-10'
                  : 'opacity-0 scale-95 absolute top-0 left-0 w-full pointer-events-none'
                  }`}
              >
                <div className="group relative bg-purple-700  overflow-hidden">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-300 opacity-40"></div>

                    {/* Icon Container */}
                    <div className="absolute top-4 left-4">
                      <div className="w-14 h-14 rounded-xl bg-purple-700 p-0.5">
                        <div className="w-full h-full bg-[#0d2438]/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                          {service.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-50 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-50 leading-relaxed mb-4 text-sm">
                      {service.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <CalendlyPopup
                        text="Book Consultation"
                        className="w-full px-4 py-2.5 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-center text-sm"
                      />
                      <Link to={service.link} className="flex items-center justify-center text-gray-50 hover:text-white transition-colors duration-300">
                        <span className="text-sm font-semibold mr-2">Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 blur-3xl rounded-full`}></div>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevCard}
                className="p-2 bg-purple-700 rounded-full text-white hover:bg-purple-600 transition-colors"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCard(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentCard ? 'bg-purple-500 w-8' : 'bg-gray-600'
                      }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextCard}
                className="p-2 bg-purple-700 rounded-full text-white hover:bg-purple-600 transition-colors"
                aria-label="Next card"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid - 2 Columns */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-purple-700  overflow-hidden transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{
                transitionDelay: isVisible ? service.delay : '0ms',
                animation: isVisible ? `float ${3 + index * 0.5}s ease-in-out infinite` : 'none'
              }}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-purple-300 opacity-40 group-hover:opacity-20 transition-opacity duration-500"></div>

                {/* Icon Container */}
                <div className="absolute top-4 left-4">
                  <div className="w-14 h-14 rounded-xl bg-purple-700 p-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full bg-[#0d2438]/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-50 mb-4 group-hover:text-white transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-50 md:text-gray-100 group-hover:text-gray-50 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <CalendlyPopup
                    text="Book Consultation"
                    className="w-full px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-center"
                  />
                  <Link to={service.link} className="flex items-center justify-center text-gray-50 group-hover:text-white transition-colors duration-300 cursor-pointer">
                    <span className="text-sm font-semibold mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 blur-3xl rounded-full group-hover:opacity-20 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <Link to="/services" className="mt-10 block">
          <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} style={{ transitionDelay: '400ms' }}>
            <button className="group relative px-8 py-4 bg-purple-700 text-white font-semibold  hover:shadow-2xl hover:shadow-purple-700/50 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Explore All Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </Link>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default HelpOurClient;