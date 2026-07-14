import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import servicesData from '../ServicesData.json';
import practiceAreaIcons from '../utils/practiceAreaIcons';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const featuredSlugs = ['strategy-transformation', 'data-intelligence-ai', 'governance-risk-compliance'];

const HelpOurClient = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const bottomCtaRef = useRef(null);

  const services = featuredSlugs.map((slug) => {
    const area = servicesData.services.find((s) => s.slug === slug);
    const Icon = practiceAreaIcons[area.icon];
    return {
      icon: <Icon className="w-12 h-12" />,
      title: area.title,
      description: area.shortDescription,
      link: `/services/${area.slug}`,
    };
  });

  useGsapReveal(headerRef);
  useGsapReveal(gridRef, { stagger: 0.15 });
  useHoverGlow(bottomCtaRef);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % services.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section className="bg-black py-10 px-3 sm:px-5 lg:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-8">
          <p className="text-purple-300 text-sm font-semibold tracking-widest uppercase mb-3">
            Practice Area Highlights
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Let's turn your biggest opportunities
            <br />
            <span className="text-purple-500">
              into your next big moves.
            </span>
          </h2>
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
                <div className="group relative rounded-3xl border border-white/10 bg-gray-900/60 overflow-hidden">
                  <div className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                      {service.description}
                    </p>

                    <div className="flex flex-col gap-3">
                      <span className="inline-block rounded-full">
                        <CalendlyPopup
                          text="Book Consultation"
                          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-purple-600 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-purple-700 text-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        />
                      </span>
                      <Link to={service.link} className="flex items-center justify-center text-gray-300 hover:text-purple-300 transition-colors duration-300">
                        <span className="text-sm font-semibold mr-2">Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevCard}
                className="p-2 rounded-full border border-white/10 text-white hover:border-purple-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
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
                className="p-2 rounded-full border border-white/10 text-white hover:border-purple-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                aria-label="Next card"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Grid - 3 Columns */}
        <div ref={gridRef} className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-white/10 bg-gray-900/60 overflow-hidden transition-colors duration-300 hover:border-purple-400/60"
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-col gap-3">
                  <span className="inline-block rounded-full">
                    <CalendlyPopup
                      text="Book Consultation"
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-purple-700 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    />
                  </span>
                  <Link to={service.link} className="flex items-center justify-center text-gray-300 group-hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                    <span className="text-sm font-semibold mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <span ref={bottomCtaRef} className="inline-block rounded-full">
            <Link to="/services" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              Explore All Practice Areas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default HelpOurClient;
