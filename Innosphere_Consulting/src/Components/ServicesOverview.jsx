import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Shield, Briefcase, TrendingUp, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ServicesOverview = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo(
      cardsRef.current,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      }
    );
  }, []);

  const services = [
    {
      id: 'technology',
      title: 'Technology',
      description: 'Cutting-edge technology solutions to drive digital transformation and innovation.',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Comprehensive security solutions to protect your business from evolving threats.',
      icon: Shield,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'consulting',
      title: 'Consulting',
      description: 'Strategic consulting services to optimize operations and accelerate growth.',
      icon: Briefcase,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Data-driven marketing strategies that deliver measurable results.',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'software-labs',
      title: 'Software Labs',
      description: 'Custom software development to bring your innovative ideas to life.',
      icon: Laptop,
      gradient: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                     style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                ></div>
                
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-gray-600 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                  
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group/link"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;