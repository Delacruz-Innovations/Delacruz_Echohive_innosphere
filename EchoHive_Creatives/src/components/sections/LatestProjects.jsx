import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import servicesData from '../../data/servicesData.json';
import { ArrowUpRight } from 'lucide-react';

const LatestProjects = () => {
  const targetRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const navigate = useNavigate();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get services from JSON data
  const projects = servicesData.services;

  // 1. Check Mobile & Measure Content
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // Treat tablets/mobile as "mobile" for scrolling
      setIsMobile(mobile);

      if (!mobile && cardsContainerRef.current) {
        const cardsWidth = cardsContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate height needed: horizontal scroll distance + 1 viewport height buffer
        const totalScrollDistance = cardsWidth - windowWidth;
        setContainerHeight(totalScrollDistance + windowHeight);
      } else {
        setContainerHeight('auto');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // 2. Desktop Scrolling Logic (Pinned)
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom > windowHeight) {
        setIsPinned(true);
        setIsEnded(false);
        setScrollProgress(Math.abs(rect.top));
      } else if (rect.bottom <= windowHeight) {
        setIsPinned(false);
        setIsEnded(true);
        if (cardsContainerRef.current) {
          setScrollProgress(cardsContainerRef.current.scrollWidth - window.innerWidth);
        }
      } else {
        setIsPinned(false);
        setIsEnded(false);
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerHeight, isMobile]);

  /* --- RENDER MOBILE VIEW (Native Scroll) --- */
  if (isMobile) {
    return (
      <div className="bg-black py-20 px-4 md:px-8">
        <div className="mb-12">
          <h2 className="text-white text-4xl font-bold tracking-tighter">
            OUR SERVICES <span className="text-neutral-500 block text-2xl mt-2">WHAT WE DO</span>
          </h2>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide">
          {projects.map((project, index) => (
            <div key={project.id} className="snap-center shrink-0 w-[90vw] sm:w-[80vw] md:w-[60vw]">
              <Card project={project} index={index} navigate={navigate} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* --- RENDER DESKTOP VIEW (Pinned Scroll) --- */
  return (
    <div
      ref={targetRef}
      className="relative w-full bg-black"
      style={{ height: typeof containerHeight === 'number' ? `${containerHeight}px` : 'auto' }}
    >
      <div
        className={`
          flex flex-col justify-center overflow-hidden h-screen w-full
          ${isPinned ? 'fixed top-0 left-0 z-20' : 'absolute'}
          ${isEnded ? 'bottom-0 top-auto' : 'top-0'}
        `}
      >
        {/* Header */}
        <div className="absolute top-12 left-12 z-10 pointer-events-none">
          <h2 className="text-white text-6xl font-bold tracking-tighter mix-blend-difference">
            OUR SERVICES <span className="text-neutral-500 text-4xl ml-4">WHAT WE DO</span>
          </h2>
        </div>

        {/* Moving Strip */}
        <div
          ref={cardsContainerRef}
          className="flex gap-10 px-12 items-center will-change-transform"
          style={{ transform: `translateX(-${scrollProgress}px)` }}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="shrink-0">
              <Card
                project={project}
                index={index}
                navigate={navigate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ project, index, navigate }) => {
  const handleCardClick = () => {
    navigate(`/services/${project.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative group w-full md:w-[650px] h-[500px] bg-neutral-900 rounded-xl overflow-hidden cursor-pointer border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-blue-900/20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${project.details?.heroImage})` }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-500" />
      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20">

        {/* Top Section: Number & Tag */}
        <div className="flex justify-between items-start">
          <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-xs font-bold tracking-widest text-white uppercase">{project.title}</span>
          </div>
          <span className="text-4xl font-mono font-bold text-white/20 group-hover:text-white/40 transition-colors pointer-events-none">
            {project.number}
          </span>
        </div>

        {/* Bottom Section: Title, Description, CTA */}
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <p className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-2">
            {project.subtitle}
          </p>
          <h3 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-none tracking-tight">
            {project.title}
          </h3>

          {/* Animated Expandable Section */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
            <div className="overflow-hidden">
              <p className="text-gray-300 text-lg leading-relaxed mb-6 border-l-2 border-blue-500 pl-4">
                {project.description}
              </p>
            </div>
          </div>

          {/* CTA - Always visible/prominent or organized to be 'Front' */}
          <div className="flex items-center gap-3 mt-2 group-hover:mt-0 transition-all duration-300">
            <button className="bg-white text-black px-8 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2 group-hover:translate-x-2">
              View Project
              <ArrowUpRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LatestProjects;