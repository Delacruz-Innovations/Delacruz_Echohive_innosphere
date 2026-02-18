import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

const ClientCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : true;
    }
    return true;
  });
  
  const carouselRef = useRef(null);
  const clientRefs = useRef([]);
  const labelRefs = useRef([]);
  const arrowLeftRef = useRef(null);
  const arrowRightRef = useRef(null);
  const dotsRef = useRef([]);
  const themeToggleRef = useRef(null);

  // Color definitions
  const colors = {
    dark: {
      background: '#000000',
      text: '#f8fafc',
      arrowBg: '#374151',
      arrowHover: '#4b5563',
      labelBg: '#ffffff',
      labelText: '#000000',
      dotActive: '#ffffff',
      dotInactive: '#4b5563',
      toggleBg: 'rgba(59, 130, 246, 0.2)',
      toggleIcon: '#f8fafc'
    },
    light: {
      background: '#ffffff',
      text: '#0f172a',
      arrowBg: '#e2e8f0',
      arrowHover: '#cbd5e1',
      labelBg: '#0f172a',
      labelText: '#ffffff',
      dotActive: '#0f172a',
      dotInactive: '#cbd5e1',
      toggleBg: 'rgba(37, 99, 235, 0.2)',
      toggleIcon: '#0f172a'
    }
  };

  const currentColors = isDark ? colors.dark : colors.light;

  // Client data with image URLs
  const clients = [
    {
      name: 'Nickel',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=200&h=200&fit=crop',
      color: '#FF6B35'
    },
    {
      name: 'A2MAC1',
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=200&fit=crop',
      color: '#00D9A3'
    },
    {
      name: 'Le BHV/Marais',
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
      color: '#FFFFFF'
    },
    {
      name: 'Stratasys',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&h=200&fit=crop',
      color: '#00C2FF'
    },
    {
      name: 'Future4care',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
      color: '#FF9999'
    }
  ];

  // Sync theme with localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDark } }));
  }, [isDark]);

  // Listen for theme changes from other components
  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDark(event.detail.isDark);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate theme toggle
    tl.fromTo(
      themeToggleRef.current,
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.8 }
    );

    // Animate arrows
    tl.fromTo(
      [arrowLeftRef.current, arrowRightRef.current],
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      '-=0.6'
    );

    // Animate clients
    tl.fromTo(
      clientRefs.current,
      { 
        scale: 0, 
        y: 100, 
        opacity: 0,
        rotation: -180 
      },
      { 
        scale: 1, 
        y: 0, 
        opacity: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      },
      '-=0.5'
    );

    // Animate labels
    tl.fromTo(
      labelRefs.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.5'
    );

    // Animate dots
    tl.fromTo(
      dotsRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05 },
      '-=0.3'
    );

    // Floating animation for clients
    clientRefs.current.forEach((client, index) => {
      if (client) {
        gsap.to(client, {
          y: `${-10 + (index % 2) * 20}`,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      }
    });
  }, []);

  const nextSlide = () => {
    // Animate out current clients
    gsap.to(clientRefs.current, {
      x: -100,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % clients.length);
        
        // Animate in new clients
        gsap.fromTo(
          clientRefs.current,
          { x: 100, opacity: 0, rotation: 90 },
          { x: 0, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)' }
        );
      }
    });

    // Pulse arrow animation
    gsap.to(arrowRightRef.current, {
      scale: 1.2,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  const prevSlide = () => {
    // Animate out current clients
    gsap.to(clientRefs.current, {
      x: 100,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
        
        // Animate in new clients
        gsap.fromTo(
          clientRefs.current,
          { x: -100, opacity: 0, rotation: -90 },
          { x: 0, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)' }
        );
      }
    });

    // Pulse arrow animation
    gsap.to(arrowLeftRef.current, {
      scale: 1.2,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  // Get visible clients based on screen size
  const getVisibleClients = () => {
    if (isMobile) {
      return [clients[currentIndex]];
    }
    
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % clients.length;
      visible.push(clients[index]);
    }
    return visible;
  };

  const visibleClients = getVisibleClients();

  return (
    <div 
      ref={carouselRef} 
      className="w-full flex items-center justify-center p-4 md:p-8 transition-colors duration-500"
      style={{ backgroundColor: currentColors.background }}
    >
      <div className="w-full max-w-7xl relative">
        {/* Theme Toggle Button */}
  

        {/* Desktop View */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-6">
            {/* Left Arrow */}
            <button
              ref={arrowLeftRef}
              onClick={prevSlide}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 flex-shrink-0"
              style={{
                backgroundColor: currentColors.arrowBg
              }}
              aria-label="Previous"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
                e.currentTarget.style.backgroundColor = currentColors.arrowHover;
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
                e.currentTarget.style.backgroundColor = currentColors.arrowBg;
              }}
            >
              <ChevronLeft size={32} color={currentColors.text} />
            </button>

            {/* Clients */}
            <div className="flex items-end justify-center gap-8 flex-1">
              {visibleClients.map((client, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 transition-all duration-500"
                >
                  <div
                    ref={(el) => (clientRefs.current[index] = el)}
                    className="rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 cursor-pointer"
                    style={{
                      width: '160px',
                      height: '160px',
                      backgroundColor: client.color
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { 
                        scale: 1.15, 
                        rotation: 5,
                        duration: 0.4, 
                        ease: 'back.out(1.7)' 
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { 
                        scale: 1, 
                        rotation: 0,
                        duration: 0.4, 
                        ease: 'power2.out' 
                      });
                    }}
                  >
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div 
                    ref={(el) => (labelRefs.current[index] = el)}
                    className="px-8 py-3 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: currentColors.labelBg
                    }}
                  >
                    <span 
                      className="font-medium text-lg"
                      style={{ color: currentColors.labelText }}
                    >
                      {client.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              ref={arrowRightRef}
              onClick={nextSlide}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 flex-shrink-0"
              style={{
                backgroundColor: currentColors.arrowBg
              }}
              aria-label="Next"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
                e.currentTarget.style.backgroundColor = currentColors.arrowHover;
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
                e.currentTarget.style.backgroundColor = currentColors.arrowBg;
              }}
            >
              <ChevronRight size={32} color={currentColors.text} />
            </button>
          </div>
        )}

        {/* Mobile View */}
        {isMobile && (
          <div className="flex flex-col items-center gap-8 mt-16">
            {/* Client */}
            <div className="flex flex-col items-center gap-6">
              <div
                ref={(el) => (clientRefs.current[0] = el)}
                className="rounded-full overflow-hidden flex items-center justify-center transition-all duration-500"
                style={{
                  width: '240px',
                  height: '240px',
                  backgroundColor: visibleClients[0].color
                }}
              >
                <img
                  src={visibleClients[0].image}
                  alt={visibleClients[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                ref={(el) => (labelRefs.current[0] = el)}
                className="px-10 py-4 rounded-full transition-colors duration-500"
                style={{
                  backgroundColor: currentColors.labelBg
                }}
              >
                <span 
                  className="font-medium text-xl"
                  style={{ color: currentColors.labelText }}
                >
                  {visibleClients[0].name}
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-6">
              <button
                ref={arrowLeftRef}
                onClick={prevSlide}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-500"
                style={{
                  backgroundColor: currentColors.labelBg
                }}
                aria-label="Previous"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                <ChevronLeft size={28} color={currentColors.labelText} />
              </button>
              <button
                ref={arrowRightRef}
                onClick={nextSlide}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-500"
                style={{
                  backgroundColor: currentColors.labelBg
                }}
                aria-label="Next"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                }}
              >
                <ChevronRight size={28} color={currentColors.labelText} />
              </button>
            </div>
          </div>
        )}

   
      </div>
    </div>
  );
};

export default ClientCarousel;