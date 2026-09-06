import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CalendlyPopup from './CalendlyPopup';

const Hero = () => {
  return (
    <section data-hero="true" className="relative min-h-[92vh] flex items-center justify-center bg-[#080f1d] overflow-hidden pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      {/* 1. Starry Cosmos & Midnight Navy Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Starry cosmos overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
          style={{
            backgroundImage: `url('https://i.pinimg.com/1200x/c6/ca/cd/c6cacd7a728423aede3eec4a9a04eb6f.jpg')`
          }}
        />

        {/* Ambient gradients transitioning to #080f1d */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/95 via-[#0a2342]/30 to-[#080f1d]" />
        
        {/* Soft Secondary #0a2342 atmospheric illumination */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080f1d] via-[#0a2342]/30 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#0a2342]/35 rounded-sm blur-[130px]" />
      </div>

      {/* 2. Hero Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Sub-tagline Pill Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0a2342]/70 backdrop-blur-md border border-blue-500/20 shadow-sm mb-6 animate-in fade-in duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-blue-200 uppercase">
            Strategy. Innovation. Digital Transformation — Built in the UAE
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-normal text-[#ffffff] tracking-tight leading-[1.12] sm:leading-[1.15] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-800">
          Business Transformation for <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 font-medium">
            UAE Growth-Stage Businesses
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mt-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-900">
          We help UAE businesses remove operational bottlenecks, redesign processes and implement the technology needed to scale with confidence.
        </p>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-1000">
          {/* Primary CTA: Book a Consultation */}
          <CalendlyPopup
            text="Book a Consultation"
            className="w-full sm:w-auto bg-[#ffffff] hover:bg-gray-200 text-[#000000] font-semibold text-sm px-8 py-3.5 rounded-sm shadow-lg shadow-white/10 hover:scale-[1.03] transition-all duration-200 cursor-pointer text-center"
          />

          {/* Secondary CTA: Assess Your Business */}
          <Link
            to="/assessment"
            className="w-full sm:w-auto bg-[#0a2342] hover:bg-blue-900/80 border border-blue-500/30 text-[#ffffff] font-medium text-sm px-8 py-3.5 rounded-sm backdrop-blur-md transition-all duration-200 inline-flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-blue-950/40 text-center"
          >
            <span>Assess Your Business</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;