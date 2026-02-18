import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CalendlyPopup from './CalendlyPopup';

export default function Navbar() {
  const navRef = useRef(null);
  const textElementsRef = useRef([]);

  // State to track if the navbar should be visible (controlled by scroll direction)
  const [isVisible, setIsVisible] = useState(true);

  // --- Initial Entrance Animation and Text Color Logic (Existing) ---
  useEffect(() => {
    // 1. Initial GSAP entrance animation
    // Set initial position and fade in the whole navbar
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Animate individual text elements (staggered)
    gsap.fromTo(textElementsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "<0.2" // Starts 0.2 seconds after the navbar animation starts
    );

    // 2. Intersection Observer for dynamic text color (Original Logic)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            const bgColor = getComputedStyle(section).backgroundColor;
            const isLight = isLightColor(bgColor);

            updateTextColors(isLight ? 'dark' : 'light');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section, .section, [data-bg-section]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // --- Scroll-based Visibility Logic (New Implementation) ---
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let currentScrollY = window.scrollY;

    // Set a threshold for when to start hiding the navbar
    const scrollThreshold = 100;

    const handleScroll = () => {
      currentScrollY = window.scrollY;

      // Logic:
      // 1. Scrolling Down (and past the initial threshold)
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        if (isVisible) {
          // Hide the navbar smoothly using GSAP
          gsap.to(navRef.current, { y: -100, opacity: 0, duration: 0.3, ease: "power2.in" });
          setIsVisible(false);
        }
      }
      // 2. Scrolling Up (or back to the very top)
      else if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) {
        if (!isVisible) {
          // Show the navbar immediately using GSAP
          gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
          setIsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]); // Depend on isVisible to re-run only when state changes

  // --- Helper functions (Original) ---
  const isLightColor = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return false;

    const [r, g, b] = rgb.map(Number);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const updateTextColors = (mode) => {
    const textColor = mode === 'light' ? 'text-black' : 'text-white';
    const hoverColor = mode === 'light' ? 'hover:text-gray-700' : 'hover:text-gray-300';
    const buttonBg = mode === 'light' ? 'bg-black text-white' : 'bg-white text-black';
    const buttonHover = mode === 'light' ? 'hover:bg-gray-900' : 'hover:bg-gray-200';

    textElementsRef.current.forEach((element) => {
      if (element) {
        // Remove existing color classes
        element.className = element.className.replace(
          /text-(black|white|gray-\d+)/g,
          ''
        ).replace(
          /hover:text-(black|white|gray-\d+)/g,
          ''
        ).replace(
          /bg-(black|white)/g,
          ''
        ).replace(
          /hover:bg-(gray-\d+)/g,
          ''
        );

        // Add new classes based on element type
        if (element.tagName === 'BUTTON') {
          element.className += ` ${buttonBg} ${buttonHover} transition-colors`;
        } else {
          element.className += ` ${textColor} ${hoverColor} transition-colors`;
        }
      }
    });
  };

  const addToTextRefs = (el) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-transparent z-50 backdrop-blur-sm"
    >
      {/* Navbar content */}
      <div className="relative z-10 flex items-center justify-between px-8 h-28">
        {/* Logo */}
        <div
          ref={addToTextRefs}
          className="text-3xl font-bold tracking-wider text-white"
        >
          DC
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-8">
          <a
            ref={addToTextRefs}
            href="#work"
            className="text-sm font-semibold tracking-wider text-white hover:text-gray-300 transition-colors"
          >
            WORK
          </a>
          <a
            ref={addToTextRefs}
            href="#services"
            className="text-sm font-semibold tracking-wider text-white hover:text-gray-300 transition-colors"
          >
            SERVICES
          </a>
          <a
            ref={addToTextRefs}
            href="#about"
            className="text-sm font-semibold tracking-wider text-white hover:text-gray-300 transition-colors"
          >
            ABOUT
          </a>
          <a
            ref={addToTextRefs}
            href="#locations"
            className="text-sm font-semibold tracking-wider text-white hover:text-gray-300 transition-colors"
          >
            LOCATIONS
          </a>
          <a
            ref={addToTextRefs}
            href="#news"
            className="text-sm font-semibold tracking-wider text-white hover:text-gray-300 transition-colors"
          >
            NEWS
          </a>
          <a
            ref={addToTextRefs}
            href="#careers"
            className="text-sm font-semibold tracking-wider text-white hover:text-gray-300 transition-colors"
          >
            CAREERS
          </a>
          <CalendlyPopup
            text="CONTACT"
            className="text-sm font-semibold tracking-wider text-white hover:text-gray-300 transition-colors cursor-pointer"
          />

          {/* Language selector */}
          <button
            ref={addToTextRefs}
            className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            EN-GB
          </button>
        </div>
      </div>
    </nav>
  );
}