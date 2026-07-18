import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../Components/PageHero';
import CalendlyPopup from '../Components/CalendlyPopup';
import BPEFFrameworkDetail from '../Components/BPEFFrameworkDetail';
import SEO, { SITE_URL } from '../utils/SEO';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const ninePerformanceDomains = [
  {
    title: 'Strategy & Leadership',
    description:
      'Ensuring the organisation has a clear direction, aligned priorities and effective decision-making.',
  },
  {
    title: 'Business Architecture & Process Excellence',
    description:
      'Designing efficient operating models and improving the way work flows across the organisation.',
  },
  {
    title: 'Data, Intelligence & AI',
    description:
      'Creating trusted information that supports better decisions and responsible use of artificial intelligence.',
  },
  {
    title: 'Governance, Risk & Compliance',
    description:
      'Strengthening accountability, controls and resilience while enabling innovation.',
  },
  {
    title: 'Enterprise Technology',
    description:
      'Aligning technology investments with business objectives and long-term value.',
  },
  {
    title: 'Product & Innovation',
    description:
      'Helping organisations design, deliver and improve products that solve meaningful customer problems.',
  },
  {
    title: 'People & Change',
    description: 'Building leadership capability and supporting people through transformation.',
  },
  {
    title: 'Procurement & Supply Chain Excellence',
    description:
      'Improving sourcing, supplier governance and operational resilience across the value chain.',
  },
  {
    title: 'Performance & Value Realisation',
    description: 'Measuring outcomes, tracking benefits and embedding continuous improvement.',
  },
];

const underperformCauses = [
  'Strategy that is difficult to execute.',
  'Inefficient or inconsistent business processes.',
  'Fragmented organisational structures.',
  'Weak governance and unclear accountability.',
  'Poor data quality and limited executive insight.',
  'Technology investments that fail to deliver expected value.',
  'Transformation programmes with low adoption.',
  'Limited visibility into performance and benefits.',
];

const businessValueOutcomes = [
  'Stronger strategic execution.',
  'Improved operational efficiency.',
  'Better governance and regulatory confidence.',
  'Faster, evidence-based executive decision-making.',
  'Responsible AI adoption.',
  'Increased organisational agility.',
  'Better customer and employee experiences.',
  'Sustainable transformation.',
  'Long-term value realisation.',
];

