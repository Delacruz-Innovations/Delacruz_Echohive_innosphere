import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- CONSTANTS & CONFIGURATION ---
const BACKGROUND_COLORS = [
  'bg-slate-900',     // Boundless creativity
  'bg-gray-900',     // intelligent scale
  'bg-indigo-950',   // Obsessive craft
  'bg-teal-900',     // Radical collaboration
  'bg-amber-900',    // Future Impact (New)
];


const aboutSections = [
  {
    id: 'vision',
    number: '01',
    title: 'Boundless creativity',
    subtitle: "THE ART OF THE POSSIBLE",
    description: 'We transcend traditional limitations by blending cutting-edge technology with unconstrained imagination, fueling innovation across all client engagements.',
  },
  {
    id: 'mission',
    number: '02',
    title: 'intelligent scale',
    subtitle: 'PRECISION GROWTH',
    description: 'To build modular, resilient systems that leverage AI and machine learning, ensuring our creative solutions drive exponential and precise business expansion.',
  },
  {
    id: 'values',
    number: '03',
    title: 'Obsessive craft',
    subtitle: 'THE COMMITMENT TO EXCELLENCE',
    description: 'Our core belief is in meticulous detail, flawless execution, and continuous refinement, ensuring every output reflects the highest standard of quality and dedication.',
  },
  {
    id: 'approach',
    number: '04',
    title: 'Radical collaboration',
    subtitle: 'THE POWER OF SYMBIOSIS',
    description: 'We operate as a unified, cross-functional partner, embracing total transparency and diverse perspectives to co-create revolutionary outcomes with our clients.',
  },
  {
    id: 'impact',
    number: '05',
    title: 'Future Impact',
    subtitle: 'THE MEASURE OF SUCCESS',
    description: 'Our long-term focus is ensuring our creative and scalable solutions deliver demonstrable, sustainable, and industry-defining results for our partners.',
  },
 
];

// Custom Hook for exponential backoff in API calls (Placeholder for future API integration)
const useApiCallWithBackoff = () => {
    // This is a placeholder for real API logic, demonstrating required structure.
    const callApi = async (url, payload, retries = 5, delay = 1000) => {
        // Implementation of fetch with retries and exponential backoff
        // omitted for this UI component, but required for real API calls.
    };
    return { callApi };
};


