import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Plus, Minus } from 'lucide-react';
import CalendlyPopup from '../Components/CalendlyPopup';
import servicesData from '../servicesData';

const ServicesPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll ? servicesData.services : servicesData.services.slice(0, 4);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        heroRef.current.style.transition = 'all 0.8s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [showAll]);

  const handleServiceClick = (slug, index) => {
    if (expandedIndex !== index) {
      navigate(`/service/${slug}`);
    }
  };

  const handleToggle = (index, e) => {
    e.stopPropagation();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://media.istockphoto.com/id/2208341131/video/artificial-intelligence-technology-intelligence-artificial-data-ai-technology-business-data.mp4?s=mp4-640x640-is&k=20&c=7DW7xIrGsGo9wYqgyOSWDvrXIBem-6ALhBvlh-FCiGA="
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/40" />

        {/* Content - Bottom Left */}
        <div ref={heroRef} className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12 md:pb-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Our Services
            </h1>
            <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Explore our comprehensive range of solutions designed to drive your business forward
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {visibleServices.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
            const showContent = isHovered || isExpanded;

            return (
              <div
                key={service.id}
                ref={el => cardsRef.current[index] = el}
                className="relative rounded-2xl overflow-hidden transition-all duration-500 h-[500px] cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleServiceClick(service.slug, index)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${service.image})`
                  }}
                />

                {/* Dark Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gray-900/60" />

                {/* Gradient Overlay - Appears on hover/expand */}
                <div className={`absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-blue-700/30 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'
                  }`} />

                {/* Title - Always visible, hides on hover/expand */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transition-all duration-500 ${showContent ? 'opacity-0 transform -translate-y-4' : 'opacity-100'
                  }`}>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {service.title}
                  </h2>
                </div>

                {/* Expanded Content - Visible on hover/expand */}
                <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white transition-all duration-500 ${showContent
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}>
                  <div></div>

                  <div className="space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-base md:text-lg leading-relaxed text-white/90">
                      {service.shortDescription}
                    </p>

                    <button
                      className="flex items-center gap-2 text-base md:text-lg font-semibold hover:gap-3 transition-all group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/service/${service.slug}`);
                      }}
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Action Button - Bottom right */}
                <button
                  onClick={(e) => handleToggle(index, e)}
                  className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-20"
                >
                  {showContent ? (
                    <Minus className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  )}
                </button>

                {/* Animated Border on Hover/Expand */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-cyan-400 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'
                  }`} />
              </div>
            );
          })}
        </div>

        {/* Show More/Less Button */}
        {servicesData.services.length > 4 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-[#6b9dc7] text-white rounded-lg font-semibold transition-all duration-300 border border-gray-700 hover:border-cyan-500 shadow-lg hover:shadow-cyan-900/30"
            >
              <span>{showAll ? 'Show Less' : `Show More (${servicesData.services.length - 4} more)`}</span>
              <ChevronRight
                className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-90' : '-rotate-90'
                  }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Professional CTA */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            What's your next big move?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Our team of experts can help you design and implement tailored solutions
            for your unique business needs and drive measurable results.
          </p>
          <CalendlyPopup
            text="BOOK A FREE CONSULTATION"
            className="inline-flex items-center bg-[#6b9dc7] text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-900/30 border-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;