import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FeatureCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const cards = [
    {
      id: 1,
      title: "Manage content that converts, at scale",
      description: "Webflow's visual, composable CMS lets you create and manage content that drives results — while built-in SEO and AEO tools help you optimize content for both traditional and AI-driven search.",
      cta: "Get started — it's free",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      color: "bg-[#0a1929]/90"
    },
    {
      id: 2,
      title: "Manage content that converts, at scale",
      description: "Webflow's visual, composable CMS lets you create and manage content that drives results — while built-in SEO and AEO tools help you optimize content for both traditional and AI-driven search.",
      cta: "Get started — it's free",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      color: "bg-[#0a1929]/90"
    },
    {
      id: 3,
      title: "Manage content that converts, at scale",
      description: "Webflow's visual, composable CMS lets you create and manage content that drives results — while built-in SEO and AEO tools help you optimize content for both traditional and AI-driven search.",
      cta: "Get started — it's free",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      color: "bg-[#0a1929]/90"
    }
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
            const showContent = isHovered || isExpanded;
            
            return (
              <div
                key={card.id}
                className="relative rounded-2xl overflow-hidden transition-all duration-500 h-[500px] cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${card.image})`
                  }}
                />
                
                {/* Gradient Overlay - Appears on hover/expand */}
                <div className={`absolute inset-0  ${card.color} transition-opacity duration-500 ${
                  showContent ? 'opacity-80' : 'opacity-0'
                }`} />

                {/* Title - Always visible, hides on hover/expand */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transition-all duration-500 ${
                  showContent ? 'opacity-0 transform -translate-y-4' : 'opacity-100'
                }`}>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    {card.title}
                  </h2>
                </div>

                {/* Expanded Content - Visible on hover/expand */}
                <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white transition-all duration-500 ${
                  showContent
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
                  <div></div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      {card.title}
                    </h2>
                    
                    <p className="text-base md:text-lg leading-relaxed">
                      {card.description}
                    </p>
                    
                    <button className="flex items-center gap-2 text-base md:text-lg font-semibold hover:gap-3 transition-all">
                      {card.cta}
                      <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Action Button - Bottom right */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(index);
                  }}
                  className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/30 backdrop-blur-sm border border-gray-900/20 flex items-center justify-center hover:bg-white/50 transition-all duration-300 z-10"
                >
                  {showContent ? (
                    <Minus className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                  ) : (
                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                  )}
                </button>

                {/* Animated Border on Hover/Expand */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-[#0a1929] transition-opacity duration-500 ${
                  showContent ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureCarousel;