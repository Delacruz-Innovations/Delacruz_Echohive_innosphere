import React, { useEffect, useRef } from 'react';
import { Target, Users, Zap, Award, TrendingUp } from 'lucide-react';

const StrategicDifferentiators = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.style.opacity = '0';
            titleRef.current.style.transform = 'translateY(30px)';
            setTimeout(() => {
              titleRef.current.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              titleRef.current.style.opacity = '1';
              titleRef.current.style.transform = 'translateY(0)';
            }, 100);
          }

          if (subtitleRef.current) {
            subtitleRef.current.style.opacity = '0';
            subtitleRef.current.style.transform = 'translateY(20px)';
            setTimeout(() => {
              subtitleRef.current.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              subtitleRef.current.style.opacity = '1';
              subtitleRef.current.style.transform = 'translateY(0)';
            }, 300);
          }

          cardsRef.current.forEach((card, index) => {
            if (card) {
              card.style.opacity = '0';
              card.style.transform = 'translateY(40px)';
              setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 500 + (index * 100));
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const differentiators = [
    {
      icon: Target,
      title: 'Results-Driven Approach',
      description: 'We focus on measurable outcomes that directly impact your bottom line and drive sustainable growth.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Industry veterans with decades of combined experience across multiple sectors and domains.'
    },
    {
      icon: Zap,
      title: 'Rapid Implementation',
      description: 'Fast-track your transformation with our proven agile methodology and streamlined processes.'
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description: 'Consistently delivering excellence with a 98% client satisfaction rate across all projects.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Innovation',
      description: 'Staying ahead of the curve with cutting-edge solutions and industry best practices.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">


      <div ref={sectionRef} className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p ref={subtitleRef} className="text-gray-400 text-lg max-w-2xl mx-auto">
              Strategic differentiators that set us apart
            </p>
          </div>

          {/* Cards Horizontal Scroll */}
          <div className="overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6">
            <div className="flex gap-6 min-w-max pb-4">
              {differentiators.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <div
                    key={index}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group w-80 flex-shrink-0"
                  >
                    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full">
                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-3">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">← Scroll horizontally →</p>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default StrategicDifferentiators;