import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Hero = () => {
  const mountRef = useRef(null);
  
  // Ref to track scroll percentage (0 to 1)
  const scrollRef = useRef(0);

  useEffect(() => {
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#eeeeee'); // Pure black

    // --- Camera ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 20);

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // --- Lighting (Metallic Look) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Main spotlight for shadows and highlights
    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Rim light for the metallic edge
    const rimLight = new THREE.PointLight(0x00ffff, 1, 20);
    rimLight.position.set(-5, -5, 5);
    scene.add(rimLight);

    // --- Custom "Trefoil" Shape Generation ---
    // We create a shape by merging 3 circles
    const shape = new THREE.Shape();
    const radius = 2.5;
    const offset = 2.2;
    
    // Circle 1 (Top)
    shape.absarc(0, offset, radius, 0, Math.PI * 2, false);
    // Circle 2 (Bottom Right)
    const x2 = Math.cos(Math.PI / 6) * offset;
    const y2 = -Math.sin(Math.PI / 6) * offset;
    shape.moveTo(x2 + radius, y2); // Move to avoid line artifact
    shape.absarc(x2, y2, radius, 0, Math.PI * 2, false);
    // Circle 3 (Bottom Left)
    const x3 = -Math.cos(Math.PI / 6) * offset;
    const y3 = -Math.sin(Math.PI / 6) * offset;
    shape.moveTo(x3 + radius, y3);
    shape.absarc(x3, y3, radius, 0, Math.PI * 2, false);

    // Extrude settings
    const extrudeSettings = {
      steps: 2,
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.2,
      bevelSegments: 5,
      curveSegments: 30
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Center geometry
    geometry.computeBoundingBox();
    const centerOffset = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    const centerY = - 0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y );
    const centerZ = - 0.5 * ( geometry.boundingBox.max.z - geometry.boundingBox.min.z );
    geometry.translate(0, centerY, centerZ);

    // Metallic Material
    const material = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x111111,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -20; // Start below screen
    mesh.rotation.x = Math.PI / 4;
    scene.add(mesh);

    // --- Interaction Handlers ---
    const handleScroll = () => {
        // Calculate how far down we've scrolled (0 to 1)
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / totalHeight;
        scrollRef.current = progress;
    };

    const handleResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let frameId;
    
    // Linear interpolation helper
    const lerp = (start, end, t) => start * (1 - t) + end * t;
    
    // Current animated values (for smooth damping)
    let currentScroll = 0;

    const animate = () => {
        frameId = requestAnimationFrame(animate);

        // Smoothly interpolate current scroll value
        currentScroll = lerp(currentScroll, scrollRef.current, 0.08);

        // 1. Move Object Up
        // Map scroll (0 to 1) to Y Position (-15 to 0)
        const startY = -15;
        const endY = 0;
        mesh.position.y = lerp(startY, endY, currentScroll);

        // 2. Rotate Object
        // It spins as it rises
        mesh.rotation.z = currentScroll * Math.PI * 2; // Full spin
        mesh.rotation.x = lerp(Math.PI / 2, 0, currentScroll); // Flips up
        mesh.rotation.y = currentScroll * Math.PI;

        renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative bg-black w-full text-white font-sans selection:bg-cyan-500 selection:text-black">
        
        {/* The 3D Canvas Background (Fixed) */}
        <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />

        {/* Scrollable Content Container (Tall to enable scrolling) */}
        <div className="relative z-10 w-full" style={{ height: '300vh' }}>
            
            {/* Typography Section */}
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
                <div className="text-center transform scale-75 md:scale-100 leading-tight">
                    {/* Line 1 */}
                    <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase mb-4">
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>A Network</span>
                    </h1>
                    
                    {/* Line 2 */}
                    <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
                        <h1 className="text-5xl md:text-9xl font-black tracking-tighter uppercase text-white">
                            Designed
                        </h1>
                    </div>

                    {/* Line 3 */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                        <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                            For
                        </h1>
                        <h1 className="text-5xl md:text-9xl font-black tracking-tighter uppercase text-white">
                            Today
                        </h1>
                    </div>

                    {/* Line 4 */}
                    <div className="mt-4 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                        <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                            And Tomorrow
                        </h1>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator at bottom */}
            <div className="absolute bottom-10 w-full text-center text-white/50 animate-bounce">
                Scroll Down to Reveal
            </div>

        </div>
    </div>
  );
};

export default Hero;