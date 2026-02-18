// import React, { useState, useEffect, useRef } from 'react';
// import { Download } from 'lucide-react';
// import * as THREE from 'three';

// const DentsuCreativeSection = () => {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const sectionRef = useRef(null);
//   const canvasRef = useRef(null);
//   const sceneRef = useRef(null);
//   const rendererRef = useRef(null);
//   const cameraRef = useRef(null);
//   const meshesRef = useRef([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;
      
//       const section = sectionRef.current;
//       const rect = section.getBoundingClientRect();
//       const sectionHeight = section.offsetHeight;
//       const windowHeight = window.innerHeight;
      
//       const sectionTop = rect.top;
//       const sectionBottom = rect.bottom;
      
//       if (sectionBottom < 0 || sectionTop > windowHeight) {
//         return;
//       }
      
//       const progress = Math.max(0, Math.min(1, 
//         (windowHeight - sectionTop) / (windowHeight + sectionHeight)
//       ));
      
//       setScrollProgress(progress);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();
    
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Three.js setup
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
//     camera.position.z = 8;
    
//     const renderer = new THREE.WebGLRenderer({ 
//       canvas: canvasRef.current, 
//       alpha: true,
//       antialias: true 
//     });
//     renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     sceneRef.current = scene;
//     rendererRef.current = renderer;
//     cameraRef.current = camera;

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     // Materials with new colors
//     const blueMaterial = new THREE.MeshPhongMaterial({ 
//       color: 0x2563eb, // Blue
//       shininess: 100,
//       transparent: true,
//       opacity: 0.95
//     });

//     const yellowMaterial = new THREE.MeshPhongMaterial({ 
//       color: 0xfbbf24, // Yellow
//       shininess: 80,
//       transparent: true,
//       opacity: 0.9
//     });

//     const lightYellowMaterial = new THREE.MeshPhongMaterial({ 
//       color: 0xfde68a, // Light yellow
//       transparent: true,
//       opacity: 0.4,
//       side: THREE.DoubleSide
//     });

//     // Create geometries
//     // Sphere (Blue - main focal point)
//     const sphereGeometry = new THREE.SphereGeometry(1.8, 32, 32);
//     const sphere = new THREE.Mesh(sphereGeometry, blueMaterial);
//     sphere.position.set(-1.5, 0, 0);
//     scene.add(sphere);

//     // Torus (Yellow ring)
//     const torusGeometry = new THREE.TorusGeometry(2.2, 0.15, 16, 100);
//     const torus = new THREE.Mesh(torusGeometry, yellowMaterial);
//     torus.rotation.x = Math.PI / 6;
//     torus.position.set(0.5, 0, 0);
//     scene.add(torus);

//     // Semi-circle segments (Yellow)
//     const semiCircle1Geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 50, Math.PI * 0.8);
//     const semiCircle1 = new THREE.Mesh(semiCircle1Geometry, yellowMaterial);
//     semiCircle1.position.set(2, 0.8, -0.5);
//     semiCircle1.rotation.z = Math.PI / 4;
//     scene.add(semiCircle1);

//     const semiCircle2Geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 50, Math.PI * 0.8);
//     const semiCircle2 = new THREE.Mesh(semiCircle2Geometry, yellowMaterial);
//     semiCircle2.position.set(2, -0.8, -0.5);
//     semiCircle2.rotation.z = -Math.PI / 4;
//     scene.add(semiCircle2);

//     // Abstract shapes
//     const cone = new THREE.Mesh(
//       new THREE.ConeGeometry(1.2, 2, 3),
//       lightYellowMaterial
//     );
//     cone.position.set(1.5, 2, -1.5);
//     cone.rotation.z = Math.PI / 6;
//     scene.add(cone);

//     meshesRef.current = [sphere, torus, semiCircle1, semiCircle2, cone];

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Handle resize
//     const handleResize = () => {
//       if (!canvasRef.current) return;
//       const width = canvasRef.current.offsetWidth;
//       const height = canvasRef.current.offsetHeight;
      
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//     };
//   }, []);

//   // Update Three.js objects based on scroll
//   useEffect(() => {
//     if (!meshesRef.current.length) return;

//     const [sphere, torus, semiCircle1, semiCircle2, cone] = meshesRef.current;

//     // Animate objects
//     sphere.rotation.y = scrollProgress * Math.PI * 2;
//     sphere.position.y = Math.sin(scrollProgress * Math.PI) * 0.3;
    
//     torus.rotation.y = scrollProgress * Math.PI * 2;
//     torus.rotation.z = scrollProgress * Math.PI * 0.5;
    
//     semiCircle1.rotation.y = scrollProgress * Math.PI * 1.5;
//     semiCircle1.position.x = 2 + Math.cos(scrollProgress * Math.PI) * 0.3;
    
//     semiCircle2.rotation.y = -scrollProgress * Math.PI * 1.5;
//     semiCircle2.position.x = 2 + Math.sin(scrollProgress * Math.PI) * 0.3;
    
