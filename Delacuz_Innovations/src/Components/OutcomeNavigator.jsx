import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import servicesData from '../ServicesData.json';
import practiceAreaIcons from '../utils/practiceAreaIcons';
import useGsapReveal from '../utils/useGsapReveal';
import { trackEvent } from '../utils/analytics';

const outcomes = [
  {
    title: 'Improve Operational Efficiency',
    description: 'Reduce operational waste, improve productivity and optimise business processes.',
    slug: 'business-architecture-process-excellence',
  },
  {
    title: 'Accelerate Growth',
    description: 'Create scalable operating models that support sustainable expansion.',
    slug: 'strategy-transformation',
  },
  {
    title: 'Strengthen Governance',
    description: 'Improve governance, compliance, risk management and executive oversight.',
    slug: 'governance-risk-compliance',
  },
  {
    title: 'Modernise Technology',
    description: 'Align technology investments with business strategy and long-term value.',
    slug: 'enterprise-technology',
  },
  {
    title: 'Build AI Capability',
    description: 'Adopt artificial intelligence responsibly with clear governance and measurable business value.',
    slug: 'data-intelligence-ai',
  },
  {
    title: 'Deliver Better Products',
    description: 'Develop products that solve customer problems and create sustainable growth.',
    slug: 'product-innovation',
  },
  {
    title: 'Lead Successful Change',
    description: 'Prepare leaders and employees to adopt transformation successfully.',
    slug: 'people-change',
  },
  {
    title: 'Optimise Procurement',
    description: 'Improve sourcing, supplier governance and supply chain performance.',
    slug: 'procurement-supply-chain-excellence',
  },
];

const OutcomeNavigator = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useGsapReveal(headerRef);
  useGsapReveal(gridRef, { stagger: 0.08 });

  return (
    <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            What Are You Trying to Achieve?
          </h2>
        </div>

        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome) => {
            const practiceArea = servicesData.services.find((s) => s.slug === outcome.slug);
            const Icon = practiceAreaIcons[practiceArea?.icon];

            return (
              <Link
                key={outcome.title}
                to={`/services/${outcome.slug}`}
                onClick={() =>
                  trackEvent('outcome_card_click', { outcome: outcome.title, practice_area: outcome.slug })
                }
                className="group flex flex-col rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60"
              >
                {Icon && <Icon className="mb-4 h-7 w-7 text-purple-400" aria-hidden="true" />}
                <h3 className="mb-2 text-base font-semibold text-white">{outcome.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{outcome.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OutcomeNavigator;
