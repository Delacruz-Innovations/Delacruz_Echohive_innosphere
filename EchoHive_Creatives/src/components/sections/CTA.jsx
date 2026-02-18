import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import CalendlyPopup from '../CalendlyPopup';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  // THREE.js objects
  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    points: null,
    clock: new THREE.Clock(),
  });

  // Configuration for the star field
  const config = {
    numStars: 3000,
    starRange: 1500,
    starSize: 4,
  };

  // SCROLL HANDLER: Fade in/out based on visibility
  //   const handleScroll = useCallback(() => {
  //     if (!containerRef.current) return;

  //     const rect = containerRef.current.getBoundingClientRect();
  //     const windowHeight = window.innerHeight;

  //     // Calculate how much of the component is visible
  //     const componentTop = rect.top;
  //     const componentBottom = rect.bottom;
  //     const componentHeight = rect.height;

  //     // Fade in as component enters viewport (from bottom)
  //     if (componentTop < windowHeight && componentBottom > 0) {
  //       // Component is in viewport
  //       if (componentTop > 0) {
  //         // Fading in from bottom
  //         const visibleAmount = (windowHeight - componentTop) / componentHeight;
  //         setOpacity(Math.min(1, visibleAmount * 1.5));
  //       } else if (componentBottom < windowHeight) {
  //         // Fading out at top
  //         const visibleAmount = componentBottom / componentHeight;
  //         setOpacity(Math.min(1, visibleAmount * 1.5));
  //       } else {
  //         // Fully visible
  //         setOpacity(1);
  //       }
  //     } else {
  //       // Component is out of viewport
  //       setOpacity(0);
  //     }
  //   }, []);

  // SCROLL HANDLER: Fade in/out based on visibility
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how much of the component is visible
    const componentTop = rect.top;
    const componentBottom = rect.bottom;
    const componentHeight = rect.height;

    // Fade in as component enters viewport (from bottom)
    if (componentTop < windowHeight && componentBottom > 0) {
      // Component is in viewport
      if (componentTop > 0) {
        // Fading in from bottom
        const visibleAmount = (windowHeight - componentTop) / componentHeight;
        setOpacity(Math.min(1, visibleAmount * 1.5));
      } else if (componentBottom < windowHeight) {
        // Fading out at top
        const visibleAmount = componentBottom / componentHeight;
        setOpacity(Math.min(1, visibleAmount * 1.5));
      } else {
        // Fully visible
        setOpacity(1);
      }
    } else {
      // Component is out of viewport
      setOpacity(0);
    }
  }, []);

  // ANIMATION LOOP
  const animate = useCallback(() => {
    const { scene, camera, renderer, points, clock } = threeRefs.current;

    if (renderer && scene && camera && points) {
      const delta = clock.getDelta();
      const speed = 2000 * delta;

      points.position.z -= speed;

      if (points.position.z < -config.starRange) {
        points.position.z += config.starRange * 1;
      }

      renderer.render(scene, camera);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // INITIALIZATION
  const initThree = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
    camera.position.z = 800;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);

    // STAR FIELD GEOMETRY
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const { numStars, starRange } = config;

    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * starRange * 2 - starRange;
      const y = Math.random() * starRange * 2 - starRange;
      const z = Math.random() * starRange * 2 - starRange;
      vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // STAR MATERIAL
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: config.starSize,
      sizeAttenuation: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    });

    // STAR POINTS
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Store references
    threeRefs.current = { ...threeRefs.current, scene, camera, renderer, points };

    // Start animation
    animate();

    // Resize handler
    const onResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      const newHeight = containerRef.current.offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
    };
  }, [animate]);

  useEffect(() => {
    const cleanup = initThree();

    // GSAP ScrollTrigger Animation with Stagger
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([containerRef.current, titleRef.current, subtitleRef.current, buttonsRef.current], {
        opacity: 0,
      });

      gsap.set(titleRef.current, { y: 50 });
      gsap.set(subtitleRef.current, { y: 30 });
      gsap.set(buttonsRef.current, { y: 20 });

      // Create staggered fade-in animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.4')
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
        .to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6');

    }, containerRef);

    return () => {
      if (cleanup) cleanup();
      ctx.revert();
    };
  }, [initThree]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden  opacity-0"
    >
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg opacity-0"
        >
          INVENT THE FUTURE WITH US
        </h2>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md opacity-0"
        >
          Join our team of innovators pushing the boundaries of technology
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 opacity-0"
        >
          <CalendlyPopup
            text="Get in Contact"
            className="bg-white text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300 uppercase text-sm tracking-wider"
          />
          <Link to='/careers'>   <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 uppercase text-sm tracking-wider backdrop-blur-sm">
            View Careers
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;