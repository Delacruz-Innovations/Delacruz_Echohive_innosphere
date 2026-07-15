import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const ComingSoonPage = ({ eyebrow, title, description }) => {
  const contentRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);

  useGsapReveal(contentRef, { selector: ':scope > *', stagger: 0.12 });
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  return (
    <div className="flex min-h-screen items-center bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div ref={contentRef} className="mx-auto max-w-2xl md:text-center">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h1>
        <p className="mb-10 text-base leading-relaxed text-gray-300 sm:text-lg">{description}</p>

        <div className="flex flex-wrap items-center gap-4 md:justify-center">
          <span ref={primaryCtaRef} className="inline-block rounded-full">
            <CalendlyPopup
              text="Speak to an Expert"
              className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base"
            />
          </span>
          <span ref={secondaryCtaRef} className="inline-block rounded-full">
            <Link
              to="/services"
              className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4"
            >
              Explore Our Solutions
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
