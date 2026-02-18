
import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// --- Responsive Utilities ---
const getResponsiveSize = () => {
    if (typeof window === 'undefined') return 1.2;
    const width = window.innerWidth;
    if (width < 768) return 0.7; // Mobile
    if (width < 1024) return 0.9; // Tablet
    return 1.1; // Desktop
};

const getResponsiveCameraFov = () => {
    if (typeof window === 'undefined') return 40;
    const width = window.innerWidth;
    if (width < 768) return 50;
    if (width < 1024) return 45;
    return 40;
};

// --- Background Particles (Blue & Yellow Motes) ---
const ParticleField = () => {
    const meshRef = useRef();

    // Create random positions and colors for background particles
    const { positions, colors } = useMemo(() => {
        const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80;
        const posArray = [];
        const colArray = [];
        const spread = 30;

        const colorBlue = new THREE.Color('#2962ff');
        const colorYellow = new THREE.Color('#ffd700');

        for (let i = 0; i < count; i++) {
            // Position
            const x = (Math.random() - 0.5) * spread;
            const y = (Math.random() - 0.5) * spread;
            const z = -10 - (Math.random() * 15); // Push them back
            posArray.push(new THREE.Vector3(x, y, z));

            // Randomly assign Blue or Yellow
            colArray.push(Math.random() > 0.5 ? colorBlue : colorYellow);
        }
        return { positions: posArray, colors: colArray };
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const delta = state.clock.getDelta();
            const time = state.clock.elapsedTime;

            meshRef.current.children.forEach((child, i) => {
                // Floating movement
                child.position.y += delta * (0.2 + (i % 5) * 0.05);
                child.position.x += Math.sin(time * 0.5 + i) * 0.002;

                // Reset if too high
                if (child.position.y > 15) {
                    child.position.y = -15;
                    child.position.x = (Math.random() - 0.5) * 30;
                }
            });
        }
    });

    return (
        <group ref={meshRef}>
            {positions.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshBasicMaterial color={colors[i]} transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
    );
};

// --- Main 3D Scene ---
const ShapeAssemblyScene = ({ scrollProgress }) => {
    const groupRef = useRef();
    const coreRef = useRef();

    // References for the 3 Ring Segments
    const seg1Ref = useRef();
    const seg2Ref = useRef();
    const seg3Ref = useRef();

    const rSize = useMemo(() => getResponsiveSize(), []);

    // 1. Start Positions (Exploded/Dispersed)
    const startPositions = useMemo(() => {
        const Y_START = -25;
        const SPREAD = 10;
        return [
            new THREE.Vector3(-SPREAD, Y_START, 0),
            new THREE.Vector3(SPREAD, Y_START - 5, 5),
            new THREE.Vector3(0, Y_START - 2, -5),
        ];
    }, []);

    // 2. Target Positions (Assembled tightly around center)
    const targetPositions = useMemo(() => [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
    ], []);

    // 3. Target Rotations (Forming a perfect ring)
    const targetRotations = useMemo(() => {
        // We use Torus segments of 120deg. We rotate them around Z to form a circle.
        // Plus some X rotation to make the whole ring tilt towards camera.
        const tilt = 0;
        return [
            new THREE.Euler(tilt, 0, 0),               // 0 deg
            new THREE.Euler(tilt, 0, (Math.PI * 2) / 3), // 120 deg
            new THREE.Euler(tilt, 0, (Math.PI * 4) / 3), // 240 deg
        ];
    }, []);

    // Geometry: A segment of a Torus (Tube Ring)
    // args: [radius, tube, radialSegments, tubularSegments, arc]
    const segmentGeometryArgs = useMemo(() =>
        [rSize * 2.5, rSize * 0.6, 16, 64, (Math.PI * 2) / 3 - 0.2], // -0.2 for a small gap between pieces
        [rSize]);

    useFrame((state) => {
        const t = THREE.MathUtils.lerp(0, 1, scrollProgress.current);
        const easedT = 1 - Math.pow(1 - t, 3); // Cubic ease out

        // Idle Animation values
        const time = state.clock.elapsedTime;
        const hover = Math.sin(time) * 0.1 * easedT;
        const corePulse = 1 + Math.sin(time * 3) * 0.05;

        // Animate the Yellow Core
        if (coreRef.current) {
            // Core scales up from 0 to 1 based on scroll, then pulses
            const coreScale = THREE.MathUtils.lerp(0, 1, easedT) * corePulse;
            coreRef.current.scale.set(coreScale, coreScale, coreScale);
            // Core spins slowly
            coreRef.current.rotation.y = time * 0.5;
            coreRef.current.rotation.x = time * 0.2;
        }

        const refs = [seg1Ref, seg2Ref, seg3Ref];

        refs.forEach((ref, i) => {
            if (ref.current) {
                // Position Interpolation
                ref.current.position.lerpVectors(startPositions[i], targetPositions[i], easedT);
                ref.current.position.y += hover; // Add hover

                // Rotation Interpolation
                // Start with chaotic rotation
                const startRotX = i * Math.PI;
                const startRotY = Math.PI * 4; // Spin a lot on Y
                const startRotZ = Math.PI * 2;

                ref.current.rotation.x = THREE.MathUtils.lerp(startRotX, targetRotations[i].x, easedT);
                ref.current.rotation.y = THREE.MathUtils.lerp(startRotY, targetRotations[i].y, easedT);
                ref.current.rotation.z = THREE.MathUtils.lerp(startRotZ, targetRotations[i].z, easedT);
            }
        });

        // Entire Group Drift
        if (groupRef.current) {
            // Tilt the whole assembly for better 3D viewing angle
            groupRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0.5, easedT) + (Math.sin(time * 0.2) * 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(0, 0, easedT) + (Math.cos(time * 0.3) * 0.1);
        }
    }, [segmentGeometryArgs, startPositions, targetPositions, targetRotations]);

    // Material: Futuristic Blue Metal
    const blueMetalMaterial = new THREE.MeshPhysicalMaterial({
        color: '#2962ff',     // Primary Blue
        emissive: '#001a4d',  // Deep blue glow
        roughness: 0.2,
        metalness: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
    });

    // Material: Glowing Yellow Core
    const yellowCoreMaterial = new THREE.MeshStandardMaterial({
        color: '#ffd700',
        emissive: '#ffab00',
        emissiveIntensity: 2,
        roughness: 0.4,
        metalness: 0.8,
        wireframe: true, // Gives it a "containment field" look
    });

    // Inner Solid Core to block transparency of wireframe
    const innerCoreMaterial = new THREE.MeshBasicMaterial({
        color: '#ffd700'
    });

    return (
        <group ref={groupRef}>
            {/* CENTRAL ENERGY CORE */}
            <group ref={coreRef}>
                <mesh material={yellowCoreMaterial}>
                    <icosahedronGeometry args={[rSize * 1.2, 1]} />
                </mesh>
                <mesh material={innerCoreMaterial} scale={[0.8, 0.8, 0.8]}>
                    <icosahedronGeometry args={[rSize * 1.2, 0]} />
                </mesh>
            </group>

            {/* ASSEMBLING BLUE SHIELDS */}
            <mesh ref={seg1Ref} material={blueMetalMaterial}>
                <torusGeometry args={segmentGeometryArgs} />
            </mesh>
            <mesh ref={seg2Ref} material={blueMetalMaterial}>
                <torusGeometry args={segmentGeometryArgs} />
            </mesh>
            <mesh ref={seg3Ref} material={blueMetalMaterial}>
                <torusGeometry args={segmentGeometryArgs} />
            </mesh>

            <ParticleField />
        </group>
    );
};

