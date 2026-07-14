import { ArrowRight, Check } from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../ServicesData.json';
import practiceAreaIcons from '../utils/practiceAreaIcons';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';
import { trackEvent } from '../utils/analytics';

const PracticeCard = ({ area }) => {
  const Icon = practiceAreaIcons[area.icon];
  const ctaRef = useRef(null);
  useHoverGlow(ctaRef, { scale: 1.03 });

  return (
    <div className="rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="lg:w-1/3">
          {Icon && (
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20">
              <Icon className="h-7 w-7 text-purple-400" aria-hidden="true" />
            </div>
          )}
          <h3 className="mb-3 text-2xl font-bold text-white">{area.title}</h3>
          <p className="mb-6 border-l-2 border-purple-500/60 pl-4 text-sm italic leading-relaxed text-gray-400">
            “{area.executiveChallenge}”
          </p>
          <span ref={ctaRef} className="inline-block rounded-full">
            <Link
              to={`/services/${area.slug}`}
              onClick={() => trackEvent('practice_card_click', { practice_area: area.slug })}
              className="group inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Explore {area.title}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </span>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Business Outcomes
            </h4>
            <ul className="space-y-3">
              {area.deliverables.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-purple-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-gray-300">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Typical Services
            </h4>
            <ul className="space-y-3">
              {area.serviceLines.map((line) => (
                <li key={line.title} className="text-sm leading-relaxed text-gray-300">
                  {line.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const PracticeCardGrid = () => {
  const gridRef = useRef(null);
  useGsapReveal(gridRef, { selector: ':scope > *', stagger: 0.12, y: 24 });

  return (
    <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Our Practice Areas
          </h2>
        </div>

        <div ref={gridRef} className="space-y-6">
          {servicesData.services.map((area) => (
            <PracticeCard key={area.slug} area={area} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeCardGrid;
