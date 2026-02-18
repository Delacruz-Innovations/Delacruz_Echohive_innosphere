import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const InnosphereAbout = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef(null);

  const insights = [
    {
      type: "RESEARCH REPORT",
      title: "Destination net zero 2025",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      color: "bg-slate-900/95"
    },
    {
      type: "RESEARCH REPORT",
      title: "Sovereign AI: From managing risk to accelerating growth",
      description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop",
      color: "bg-slate-900/95"
    },
    {
      type: "RESEARCH REPORT",
      title: "Holiday Shopping 2025: Tis the season for smarter spending and personalized joy",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop",
      color: "bg-slate-900/95",
       description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
    },
    {
      type: "CASE STUDY",
      title: "Poste Italiane pivots from postal service to national platform",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
      color: "bg-slate-900/95",
       description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
    },
    {
      type: "RESEARCH REPORT",
      title: "Learning, reinvented. Accelerating human-AI collaboration",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      color: "bg-slate-900/95",
       description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
    },
    {
      type: "CASE STUDY",
      title: "Bristol Myers Squibb accelerates drug development with generative AI",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      color: "bg-slate-900/95",
       description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
    },
    {
      type: "RESEARCH REPORT",
      title: "4 critical actions to take now to strengthen your cyber defenses",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      color: "bg-slate-900/95",
       description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
    },
    {
      type: "RESEARCH REPORT",
      title: "AI and your operating model: Radically new ways of working",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      color: "bg-slate-900/95",
       description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isDragging) return;

    const autoScroll = setInterval(() => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    }, 30);

    return () => clearInterval(autoScroll);
  }, [isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className=" text-white py-2 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-6">
          <div className="flex items-center gap-3 mb-4 md:mb-4">
            <div className="h-1 w-8 md:w-12 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            <span className="text-cyan-400 font-semibold uppercase tracking-wider text-xs md:text-sm">
              Latest Insights
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-slate-900 via-white to-slate-900/ bg-clip-text text-transparent">Research</span> & <span className="bg-gradient-to-r from-slate-900 via-white to-slate-900/50 bg-clip-text text-transparent">Insights</span>
          </h2>

          <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Explore our latest thinking on digital transformation, AI, and innovation strategy
          </p>
        </div>

        {/* Scrollable Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {insights.map((insight, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div className={`relative h-[480px] md:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden transition-all duration-500 ${
                hoveredCard === index ? 'shadow-2xl shadow-cyan-500/30 scale-105' : 'shadow-xl'
              }`}>
                {/* Background Image - Only visible on hover */}
                <div 
                 className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${insight.image})`
                  }}
                />
                
                {/* Gradient Overlay - Always visible, darkens on hover to show image */}
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} transition-opacity duration-500 ${
  hoveredCard === index ? 'opacity-95' : 'opacity-0'
}`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                  {/* Type Badge */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider">
                      {insight.type}
                    </span>
                  </div>

                  {/* Title - Always visible */}
                  <div className={`transition-all duration-500 ${
                    hoveredCard === index ? 'opacity-0 transform -translate-y-4' : 'opacity-100'
                  }`}>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight">
                      {insight.title}
                    </h3>
                  </div>

                  {/* Expanded Content - Visible on hover/tap */}
                  <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ${
                    hoveredCard === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}>
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                        {insight.type}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4">
                        {insight.title}
                      </h3>
                      {insight.description && (
                        <p className="text-sm md:text-base text-white/90 leading-relaxed mb-6">
                          {insight.description}
                        </p>
                      )}
                    </div>

                    <button className="group/btn flex items-center gap-2 text-sm md:text-base font-semibold hover:gap-3 transition-all">
                      Expand
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Animated Border on Hover */}
                <div className={`absolute inset-0 rounded-2xl  transition-opacity duration-500 ${
                  hoveredCard === index ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator for Mobile */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-600" />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InnosphereAbout;