const ShapeSection = () => {
    const sectionRef = useRef(null);
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const height = window.innerHeight;

            // Calculate progress
            let progress = 1 - (rect.top / (height * 1.5));
            progress = Math.max(0, Math.min(1, progress));
            scrollProgressRef.current = progress;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Responsive Typography
    const getTextSize = () => {
        if (typeof window === 'undefined') return '8xl';
        const width = window.innerWidth;
        if (width < 480) return '4xl';
        if (width < 768) return '5xl';
        return '8xl';
    };

    const textSize = getTextSize();

    return (
        <div className="w-full bg-black">
            <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
                {/* Background Canvas */}
                <div className="absolute inset-0 z-0">
                    <Canvas
                        camera={{
                            position: [0, 0, 10],
                            fov: getResponsiveCameraFov()
                        }}
                        gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }}
                    >
                        <color attach="background" args={['#000000']} />
                        <fog attach="fog" args={['#000000', 8, 25]} />

                        {/* Lighting Setup for Blue/Yellow theme */}
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#2962ff" />
                        <spotLight position={[-10, -10, 10]} angle={0.5} penumbra={1} intensity={2} color="#ffd700" />
                        <pointLight position={[0, 0, -5]} intensity={1} color="#2962ff" />

                        {/* Interactive Scene */}
                        <ShapeAssemblyScene scrollProgress={scrollProgressRef} />
                    </Canvas>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full w-full max-w-7xl mx-auto flex flex-col justify-center items-center pointer-events-none px-4 sm:px-6 md:px-12 py-12">

                    {/* Top Introduction Label */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 sm:mb-10 text-center"
                    >
                        <span className="text-[#ffd700] tracking-[0.2em] font-bold text-sm sm:text-base uppercase">Introduction</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-12 sm:mb-20 w-full pointer-events-auto"
                    >
                        <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[160px] font-black tracking-tighter leading-none flex flex-wrap justify-center gap-x-4 sm:gap-x-8">
                            <span style={{ WebkitTextStroke: '2px #2962ff', color: 'transparent' }} className="whitespace-nowrap">WHO WE</span>
                            <span className="text-[#ffd700]">ARE</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start w-full pointer-events-auto">
                        {/* LEFT COLUMN: Description */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-left space-y-8 max-w-xl mx-auto lg:mx-0"
                        >
                            <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                                <span className="text-[#ffd700] font-bold">Echohive creatives</span> is a full-service creative agency offering end-to-end solutions for individuals, brands, businesses, and events.
                            </p>
                            <p className="text-lg text-gray-400 font-light leading-relaxed">
                                We specialise in event management, media production, branding, visual storytelling, drone cinematography, gear rentals, and creative direction.
                            </p>
                        </motion.div>

                        {/* RIGHT COLUMN: Services Grid & Quote */}
                        <div className="flex flex-col gap-10 w-full max-w-xl mx-auto lg:mx-0">
                            {/* Services Grid */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {['Event Management', 'Media Production', 'Branding', 'Visual Storytelling', 'Drone Cinematography', 'Gear Rentals', 'Creative Direction', 'Content Production'].map((service, index) => (
                                    <div key={index} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-6 py-4 text-white text-sm sm:text-base font-medium hover:bg-[#2962ff]/20 hover:border-[#2962ff]/50 transition-all duration-300 cursor-default flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700] mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        {service}
                                    </div>
                                ))}
                            </motion.div>

                            {/* Quote */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="relative pl-6 border-l-4 border-[#ffd700]"
                            >
                                <p className="text-gray-300 italic text-lg leading-relaxed">
                                    Whether you're planning an event, launching a campaign, producing content, or documenting a special moment, we deliver results with <span className="text-[#ffd700] font-semibold not-italic">precision, creativity, and innovation</span>.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default ShapeSection;