//     cone.rotation.z = Math.PI / 6 + scrollProgress * Math.PI * 2;
//     cone.material.opacity = 0.3 + scrollProgress * 0.3;

//   }, [scrollProgress]);

//   const getTextOpacity = () => {
//     if (scrollProgress < 0.2) return scrollProgress / 0.2;
//     if (scrollProgress >= 0.2 && scrollProgress <= 0.7) return 1;
//     if (scrollProgress > 0.7) return 1 - ((scrollProgress - 0.7) / 0.3);
//     return 1;
//   };

//   const getCharOpacity = (index, totalChars) => {
//     const baseOpacity = getTextOpacity();
//     const charProgress = index / totalChars;
//     const staggerDelay = charProgress * 0.15;
    
//     const fadeInStart = staggerDelay;
//     const fadeInEnd = fadeInStart + 0.15;
    
//     const fadeOutStart = 0.7 + staggerDelay;
//     const fadeOutEnd = fadeOutStart + 0.15;
    
//     let charOpacity = 0;
    
//     if (scrollProgress < fadeInStart) charOpacity = 0;
//     else if (scrollProgress >= fadeInStart && scrollProgress <= fadeInEnd) {
//       charOpacity = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
//     }
//     else if (scrollProgress > fadeInEnd && scrollProgress < fadeOutStart) charOpacity = 1;
//     else if (scrollProgress >= fadeOutStart && scrollProgress <= fadeOutEnd) {
//       charOpacity = 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
//     }
    
//     return Math.min(charOpacity, baseOpacity);
//   };

//   const renderStaggeredText = (text, startIndex = 0) => {
//     return text.split('').map((char, index) => {
//       const globalIndex = startIndex + index;
//       const opacity = getCharOpacity(globalIndex, 50);
      
//       return (
//         <span
//           key={index}
//           style={{
//             opacity,
//             transition: 'opacity 0.2s ease-out',
//             display: char === ' ' ? 'inline' : 'inline-block'
//           }}
//         >
//           {char === ' ' ? '\u00A0' : char}
//         </span>
//       );
//     });
//   };

//   const textOpacity = getTextOpacity();

//   return (
//     <>
  
      
//       {/* Main Section */}
//       <div 
//         ref={sectionRef}
//         className=" bg-black text-white relative"
//       >
//         {/* Sticky Container */}
//         <div className="sticky top-0 h-screen flex items-center">
//           <div className="w-full flex">
//             {/* Left Side - Text Content */}
//             <div className="w-1/2 flex flex-col justify-center px-16">
//               <div className="space-y-8">
//                 <p 
//                   className="text-sm tracking-widest uppercase text-gray-400"
//                   style={{
//                     opacity: textOpacity,
//                     transform: `translateY(${textOpacity === 1 ? 0 : 20}px)`,
//                     transition: 'opacity 0.5s ease, transform 0.5s ease'
//                   }}
//                 >
//                   {renderStaggeredText('THOUGHT LEADERSHIP', 0)}
//                 </p>
                
//                 <h1 
//                   className="text-6xl font-light leading-tight"
//                   style={{
//                     opacity: textOpacity,
//                     transform: `translateY(${textOpacity === 1 ? 0 : 20}px)`,
//                     transition: 'opacity 0.5s ease, transform 0.5s ease'
//                   }}
//                 >
//                   <div className="mb-2">
//                     {renderStaggeredText('DENTSU CREATIVE', 20)}
//                   </div>
//                   <div>
//                     {renderStaggeredText('CMO REPORT 2025', 36)}
//                   </div>
//                 </h1>
                
//                 <button 
//                   className="flex items-center gap-2 text-white border-2 border-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group"
//                   style={{
//                     opacity: textOpacity,
//                     transform: `translateY(${textOpacity === 1 ? 0 : 20}px)`,
//                     transition: 'opacity 0.5s ease, transform 0.5s ease'
//                   }}
//                 >
//                   <span>Download PDF</span>
//                   <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
//                 </button>
                
//                 <p 
//                   className="text-sm text-gray-400"
//                   style={{
//                     opacity: textOpacity,
//                     transform: `translateY(${textOpacity === 1 ? 0 : 20}px)`,
//                     transition: 'opacity 0.5s ease, transform 0.5s ease'
//                   }}
//                 >
//                   16 September 2025
//                 </p>
//               </div>
//             </div>

//             {/* Right Side - Three.js Canvas */}
//             <div className="w-1/2 relative bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 overflow-hidden">
//               <canvas 
//                 ref={canvasRef}
//                 className="w-full h-full"
//                 style={{
//                   opacity: 0.9 + scrollProgress * 0.1
//                 }}
//               />
              
//               {/* Gradient Overlay */}
//               <div 
//                 className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-transparent to-yellow-400/30 pointer-events-none"
//                 style={{
//                   opacity: scrollProgress * 0.5
//                 }}
//               ></div>
//             </div>
//           </div>

      
//         </div>
//       </div>
      

//     </>
//   );
// };

// export default DentsuCreativeSection;