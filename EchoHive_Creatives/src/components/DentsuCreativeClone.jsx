import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const DentsuCreativeClone = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Hero text animation
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-text', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out' }
    );

    // Floating elements animation
    gsap.to('.floating-element', {
      y: 30,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

    // Scroll animations
    gsap.fromTo('.scroll-section', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.scroll-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded"></div>
              <span className="text-xl font-semibold">DENTSU CREATIVE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Work', 'Capabilities', 'About', 'Careers', 'News'].map((item) => (
                <a key={item} href="#" className="text-gray-700 hover:text-black transition-colors font-medium">
                  {item}
                </a>
              ))}
              <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-black mb-1.5"></div>
              <div className="w-6 h-0.5 bg-black mb-1.5"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div ref={textRef} className="space-y-6">
            <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
              <div>DENTSU</div>
              <div>CREATIVE</div>
            </h1>
            <p className="hero-text text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              The world's largest creative agency built for change
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="floating-element absolute top-1/4 left-1/4 w-20 h-20 bg-red-500/10 rounded-full blur-xl"></div>
            <div className="floating-element absolute top-1/3 right-1/4 w-16 h-16 bg-blue-500/10 rounded-lg blur-lg"></div>
            <div className="floating-element absolute bottom-1/4 left-1/3 w-24 h-24 bg-green-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Work Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="scroll-section text-4xl md:text-6xl font-bold mb-12">Featured Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Sustainable Future', category: 'Brand Strategy' },
              { title: 'Digital Transformation', category: 'Experience Design' },
              { title: 'Global Campaign', category: 'Creative Production' }
            ].map((project, index) => (
              <div key={index} className="scroll-section group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-500"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="scroll-section text-4xl md:text-6xl font-bold mb-12">What We Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              'Brand Strategy',
              'Creative Campaigns',
              'Digital Experience',
              'Media Planning',
              'Content Creation',
              'Social Marketing',
              'Data & Analytics',
              'Innovation'
            ].map((capability, index) => (
              <div key={index} className="scroll-section group p-6 bg-white rounded-2xl hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3">{capability}</h3>
                <p className="text-gray-600 text-sm">
                  Modern creative solutions for forward-thinking brands.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="scroll-section text-4xl md:text-6xl font-bold mb-12">Global Network</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
            {['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Singapore', 'Berlin', 'Mumbai', 'São Paulo', 'Dubai', 'Amsterdam', 'Seoul'].map((city, index) => (
              <div key={index} className="scroll-section">
                <div className="text-2xl font-semibold mb-2">{city}</div>
                <div className="w-8 h-0.5 bg-white mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-white rounded"></div>
                <span className="text-lg font-semibold">DENTSU CREATIVE</span>
              </div>
              <p className="text-gray-400">Creating a better future through modern creativity.</p>
            </div>
            
            {[
              { title: 'Work', items: ['Campaigns', 'Case Studies', 'Awards'] },
              { title: 'Services', items: ['Strategy', 'Creative', 'Technology'] },
              { title: 'Company', items: ['About', 'Careers', 'Contact'] }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dentsu Creative Clone. For educational purposes.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-black rounded"></div>
                <span className="text-xl font-semibold">DETSU CREATIVE</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)}>×</button>
            </div>
            
            <div className="space-y-6">
              {['Work', 'Capabilities', 'About', 'Careers', 'News', 'Contact'].map((item) => (
                <a key={item} href="#" className="block text-2xl font-semibold py-3">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DentsuCreativeClone;