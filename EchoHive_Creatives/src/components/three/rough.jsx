import React, { useRef, useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Home from './Pages/Home';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Careers from './components/sections/Careers';
import Newsroom from './pages/Newsroom';
import Locations from './pages/Locations';
import Work from './pages/Work';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import CaseStudyDetail from './pages/CaseStudyDetail';

// Scroll to Top Component
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll, 'smooth' for animated
    });
  }, [location.pathname]);
  
  return null;
};

// Page Transition Wrapper Component
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: 100,
        scale: 0.95
      }}
      animate={{ 
        opacity: 1,
        y: 0,
        scale: 1
      }}
      exit={{ 
        opacity: 0,
        y: -100,
        scale: 1.05
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// Main App Content with Transitions
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-black">
      <BeeOverlay />
      <ScrollToTop />
      <Header />
      <main className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route 
              index 
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } 
            />
            <Route 
              path="/careers" 
              element={
                <PageTransition>
                  <Careers />
                </PageTransition>
              } 
            />
            <Route 
              path="/news" 
              element={
                <PageTransition>
                  <Newsroom />
                </PageTransition>
              } 
            />
             <Route 
              path="/locations" 
              element={
                <PageTransition>
                  <Locations />
                </PageTransition>
              } 
            />
              <Route 
              path="/work" 
              element={
                <PageTransition>
                  <Work />
                </PageTransition>
              } 
            />
             <Route 
              path="/services" 
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              } 
            />
             <Route 
              path="/svsDt" 
              element={
                <PageTransition>
                  <ServiceDetails />
                </PageTransition>
              } 
            />
             <Route 
              path="case" 
              element={
                <PageTransition>
                  <CaseStudyDetail />
                </PageTransition>
              } 
            />
            <Route 
              path="*" 
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

// Bee Overlay Component (same as your existing code)
const BeeOverlay = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const mouseRef = useRef({ x: null, y: null });
  const beeRef = useRef({
    x: 0,
    y: 0,
    angle: 0,
    speed: 4,
    turnSpeed: 0.05,
    wingAngle: 0,
    wingSpeed: 0.5,
    wanderTarget: { x: 0, y: 0 }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize position securely
    beeRef.current.x = window.innerWidth / 2;
    beeRef.current.y = window.innerHeight / 2;
    beeRef.current.wanderTarget = { 
      x: Math.random() * window.innerWidth, 
      y: Math.random() * window.innerHeight 
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Track mouse globally so it works over other UI elements
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize();

    const drawBee = (x, y, angle, wingAngle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const scale = 0.6;
      ctx.scale(scale, scale);

      const wingOffset = Math.sin(wingAngle) * 15;

      // Wings
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.strokeStyle = '#a5b4fc';
      ctx.lineWidth = 1;

      // Right Wing
      ctx.save();
      ctx.translate(5, -10);
      ctx.rotate(Math.PI / 4 + wingOffset * 0.05); 
      ctx.beginPath();
      ctx.ellipse(20, -20, 25, 12, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Left Wing
      ctx.save();
      ctx.translate(5, 10);
      ctx.rotate(-(Math.PI / 4 + wingOffset * 0.05));
      ctx.beginPath();
      ctx.ellipse(20, 20, 25, 12, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Stinger
      ctx.beginPath();
      ctx.moveTo(-30, 0);
      ctx.lineTo(-40, 0);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Body
      ctx.fillStyle = '#fbbf24'; 
      ctx.beginPath();
      ctx.ellipse(0, 0, 30, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Stripes
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-10, -16); ctx.quadraticCurveTo(-5, 0, -10, 16);
      ctx.moveTo(5, -17); ctx.quadraticCurveTo(10, 0, 5, 17);
      ctx.moveTo(-20, -12); ctx.quadraticCurveTo(-15, 0, -20, 12);
      ctx.stroke();

      // Face
      ctx.fillStyle = 'white';
      ctx.beginPath(); ctx.arc(18, -6, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'black';
      ctx.beginPath(); ctx.arc(20, -6, 2.5, 0, Math.PI * 2); ctx.fill();

      // Smile & Antennae
      ctx.beginPath(); ctx.arc(20, 2, 5, 0.2, Math.PI / 2);
      ctx.strokeStyle = '#000'; ctx.lineWidth = 1.5; ctx.stroke();
      
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(22, -10); ctx.quadraticCurveTo(30, -20, 25, -25); ctx.stroke();
      ctx.beginPath(); ctx.arc(25, -25, 2, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(22, -10); ctx.quadraticCurveTo(35, -15, 32, -22); ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bee = beeRef.current;
      let targetX, targetY;
      
      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        targetX = mouseRef.current.x;
        targetY = mouseRef.current.y;
      } else {
        const distToTarget = Math.hypot(bee.wanderTarget.x - bee.x, bee.wanderTarget.y - bee.y);
        if (distToTarget < 50) {
            bee.wanderTarget = {
                x: 50 + Math.random() * (canvas.width - 100),
                y: 50 + Math.random() * (canvas.height - 100)
            };
        }
        targetX = bee.wanderTarget.x;
        targetY = bee.wanderTarget.y;
      }

      const dx = targetX - bee.x;
      const dy = targetY - bee.y;
      const targetAngle = Math.atan2(dy, dx);

      let diff = targetAngle - bee.angle;
      while (diff <= -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      
      bee.angle += diff * bee.turnSpeed;
      bee.x += Math.cos(bee.angle) * bee.speed;
      bee.y += Math.sin(bee.angle) * bee.speed;
      bee.y += Math.sin(Date.now() / 200) * 1;
      bee.wingAngle += bee.wingSpeed;

      drawBee(bee.x, bee.y, bee.angle, bee.wingAngle);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0F1225]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
           
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App