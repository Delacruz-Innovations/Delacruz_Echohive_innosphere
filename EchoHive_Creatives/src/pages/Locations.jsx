import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { expandedRegions, regions } from '../data/locations';

gsap.registerPlugin(ScrollTrigger);

export default function Locations() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openRegion, setOpenRegion] = useState(null);
  const [openCountry, setOpenCountry] = useState(null);
  const heroRef = useRef(null);
  const regionalRef = useRef(null);
  const regionsRef = useRef([]);
  const expandedRef = useRef(null);
  const expandedRegionsRef = useRef([]);

  useEffect(() => {
    // Hero title animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }
    );

    // Regional section animation
    ScrollTrigger.create({
      trigger: regionalRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(regionalRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });

    // Stagger animation for region cards
    ScrollTrigger.create({
      trigger: regionalRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(regionsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
    });

    // Expanded view animations
    if (expandedRef.current) {
      ScrollTrigger.create({
        trigger: expandedRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(expandedRegionsRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [searchOpen]);

  const toggleRegion = (regionName) => {
    if (openRegion === regionName) {
      setOpenRegion(null);
      setOpenCountry(null);
    } else {
      setOpenRegion(regionName);
      setOpenCountry(null);
    }
  };

  const toggleCountry = (countryName, e) => {
    e.stopPropagation();
    setOpenCountry(openCountry === countryName ? null : countryName);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
        
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
          className="relative z-10 text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-center"
        >
          LOCATIONS
        </h1>
      </section>

      {/* Regional Contact Details Section */}
      <section className="bg-neutral-800 px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
        <div
          ref={regionalRef}
          className="max-w-7xl mx-auto opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          <p className="text-gray-400 text-xs sm:text-sm font-semibold mb-8 sm:mb-10 md:mb-12 tracking-wider">
            REGIONAL CONTACT DETAILS
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {regions.map((region, index) => (
              <div
                key={index}
                ref={(el) => (regionsRef.current[index] = el)}
                className="opacity-0"
                style={{ transform: 'translateY(30px)' }}
              >
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  {region.name}
                </h2>
                <button className="text-white text-xs sm:text-sm font-bold hover:text-blue-500 transition-colors">
                  {region.link}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded View Section */}
      <section ref={expandedRef} className="bg-black px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="flex items-center bg-neutral-800 rounded-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-3 sm:mr-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="SEARCH OUR LOCATIONS"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-gray-400 text-sm sm:text-base md:text-lg outline-none placeholder-gray-500"
                />
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSearchOpen(false);
                  }}
                  className="ml-3 sm:ml-4 text-white hover:text-gray-400 transition-colors flex-shrink-0"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Regions List */}
          <div className="space-y-0">
            {expandedRegions.map((region, index) => (
              <div
                key={index}
                ref={(el) => (expandedRegionsRef.current[index] = el)}
                className="group border-t border-neutral-800 py-6 sm:py-7 md:py-8 opacity-0 cursor-pointer"
                style={{ transform: 'translateX(-30px)' }}
              >
                <div 
                  className="flex items-center justify-between"
                  onClick={() => toggleRegion(region.name)}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-2.5 md:mb-3 group-hover:text-blue-500 transition-colors">
                      {region.name}
                    </h2>
                    <button className="text-white text-xs sm:text-sm font-bold group-hover:text-blue-500 transition-colors">
                      {region.link}
                    </button>
                  </div>
                  <div className="text-white flex-shrink-0">
                    <svg
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transform transition-transform duration-300 ${
                        openRegion === region.name ? 'rotate-45' : 'group-hover:rotate-90'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Dropdown Content */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openRegion === region.name ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-0">
                    {region.countries.map((country, countryIndex) => (
                      <div key={countryIndex} className="border-t border-neutral-700">
                        <div 
                          className="flex items-center justify-between py-6 cursor-pointer hover:bg-neutral-900 transition-colors px-4 -mx-4"
                          onClick={(e) => toggleCountry(`${region.name}-${country.name}`, e)}
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-1 hover:text-blue-500 transition-colors">
                              {country.name}
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                              {country.city}
                            </p>
                          </div>
                          <div className="text-white flex-shrink-0">
                            <svg
                              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transform transition-transform duration-300 ${
                                openCountry === `${region.name}-${country.name}` ? 'rotate-45' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Country Details Dropdown */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openCountry === `${region.name}-${country.name}` ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="pb-6 px-4 space-y-4">
                            <div className=" p-6 rounded-lg">
                              <div className="space-y-3">
                                <div>
                                  <p className="text-gray-500 text-xs font-semibold mb-1">LOCATION</p>
                                  <p className="text-white text-lg">{country.city}, {country.name}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 text-xs font-semibold mb-1">CONTACT</p>
                                  <p className="text-white text-lg">{country.contact}</p>
                                </div>
                                <div className="pt-3">
                                  <button className="text-blue-500 text-sm font-bold hover:text-blue-400 transition-colors">
                                    GET DIRECTIONS →
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}