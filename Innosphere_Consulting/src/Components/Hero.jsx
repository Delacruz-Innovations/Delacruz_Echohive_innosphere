import React from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#000000] overflow-hidden pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      {/* 1. Starry Cosmos & Pure Black Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Starry cosmos overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&q=80')`
          }}
        />

        {/* Ambient gradients transitioning to pure #000000 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/95 via-[#0a2342]/20 to-[#000000]" />
        
        {/* Soft Secondary #0a2342 atmospheric illumination */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000000] via-[#0a2342]/20 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#0a2342]/25 rounded-sm blur-[130px]" />
      </div>

      {/* 2. Hero Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Pill Eyebrow Badge: "• PREMIUM ADVISORY" */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a2342]/70 backdrop-blur-md shadow-sm mb-8 animate-in fade-in duration-700">
          <span className="w-1.5 h-1.5 rounded-sm bg-[#ffffff] shadow-[0_0_8px_#ffffff]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#ffffff] uppercase">
            PREMIUM ADVISORY
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal text-[#ffffff] tracking-tight leading-[1.12] sm:leading-[1.15] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-800">
          PMO Advisory, Digital<br className="hidden sm:inline" /> Transformation &amp;<br className="hidden sm:inline" /> Business Consulting —<br className="hidden sm:inline" /> UAE &amp; Global
        </h1>

        {/* Subtitle / Description */}
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mt-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-900">
          Innosphere Consulting helps leadership teams move from ambition to execution across project delivery, business analysis, digital and AI transformation, and operational excellence.
        </p>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-1000">
          {/* Primary CTA (White / Clean High-Contrast Button) */}
          <CalendlyPopup
            text="Book a Consultation"
            className="w-full sm:w-auto bg-[#ffffff] hover:bg-gray-200 text-[#000000] font-semibold text-sm px-8 py-3.5 rounded-sm shadow-lg shadow-white/10 hover:scale-[1.03] transition-all duration-200 cursor-pointer"
          />

          {/* Secondary CTA (Secondary #0a2342 Button) */}
          <Link
            to="/our_services"
            className="w-full sm:w-auto bg-[#0a2342] hover:bg-[#0a2342]/80 text-[#ffffff] font-medium text-sm px-8 py-3.5 rounded-sm backdrop-blur-md transition-all duration-200 inline-flex items-center justify-center hover:scale-[1.02]"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;