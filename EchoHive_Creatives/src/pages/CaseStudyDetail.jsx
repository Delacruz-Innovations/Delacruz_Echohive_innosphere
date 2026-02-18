import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams, useNavigate } from 'react-router-dom';
import caseStudyData from '../data/CaseStudyData.json';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyDetail() {
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const metaRef = useRef(null);
  const heroImageRef = useRef(null);
  const storyRef = useRef(null);
  const storyTextRef = useRef(null);
  const challengeRef = useRef(null);
  const challengeTextRef = useRef(null);
  const viralGridRef = useRef(null);
  const viralItemsRef = useRef([]);
  const weirdRef = useRef(null);
  const weirdImagesRef = useRef([]);
  const solutionRef = useRef(null);
  const solutionTextRef = useRef(null);
  const resultsRef = useRef(null);
  const resultsImagesRef = useRef([]);

  const { id } = useParams();
const navigate = useNavigate();
const caseStudy = caseStudyData.caseStudies.find(cs => cs.id === id);

if (!caseStudy) {
  return <div className="bg-black min-h-screen text-white flex items-center justify-center">
    <p>Case study not found</p>
  </div>;
}

  useEffect(() => {
    // Hero animations
    gsap.fromTo(
      heroTitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      heroDescRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(
      metaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' }
    );

    // Hero image scroll animation
    ScrollTrigger.create({
      trigger: heroImageRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(heroImageRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        });
      },
    });

    // Story section
    ScrollTrigger.create({
      trigger: storyRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(storyTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });

    // Challenge section
    ScrollTrigger.create({
      trigger: challengeRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(challengeRef.current.querySelector('h2'), {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(challengeTextRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        });
      },
    });

    // Viral grid animation
    ScrollTrigger.create({
      trigger: viralGridRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(viralItemsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.2)',
        });
      },
    });

    // Weird section
    ScrollTrigger.create({
      trigger: weirdRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(weirdRef.current.querySelector('h2'), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(weirdRef.current.querySelector('p'), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        });
        gsap.to(weirdImagesRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.4,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
    });

    // Solution section
    ScrollTrigger.create({
      trigger: solutionRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(solutionRef.current.querySelector('h3'), {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(solutionRef.current.querySelector('h2'), {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.1,
          ease: 'power2.out',
        });
        gsap.to(solutionTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        });
      },
    });

    // Results section
    ScrollTrigger.create({
      trigger: resultsRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(resultsImagesRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Mock TikTok grid data
  const tiktokVideos = Array(12).fill(null).map((_, i) => ({
    id: i,
    thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=400&h=600&fit=crop`,
  }));

return (
  <div className="bg-black min-h-screen text-white">
    {/* Hero Section */}
    <section ref={heroRef} className="min-h-screen px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8" ref={metaRef}>
          <p className="text-sm font-bold mb-4">{caseStudy.brand}</p>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Created by: {caseStudy.createdBy}</p>
            </div>
            <div>
              <button 
                onClick={() => navigate('/work')}
                className="text-sm font-bold hover:text-blue-500 transition-colors"
              >
                Explore: ALL WORK →
              </button>
            </div>
          </div>
        </div>

        <h1 ref={heroTitleRef} className="text-5xl md:text-7xl font-bold mb-6">
          {caseStudy.title}
        </h1>
        
        <p ref={heroDescRef} className="text-xl md:text-2xl mb-12 max-w-4xl">
          {caseStudy.description}
        </p>

        <div
          ref={heroImageRef}
          className="w-full h-[600px] rounded-lg overflow-hidden opacity-0"
          style={{ transform: 'translateY(50px)' }}
        >
          <img src={caseStudy.heroImage} alt={caseStudy.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    {/* Story Section with Background Color */}
    <section ref={storyRef} className="min-h-screen flex items-center px-8 py-24" style={{ backgroundColor: caseStudy.storyBgColor }}>
      <div className="max-w-4xl mx-auto">
        <p ref={storyTextRef} className="text-2xl md:text-4xl leading-relaxed text-center opacity-0" style={{ transform: 'translateY(30px)' }}>
          {caseStudy.storyText}
        </p>
      </div>
    </section>

    {/* Challenge Section */}
    <section ref={challengeRef} className="px-8 py-24">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-sm font-bold mb-4 opacity-0" style={{ transform: 'translateX(-30px)' }}>
          CHALLENGE
        </h3>
        <h2 className="text-4xl md:text-6xl font-bold mb-8 opacity-0" style={{ transform: 'translateX(-30px)' }}>
          {caseStudy.challenge.title}
        </h2>
        <p ref={challengeTextRef} className="text-lg md:text-xl leading-relaxed opacity-0" style={{ transform: 'translateX(30px)' }}>
          {caseStudy.challenge.description}
        </p>
      </div>
    </section>

    {/* TikTok Grid Section */}
    <section ref={viralGridRef} className="px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {tiktokVideos.map((video, index) => (
            <div
              key={video.id}
              ref={(el) => (viralItemsRef.current[index] = el)}
              className="aspect-[9/16] bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-lg overflow-hidden opacity-0"
              style={{ transform: 'scale(0.8)' }}
            >
              <div className="w-full h-full flex items-center justify-center text-4xl">
                🥜
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Feed the Weird Section */}
    <section ref={weirdRef} className="px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-right mb-12">
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            {caseStudy.weirdSection.title}
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl ml-auto opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            {caseStudy.weirdSection.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {caseStudy.weirdSection.images.map((src, index) => (
            <div
              key={index}
              ref={(el) => (weirdImagesRef.current[index] = el)}
              className="aspect-square rounded-lg overflow-hidden opacity-0"
              style={{ transform: 'translateY(30px) scale(0.9)' }}
            >
              <img
                src={src}
                alt={`Weird content ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Solution Section */}
    <section ref={solutionRef} className="px-8 py-24">
      <div className="max-w-5xl mx-auto">
        <h3
          className="text-sm font-bold mb-4 opacity-0"
          style={{ transform: 'translateX(-30px)' }}
        >
          SOLUTION
        </h3>
        <h2
          className="text-4xl md:text-6xl font-bold mb-8 opacity-0"
          style={{ transform: 'translateX(-30px)' }}
        >
          {caseStudy.solution.title}
        </h2>
        <p
          ref={solutionTextRef}
          className="text-lg md:text-xl leading-relaxed opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          {caseStudy.solution.description}
        </p>
      </div>
    </section>

    {/* Results Section */}
    <section ref={resultsRef} className="px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudy.resultsImages.map((src, index) => (
            <div
              key={index}
              ref={(el) => (resultsImagesRef.current[index] = el)}
              className="aspect-[4/3] rounded-lg overflow-hidden opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              <img
                src={src}
                alt={`Result ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
}