import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Send, X } from 'lucide-react';
import * as THREE from 'three';

// --- Three.js Background Component ---
const ThreeBackground = ({ scrollYProgress }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6, // Blue-500
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles slowly
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      // Mouse/Scroll interaction simulation (Wobble effect)
      particlesMesh.position.y = Math.sin(Date.now() * 0.001) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Sync Opacity with Scroll
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newOpacity = Math.max(0.1, 1 - latest * 1.5); 
      setOpacity(newOpacity);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: opacity, transition: 'opacity 0.2s ease-out' }}
    />
  );
};

// --- Main Contact Component ---
const Contact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-black text-white pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* 1. Three.js Background Layer */}
      <ThreeBackground scrollYProgress={smoothProgress} />

      {/* 3. Watermark Background Image */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-contain bg-center bg-no-repeat pointer-events-none opacity-[0.03] z-0 mix-blend-screen"
        style={{ 
          backgroundImage: `url("https://www.svgrepo.com/show/446274/brand-google-maps.svg")` 
        }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <HeaderSection />
        
        <div className="pb-40">
          <CareerOpportunitiesSection />
        </div>
      </div>
    </div>
  );
};

// --- Header Section Component ---
const HeaderSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="text-center relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-6xl lg:text-9xl font-bold mb-6 mt-8 h-[300px] flex items-center justify-center tracking-tighter"
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-white">
          GET IN <span className='text-blue-500'>TOUCH</span> 
        </span>
      </motion.h1>
    </motion.div>
  );
};

// --- Form Component ---
const InlineContactForm = ({ type, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState(null);
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      {/* Updated Form Container: Removed card styling to match the seamless black look */}
      <div className="p-0 sm:p-8 mb-8 mt-4 max-w-4xl mx-auto">
        <div className="flex justify-end mb-6">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-gray-500 hover:text-white transition-colors">
            <X size={32} />
          </button>
        </div>
        

<form className="space-y-12" onSubmit={async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);
  
  const formData = new FormData(e.target);
  formData.append("access_key", "83c62d8c-14c4-4ff9-a088-9a4d3a92adc3"); 
  formData.append("subject", `New ${type} Inquiry from Contact Form`);
  formData.append("from_name", `${formData.get('first_name')} ${formData.get('last_name')}`);
  
  // Add inquiry type as a separate field
  formData.append("inquiry_type", type);
  

  const customMessage = `
Inquiry Type: ${type}

First Name: ${formData.get('first_name')}
Last Name: ${formData.get('last_name')}
Company: ${formData.get('company_name')}

Message:
${formData.get('message')}
  `;
  
  formData.set("message", customMessage);
  
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      setSubmitStatus('success');
      e.target.reset();
      setTimeout(() => onClose(), 2000);
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
}}>
          <div className="grid grid-cols-1 gap-12">
            
            {/* Field 1 */}
            <div className="relative group">
              <label className="block text-sm font-bold text-white uppercase mb-2 tracking-wider">
                First Name
              </label>
             <input 
  type="text"
  name="first_name"
  required
  className="w-full bg-transparent border-b border-gray-600 py-3 text-white text-xl focus:outline-none focus:border-white transition-colors placeholder-transparent" 
/>
            </div>

             {/* Field 2 */}
            <div className="relative group">
              <label className="block text-sm font-bold text-white uppercase mb-2 tracking-wider">
                Last Name
              </label>
              <input 
  type="text"
  name="last_name"
  required
  className="w-full bg-transparent border-b border-gray-600 py-3 text-white text-xl focus:outline-none focus:border-white transition-colors placeholder-transparent" 
/>
            </div>

             {/* Field 3 */}
            <div className="relative group">
              <label className="block text-sm font-bold text-white uppercase mb-2 tracking-wider">
                Company Name
              </label>
             <input 
  type="text"
  name="company_name"
  required
  className="w-full bg-transparent border-b border-gray-600 py-3 text-white text-xl focus:outline-none focus:border-white transition-colors placeholder-transparent" 
/>
            </div>

            {/* Field 4 (Message - keeping this functional) */}
            <div className="relative group">
              <label className="block text-sm font-bold text-white uppercase mb-2 tracking-wider">
                Message
              </label>
             <textarea 
  rows="2"
  name="message"
  required
  className="w-full bg-transparent border-b border-gray-600 py-3 text-white text-xl focus:outline-none focus:border-white transition-colors resize-none" 
/>
            </div>
          </div>

         <div className="flex justify-start pt-8">
  <button 
    type="submit" 
    disabled={isSubmitting}
    className="group flex items-center gap-4 text-white text-xl font-bold hover:text-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
    <Send size={24} className="group-hover:translate-x-2 transition-transform" />
  </button>
  
  {submitStatus === 'success' && (
    <span className="ml-4 text-green-400">Message sent successfully!</span>
  )}
  {submitStatus === 'error' && (
    <span className="ml-4 text-red-400">Failed to send. Please try again.</span>
  )}
</div>
        </form>
      </div>
    </motion.div>
  );
};

// --- Career/List Section ---
const CareerOpportunitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  // State to track which dropdown is open
  const [activeItem, setActiveItem] = useState(null);

  const positions = [
    { title: "Careers", hasForm: true },
    { title: "New Business", hasForm: true },
    { title: "Press & Media", hasForm: false }, 
    { title: "General Enquires", hasForm: true }
  ];

  const handleItemClick = (title, hasForm) => {
    if (!hasForm) return; 
    setActiveItem(activeItem === title ? null : title);
  };

  return (
    <motion.div
      ref={ref}
      className="mt-12 w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col">
        {positions.map((item, index) => (
          <div key={item.title} className="flex flex-col">
            <motion.div
              className={`flex items-center justify-between p-6 py-10 border-t border-gray-800 transition-all duration-500 cursor-pointer group
                ${activeItem === item.title ? 'bg-gray-900/10' : 'hover:bg-gray-900/10'}
              `}
              onClick={() => handleItemClick(item.title, item.hasForm)}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-center gap-6">
                {/* Removed Numbering here */}
                <span className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase transition-colors duration-300 ${activeItem === item.title ? 'text-blue-500' : 'text-white'}`}>
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-4">
                 {/* Special visual indicator for Press & Media to show it's different */}
                {!item.hasForm && (
                  <span className="hidden sm:block text-xs uppercase tracking-widest text-gray-500 border border-gray-700 px-3 py-1 rounded-full">
                    Email Only
                  </span>
                )}
                
                <motion.span 
                  className={`text-blue-500 transition-transform duration-300 ${activeItem === item.title ? 'rotate-90' : 'rotate-0'}`}
                  whileHover={{ scale: 1.2 }}
                >
                  <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12" />
                </motion.span>
              </div>
            </motion.div>

            {/* Dropdown Form Area */}
            <AnimatePresence>
              {activeItem === item.title && item.hasForm && (
                <InlineContactForm 
                  type={item.title} 
                  onClose={() => setActiveItem(null)} 
                />
              )}
            </AnimatePresence>
          </div>
        ))}
        {/* Closing border */}
        <div className="border-t border-gray-800" />
      </div>
    </motion.div>
  );
};

export default Contact;