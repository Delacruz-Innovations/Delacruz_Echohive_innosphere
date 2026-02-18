import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import CalendlyPopup from '../components/CalendlyPopup';

import servicesData from '../data/servicesData.json';


// --- CONSTANTS & CONFIGURATION ---
const PARTICLE_COUNT = 6000;
const PARTICLE_COLORS = [0x3B82F6, 0xEAB308];
const SCALE_FACTOR = 3.5;

// --- HELPER FUNCTIONS ---
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const randomVolumetricSpherePoint = (radius = 1) => {
  const r = Math.pow(Math.random(), 1 / 3) * radius;
  const phi = Math.random() * 2 * Math.PI;
  const theta = Math.random() * Math.PI;
  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = r * Math.sin(theta) * Math.sin(phi);
  const z = r * Math.cos(theta);
  return [x, y, z];
};

const randomConePoint = (radius, height) => {
  const h = Math.random() * height;
  const r = (1 - h / height) * radius;
  const angle = Math.random() * 2 * Math.PI;
  const x = Math.cos(angle) * Math.sqrt(Math.random()) * r;
  const z = Math.sin(angle) * Math.sqrt(Math.random()) * r;
  return [x, h - height / 2, z];
};

const randomHourglassPoint = (scale) => {
  const v = (Math.random() * 2 - 1) * scale;
  const radiusAtY = (Math.abs(v) / scale) * 0.9;
  const angle = Math.random() * Math.PI * 2;
  const x = radiusAtY * Math.cos(angle) * scale * 0.5;
  const y = v;
  const z = radiusAtY * Math.sin(angle) * scale * 0.5;
  return [x, y, z];
};

