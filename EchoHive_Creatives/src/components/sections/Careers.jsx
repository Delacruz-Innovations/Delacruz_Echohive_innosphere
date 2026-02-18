import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Careers() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const whyJoinRef = useRef(null);
  const whyJoinTextRef = useRef(null);
  const photosRef = useRef(null);
  const photoItemsRef = useRef([]);
  const diversityRef = useRef(null);
  const diversityTextRef = useRef(null);
  const diversityImagesRef = useRef([]);
  const spotlightRef = useRef(null);
  const spotlightCardsRef = useRef([]);
  const footerRef = useRef(null);

  const talentSpotlight = [
    {
      name: 'DIMITRA',
      lastName: 'GEORGAKIS',
      role: 'CHIEF CLIENT OFFICER,',
      company: 'DENTSU CREATIVE CANADA',
      bg: 'bg-yellow-50',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      description: 'DIMITRA GEORGAKIS SHARES EXPECTATIONS FOR AI, INNOVATION AND COLLABORATION AND WHAT THIS MEANS FOR CMOS IN 2025.',
    },
    {
      name: 'ABI EVANS',
      lastName: '',
      role: 'CHIEF GROWTH OFFICER',
      company: 'DENTSU CREATIVE U.S.',
      bg: 'bg-black',
      textColor: 'text-white',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      description: 'ABI EVANS, CHIEF GROWTH OFFICER, DENTSU CREATIVE U.S., SELECTED AS ADWEEK 50 WINNER.',
      badge: 'ADWEEK 50 WINNER',
    },
    {
      name: 'LIVIO',
      lastName: 'GROSSI',
      role: 'GROUP ECD, DENTSU REDDER',
      company: 'DENTSU CREATIVE VIETNAM',
      bg: 'bg-pink-300',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      description: 'LIVIO GROSSI DISCUSSES HIS ADVERTISING CREATIVE JOURNEY AND THE EVOLVING LANDSCAPE OF CULTURE, TECHNOLOGY AND ENTERTAINMENT FOR BRANDS.',
    },
    {
      name: 'EMMA',
      lastName: 'ODENDAAL',
      role: 'INTERIM HEAD OF INFLUENCE, EMEA,',
      company: 'DENTSU CREATIVE SOUTH AFRICA',
      bg: 'bg-yellow-50',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      description: 'WHY EMMA ODENDAAL SAYS IT\'S THE "ERA OF AUTHENTICITY".',
    },
  ];

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Why Join Us section
    ScrollTrigger.create({
      trigger: whyJoinRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(whyJoinRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(whyJoinTextRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        });
      },
    });

    // Photos grid
    ScrollTrigger.create({
      trigger: photosRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(photoItemsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
        });
      },
    });

    // Diversity section
    ScrollTrigger.create({
      trigger: diversityRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(diversityRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
        gsap.to(diversityTextRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        });
      },
    });

    // Diversity images
    ScrollTrigger.create({
      trigger: diversityRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.to(diversityImagesRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
    });

    // Spotlight cards
    ScrollTrigger.create({
      trigger: spotlightRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(spotlightCardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
    });

    // Footer CTA
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(footerRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.2)',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % talentSpotlight.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + talentSpotlight.length) % talentSpotlight.length);
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        
        {/* Three.js Background - Contact Style */}
        <div 
          ref={(mountDiv) => {
            if (!mountDiv || mountDiv.dataset.initialized) return;
            mountDiv.dataset.initialized = 'true';
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            mountDiv.appendChild(renderer.domElement);

            // Particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 1500;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i++) {
              posArray[i] = (Math.random() - 0.5) * 15;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const material = new THREE.PointsMaterial({
              size: 0.02,
              color: 0x3b82f6,
              transparent: true,
              opacity: 0.8,
            });

            const particlesMesh = new THREE.Points(particlesGeometry, material);
            scene.add(particlesMesh);

            camera.position.z = 3;

            let animationFrameId;
            const animate = () => {
              animationFrameId = requestAnimationFrame(animate);
              particlesMesh.rotation.y += 0.0005;
              particlesMesh.rotation.x += 0.0002;
              particlesMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;
              renderer.render(scene, camera);
            };
            animate();

            const handleResize = () => {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);
          }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />

        <h1
          ref={heroRef}
          className="relative z-10 text-white text-7xl md:text-9xl font-bold tracking-tight text-center mb-8"
        >
          CAREERS
        </h1>
       <Link to="/allcareers"> <button
          ref={ctaRef}
          className="relative z-10 bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-colors"
        >
          VIEW CAREERS
        </button>
        </Link>
      </section>

      {/* Why Join Us Section */}
      <section className="min-h-screen bg-black px-8 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <h2
            ref={whyJoinRef}
            className="text-white text-5xl md:text-6xl font-bold leading-tight opacity-0"
            style={{ transform: 'translateX(-30px)' }}
          >
            WHY JOIN US?
          </h2>
          <p
            ref={whyJoinTextRef}
            className="text-white text-2xl md:text-3xl leading-relaxed opacity-0"
            style={{ transform: 'translateX(30px)' }}
          >
            Do you want to join the ultimate creative playground that uses
            transformative creativity to impact people, business and society? We
            are always on the lookout for brilliant new talent and would love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Photos Grid Section */}
      <section ref={photosRef} className="bg-black px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop',
              'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=600&fit=crop',
            ].map((src, index) => (
              <div
                key={index}
                ref={(el) => (photoItemsRef.current[index] = el)}
                className={`overflow-hidden rounded-lg opacity-0 ${
                  index === 1 ? 'row-span-2' : ''
                } ${index === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
                style={{ transform: 'scale(0.8)' }}
              >
                <img
                  src={src}
                  alt={`Team photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diversity Section */}
      <section className="min-h-screen bg-black px-8 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <h2
            ref={diversityRef}
            className="text-white text-5xl md:text-6xl font-bold leading-tight opacity-0"
            style={{ transform: 'translateX(-30px)' }}
          >
            DIVERSITY, EQUITY & INCLUSION
          </h2>
          <div
            ref={diversityTextRef}
            className="space-y-6 text-white text-xl leading-relaxed opacity-0"
            style={{ transform: 'translateX(30px)' }}
          >
            <p>
              We are truly committed to creating long-term sustainable change in
              society and within our company.
            </p>
            <p>
              This begins with the values of equality, respect, empowerment and
              inclusion, which supports our commitment to create a fair and
              equitable workplace where everyone feels they belong, where they
              can unleash their full creativity, empathy and courage.
            </p>
            <p>
              Diversity, equity and inclusion sit at the heart of our 'Social
              Impact' strategy, our fully integrated sustainability strategy
              which includes our ambition to build a fair and more equal
              society, where everyone is equipped to thrive.
            </p>
          </div>
        </div>

        {/* Diversity Images */}
        <div className="max-w-7xl mx-auto mt-24 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&h=500&fit=crop',
          ].map((src, index) => (
            <div
              key={index}
              ref={(el) => (diversityImagesRef.current[index] = el)}
              className="overflow-hidden rounded-lg opacity-0"
              style={{ transform: 'translateY(30px)' }}
            >
              <img
                src={src}
                alt={`Diversity ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Talent Spotlight Section */}
      <section ref={spotlightRef} className="bg-black px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-white text-4xl md:text-5xl font-bold">
              TALENT SPOTLIGHT
            </h2>
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                →
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {talentSpotlight.map((person, index) => (
                <div
                  key={index}
                  ref={(el) => (spotlightCardsRef.current[index] = el)}
                  className="min-w-full px-2 opacity-0"
                  style={{ transform: 'translateY(30px)' }}
                >
                  <div
                    className={`${person.bg} ${
                      person.textColor || 'text-black'
                    } rounded-lg overflow-hidden h-[600px] relative`}
                  >
                    <div className="p-8">
                      <h3 className="text-4xl md:text-5xl font-bold mb-2">
                        {person.name}{' '}
                        <span className="font-outline-2">{person.lastName}</span>
                      </h3>
                      {person.badge && (
                        <div className="absolute top-8 right-8 bg-white text-black px-4 py-2 rounded text-sm font-bold">
                          {person.badge}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-end gap-8">
                        <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white">
                          <img
                            src={person.image}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 pb-8">
                          <p className="text-sm font-bold mb-2">
                            {person.role}
                          </p>
                          <p className="text-sm font-bold mb-4">
                            {person.company}
                          </p>
                          <p className="text-sm mb-4">{person.description}</p>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
        <div
          ref={footerRef}
          className="text-center opacity-0"
          style={{ transform: 'scale(0.9)' }}
        >
          <h2 className="text-white text-6xl md:text-8xl font-bold leading-tight mb-8">
            INVENT THE<br />FUTURE WITH US
          </h2>
       <Link to='/allcareers'>   <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-colors">
            VIEW CAREERS
            
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
}