export default function StickyAbout() {
  const scrollSectionRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Refs for animation loop data (avoids re-renders)
  const scrollProgressRef = useRef(0);
  const smoothProgressRef = useRef(0); // For Lerping

  // --- 3D SCENE SETUP ---
  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Materials
    // Sleek, metallic look
    const mainMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0.1, // Polished metal
      metalness: 0.9,
      transparent: true,
      opacity: 0.9
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x60a5fa, // Blue-400
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });

    // 3. Create Unique Shapes per Section
    const objects = [];

    // Helper to create groups
    const createSectionGroup = () => {
        const g = new THREE.Group();
        scene.add(g);
        objects.push(g);
        // Initial placement is corrected immediately by the animate loop
        g.position.y = -8; 
        return g;
    };

    // -- SHAPE 1: Boundless creativity (Icosahedron / Infinite Possibility) --
    const group1 = createSectionGroup();
    const i1 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), mainMaterial); 
    const w1 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.05, 16, 100), wireframeMaterial);
    group1.add(i1, w1);
    
    // -- SHAPE 2: intelligent scale (Network of Nodes / Precision Growth) --
    const group2 = createSectionGroup();
    const s2a = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), mainMaterial);
    s2a.position.set(1.5, 0, 0);
    const s2b = s2a.clone();
    s2b.position.set(-1.5, 0, 0);
    const s2c = s2a.clone();
    s2c.position.set(0, 1.5, 0);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x60a5fa, opacity: 0.5 });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(1.5, 0, 0), new THREE.Vector3(-1.5, 0, 0), 
        new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(1.5, 0, 0),
        new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(0, 1.5, 0)
    ]);
    const lines = new THREE.Line(lineGeometry, lineMaterial);
    group2.add(s2a, s2b, s2c, lines);
    group2.rotation.z = Math.PI / 4;

    // -- SHAPE 3: Obsessive craft (Torus Knot / Meticulous Detail) --
    const group3 = createSectionGroup();
    const t3 = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.2, 100, 16), mainMaterial);
    group3.add(t3);

    // -- SHAPE 4: Radical collaboration (Interlocked Rings / Symbiosis) --
    const group4 = createSectionGroup();
    const r4a = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 16, 100), mainMaterial);
    const r4b = r4a.clone();
    r4b.rotation.x = Math.PI / 2;
    group4.add(r4a, r4b);

    // -- SHAPE 5: Future Impact (Solid Foundation / Tetrahedron) --
    const group5 = createSectionGroup();
    const p5 = new THREE.Mesh(new THREE.TetrahedronGeometry(2, 0), mainMaterial);
    const w5 = new THREE.Mesh(new THREE.TetrahedronGeometry(2.5, 0), wireframeMaterial);
    group5.add(p5, w5);


    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Two directional lights for better metallic reflection
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);
    
    const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 1);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // 5. Animation Loop
    let frameId;
    const clock = new THREE.Clock();
    const transitionRange = 8; // Max vertical displacement

    const animate = () => {
      // time is used for passive rotation
      const time = clock.getElapsedTime();
      
      // --- SMOOTHING LOGIC ---
      smoothProgressRef.current += (scrollProgressRef.current - smoothProgressRef.current) * 0.1;
      
      const smoothProgress = smoothProgressRef.current;
      const totalSections = objects.length;
      // currentFloatIndex tells us where we are between 0 and 4 (for 5 sections)
      const currentFloatIndex = smoothProgress * (totalSections - 1);

      // --- OBJECT ANIMATION ---
      objects.forEach((obj, index) => {
        // offset: 0 when active, -1 when just below, 1 when just above
        const offset = currentFloatIndex - index; 
        const distAbs = Math.abs(offset);
        
        // 1. Scale/Visibility: Fade in/out based on absolute distance
        const scaleVisibility = Math.max(0, 1 - distAbs);
        // Use smoothstep for a softer pop
        const scale = THREE.MathUtils.smoothstep(scaleVisibility, 0, 1);
        obj.scale.setScalar(scale);
        obj.visible = scale > 0.01; 
        
        // 2. Vertical Fly-in/out Position (The continuous scroll effect from top)
        // Objects now enter from the top (negative Y) and exit toward the bottom (positive Y).
        const targetY = offset * transitionRange; 
        
        // Smoothly move the object to its calculated Y position
        obj.position.y += (targetY - obj.position.y) * 0.1; 
        
        // 3. Rotation for life and dynamism
        obj.rotation.y += 0.005 + (index === activeIndex ? 0.005 : 0); // Slightly faster when active
        obj.rotation.x = Math.sin(time * 0.5 + index * 0.5) * 0.05;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      // Simple cleanup for geometries/mats
      objects.forEach(g => {
          g.children.forEach(m => {
              if(m.geometry) m.geometry.dispose();
          });
      });
      mainMaterial.dispose();
      wireframeMaterial.dispose();
    };
  }, []); 

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollSectionRef.current) return;

      const rect = scrollSectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate scroll progress (0 to 1)
      const rawProgress = -rect.top / (sectionHeight - viewportHeight);
      const scrollProgress = Math.min(1, Math.max(0, rawProgress));
      
      // Update Target Ref
      scrollProgressRef.current = scrollProgress;

      // Update Active Index for React State (Text/Colors)
      const stepSize = 1 / aboutSections.length;
      // We divide the total progress by the size of one step (section) to get the float index
      let index = Math.floor(scrollProgress * aboutSections.length);
      index = Math.max(0, Math.min(index, aboutSections.length - 1));

      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const currentBgClass = BACKGROUND_COLORS[activeIndex] || BACKGROUND_COLORS[0];
  const dynamicClasses = BACKGROUND_COLORS.join(' ');

  return (
    <div className="relative font-sans selection:bg-blue-500 selection:text-black">
      
      {/* Scroll Wrapper: Height defines the total scroll distance */}
      <div 
        ref={scrollSectionRef} 
        className="relative z-20"
        // 200vh per section gives smooth transitions and a long scroll effect
        style={{ height: `${aboutSections.length * 200}vh` }} 
      >
        
        {/* Sticky Container: The viewport where the action happens */}
        <div 
          className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-1000 ease-in-out ${currentBgClass}`}
        >
          {/* 3D Canvas Layer */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 pointer-events-none opacity-80"
          />

          {/* Hidden Tailwind Force to ensure classes are loaded */}
          <div className={`hidden ${dynamicClasses}`}></div>
          
          {/* Content Overlay */}
          {aboutSections.map((section, index) => (
            <div
              key={section.id}
              // This container now uses flexbox to manage the title (center) and description (bottom)
              className={`absolute inset-0 flex flex-col justify-center items-center z-10 p-4 sm:p-8 md:p-12 transition-all duration-700 ease-in-out ${
                index === activeIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16 pointer-events-none'
              }`}
            >
              
              {/* Central Title and Subtitle Container (Takes minimal space, centers text) */}
              <div className="flex flex-col items-center text-white mb-auto mt-auto">
                 <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-blue-300 mb-4">
                    {section.subtitle}
                </p>
                <h2 className="text-white text-center text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] uppercase font-black tracking-tighter leading-none">
                  {section.title}
                </h2>
              </div>
              
              {/* Bottom Description Container (Pushed to the bottom by mb-auto/mt-auto above) */}
              <div className="w-full flex justify-center mt-auto mb-10">
                 <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-center max-w-xl md:max-w-3xl">
                  {section.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
}