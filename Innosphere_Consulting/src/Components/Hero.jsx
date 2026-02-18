import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight, Play, X } from 'lucide-react';
import image from '../assets/hero.png'
import { gsap } from 'gsap';

import { trackCTAConversion } from '../utils/analytics';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const playBtnRef = useRef(null);
  const logosRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js').then((gsapModule) => {
        const gsap = gsapModule.default;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          titleRef.current.children,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
          0.5
        )
          .fromTo(
            descRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 },
            1
          )
          .fromTo(
            playBtnRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6 },
            1.2
          )
          .fromTo(
            logosRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
            1.5
          );

        // Floating animation for play button
        gsap.to(playBtnRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      });
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current.children,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      0.5
    )
      .fromTo(
        descRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        1
      )
      .fromTo(
        playBtnRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        1.2
      )
      .fromTo(
        logosRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        1.5
      );

    // Floating animation for play button
    gsap.to(playBtnRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  useEffect(() => {
    if (videoOpen) {
      gsap.fromTo(
        videoContainerRef.current,
        { y: '-100%' },
        { y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [videoOpen]);



  const handlePlayClick = () => {
    setVideoOpen(true);
  };

  const handleCloseVideo = () => {
    if (videoContainerRef.current) {
      gsap.to(videoContainerRef.current, {
        y: '-100%',
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => setVideoOpen(false)
      });
    } else {
      setVideoOpen(false);
    }
  };

  return (
    <div ref={heroRef} className="relative  bg-black overflow-hidden">
      {/* Background with gradient overlay */}
      {/* Background Video */}
      <img
        src={image}
        alt='innnosphare'
        className="absolute inset-0 w-full h-full object-cover opacity-30" />



      {/* Animated background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-950/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-950/10 rounded-full blur-3xl animate-pulse delay-1000"></div>



      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <svg className="w-16 h-16 text-slate-950/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 animate-float-delay-1">
          <svg className="w-12 h-12 text-slate-950/20" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float-delay-2">
          <svg className="w-14 h-14 text-slate-950/20" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float-delay-3">
          <svg className="w-10 h-10 text-slate-950/20" fill="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 animate-float">
          <svg className="w-16 h-16 text-slate-950/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-10 animate-float-delay-1">
          <svg className="w-12 h-12 text-[#a8c5e0]/20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-40 flex flex-col items-center justify-center text-center ">

        <div className="max-w-7xl mx-auto w-full text-center flex flex-col items-center">
          {/* Left Content */}
          <div className="space-y-8 mb-8 flex flex-col items-center">

            <div ref={titleRef} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight tracking-tight">
                Empowering UAE Businesses to Scale Globally.

              </h1>

            </div>

            <div ref={descRef} className="border-l-2 border-slate-950 pl-6">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-md">
                We build effective business structures and cultures that foster innovation, strengthen collaboration, and drive measurable results.
              </p>

            </div>
          </div>

          {/* Play Button - Bottom Center */}
          <div className="flex justify-center ">
            <button
              ref={playBtnRef}
              onClick={handlePlayClick}
              className="group relative w-20 h-20 sm:w-30 sm:h-30 flex items-center justify-center"
            >
              {/* Add these wave rings */}
              <div className="absolute inset-0 bg-slate-950/20 rounded-full animate-ping"></div>
              <div className="absolute inset-0 bg-950/10 rounded-full animate-pulse"></div>

              <div className="absolute inset-0 bg-slate-950/20 rounded-full blur-xl group-hover:bg-slate-950/30 transition-all duration-300"></div>
              <div className="opacity-50 hover:opacity-100 relative w-full h-full bg-gradient-to-br from-slate-950/30 to-[#3d6a91]/30 backdrop-blur-sm rounded-full border border-slate-950/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-12 h-12 sm:w-16 sm:h-16 text-white fill-white ml-2" />
              </div>
            </button>
          </div>
        </div>

        {/* Client Logos */}
        <CalendlyPopup
          text="BOOK A FREE CONSULTATION"
          className="mt-20 p-6 bg-[#6b9dc7] text-white font-semibold rounded-md text-md flex items-center gap-2 border-none cursor-pointer hover:bg-blue-600 transition-colors"
        />
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          ref={videoContainerRef}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md"
        >
          <button
            onClick={handleCloseVideo}
            className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );

};

export default Hero