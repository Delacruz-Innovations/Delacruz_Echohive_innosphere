import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Heart, Landmark, Hotel, Briefcase, Factory, Plane, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const IndustriesWeServe = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%'
      }
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      gridRef.current.children,
      { 
        scale: 0,
        opacity: 0,
        rotation: -180
      },
      { 
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      },
      '-=0.5'
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );
  }, []);

  const industries = [
    { icon: Building2, name: 'BFSI', color: 'from-blue-500 to-cyan-500' },
    { icon: Heart, name: 'Healthcare', color: 'from-red-500 to-pink-500' },
    { icon: Landmark, name: 'Government', color: 'from-purple-500 to-indigo-500' },
    { icon: Hotel, name: 'Hospitality', color: 'from-orange-500 to-yellow-500' },
    { icon: Briefcase, name: 'SMEs', color: 'from-green-500 to-emerald-500' },
    { icon: Factory, name: 'Manufacturing', color: 'from-gray-500 to-slate-500' },
    { icon: Plane, name: 'Travel', color: 'from-sky-500 to-blue-500' },
    { icon: ShoppingCart, name: 'Retail', color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Industries We <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Serve</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Delivering specialized solutions across diverse sectors
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${industry.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:-translate-y-2 flex flex-col items-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-center">{industry.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={ctaRef} className="text-center">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Explore Solutions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndustriesWeServe;