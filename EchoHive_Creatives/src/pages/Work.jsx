import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import caseStudyData from '../data/CaseStudyData.json';
import CalendlyPopup from '../components/CalendlyPopup';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const [selectedFilter, setSelectedFilter] = useState('HIGHLIGHTS');
  const heroRef = useRef(null);
  const filterRef = useRef(null);
  const cardsRef = useRef([]);
  const [showAll, setShowAll] = useState(false);

  const highlights = caseStudyData.caseStudies;

  const navigate = useNavigate();

  useEffect(() => {
    // Hero title animation - word by word
    const words = heroRef.current.querySelectorAll('.word');
    gsap.fromTo(
      words,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      }
    );

    // Filter dropdown animation
    gsap.fromTo(
      filterRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
      }
    );

    // Cards animation
    ScrollTrigger.create({
      trigger: '.highlights-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(cardsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-20 overflow-hidden">

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
          className="relative z-10 text-white text-4xl md:text-8xl lg:text-9xl font-bold text-center leading-tight"
        >
          <div className="word inline-block mr-4 md:mr-6">TRANSFORMATIVE</div>
          <br />
          <div className="word inline-block">CREATIVITY</div>
        </h1>
      </section>

      {/* Highlights Section */}
      <section className="md:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Filter Dropdown */}
          <div ref={filterRef} className="mb-12 opacity-0">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-black text-white border border-white rounded-full px-6 py-3 text-sm font-bold cursor-pointer hover:bg-white hover:text-black transition-colors"
            >
              <option value="HIGHLIGHTS">HIGHLIGHTS</option>
              <option value="ALL WORK">ALL WORK</option>
              <option value="CAMPAIGNS">CAMPAIGNS</option>
              <option value="INNOVATION">INNOVATION</option>
              <option value="EXPERIENCE">EXPERIENCE</option>
            </select>
          </div>

          {/* Highlights Grid */}
          <div className="highlights-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
            {highlights.slice(0, showAll ? highlights.length : 4).map((item, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => navigate(`/work/${item.id}`)}
                className="group relative overflow-hidden cursor-pointer opacity-0"
                style={{ transform: 'translateY(30px) scale(0.95)' }}
              >
                {/* Image Container */}
                <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>

                  {/* Date Badge */}
                  {item.date && (
                    <div className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-full text-xs font-bold">
                      {item.date}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-end">
                    <div className="flex-1">
                      <p className="text-sm font-bold mb-2">{item.brand}</p>
                      <p className="text-sm mb-4 max-w-md">{item.description}</p>
                      <button className="text-sm font-bold hover:text-blue-500 transition-colors flex items-center gap-2">
                        VIEW CASE
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 transition-colors duration-300 rounded-lg pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-colors"
            >
              {showAll ? 'SHOW LESS' : 'VIEW ALL WORK'}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            READY TO CREATE SOMETHING AMAZING?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's bring your vision to life. Schedule a consultation to discuss your next project.
          </p>
          <CalendlyPopup
            text="Request a Quote"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer inline-block"
          />
        </div>
      </section>
    </div>
  );
}