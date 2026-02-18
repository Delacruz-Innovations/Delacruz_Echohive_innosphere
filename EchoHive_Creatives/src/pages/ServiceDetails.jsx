import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams } from 'react-router-dom';
import servicesData from '../data/servicesData.json';
import CalendlyPopup from '../components/CalendlyPopup';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetails() {
  const { id } = useParams();
  const service = servicesData.services.find(s => s.id === id);

  // Refs declarations
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const subtitleRef = useRef(null);
  const whyRef = useRef(null);
  const whyContentRef = useRef(null);
  const capabilitiesRef = useRef([]);

  if (!service) {
    return <div className="bg-black min-h-screen text-white flex items-center justify-center">Service not found</div>;
  }

  const { heroTitle, heroSubtitle, heroImage, whyTitle, whyContent, capabilities } = service.details;

  useEffect(() => {
    // Initialize capabilitiesRef array
    capabilitiesRef.current = capabilitiesRef.current.slice(0, capabilities.length);

    // Hero title animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Hero subtitle animation
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Hero image animation
    gsap.fromTo(
      heroImageRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.5,
        ease: 'back.out(1.2)',
      }
    );

    // Why section animation
    ScrollTrigger.create({
      trigger: whyRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(whyRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });

    // Why content animation
    if (whyContentRef.current) {
      ScrollTrigger.create({
        trigger: whyContentRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(whyContentRef.current.children, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
          });
        },
      });
    }

    // Capabilities sections animation
    capabilitiesRef.current.forEach((section, index) => {
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(section, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        onEnterBack: () => {
          gsap.to(section, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        onLeave: () => {
          gsap.to(section, {
            opacity: 0.3,
            x: -30,
            duration: 0.6,
            ease: 'power2.in',
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            opacity: 0.3,
            x: 30,
            duration: 0.6,
            ease: 'power2.in',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [capabilities.length]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-35 pb-20">
        <h1
          ref={heroRef}
          className="text-5xl md:text-8xl font-bold text-center mb-6"
        >
          {heroTitle}
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-center max-w-3xl mb-16"
        >
          {heroSubtitle}
        </p>

        {/* Hero Image */}
        <div
          ref={heroImageRef}
          className="w-full max-w-3xl aspect-square rounded-full overflow-hidden"
        >
          <img
            src={heroImage}
            alt={heroTitle}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Why Section */}
      <section className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <h2
            ref={whyRef}
            className="text-5xl md:text-7xl font-bold text-center mb-16 opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            {whyTitle}
          </h2>

          <div
            ref={whyContentRef}
            className="max-w-4xl mx-auto space-y-8 text-center"
          >
            {whyContent.map((text, i) => (
              <p
                key={i}
                className="text-xl md:text-2xl leading-relaxed opacity-0"
                style={{ transform: 'translateY(30px)' }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Sections */}
      <section className="px-8 py-24">
        <div className="max-w-7xl mx-auto space-y-0">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              ref={(el) => (capabilitiesRef.current[index] = el)}
              className="border-t border-white/20 py-16 opacity-0"
              style={{ transform: 'translateX(-30px)' }}
            >
              <div className="max-w-5xl">
                <h3 className="text-3xl md:text-5xl font-bold mb-6">
                  {capability.title}
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl">
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-8 py-24">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            READY TO TRANSFORM<br />YOUR BRAND?
          </h2>
          <CalendlyPopup
            text="Request a Quote"
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-colors cursor-pointer inline-block"
          />
        </div>
      </section>
    </div>
  );
}