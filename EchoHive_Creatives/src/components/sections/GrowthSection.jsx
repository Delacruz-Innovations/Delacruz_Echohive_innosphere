import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GrowthSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;

    // Clear any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create a master timeline for better performance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom top',
        scrub: 1.5,
        markers: false,
        invalidateOnRefresh: true, // Responsive fix
        onUpdate: (self) => {
          // Optimize performance during scroll
          if (self.progress > 0.1 && self.progress < 0.9) {
            gsap.ticker.fps(30);
          } else {
            gsap.ticker.fps(60);
          }
        }
      }
    });

    // Animate title from left
    tl.fromTo(
      title,
      {
        opacity: 0,
        x: -150,
        scale: 0.85,
        rotation: -5
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out'
      },
      0
    );

    // Animate description from right
    tl.fromTo(
      description,
      {
        opacity: 0,
        x: 150,
        scale: 0.85,
        rotation: 5
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'power3.out'
      },
      0.1 // Slight stagger
    );

    // Fade out both elements as section leaves
    tl.to([title, description], {
      opacity: 0,
      y: -100,
      scale: 0.8,
      duration: 0.8,
      ease: 'power2.in'
    }, 0.6);

    animationRef.current = tl;

    // Handle responsive behavior
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    // Throttled resize handler
    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    window.addEventListener('resize', throttledResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', throttledResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="bg-black overflow-hidden">
      {/* Main Growth Section */}
      <section
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8"
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left Side - GROWTH Title */}
          <div className="flex items-center justify-center lg:justify-start order-1 lg:order-1">
            <h1
              ref={titleRef}
              className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase text-white tracking-tight leading-tight sm:leading-none text-center lg:text-left"
              style={{ opacity: 0 }}
            >
              Growth
            </h1>
          </div>

          {/* Right Side - Description Text */}
          <div className="flex items-center justify-center lg:justify-start order-2 lg:order-2">
            <p
              ref={descriptionRef}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-relaxed sm:leading-relaxed md:leading-relaxed font-light text-center lg:text-left max-w-2xl"
              style={{ opacity: 0 }}
            >
              In today's world, clients are desperate for growth, but the old levers of generating growth aren't working.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrowthSection;