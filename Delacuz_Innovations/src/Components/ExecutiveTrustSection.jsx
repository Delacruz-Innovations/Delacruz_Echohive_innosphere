import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import useGsapReveal from '../utils/useGsapReveal';

const capabilityHighlights = [
  { label: 'Business Performance Engineering™', to: '/services', featured: true },
  { label: 'Enterprise Strategy', to: '/services/strategy-transformation' },
  { label: 'Business Transformation', to: '/services/strategy-transformation' },
  { label: 'Business Architecture', to: '/services/business-architecture-process-excellence' },
  { label: 'Operational Excellence', to: '/services/business-architecture-process-excellence' },
  { label: 'Data, Intelligence & AI', to: '/services/data-intelligence-ai' },
  { label: 'Governance, Risk & Compliance', to: '/services/governance-risk-compliance' },
  { label: 'Enterprise Technology', to: '/services/enterprise-technology' },
  { label: 'Product & Innovation', to: '/services/product-innovation' },
  { label: 'People & Change', to: '/services/people-change' },
  { label: 'Procurement & Supply Chain Excellence', to: '/services/procurement-supply-chain-excellence' },
];

const trustContent = {
  heading: 'Trusted Methodology. Practical Thinking. Measurable Outcomes.',
  body:
    'Successful transformation is rarely the result of implementing more technology.\n\n' +
    'It is achieved when business strategy, governance, people, processes, data and technology are deliberately aligned to improve organisational performance.\n\n' +
    'Every Delacruz engagement is guided by the Business Performance Engineering Framework™ (BPEF™) our structured methodology for diagnosing business challenges, designing practical solutions, delivering transformation and sustaining measurable value.\n\n' +
    'We do not begin with technology.\n\n' +
    'We begin with the business outcome your organisation needs to achieve.\n\n' +
    'That difference shapes every recommendation we make.',
};

const ExecutiveTrustSection = () => {
  const contentRef = useRef(null);
  const pillsRef = useRef(null);

  useGsapReveal(contentRef, { y: 28, stagger: 0.15, duration: 0.9 });
  useGsapReveal(pillsRef, { selector: 'a', stagger: 0.04, y: 12 });

  return (
    <section className="bg-black px-3 py-2s sm:px-5 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <div ref={contentRef} className="md:text-center">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {trustContent.heading}
          </h2>
          <p className="mx-auto max-w-3xl whitespace-pre-line text-base leading-relaxed text-gray-300 sm:text-lg">
            {trustContent.body}
          </p>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
            Capability Highlights
          </p>
          <div ref={pillsRef} className="flex flex-wrap justify-center gap-3">
            {capabilityHighlights.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={
                  item.featured
                    ? 'rounded-full border border-purple-400/60 bg-purple-600/20 px-5 py-2 text-sm font-semibold text-purple-200 transition-colors duration-300 hover:border-purple-400 hover:bg-purple-600/30'
                    : 'rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveTrustSection;
