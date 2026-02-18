import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Al-Mansouri',
    position: 'CTO, Emirates Financial Solutions',
    company: 'BFSI Sector',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 5,
    text: 'Innosphere transformed our cloud infrastructure with their PDPL-compliant solutions. Their expertise in regulated environments is unmatched in the UAE market.',
    highlight: 'Cloud Migration Excellence'
  },
  {
    id: 2,
    name: 'Mohammed Hassan',
    position: 'CEO, HealthTech Innovations',
    company: 'Healthcare Sector',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    rating: 5,
    text: 'The cybersecurity framework Innosphere implemented gave us peace of mind. Their compliance audits and incident response protocols are world-class.',
    highlight: 'Cybersecurity Leadership'
  },
  {
    id: 3,
    name: 'Fatima Al-Zaabi',
    position: 'Marketing Director, Luxury Retail Group',
    company: 'Retail & E-commerce',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    rating: 5,
    text: 'Their MarTech integration and analytics capabilities revolutionized our customer experience. We saw 300% ROI in just 6 months!',
    highlight: 'Marketing Transformation'
  },
  {
    id: 4,
    name: 'Ahmed Al-Fahim',
    position: 'Operations Director, Dubai Trading Corp',
    company: 'Import & Export',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 5,
    text: 'The business consulting and process reengineering services helped us expand across GCC markets efficiently. Exceptional strategic insights.',
    highlight: 'Business Growth'
  },
  {
    id: 5,
    name: 'Linda Chen',
    position: 'Innovation Lead, Tech Startup Hub',
    company: 'Technology Sector',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    rating: 5,
    text: 'Innosphere Labs helped us pilot AI solutions with confidence. Their safe rollout frameworks made innovation accessible and measurable.',
    highlight: 'AI Innovation'
  },
  {
    id: 6,
    name: 'Omar Al-Hashimi',
    position: 'CFO, Construction & Engineering LLC',
    company: 'Construction Sector',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    rating: 5,
    text: 'Their custom software solutions and project management support streamlined our operations across 15 sites. Truly transformational partnership.',
    highlight: 'Operational Excellence'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1280) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial animations
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(40px)';
      
      setTimeout(() => {
        titleRef.current.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // Animate cards on load
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px) scale(0.95)';
        
        setTimeout(() => {
          card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 200 + (index * 150));
      }
    });
  }, [cardsPerView]);

  const maxIndex = Math.max(0, testimonialsData.length - cardsPerView);

  const handleNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className="bg-gray-950 text-white py-8 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" ref={titleRef}>
        
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            What Our <span className=" text-[#6b9dc7]">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trusted by leading organizations across the UAE and GCC region
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="overflow-hidden" ref={containerRef}>
            <div 
              className="flex gap-6 transition-transform duration-800 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView + 2)}%)`
              }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  ref={el => cardsRef.current[index] = el}
                  className="flex-shrink-0 group"
                  style={{
                    width: `calc((100% - ${(cardsPerView - 1) * 24}px) / ${cardsPerView})`
                  }}
                >
                  <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-500 rotate-12 group-hover:rotate-0">
                      <Quote className="w-8 h-8 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-2 mb-4 self-start px-3 py-1 bg-[#6b9dc7]/10 border border-cyan-500/30 rounded-full">
                      <span className="text-[#6b9dc7] text-xs font-semibold">{testimonial.highlight}</span>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-cyan-500/30 group-hover:ring-cyan-500 transition-all duration-500">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-400">{testimonial.position}</p>
                        <p className="text-xs text-cyan-400 font-semibold">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
              currentIndex === 0 
                ? 'bg-slate-800/50 text-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-110'
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
              currentIndex >= maxIndex 
                ? 'bg-slate-800/50 text-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-110'
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isAnimating}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 w-12' 
                  : 'bg-slate-700 hover:bg-slate-600 w-2'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-slate-800">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              150+
            </div>
            <div className="text-gray-400 text-sm">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-gray-400 text-sm">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              50+
            </div>
            <div className="text-gray-400 text-sm">Enterprise Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-400 text-sm">Support Available</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Testimonials;