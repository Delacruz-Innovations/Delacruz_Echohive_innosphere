import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import servicesData from '../../data/servicesData.json';
import CalendlyPopup from '../CalendlyPopup';

// Extract services array from the imported data
const services = servicesData.services || [];

/**
 * Simulates the Checkerboard/Staggered Reveal Effect for Text.
 * Applies scale, opacity, and translation based on visibility and uses an index delay.
 */
const CheckerboardText = ({ text, isVisible }) => {
  // Use a transition duration multiplier for longer text in the H1
  const durationMultiplier = text.length > 20 ? 0.02 : 0.05;

  return (
    <span className="inline-flex flex-wrap">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`
            transition-all duration-700 ease-out inline-block
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'}
          `}
          // The staggered delay creates the patterned/checkerboard feel
          style={{ transitionDelay: isVisible ? `${index * 50 * durationMultiplier}ms` : '0ms' }}
        >
          {char === ' ' ? '\u00A0' : char} {/* Preserve spaces */}
        </span>
      ))}
    </span>
  );
};

/**
 * Simulates the Blinds/Blinks Fade Effect for Description Text.
 * Uses max-height and opacity on split lines to create a vertical reveal.
 */
const BlindsDescription = ({ text, isVisible, delay = 0 }) => {
  // Use a simple split by sentence/phrase to simulate "lines" for the blinds effect
  const lines = text.split('. ');

  return (
    <div className="space-y-1 overflow-hidden">
      {lines.map((line, lineIndex) => (
        <p
          key={lineIndex}
          className="transition-all duration-700 ease-in-out font-light text-gray-300"
          style={{
            // Animate max-height from 0 to a safe large number, simulating blinds opening
            maxHeight: isVisible ? '100px' : '0',
            opacity: isVisible ? '1' : '0',
            // Delay after any initial parent animation
            transitionDelay: isVisible ? `${delay + lineIndex * 150}ms` : '0ms',
          }}
        >
          {line.trim() + (lineIndex < lines.length - 1 ? '.' : '')}
        </p>
      ))}
    </div>
  );
};

// --- Main OurServices Component ---
const OurServices = () => {
  const [visibleItems, setVisibleItems] = useState({});
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const [introVisible, setIntroVisible] = useState(false);
  const navigate = useNavigate();

  // 1. Intersection Observer for the main header (fade in and out on scroll)
  useEffect(() => {
    const introObserver = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on intersection status (true or false)
        setIntroVisible(entry.isIntersecting);
      },
      // Use a 0.5 threshold so the header fades in when half visible, and fades out when less than half is visible
      { threshold: 0.5 }
    );

    if (introRef.current) {
      introObserver.observe(introRef.current);
    }
    return () => introObserver.disconnect();
  }, []);

  // 2. Intersection Observer for individual service items (fade in and out on scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const itemId = entry.target.getAttribute('data-id');

          // Set visibility based on intersection status (true or false)
          setVisibleItems(prev => ({
            ...prev,
            [itemId]: entry.isIntersecting,
          }));
        });
      },
      // Trigger when 10% of the item is visible
      { rootMargin: '0px', threshold: 0.1 }
    );

    // Observe each service item dynamically
    if (sectionRef.current) {
      Array.from(sectionRef.current.children).forEach(child => {
        if (child.getAttribute('data-id')) {
          observer.observe(child);
        }
      });
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-black text-white p-6 md:p-12 lg:p-8 font-inter">
      <style>{`
        /* Custom font for a clean, modern look */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* --- Header Section (H1 Checkerboard & P Blinks) --- */}
        <header ref={introRef} className="pb-12 md:pb-20 lg:pb-32 text-center pt-10">

          {/* H1: Checkerboard Fade In/Out */}
          <h1 className={`text-5xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight ${introVisible ? 'text-white' : 'text-gray-600'}`}>
            <CheckerboardText
              text="OUR SERVICES"
              isVisible={introVisible}
            />
          </h1>

          {/* P: Blinks Fade In/Out (The description you wanted to keep) */}
          <div className="max-w-3xl mx-auto text-lg sm:text-xl font-light leading-relaxed">
            <BlindsDescription
              text="Our end-to-end creative offering means we let the problem dictate the solution. Transformative Creativity helps us start with curiosity not bias, finding the most commercial and good solution. Find out more by exploring our offering."
              isVisible={introVisible}
              // Adjust delay to 500ms for a staggered flow after H1 starts
              delay={200}
            />
          </div>
        </header>

        {/* --- Services List Section (Observer Root) --- */}
        <section ref={sectionRef} className="">
          {services.map((service) => (
            <div
              key={service.id}
              data-id={service.id}
              onClick={() => navigate(`/services/${service.id}`)}
              className="group border-t border-gray-700 py-14 px-2 transition-colors duration-200 hover:border-indigo-500 cursor-pointer hover:bg-gray-500/10"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start">

                {/* Number & Title (Staggered Checkerboard Effect - Fade In/Out) */}
                <div className="flex items-start">
                  <span className={`text-xl sm:text-3xl font-extrabold mr-4 lg:mr-8 transition-opacity duration-500 delay-500 ${visibleItems[service.id] ? 'opacity-100 text-indigo-400' : 'opacity-0 text-gray-600'}`}>
                    {service.number}
                  </span>
                  <h2 className="text-3xl sm:text-6xl md:text-7xl xl:text-7xl leading-none">
                    <CheckerboardText
                      text={service.title}
                      isVisible={visibleItems[service.id]}
                    />
                  </h2>
                </div>

              </div>
            </div>
          ))}
        </section>

        {/* --- CTA Section --- */}
        <section className="py-24 text-center border-t border-gray-700 mt-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            LET'S WORK TOGETHER
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to elevate your brand? Get a personalized quote for your project.
          </p>
          <CalendlyPopup
            text="Request a Quote"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer inline-block"
          />
        </section>

      </div>
    </div>
  );
};

export default OurServices;