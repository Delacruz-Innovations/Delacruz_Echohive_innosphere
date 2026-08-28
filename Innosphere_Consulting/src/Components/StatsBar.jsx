import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsBar = () => {
  const statsRef = useRef(null);
  const statsItemsRef = useRef([]);

  useEffect(() => {
    statsItemsRef.current.forEach((item, index) => {
      if (!item) return;

      const numberElement = item.querySelector('.stat-number');
      if (!numberElement) return;

      const target = parseInt(numberElement.getAttribute('data-target'));

      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%'
          }
        }
      );

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
    { number: 36, suffix: '+', label: 'Projects Delivered' },
    { number: 91, suffix: '%', label: 'Client Satisfaction' },
    { number: 11, suffix: '+', label: 'Expert Consultants' },
    { number: 15, suffix: '+', label: 'Years of Experience' }
  ];

  return (
    <div ref={statsRef} className="py-8 bg-[#000000]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsItemsRef.current[index] = el)}
              className="text-center group"
            >
              <div className="relative bg-[#0a2342]/25 rounded-sm p-6 hover:bg-[#0a2342]/45 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <span 
                    className="stat-number text-4xl lg:text-5xl font-bold text-[#ffffff]"
                    data-target={stat.number}
                  >
                    0
                  </span>
                  <span className="text-4xl lg:text-5xl font-bold text-blue-400">{stat.suffix}</span>
                </div>
                <p className="text-gray-300 text-xs lg:text-sm font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;