export default function Services() {
  const canvasRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const triggerTransitionRef = useRef(null);
  const rendererRef = useRef(null);
  const geometryRef = useRef(null);
  const containerRef = useRef(null);
  const additionalContainerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [additionalVisible, setAdditionalVisible] = useState(false);
  const navigate = useNavigate();

  const services = servicesData.services;
  const additionalServices = servicesData.additionalServices;

  // --- 3D SCENE SETUP ---
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);

    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // GEOMETRY GENERATION
    const geometry = new THREE.BufferGeometry();
    geometryRef.current = geometry;

    const fillShape = (type, array) => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x, y, z;
        const i3 = i * 3;
        const r = Math.random();

        switch (type) {
          case 'helix':
            const t = (i / PARTICLE_COUNT) * 12 * Math.PI;
            const radius = 0.5 + r * 2.0;
            x = radius * Math.cos(t);
            z = radius * Math.sin(t);
            y = t * 0.5 - 7;
            break;
          case 'pyramid':
            [x, y, z] = randomConePoint(SCALE_FACTOR * 0.9, SCALE_FACTOR * 2.5);
            break;
          case 'blob':
            [x, y, z] = randomVolumetricSpherePoint(SCALE_FACTOR);
            const noiseFactor = Math.sin(x * 1.5) * Math.cos(y * 1.5) * Math.sin(z * 1.5) * 0.7;
            x += noiseFactor * 0.8;
            y += noiseFactor * 0.8;
            z += noiseFactor * 0.8;
            break;
          case 'hourglass':
            [x, y, z] = randomHourglassPoint(SCALE_FACTOR * 1.8);
            break;
          case 'sphere':
          default:
            [x, y, z] = randomVolumetricSpherePoint(SCALE_FACTOR);
            break;
        }
        array[i3] = x;
        array[i3 + 1] = y;
        array[i3 + 2] = z;
      }
    };

    // SHAPE DEFINITIONS
    const shapePositions = {
      helix: new Float32Array(PARTICLE_COUNT * 3),
      pyramid: new Float32Array(PARTICLE_COUNT * 3),
      sphere: new Float32Array(PARTICLE_COUNT * 3),
      blob: new Float32Array(PARTICLE_COUNT * 3),
      hourglass: new Float32Array(PARTICLE_COUNT * 3),
    };

    Object.keys(shapePositions).forEach(key => fillShape(key, shapePositions[key]));

    const initialShape = services[0].shape;
    const currentPositions = Float32Array.from(shapePositions[initialShape]);
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

    // Create color attribute for particles
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = new THREE.Color(PARTICLE_COLORS[i % 2]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // TRANSITION LOGIC
    let isTransitioning = false;
    let transitionStartTime = 0;
    const transitionDuration = 1.8;
    let startSnapshot = new Float32Array(PARTICLE_COUNT * 3);
    let targetSnapshot = shapePositions[initialShape];
    let currentShape = initialShape;

    const triggerTransition = (shapeName) => {
      if (currentShape === shapeName) return;

      const target = shapePositions[shapeName] || shapePositions['sphere'];

      startSnapshot.set(geometry.attributes.position.array);
      targetSnapshot = target;
      transitionStartTime = clock.getElapsedTime();
      isTransitioning = true;
      currentShape = shapeName;
    };

    triggerTransitionRef.current = triggerTransition;

    // MOUSE INTERACTION
    let mouseX = 0;
    let mouseY = 0;
    const containerHalfX = containerWidth / 2;
    const containerHalfY = containerHeight / 2;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX = (x - containerHalfX) / 1000;
      mouseY = (y - containerHalfY) / 1000;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const time = clock.getElapsedTime();

      // Shape Morphing
      if (isTransitioning) {
        const elapsed = time - transitionStartTime;
        let progress = elapsed / transitionDuration;

        if (progress >= 1) {
          progress = 1;
          isTransitioning = false;
        }

        const ease = easeInOutCubic(progress);
        const positions = geometry.attributes.position.array;

        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
          positions[i] = startSnapshot[i] + (targetSnapshot[i] - startSnapshot[i]) * ease;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      // Camera/Mesh Rotation
      particlesMesh.rotation.x += (mouseY * 0.7 - particlesMesh.rotation.x) * 0.04;
      particlesMesh.rotation.y += (mouseX * 0.7 - particlesMesh.rotation.y) * 0.04;
      particlesMesh.rotation.z = Math.sin(time * 0.1) * 0.04;
      particlesMesh.position.y = Math.sin(time * 0.5) * 0.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (particlesMesh) scene.remove(particlesMesh);
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [services]);

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollSectionRef.current) return;

      const rect = scrollSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;

      const scrollProgress = Math.min(1, Math.max(0, -rect.top / (sectionHeight - viewportHeight)));

      const stepSize = 1 / services.length;
      let index = Math.floor(scrollProgress / stepSize);

      index = Math.max(0, Math.min(index, services.length - 1));

      if (index !== activeIndex) {
        setActiveIndex(index);
      }

      // Additional Services Visibility
      if (additionalContainerRef.current) {
        const addRect = additionalContainerRef.current.getBoundingClientRect();
        if (addRect.top < viewportHeight * 0.8) {
          setAdditionalVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, services.length]);

  // --- SYNC STATE WITH 3D ---
  useEffect(() => {
    if (triggerTransitionRef.current && services[activeIndex]) {
      triggerTransitionRef.current(services[activeIndex].shape);
    }
  }, [activeIndex, services]);

  return (
    <div className="relative bg-black min-h-screen text-white font-sans selection:bg-blue-500 selection:text-black">

      {/* Hero Section with Particles */}
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
          className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-extrabold text-center leading-[0.8] tracking-tighter transition-all duration-1000 ease-out uppercase transform ${heroVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
            }`}
        >
          We Fuel<br /><span className="text-blue-500">Growth</span>
        </h1>

      </section>

      {/* Sticky Services Section with Particles */}
      <div
        ref={scrollSectionRef}
        className="relative z-20"
        style={{ height: `${services.length * 150}vh` }}
      >
        <div
          ref={containerRef}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* 3D Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
            style={{ filter: 'brightness(1.3) contrast(1.1)' }}
          />

          {/* Content Overlay */}
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 z-10 transition-all duration-700 ease-in-out ${index === activeIndex
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 translate-y-16 scale-90 pointer-events-none'
                }`}
            >
              <div className="max-w-3xl w-full relative">
                <div className="relative p-8 sm:p-10 md:p-12 text-center">

                  <div className="flex flex-col gap-4 sm:gap-5 items-center">

                    {/* Number Badge */}
                    <div className="flex-shrink-0">
                      <span className="inline-block px-5 sm:px-6 py-2 sm:py-3  text-blue-500 font-black text-2xl sm:text-3xl md:text-4xl  ">
                        {service.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full max-w-2xl">
                      <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tight leading-tight">
                        {service.title}
                      </h2>
                      <p className="text-blue-300 text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 tracking-wider uppercase">
                        {service.subtitle}
                      </p>
                      <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Action Button */}
                      <CalendlyPopup
                        text="START CONSULTATION"
                        className="group relative px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 bg-blue-500 text-black rounded-full font-bold text-xs sm:text-sm tracking-wider hover:bg-white transition-all duration-300 overflow-hidden shadow-lg shadow-blue-500/40 transform hover:scale-[1.03]"
                      />


                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Services Section - No Particles */}
      <section
        ref={additionalContainerRef}
        className="relative z-20 bg-white px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h3 className="text-blue-600 text-xl sm:text-2xl md:text-3xl font-bold mb-10 sm:mb-12 md:mb-16 uppercase tracking-widest border-b border-gray-300 pb-4">
            Our Integrated Solutions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                style={{ transitionDelay: `${index * 200}ms` }}
                className={`transform transition-all duration-1000 ease-out ${additionalVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                  }`}
              >
                <div className="group cursor-pointer bg-gray-50 hover:bg-black p-6 rounded-2xl transition-all duration-300">
                  <div className="relative h-60 sm:h-72 overflow-hidden rounded-xl mb-6 sm:mb-7 md:mb-8">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x600/f3f4f6/3b82f6?text=${encodeURIComponent(service.title)}`;
                      }}
                    />
                  </div>
                  <h3 className="text-black group-hover:text-white text-2xl sm:text-3xl font-extrabold mb-2 sm:mb-3 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-5 md:mb-6 transition-colors">
                    {service.description}
                  </p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-400 text-sm font-bold tracking-widest group-hover:translate-x-2 transition-all">
                    VIEW INSIGHT <span className="ml-2 text-xl">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-20 bg-black px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            LET'S BUILD SOMETHING EXTRAORDINARY
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Transform your vision into reality. Request a personalized quote and let's start creating together.
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