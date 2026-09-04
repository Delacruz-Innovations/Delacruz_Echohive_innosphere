import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const visibleServices = showAll ? servicesData.services : servicesData.services.slice(0, 5);

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
    <div className="bg-[#080f1d] min-h-screen text-[#ffffff] pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative pt-16 pb-16 px-6 max-w-7xl mx-auto">
        <div ref={heroRef} className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
            Strategic Practice Areas
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffffff] mb-4 leading-tight">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Explore our 5 core pillars of business transformation, technology strategy, AI automation, cybersecurity, and digital solutions.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {visibleServices.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
            const showContent = isHovered || isExpanded;

            return (
              <div
                key={service.id}
                ref={el => cardsRef.current[index] = el}
                className="relative rounded-sm overflow-hidden transition-all duration-500 h-[480px] cursor-pointer group shadow-2xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleServiceClick(service.slug, index)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${service.image})`
                  }}
                />

                {/* Dark Overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d] via-[#080f1d]/70 to-[#080f1d]/40" />

                {/* Secondary Accent Overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#0a2342]/70 to-[#080f1d]/90 transition-opacity duration-500 ${showContent ? 'opacity-95' : 'opacity-0'}`} />

                {/* Title - Always visible when collapsed */}
                <div className={`absolute bottom-0 left-0 right-0 p-8 text-[#ffffff] transition-all duration-500 ${showContent ? 'opacity-0 transform -translate-y-4' : 'opacity-100'}`}>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                    {service.title}
                  </h2>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Expanded Content - Visible on hover/expand */}
                <div className={`absolute inset-0 p-8 flex flex-col justify-between text-[#ffffff] transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                  <div></div>

                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[#ffffff]">
                      {service.title}
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed text-gray-200">
                      {service.description || service.shortDescription}
                    </p>

                    <button
                      className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-all group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/service/${service.slug}`);
                      }}
                    >
                      <span>Explore Pillar &amp; Deliverables</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Action Button - Bottom right */}
                <button
                  onClick={(e) => handleToggle(index, e)}
                  className="absolute bottom-6 right-6 w-12 h-12 rounded-sm bg-[#0a2342] flex items-center justify-center hover:bg-[#ffffff] hover:text-[#000000] text-[#ffffff] transition-all duration-300 z-20"
                >
                  {showContent ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Show More/Less Button */}
        {servicesData.services.length > 5 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#0a2342] hover:bg-[#0a2342]/80 text-[#ffffff] rounded-sm font-semibold transition-all duration-300"
            >
              <span>{showAll ? 'Show Less' : `Show More Services`}</span>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-90' : '-rotate-90'}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Professional CTA */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center bg-[#0a2342]/20 rounded-sm p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-4">
            What's your next strategic milestone?
          </h2>
          <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Our team of experts can help you design and implement tailored enterprise roadmaps with measurable business impact.
          </p>
       
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;