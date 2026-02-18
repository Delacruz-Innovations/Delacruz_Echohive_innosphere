import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import newsData from '../data/NewsList.json';

gsap.registerPlugin(ScrollTrigger);

export default function Newsroom() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const listingRef = useRef(null);
  const bodyRef = useRef(null);
  const cardsRef = useRef([]);
  const [newsItems, setNewsItems] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    setNewsItems(newsData);
    setFilteredNews(newsData);
  }, []);

  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredNews(newsItems);
    } else {
      setFilteredNews(newsItems.filter(item => item.category === selectedFilter));
    }
  }, [selectedFilter, newsItems]);

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

    // Featured section fade in on scroll down, fade out on scroll up
    ScrollTrigger.create({
      trigger: featuredRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to(featuredRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onLeave: () => {
        gsap.to(featuredRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: 'power2.in',
        });
      },
      onEnterBack: () => {
        gsap.to(featuredRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(featuredRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.in',
        });
      },
    });

    // Background color change when reaching listing section
    ScrollTrigger.create({
      trigger: listingRef.current,
      start: 'top 50%',
      end: 'bottom bottom',
      onEnter: () => {
        gsap.to(bodyRef.current, {
          backgroundColor: '#ffffff',
          duration: 0.6,
          ease: 'power2.inOut',
        });
      },
      onLeaveBack: () => {
        gsap.to(bodyRef.current, {
          backgroundColor: '#000000',
          duration: 0.6,
          ease: 'power2.inOut',
        });
      },
    });

    // Animate cards on scroll with stagger
    ScrollTrigger.create({
      trigger: listingRef.current,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => {
        gsap.to(cardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
      onLeave: () => {
        gsap.to(cardsRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.in',
        });
      },
      onEnterBack: () => {
        gsap.to(cardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(cardsRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.in',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredNews]);

  const handleNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  const featuredNews = newsItems[0];

  return (
    <div ref={bodyRef} className="bg-black transition-colors duration-600">
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

            for (let i = 0; i < particlesCount * 3; i++) {
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
          NEWSROOM
        </h1>
      </section>

      {/* Featured Section */}
      {featuredNews && (
        <section
          ref={featuredRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 opacity-0 cursor-pointer"
          style={{ transform: 'translateY(30px)' }}
          onClick={() => handleNewsClick(featuredNews.id)}
        >
          <div className="max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              <div>
                <p className="text-yellow-400 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 tracking-wider">
                  {featuredNews.category}
                </p>
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
                  {featuredNews.subtitle || featuredNews.title}
                </h2>
                <button className="text-white border border-blue-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base">
                  {featuredNews.hasRegister ? 'Register Now' : 'Read More'}
                  <span>→</span>
                </button>
                <p className="text-gray-400 text-xs sm:text-sm mt-4 sm:mt-5 md:mt-6">{featuredNews.date}</p>
              </div>
              <div className="relative order-first lg:order-last">
                <img
                  src={featuredNews.image}
                  alt="Featured"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Listing Section */}
      <section ref={listingRef} className="min-h-screen px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Filter Dropdown */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <select
              className="border border-gray-300 rounded px-3 sm:px-4 py-2.5 sm:py-3 w-full md:w-64 bg-white text-gray-800 text-sm sm:text-base"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option>All</option>
              <option>TRENDS</option>
              <option>INNOVATION</option>
              <option>GEAR GUIDE</option>
              <option>BRAND STRATEGY</option>
              <option>EVENT PLANNING</option>
            </select>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {filteredNews.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="opacity-0 cursor-pointer"
                style={{ transform: 'translateY(30px)' }}
                onClick={() => handleNewsClick(item.id)}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'EVENTS' && (
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-yellow-400"></div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <p className="text-blue-600 text-xs font-bold mb-2 sm:mb-3 tracking-wider">
                      {item.type}
                    </p>
                    <h3 className="text-gray-900 text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 leading-tight line-clamp-3">
                      {item.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                      <p className="text-gray-500 text-xs sm:text-sm">{item.date}</p>
                      {item.hasRegister && (
                        <button className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto">
                          REGISTER <span>→</span>
                        </button>
                      )}
                    </div>
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