const BusinessPerformanceEngineeringPage = () => {
  const introRef = useRef(null);
  const underperformRef = useRef(null);
  const whatIsRef = useRef(null);
  const domainsHeaderRef = useRef(null);
  const domainsRef = useRef(null);
  const valueRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);

  useGsapReveal(introRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(underperformRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(whatIsRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(domainsHeaderRef);
  useGsapReveal(domainsRef, { stagger: 0.08 });
  useGsapReveal(valueRef, { selector: ':scope > *', stagger: 0.1 });
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business Performance Engineering™',
    description: 'Engineer Better Business Performance.',
    url: `${SITE_URL}/business-performance-engineering`,
    provider: {
      '@type': 'Organization',
      name: 'Delacruz Innovations',
      url: SITE_URL,
    },
    areaServed: ['Nigeria', 'Africa'],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Business Performance Engineering™',
    url: `${SITE_URL}/business-performance-engineering`,
  };

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Business Performance Engineering™ | BPEF™ Framework | Delacruz Innovations"
        description="Discover Business Performance Engineering™ and the Business Performance Engineering Framework™ (BPEF™). Learn how Delacruz Innovations helps organisations across Nigeria and Africa improve performance through strategy, governance, operations, data, AI and technology."
        canonical={`${SITE_URL}/business-performance-engineering`}
        jsonLd={[pageSchema, webPageSchema]}
      />

      <PageHero
        eyebrow="Business Performance Engineering™"
        headline="Engineer Better Business Performance."
        copy="A structured, measurable and practical approach to improving organisational performance."
        primaryCTALabel="Request an Executive Performance Assessment"
        scrollLabel="Explore Business Performance Engineering™"
        heroImage="https://i.pinimg.com/736x/a6/f8/10/a6f810ac7697664a5fb3c2de1f7d69e7.jpg"
        showCarousel={false}
      />

      {/* Introduction */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={introRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Every organisation has more potential than it is currently delivering.
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Growth slows when strategy and execution drift apart. Decision-making suffers when
              data cannot be trusted. Transformation stalls when people, processes, governance and
              technology evolve independently.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Most organisations do not fail because they lack ambition. They underperform because
              the systems that drive performance are no longer aligned.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Business Performance Engineering™ was developed to solve that challenge.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              It provides a structured, measurable and practical approach to improving
              organisational performance by aligning strategy, governance, people, processes, data
              and technology around clearly defined business outcomes.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              This is not another consulting methodology.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              It is an operating philosophy designed to help organisations perform better.
            </p>
          </div>
        </div>
      </section>

      {/* Why Organisations Underperform */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={underperformRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Why Organisations Underperform?
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Performance challenges rarely have a single cause.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              They are usually the result of multiple issues interacting over time, including:
            </p>
            <ul className="mb-6 space-y-2 border-l-2 border-purple-500/60 pl-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              {underperformCauses.map((cause) => (
                <li key={cause}>{cause}</li>
              ))}
            </ul>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Business Performance Engineering™ addresses these challenges holistically rather than
              in isolation.
            </p>
          </div>
        </div>
      </section>

      {/* What Is Business Performance Engineering */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={whatIsRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              What Is Business Performance Engineering™?
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Business Performance Engineering™ is Delacruz Innovations’ proprietary methodology
              for improving organisational performance.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Instead of beginning with technology or isolated projects, every engagement begins
              with one question:
            </p>
            <p className="mb-6 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
              “What business outcome is the organisation trying to achieve?”
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              From there, we align strategy, governance, operating models, business processes,
              people, data, artificial intelligence and technology to create measurable value.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              This ensures every initiative contributes to stronger organisational performance
              rather than simply delivering project outputs.
            </p>
          </div>
        </div>
      </section>

      {/* BPEF Framework */}
      <BPEFFrameworkDetail />

      {/* Nine Performance Domains */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div ref={domainsHeaderRef} className="mx-auto max-w-3xl md:text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
              Diagnostic Model
            </p>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              The Nine Performance Domains
            </h2>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Business Performance Engineering™ evaluates and improves organisational performance
              across nine interconnected domains.
            </p>
          </div>

          <div
            ref={domainsRef}
            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {ninePerformanceDomains.map((domain) => (
              <div
                key={domain.title}
                className="rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{domain.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{domain.description}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-center">
            No domain operates independently. Sustainable performance is achieved when these
            capabilities work together.
          </p>
        </div>
      </section>

      {/* How BPEF Creates Business Value */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={valueRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              How BPEF™ Creates Business Value
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Organisations engage Delacruz Innovations to achieve measurable outcomes such as:
            </p>
            <ul className="mb-6 space-y-2 border-l-2 border-purple-500/60 pl-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              {businessValueOutcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Business Performance Engineering™ provides the structure that connects these
              outcomes to practical execution.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl md:text-center">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Engineer Better Business Performance.
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
            Every successful transformation starts with understanding where performance can
            improve. Request an Executive Performance Assessment to discover how Business
            Performance Engineering™ can help your organisation achieve measurable, sustainable
            business outcomes.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:justify-center">
            <span ref={primaryCtaRef} className="inline-block rounded-full">
              <CalendlyPopup
                text="Request an Executive Performance Assessment"
                className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base"
              />
            </span>
            <span ref={secondaryCtaRef} className="inline-block rounded-full">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4"
              >
                Speak with a Business Performance Engineer
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPerformanceEngineeringPage;
