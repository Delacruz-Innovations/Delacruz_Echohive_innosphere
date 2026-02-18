
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
const AboutUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const cardRef = useRef(null);

   const fullText = `Inosphere Consulting was founded by our Lead Business Consultant - Tosin Samuel Ojo. Boasting over 15 years of international experience spanning the UK, Europe, and Africa. The firm now operates in Dubai, serving MENA-based companies seeking practical, tech-driven strategies for sustainable growth. Our work is grounded in execution every recommendation is backed by hands-on implementation and measurable results.`;

  const [displayedText, setDisplayedText] = useState("");
  const index = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index.current));
      index.current += 1;
      if (index.current === fullText.length) clearInterval(interval);
    }, 20); // typing speed (ms per character)

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate title
          if (titleRef.current) {
            titleRef.current.style.opacity = '0';
            titleRef.current.style.transform = 'translateY(30px)';
            setTimeout(() => {
              titleRef.current.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              titleRef.current.style.opacity = '1';
              titleRef.current.style.transform = 'translateY(0)';
            }, 100);
          }

          // Animate left content
          if (leftContentRef.current) {
            leftContentRef.current.style.opacity = '0';
            leftContentRef.current.style.transform = 'translateX(-50px)';
            setTimeout(() => {
              leftContentRef.current.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              leftContentRef.current.style.opacity = '1';
              leftContentRef.current.style.transform = 'translateX(0)';
            }, 300);
          }

          // Animate right content
          if (rightContentRef.current) {
            rightContentRef.current.style.opacity = '0';
            rightContentRef.current.style.transform = 'translateX(50px)';
            setTimeout(() => {
              rightContentRef.current.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              rightContentRef.current.style.opacity = '1';
              rightContentRef.current.style.transform = 'translateX(0)';
            }, 300);
          }

          // Animate card
          if (cardRef.current) {
            cardRef.current.style.opacity = '0';
            cardRef.current.style.transform = 'translateY(30px) scale(0.95)';
            setTimeout(() => {
              cardRef.current.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
              cardRef.current.style.opacity = '1';
              cardRef.current.style.transform = 'translateY(0) scale(1)';
            }, 600);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="relative pt-40 min-h-screen bg-black text-white overflow-hidden">
{/* Background Video - Component Only */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="absolute inset-0 w-full h-full object-cover opacity-20"
  >
    <source src="https://media.istockphoto.com/id/1629474406/video/digital-data-protection-security-icon-binary-code-wave-blue-background.mp4?s=mp4-640x640-is&k=20&c=XQeVAgRXBPD7DTHx6-7SCYNlx9Rzq3l1hziwJrlBpwA=" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/50"></div>
</div>
      {/* About Us Section */}
      <section ref={sectionRef} className="relative z-10 py-4 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-16">
            ABOUT US
          </h2>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Column */}
         <div ref={leftContentRef} className="space-y-6">
  <p className="text-gray-300 leading-relaxed">
    <span className="text-white font-semibold">Innosphere Consulting FZE LLC</span> is a Dubai-based consultancy firm helping organisations transform through 
    <span className="text-white font-semibold"> technology, innovation, and strategic advisory</span>. 
    Registered under a wide range of technology, consultancy, and marketing activities, Innosphere is uniquely positioned to act as a 
    <span className="text-white font-semibold"> 360° partner</span> for enterprises, SMEs, and government-linked organisations in the UAE.
  </p>

  <p className="text-gray-300 leading-relaxed">
    Our multidisciplinary approach  covering 
    <span className="text-[#6b9dc7] font-semibold"> digital transformation</span>, 
    <span className="text-[#6b9dc7] font-semibold"> cyber security</span>, 
    <span className="text-[#6b9dc7] font-semibold"> marketing</span>, 
    <span className="text-[#6b9dc7] font-semibold"> management consulting</span>, and 
    <span className="text-[#6b9dc7] font-semibold"> software innovation</span>  ensures clients not only meet today’s challenges but also align with 
    <span className="text-white font-semibold"> Dubai D33</span>, 
    <span className="text-white font-semibold"> UAE AI Strategy 2031</span>, and the 
    <span className="text-white font-semibold"> Digital Government Strategy 2025</span>.
  </p>

  <p className="text-gray-300 leading-relaxed">
    We combine strategic thinking with technological expertise to deliver 
    <span className=  "text-white font-semibold"> measurable results</span>, empowering our clients to innovate, grow, and lead in the evolving digital economy.
  </p>
</div>


            {/* Right Column */}
            <div
      ref={rightContentRef}
      className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 border border-gray-800"
    >
      <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
        {displayedText}
        <span className="border-r-2 border-[#6b9dc7] animate-pulse ml-1"></span>
      </p>
    </div>
          </div>

          {/* Bottom Card */}
          {/* <Link to="/about" ref={cardRef} className="flex justify-end">
            <div className="group bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center gap-6 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 max-w-md">
              
              <div className="flex-1">
                <p>Know More</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </Link> */}
        </div>
      </section>

    
    </div>
  );
};

export default AboutUs;