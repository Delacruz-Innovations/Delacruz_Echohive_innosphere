import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StrategyAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const imageCardRef = useRef(null);
  const listRefs = useRef([]);
  const containerRef = useRef(null);

const sections = [
  {
    title: "Information - Driven Strategy Execution",
    content: "We analyze the facts at our disposal and envision the right approach to strategy execution fit for your organization. Our experienced consultants overcome challenges with a facts-first approach, helping you build upon a healthy basis. Such an approach provides a sustainable platform for your future endeavors.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop"
  },
  {
    title: "Senior Team Involvement",
    content: "Our senior leadership works directly with your team to ensure strategic alignment and successful implementation. We bring decades of combined experience to guide your organization through complex transformations.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop"
  },
  {
    title: "Style - Driven",
    content: "We adapt our consulting style to match your organizational culture and needs. Our flexible approach ensures seamless integration with your existing processes while driving meaningful change.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=1000&fit=crop"
  },
  {
    title: "We Are True to Ourselves",
    content: "Authenticity and integrity are at the core of everything we do. We provide honest assessments and realistic recommendations that prioritize your long-term success over short-term gains.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=1000&fit=crop"
  },
  {
    title: "Knowledge - Sharing",
    content: "We believe in empowering your team through knowledge transfer. Our consultants work alongside your staff, ensuring that expertise and best practices remain within your organization long after our engagement ends.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop"
  }
];


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 useEffect(() => {
  if (!containerRef.current) return;

  // Stagger animation for list items on scroll
  listRefs.current.forEach((item, index) => {
    if (item) {
      gsap.fromTo(item,
        {
          opacity: 0,
          x: isMobile ? 0 : -50,
          y: isMobile ? 30 : 0
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: isMobile ? 0.5 : 0.6,
          delay: index * (isMobile ? 0.15 : 0.1),
          scrollTrigger: {
            trigger: item,
            start: isMobile ? "top 85%" : "top 80%",
            end: isMobile ? "top 30%" : "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [isMobile]);

  const handleAccordionClick = (index) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);

    // Image card shuffle animation on desktop
    if (!isMobile && imageCardRef.current && newIndex !== -1) {
      const tl = gsap.timeline();
      
      tl.to(imageCardRef.current, {
        opacity: 0.3,
        scale: 0.95,
        rotation: -2,
        duration: 0.4,
        ease: "power2.inOut"
      })
      .to(imageCardRef.current, {
        opacity: 1,
        scale: 1,
        rotation: (Math.random() - 0.5) * 4,
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)"
      });
    }
  };

  return (
    <div className="relative max-md: bg-black text-white py-12 px-4 md:px-8" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Image Card - Hidden on Mobile */}
          {!isMobile && (
            <div className="sticky top-8">
              <div
                ref={imageCardRef}
                className="relative rounded-2xl h-[600px]  overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: '4/5',
                  transform: 'rotate(-1deg)'
                }}
              >
                <img
  src={sections[activeIndex]?.image || sections[0].image}
  alt={sections[activeIndex]?.title || "Business strategy"}
  className="w-full h-full object-cover"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          )}
{/* Background Image for Mobile */}
{/* Background Image for Mobile */}
{isMobile && (
  <div className="absolute inset-0 z-0">
    <img
      key={activeIndex}
      src={sections[activeIndex !== -1 ? activeIndex : 0].image}
      alt="Background"
      className="w-full h-full object-cover animate-fade-in"
    />
    <div className="absolute inset-0 bg-black/80"></div>
  </div>
)}

{/* Accordion Section */}
<div className="space-y-0 relative z-10">
            {sections.map((section, index) => (
              <div
                key={index}
                ref={el => listRefs.current[index] = el}
                className="border-b border-gray-800"
              >
                <button
                  onClick={() => handleAccordionClick(index)}
                  className="w-full py-6 flex items-start justify-between gap-4 text-left hover:opacity-70 transition-opacity group"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <span className="text-gray-500 font-light text-sm mt-1">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="text-lg md:text-xl font-light leading-relaxed">
                        {section.title}
                      </h3>
                    </div>
                    
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        activeIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                      }`}
                    >
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed pl-10">
                        {section.content}
                      </p>
                    </div>
                  </div>
                  
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-[#6b9dc7] rotate-180'
                        : 'bg-gray-800 group-hover:bg-gray-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
              </div>
            ))}
          </div>

        
        </div>
      </div>
    </div>
  );
};
// Add custom CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-fade-in {
    animation: fade-in 0.6s ease-in-out;
  }
`;
if (!document.head.querySelector('style[data-accordion-fade]')) {
  style.setAttribute('data-accordion-fade', 'true');
  document.head.appendChild(style);
}

export default StrategyAccordion;