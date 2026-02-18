import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsBar = () => {
  const statsRef = useRef(null);
  const statsItemsRef = useRef([]);

  useEffect(() => {
    const stats = statsItemsRef.current;

    gsap.fromTo(
      stats,
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate numbers counting up
    stats.forEach((stat) => {
      const numberElement = stat.querySelector('.stat-number');
      const target = parseInt(numberElement.getAttribute('data-target'));
      
      gsap.to(numberElement, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%'
        },
        onUpdate: function() {
          numberElement.innerText = Math.ceil(numberElement.innerText);
        }
      });
    });
  }, []);

  const stats = [
    { number: 36, suffix: '+', label: 'Project Delivered' },
    { number: 91, suffix: '%', label: 'Client Satisfaction' },
    { number: 11, suffix: '+', label: 'Expert Consultants' },
    { number: 15, suffix: '+', label: 'Years Of Expreince' }
  ];

  return (
    <div ref={statsRef} className="py-4 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsItemsRef.current[index] = el)}
              className="text-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#4a7ba7]/10 blur-xl group-hover:bg-[#4a7ba7]/20 transition-all duration-300"></div>
                <div className="relative bg-slate-950/50 backdrop-blur-sm border border-[#1e3a5f]/50 rounded-2xl p-8 hover:border-[#4a7ba7]/50 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center mb-2">
                    <span 
                      className="stat-number text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#6b9dc7] to-[#a8c5e0] bg-clip-text text-transparent"
                      data-target={stat.number}
                    >
                      0
                    </span>
                    <span className="text-5xl lg:text-6xl font-bold text-[#6b9dc7]">{stat.suffix}</span>
                  </div>
                  <p className="text-[#8ba3ba] text-sm lg:text-base font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;