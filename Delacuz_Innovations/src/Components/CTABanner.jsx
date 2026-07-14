import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import CalendlyPopup from './CalendlyPopup';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const CTABanner = () => {
  const contentRef = useRef(null);
  const ctaRef = useRef(null);

  useGsapReveal(contentRef, { y: 24, stagger: 0.2 });
  useHoverGlow(ctaRef);

  return (
    <section className="relative bg-black py-10 px-3 sm:px-5 lg:px-6 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div ref={contentRef} className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Decorative Element */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Start Your{' '}
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            Partner with us to build competitive advantage through{' '}
            <span className="text-purple-400 font-semibold">strategy</span> and{' '}
            <span className="text-purple-400 font-semibold">technology</span>.
          </p>

          {/* CTA Button */}
          <span ref={ctaRef} className="inline-block rounded-full">
            <CalendlyPopup
              text="Book A Free Consultation"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-purple-600 text-white text-lg font-semibold rounded-full transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="relative z-10 flex items-center gap-3">
                Book A Free Consultation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </CalendlyPopup>
          </span>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm">Trusted by 20+ Companies</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm">98% Client Satisfaction</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-sm">Award-Winning Solutions</span>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
    </section>
  );
};

export default CTABanner;
