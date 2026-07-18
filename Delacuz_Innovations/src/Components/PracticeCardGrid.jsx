import { ArrowRight, Check } from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../ServicesData.json';
import practiceAreaIcons from '../utils/practiceAreaIcons';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';
import { trackEvent } from '../utils/analytics';
import HorizontalScrollRow from './HorizontalScrollRow';

const PracticeCard = ({ area }) => {
  const Icon = practiceAreaIcons[area.icon];
  const ctaRef = useRef(null);
  useHoverGlow(ctaRef, { scale: 1.03 });

  return (
    <div className="practice-card w-[85vw] shrink-0 snap-start rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60 sm:w-[440px] sm:p-8">
      {Icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600/20">
          <Icon className="h-7 w-7 text-purple-400" aria-hidden="true" />
        </div>
      )}
      <h3 className="mb-3 text-2xl font-bold text-white">{area.title}</h3>
      <p className="mb-6 border-l-2 border-purple-500/60 pl-4 text-sm italic leading-relaxed text-gray-400">
        “{area.executiveChallenge}”
      </p>

      {area.howWeHelp && (
        <p className="mb-6 text-sm leading-relaxed text-gray-300">{area.howWeHelp}</p>
      )}

      {area.typicalCapabilities && area.typicalCapabilities.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
            Typical Capabilities
          </h4>
          <ul className="space-y-2">
            {area.typicalCapabilities.map((capability) => (
              <li key={capability} className="text-sm leading-relaxed text-gray-300">
                {capability}
              </li>
            ))}
          </ul>
        </div>
      )}

      {area.solutionOutcomes && area.solutionOutcomes.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
            Outcomes
          </h4>
          <ul className="space-y-2">
            {area.solutionOutcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-purple-400" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-gray-300">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <span ref={ctaRef} className="inline-block rounded-full">
        <Link
          to={`/services/${area.slug}`}
          onClick={() => trackEvent('practice_card_click', { practice_area: area.slug })}
          className="group inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </span>
    </div>
  );
};

const PracticeCardGrid = () => {
  const gridRef = useRef(null);
  useGsapReveal(gridRef, { selector: '.practice-card', stagger: 0.12, y: 24 });

  return (
    <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div ref={gridRef} className="mx-auto max-w-6xl">
        <div className="mb-6 md:text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Our Solutions
          </h2>
        </div>

        <HorizontalScrollRow>
          <div className="contents">
            {servicesData.services.map((area) => (
              <PracticeCard key={area.slug} area={area} />
            ))}
          </div>
        </HorizontalScrollRow>
      </div>
    </section>
  );
};

export default PracticeCardGrid;
