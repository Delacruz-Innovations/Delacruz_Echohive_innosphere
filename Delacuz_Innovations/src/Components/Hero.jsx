import { ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import Blog02 from '../assets/Images/blog02.png';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

// ----------------------------------------------------------------------------
// CMS content model (maps to the canonical 9-field schema:
// eyebrow, headline, subheadline, primaryCTA, secondaryCTA,
// trustStatement, heroGraphic, backgroundVideo, scrollLabel)
// The fuller subheadline/secondary CTA/trust statement/dashboard now live in
// PerformanceSnapshot.jsx — this compact block matches the reference layout.
// ----------------------------------------------------------------------------
const heroContent = {
  eyebrow: 'BUSINESS PERFORMANCE ENGINEERING™',
  headline: 'Your Organisation Can Perform Better. We Help You Engineer It.',
  copy: 'Engineering measurable performance gains through strategy, governance, data and AI across Nigeria and Africa.',
  primaryCTA: { label: 'Request an Executive Performance Assessment' },
  scrollLabel: 'Discover How We Engineer Performance',
  ghostWord: 'PERFORM',
  heroImage:
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1974',
};

const caseStudyThumbs = [
  { title: 'Case Study', image: Blog02, link: '/case-studies' },
  { title: 'Insights', image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400&auto=format&fit=crop', link: '/insights' },
  { title: 'About Us', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop', link: '/about' },
];

const Hero = () => {
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const [thumbIndex, setThumbIndex] = useState(0);

  useGsapReveal(contentRef, { y: 28, stagger: 0.15, duration: 0.9 });
  useHoverGlow(primaryCtaRef);

  const visibleThumbs = [
    caseStudyThumbs[thumbIndex % caseStudyThumbs.length],
    caseStudyThumbs[(thumbIndex + 1) % caseStudyThumbs.length],
  ];

  const prevThumb = () =>
    setThumbIndex((i) => (i - 1 + caseStudyThumbs.length) % caseStudyThumbs.length);
  const nextThumb = () => setThumbIndex((i) => (i + 1) % caseStudyThumbs.length);

  const scrollToNext = () => {
    const next = heroRef.current?.nextElementSibling;
    const behavior = reduced ? 'auto' : 'smooth';
    if (next) {
      next.scrollIntoView({ behavior });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen w-full items-end overflow-hidden bg-black"
    >
      {/* Background photo — full-bleed, edge to edge */}
      <div className="absolute inset-0">
        <img
          src={heroContent.heroImage}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-purple-900/30"></div>

        {/* Oversized ghost word — ambient brand motif */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 top-24 select-none whitespace-nowrap text-[7rem] font-bold uppercase leading-none text-purple-900/25 sm:top-28 sm:text-[11rem] lg:top-32 lg:text-[15rem]"
        >
          {heroContent.ghostWord}
        </span>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex w-full flex-col items-start justify-between gap-8 px-6 pb-16 pt-32 sm:flex-row sm:items-end sm:px-10 sm:pb-20 lg:px-16"
      >
        {/* Bottom-left: eyebrow, headline, copy, primary CTA */}
        <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
              {heroContent.eyebrow}
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {heroContent.headline}
            </h1>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-300 sm:text-base">
              {heroContent.copy}
            </p>
            <span ref={primaryCtaRef} className="inline-block rounded-full">
              <CalendlyPopup
                text={heroContent.primaryCTA.label}
                className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base"
              />
            </span>
          </div>

          {/* Bottom-right: case-study thumbnail carousel */}
          <div className="hidden shrink-0 flex-col items-end gap-3 sm:flex">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevThumb}
                aria-label="Previous case study"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextThumb}
                aria-label="Next case study"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-3">
              {visibleThumbs.map((thumb) => (
                <Link
                  key={thumb.title}
                  to={thumb.link}
                  className="group h-24 w-36 overflow-hidden rounded-xl border border-white/10 transition-colors duration-300 hover:border-purple-400"
                >
                  <img
                    src={thumb.image}
                    alt={thumb.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={scrollToNext}
          aria-label={heroContent.scrollLabel}
          className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-300 transition-colors hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
        </button>

      {/* Sticky tertiary CTA */}
      <StickyExpertCta />
    </section>
  );
};

const StickyExpertCta = () => {
  const stickyCtaRef = useRef(null);
  useHoverGlow(stickyCtaRef);

  return (
    <span ref={stickyCtaRef} className="fixed bottom-6 right-6 z-40 inline-block rounded-full">
      <CalendlyPopup
        text="Speak to an Expert"
        className="inline-flex items-center rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-purple-900/50 transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      />
    </span>
  );
};

export default Hero;
