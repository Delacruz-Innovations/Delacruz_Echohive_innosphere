import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Building2, Blocks, TrendingUp, Zap } from 'lucide-react';

import solutionsData from '../servicesData';

const SolutionsApp = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef(null);
  const titleRef = useRef(null);
  const navRef = useRef(null);

  // Handle responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        titleRef.current.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // Nav animation
    if (navRef.current) {
      navRef.current.style.opacity = '0';
      navRef.current.style.transform = 'translateX(50px)';
      
      setTimeout(() => {
        navRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        navRef.current.style.opacity = '1';
        navRef.current.style.transform = 'translateX(0)';
      }, 400);
    }
  }, []);

  // Calculate max index to prevent sliding beyond available cards
  const maxIndex = Math.max(0, solutionsData.solutions.length - cardsPerView);

  useEffect(() => {
    if (sliderRef.current) {
      const card = sliderRef.current.firstChild;
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 24; // 1.5rem = 24px
        const offset = -(currentIndex * (cardWidth + gap));
        
        sliderRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        sliderRef.current.style.transform = `translateX(${offset}px)`;
      }
    }
  }, [currentIndex, cardsPerView]);

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? maxIndex : prev - 1
    );
  };

  // Reset to valid index when cardsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, maxIndex, currentIndex]);

  const handleLearnMore = (solution) => {
    navigate(`/solution/${solution.slug}`);
  };

  const getIcon = (iconName) => {
    const icons = {
      building: Building2,
      blocks: Blocks,
      trending: TrendingUp,
      zap: Zap
    };
    const Icon = icons[iconName] || Building2;
    return <Icon className="w-8 h-8" />;
  };

  return (
    <div className=" bg-black text-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold">
            SOLUTIONS
          </h1>
          <div ref={navRef} className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0 
                  ? 'bg-gray-900 text-gray-600 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
              aria-label="Previous solution"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex >= maxIndex 
                  ? 'bg-gray-900 text-gray-600 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
              aria-label="Next solution"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex gap-6"
            style={{ willChange: 'transform' }}
          >
            {solutionsData.solutions.map((solution, index) => (
              <div
                key={solution.id}
                className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300 flex-shrink-0"
                style={{
                  width: `calc((100% - ${(cardsPerView - 1) * 24}px) / ${cardsPerView})`,
                  animation: `fadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.15}s both`
                }}
              >
                <div className="mb-6 text-gray-400 group-hover:text-cyan-400 transition-colors">
                  {getIcon(solution.icon)}
                </div>
                
                <h3 className="text-xl font-bold mb-4">
                  {solution.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {solution.shortDescription}
                </p>
                
                <button
                  onClick={() => handleLearnMore(solution)}
                  className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-cyan-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(80px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default SolutionsApp;