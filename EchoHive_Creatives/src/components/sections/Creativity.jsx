import React, { useState, useEffect, useRef } from 'react';
import CalendlyPopup from '../CalendlyPopup';
import { ArrowUpRight } from 'lucide-react';

// Portfolio Data - Curated Projects
const portfolioItems = [
  {
    id: 1,
    title: "Events",
    description: "Capture the energy and emotion of your special occasions.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=1200&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: 2,
    title: "Corporate",
    description: "Professional coverage for ambitious businesses.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=1200&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: 3,
    title: "Weddings",
    description: "Timeless memories of your beautiful union.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: 4,
    title: "Branding",
    description: "Visual identity that speaks louder than words.",
    image: "https://images.unsplash.com/photo-1588661726053-91b35c05c6d3?w=800&h=1200&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: 5,
    title: "Product Photography",
    description: "Showcase your products in the best light.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=1200&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  },
  {
    id: 6,
    title: "Drone / Aerial",
    description: "Sky-high perspectives for breathtaking views.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=1200&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    id: 7,
    title: "Social Media",
    description: "Engaging content for the digital generation.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=1200&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
  },
];

const MovieCard = ({ movie, isActive, isMobile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Play video when active (centered) or on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(e => console.log('Video play failed:', e));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  return (
    <div
      className="relative flex-shrink-0 w-screen h-[500px] bg-black"
    >
      {/* Background Image/Video Container */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${movie.image})`,
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          filter: isActive ? 'brightness(100%)' : 'brightness(40%)'
        }}
      />

      {/* Video Overlay (for auto-play when centered) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isPlaying ? 0.7 : 0 }}
        src={movie.video}
        loop
        muted
        playsInline
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Title/CTA Section - Only visible on the active slide */}
      {/* <div className="absolute inset-0 flex flex-col justify-end items-start p-8 md:p-24 lg:p-32 pb-32">
        <div className={`transition-all duration-700 flex flex-col items-start gap-4 max-w-2xl ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h3 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-tight">{movie.title}</h3>
          <p className="text-gray-200 text-lg md:text-xl font-light">{movie.description}</p>
          <CalendlyPopup
            text="Request a Quote"
            className="mt-4 px-8 py-4 bg-[#ffd700] hover:bg-[#e6c200] text-black font-bold tracking-wider uppercase rounded-full transition-colors duration-300 shadow-lg cursor-pointer inline-block"
          />
        </div>
      </div> */}
    </div>
  );
};


/**
 * Main Creativity component implements the scroll-pinning interaction.
 */
const Creativity = () => {
  const targetRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Events");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Inject animation styles
  useEffect(() => {
    if (!document.head.querySelector('style[data-header-animation]')) {
      const styleSheet = document.createElement("style");
      styleSheet.setAttribute('data-header-animation', 'true');
      styleSheet.textContent = `
        @keyframes letterFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  // Calculate the required vertical height for the track
  useEffect(() => {
    const handleResize = () => {
      if (cardsContainerRef.current) {
        const cardsWidth = cardsContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const totalHorizontalScrollDistance = cardsWidth - windowWidth;
        const calculatedHeight = totalHorizontalScrollDistance + windowHeight + windowHeight / 2;
        setContainerHeight(calculatedHeight);
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

  // Scroll Handling for Pinning and Translation
  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current || containerHeight === 0) return;

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const horizontalContentWidth = cardsContainerRef.current.scrollWidth;
      const maxScrollTranslation = horizontalContentWidth - windowWidth;

      if (rect.top <= 0 && rect.bottom > windowHeight) {
        setIsPinned(true);
        setIsEnded(false);

        let newScrollProgress = Math.abs(rect.top);
        newScrollProgress = Math.min(newScrollProgress, maxScrollTranslation);
        setScrollProgress(newScrollProgress);

        const newIndex = Math.round(newScrollProgress / windowWidth);
        setCurrentSlideIndex(newIndex);
        setCurrentTitle(portfolioItems[newIndex]?.title || "Events");

      } else if (rect.bottom <= windowHeight) {
        setIsPinned(false);
        setIsEnded(true);

        setScrollProgress(maxScrollTranslation);
        setCurrentSlideIndex(portfolioItems.length - 1);
        setCurrentTitle(portfolioItems[portfolioItems.length - 1]?.title || "Events");

      } else {
        setIsPinned(false);
        setIsEnded(false);

        setScrollProgress(0);
        setCurrentSlideIndex(0);
        setCurrentTitle(portfolioItems[0]?.title || "Events");
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerHeight]);

  return (
    <div className="bg-black min-h-screen ">


      {/* TRACK: The tall container that creates the vertical scroll space */}
      <div
        ref={targetRef}
        className="relative w-full bg-black"
        style={{ height: `${containerHeight}px` }}
      >
        {/* CAMERA: The view window that locks to the screen */}
        <div
          className={`
            flex flex-col justify-center  overflow-hidden h-full w-full
            ${isPinned ? 'fixed top-0 left-0 z-20' : 'absolute'}
            ${isEnded ? 'bottom-0 top-auto' : 'top-0'}
          `}
        >

          {/* Dynamic Header */}
          <header className="absolute top-16 left-0 right-0 p-6 md:p-12 z-30 transition-all duration-300 justify-center items-start flex flex-col bg-black/10 h-full pointer-events-none">
            <div className="space-y-2">
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide uppercase leading-tight">
                PORTFOLIO
              </h2>
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide uppercase leading-tight">
                PAGE
              </h2>
              <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight uppercase leading-none mt-10 mb-6">
                OUR WORK
              </h1>
              <h1
                key={currentSlideIndex}
                className="pl-8 md:pl-16 text-white text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight uppercase leading-none perspective-text"
                style={{
                  WebkitTextStroke: '2px white',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(255,255,255,0.3)'
                }}
                aria-live="polite"
              >
                {currentTitle.split('').map((letter, index) => (
                  <span
                    key={`${currentSlideIndex}-${index}`}
                    className="inline-block"
                    style={{
                      animation: 'letterFadeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </h1>
              <p className="pl-8 md:pl-16 text-white/70 text-lg md:text-xl font-light mt-4 max-w-2xl bg-black/50 p-2 backdrop-blur-sm">
                Browse our curated selection of projects across events, films, branding, drone shoots, commercials, and photography sessions.
              </p>
            </div>
          </header>

          {/* Horizontal Grid Container */}
          <div
            ref={cardsContainerRef}
            className="flex items-center h-full rotate-6 will-change-transform z-10"
            style={{
              transform: `translateX(-${scrollProgress}px)`,
              transition: isPinned ? 'none' : 'transform 0.5s ease-in-out'
            }}
          >
            {portfolioItems.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isActive={index === currentSlideIndex}
              />
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Creativity;