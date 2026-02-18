import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

// --- Constants ---
const PRIMARY_COLOR = 0x3b82f6;
const SECONDARY_COLOR = 0xfacc15;
const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

/**
 * ThreeDTextAnimation Component
 * Optimized particle animation with better visual effects
 */
const ThreeDTextAnimation = ({ text }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const particleMeshRef = useRef(null);
    const geometryRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Deterministic hash function for particle positioning
    const hash = useCallback((n) => {
        let x = Math.sin(n) * 10000;
        return x - Math.floor(x);
    }, []);

    const initializeScene = useCallback(() => {
        if (!mountRef.current) return null;

        // Scene Setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera Setup with better FOV
        const aspectRatio = mountRef.current.clientWidth / mountRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
        camera.position.z = 50;
        cameraRef.current = camera;

        // Renderer Setup
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        
        // Enhanced Particle System - Spread across entire viewport
        const particleCount = 5000;
        const geometry = new THREE.BufferGeometry();
        geometryRef.current = geometry;
        
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Spread particles across entire screen space
            positions[i3 + 0] = (hash(i * 1.1) - 0.5) * 120; // Wide X spread
            positions[i3 + 1] = (hash(i * 1.3) - 0.5) * 80;  // Wide Y spread
            positions[i3 + 2] = (hash(i * 1.5) - 0.5) * 60;  // Deep Z spread
            
            // Varied particle sizes for depth
            sizes[i] = hash(i * 1.7) * 0.8 + 0.2;
            
            // Color distribution with gradient effect
            const colorMix = hash(i * 3.1);
            const color = new THREE.Color();
            color.lerpColors(
                new THREE.Color(PRIMARY_COLOR),
                new THREE.Color(SECONDARY_COLOR),
                colorMix
            );
            
            colors[i3 + 0] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Store initial positions for animation reference
        geometry.userData.initialPositions = new Float32Array(positions);

        // Enhanced Material
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            depthWrite: false
        });
        
        const particleMesh = new THREE.Points(geometry, material);
        scene.add(particleMesh);
        particleMeshRef.current = particleMesh;
        
        return { renderer, camera };
    }, [hash]);

    useEffect(() => {
        const initialized = initializeScene();
        if (!initialized) return;

        const { renderer, camera } = initialized;
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            const positions = geometryRef.current.attributes.position.array;
            const initialPositions = geometryRef.current.userData.initialPositions;
            const particleCount = positions.length / 3;

            // Gentle floating animation for background particles
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                
                // Get initial position
                const baseX = initialPositions[i3 + 0];
                const baseY = initialPositions[i3 + 1];
                const baseZ = initialPositions[i3 + 2];
                
                // Subtle wave motion - particles stay mostly in place
                const waveX = Math.sin(elapsedTime * 0.3 + i * 0.01) * 1.5;
                const waveY = Math.cos(elapsedTime * 0.4 + i * 0.015) * 2;
                const waveZ = Math.sin(elapsedTime * 0.25 + i * 0.02) * 1;
                
                positions[i3 + 0] = baseX + waveX;
                positions[i3 + 1] = baseY + waveY;
                positions[i3 + 2] = baseZ + waveZ;
            }

            geometryRef.current.attributes.position.needsUpdate = true;
            
            // Very subtle rotation for depth effect
            if (particleMeshRef.current) {
                particleMeshRef.current.rotation.y = elapsedTime * 0.02;
            }

            renderer.render(sceneRef.current, camera);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (mountRef.current && cameraRef.current && rendererRef.current) {
                const width = mountRef.current.clientWidth;
                const height = mountRef.current.clientHeight;
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(width, height);
            }
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (geometryRef.current) {
                geometryRef.current.dispose();
            }
            if (particleMeshRef.current && particleMeshRef.current.material) {
                particleMeshRef.current.material.dispose();
            }
            if (mountRef.current && renderer && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [initializeScene, hash]);

    return (
        <div ref={mountRef} className="absolute inset-0 z-10 pointer-events-none" />
    );
};

/**
 * Main Hero Component
 */
const CurverdVideoHero = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center font-sans">
            
            {/* 3D Particle Background - Full Screen */}
            <div className="absolute inset-0 z-0">
                <ThreeDTextAnimation text="BACKGROUND" />
            </div>
            
            {/* Video Background with Loading State */}
            <div className="absolute inset-0 z-5">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className={`w-full h-full object-cover filter  transition-opacity duration-1000 ${
                        videoLoaded ? 'opacity-9' : 'opacity-0'
                    }`}
                    poster="https://placehold.co/1920x1080/000000/000000"
                >
                    <source src={VIDEO_URL} type="video/mp4" />
                </video>
                
                {/* Gradient Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30" />
            </div>

            {/* Main Content */}
            <div className="relative z-20 text-center px-4 sm:px-6 md:px-12 max-w-5xl w-full">
                
                {/* Hero Title with Enhanced Typography */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 uppercase">
                    <span className="block leading-tight bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
                        Driven by
                    </span>
                    <span className="block leading-tight bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                        Innovation.
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    We are pioneers committed to crafting seamless experiences and powerful solutions for the next generation of digital products.
                </p>

            </div>
            
            {/* Decorative Accent Corner */}
            <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 z-10 opacity-20">
                <div className="w-full h-full bg-gradient-to-tl from-yellow-500 to-yellow-600" style={{
                    clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)'
                }} />
            </div>

            {/* Top Left Accent */}
            <div className="absolute top-0 left-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 z-10 opacity-15">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600" style={{
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                }} />
            </div>
        </div>
    );
};

export default CurverdVideoHero;