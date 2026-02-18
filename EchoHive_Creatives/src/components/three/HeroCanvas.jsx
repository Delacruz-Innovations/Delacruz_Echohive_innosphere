import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import Logo from '../../assets/Images/Logo.png';
import CalendlyPopup from '../CalendlyPopup'

// Placeholder logo - replace with your actual logo URL
const logo = Logo;

// --- 3D COMPONENTS ---

function SceneSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [gl]);
  return null;
}

function ParticleField() {
  const points = useRef(null);
  const particleCount = 1500;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 25;
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#4F6FFF"
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
      >
        <SceneSetup />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#FF2B4F" />
        <pointLight position={[10, -5, 5]} intensity={2} color="#2B4FFF" />

        <ParticleField />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}


export default function Hero() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main className="relative w-full bg-black text-white overflow-hidden selection:bg-blue-500 selection:text-white pt-50">

      {/* 3D Background Layer */}
      <HeroCanvas />


      {/* Content Layer */}
      <section className="relative z-10 min-h-[600px] md:h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pointer-events-none">

        {/* Top Section with EchoHive Creative */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-12">

          {/* Left Text: EchoHive */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            className="order-2 md:order-1 text-center md:text-right"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-none">
              èchó<span className='text-[#ffde59]'>hive</span>
            </h1>
          </motion.div>

          {/* Center Logo */}
          <motion.div
            className="order-1 md:order-2 z-20 relative flex-shrink-0"
            initial={{ scale: 25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 1,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-68 lg:h-68 rounded-full overflow-hidden shadow-[0_0_50px_rgba(43,79,255,0.3)] bg-black ring-2 ring-white/10">
              <img
                src={logo}
                alt="EchoHive Logo"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent mix-blend-overlay" />
            </div>
          </motion.div>

          {/* Right Text: Creative */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            className="order-3 text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-blue-700 to-white">
              Creatives
            </h1>
          </motion.div>

        </div>

        {/* Main Content Section */}
        <div className="w-full max-w-4xl mx-auto text-center space-y-6 md:space-y-8 px-4 pointer-events-auto">

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Creative Solutions That Bring Your Ideas to Life
          </motion.h2>

          {/* Sub-Headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            EchoHive Creatives is Nigeria's innovative hub for Creative Design, Event Management, Drone & Gear Rentals, Photography, Videography, Branding, and Digital Content Production. We transform visions into unforgettable experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
          >
            {/* Primary CTA: Request a Quote */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <CalendlyPopup
                text="Request a Quote"
                className="group px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full text-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all duration-300 cursor-pointer w-full text-center flex items-center justify-center gap-2"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CalendlyPopup>
            </motion.div>

            {/* Secondary CTA: Explore Our Services */}
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-semibold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

        </div>
      </section>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-10 flex justify-center items-end pointer-events-none text-white/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-6 sm:h-8 bg-white/20" />
        </motion.div>
      </motion.div>
    </main>
  );
}