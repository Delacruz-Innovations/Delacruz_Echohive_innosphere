import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      // Description animation
      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });

      // Floating orb animations
      gsap.to(orb1Ref.current, {
        x: 100,
        y: -50,
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(orb2Ref.current, {
        x: -80,
        y: 60,
        scale: 0.9,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        opacity: 0.3,
        scale: 0.95
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center px-6 md:px-12 py-30 bg-black overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div
          ref={orb1Ref}
          className="absolute top-0 left-1/4 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-400"
          style={{
            filter: 'blur(100px)',
            opacity: 0.6
          }}
        ></div>
        <div
          ref={orb2Ref}
          className="absolute top-10 right-1/4 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-blue-600 to-blue-400"
          style={{
            filter: 'blur(120px)',
            opacity: 0.5
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          WHAT MAKES US DIFFERENT?
        </h1>
        <p
          ref={descRef}
          className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto"
        >
          We deliver cutting-edge solutions that transform businesses through innovation and expertise. 
          Our team combines strategic thinking with technical excellence to solve complex challenges. 
          From concept to execution, we partner with you to create sustainable growth and competitive 
          advantages that set you apart in today's dynamic marketplace.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;