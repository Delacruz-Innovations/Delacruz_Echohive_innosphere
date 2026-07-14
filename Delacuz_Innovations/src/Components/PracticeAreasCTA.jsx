import { ArrowRight } from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';
import { trackEvent } from '../utils/analytics';

const PracticeAreasCTA = () => {
  const contentRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);

  useGsapReveal(contentRef, { y: 24, stagger: 0.2 });
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  return (
    <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div ref={contentRef} className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
          Engineer Better Business Performance.
        </h2>
        <p className="mb-10 text-base leading-relaxed text-gray-300 sm:text-lg">
          Whether your organisation is pursuing growth, operational excellence, stronger governance
          or responsible AI adoption, the first step is understanding where performance can be
          improved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <span ref={primaryCtaRef} className="inline-block rounded-full">
            <CalendlyPopup
              text="Request an Executive Performance Assessment"
              className="inline-flex items-center rounded-full bg-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            />
          </span>
          <span ref={secondaryCtaRef} className="inline-block rounded-full">
            <Link
              to="/contact"
              onClick={() => trackEvent('contact_cta_click', { source: 'practice_areas_cta' })}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Speak with a Business Performance Engineer
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasCTA;
