import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Activity,
  Target,
  Workflow,
  Building2,
  PenTool,
  CheckCircle2,
} from 'lucide-react';
import PageHero from '../Components/PageHero';
import CalendlyPopup from '../Components/CalendlyPopup';
import SEO, { SITE_URL } from '../utils/SEO';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const diagnostics = [
  {
    icon: Compass,
    title: 'BPE360™ Executive Diagnostic',
    description:
      'A comprehensive business performance assessment evaluating strategy, governance, operations, people, data and technology. The assessment identifies organisational strengths, capability gaps and strategic opportunities while producing a structured roadmap for future transformation.',
    outcomes: [
      'Executive Performance Baseline',
      'Business Capability Assessment',
      'Transformation Readiness Report',
      'Prioritised Improvement Roadmap',
      'Executive Recommendations',
    ],
  },
  {
    icon: Activity,
    title: 'Executive Performance Pulse™',
    description:
      'A rapid executive assessment providing senior leaders with a high-level understanding of organisational health, strategic alignment and operational maturity. Ideal for organisations seeking an evidence-based starting point before embarking on larger transformation programmes.',
    outcomes: [
      'Executive Health Check',
      'Strategic Alignment Assessment',
      'Immediate Performance Priorities',
      'High-Level Recommendations',
    ],
  },
];

const frameworks = [
  {
    icon: Target,
    title: 'Business Performance Engineering™',
    description:
      'Our signature methodology that aligns strategy, governance, operations, people, data and technology around measurable business outcomes.',
  },
  {
    icon: Workflow,
    title: 'Business Performance Engineering Framework™ (BPEF™)',
    description:
      'A structured transformation framework guiding organisations through discovery, diagnosis, strategy, implementation, governance and continuous improvement.',
  },
  {
    icon: Building2,
    title: 'Business Outcome Architecture™',
    description:
      'A strategic planning framework connecting business objectives, capabilities, investments and measurable outcomes to ensure every initiative contributes to organisational success.',
  },
  {
    icon: PenTool,
    title: 'Business Value Canvas™',
    description:
      'A practical decision-making framework enabling organisations to identify, prioritise and measure opportunities that create sustainable business value.',
  },
];

const advisoryCapabilities = [
  'Executive Advisory',
  'Business Transformation',
  'Operational Excellence',
  'Governance, Risk & Compliance',
  'Data & AI Readiness',
  'Business Architecture',
  'Enterprise Change & Capability Development',
];

const BusinessPerformancePlatformPage = () => {
  const introRef = useRef(null);
  const layersHeaderRef = useRef(null);
  const layerOneHeaderRef = useRef(null);
  const diagnosticsRef = useRef(null);
  const layerTwoHeaderRef = useRef(null);
  const frameworksRef = useRef(null);
  const layerThreeHeaderRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);

  useGsapReveal(introRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(layersHeaderRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(layerOneHeaderRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(diagnosticsRef, { selector: '.diagnostic-card', stagger: 0.1, y: 24 });
  useGsapReveal(layerTwoHeaderRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(frameworksRef, { selector: '.framework-card', stagger: 0.08, y: 24 });
  useGsapReveal(layerThreeHeaderRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(capabilitiesRef, { stagger: 0.06 });
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Business Performance Platform™',
    url: `${SITE_URL}/business-performance-platform`,
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business Performance Platform™',
    description:
      'An integrated ecosystem of executive diagnostics, proprietary frameworks, advisory services and digital platforms designed to improve business performance and accelerate transformation.',
    provider: {
      '@type': 'Organization',
      name: 'Delacruz Innovations',
      url: SITE_URL,
    },
    areaServed: ['Nigeria', 'Africa'],
  };

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Business Performance Platform™ | Delacruz Innovations"
        description="Discover the Business Performance Platform™—an integrated ecosystem of executive diagnostics, proprietary frameworks, advisory services and digital platforms designed to improve business performance and accelerate transformation."
        canonical={`${SITE_URL}/business-performance-platform`}
        jsonLd={[webPageSchema, serviceSchema]}
      />

      <PageHero
        eyebrow="Business Performance Platform™"
        headline="An Integrated Ecosystem for Better Business Performance."
        copy="A connected ecosystem of proprietary frameworks, executive diagnostics, advisory capabilities and digital platforms designed to improve performance and accelerate transformation."
        primaryCTALabel="Book an Executive Discovery Session"
        secondaryCTALabel="Explore the Platform"
        secondaryCTATo="#platform-layers"
        scrollLabel="Explore the Business Performance Platform™"
        heroImage="https://i.pinimg.com/736x/29/81/e3/2981e3bccd8697f5a22d255174d74704.jpg"
        showCarousel={false}
      />

      {/* Introduction */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={introRef}>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Businesses rarely improve performance through isolated projects or one-time
              initiatives. Sustainable growth is achieved by making informed decisions, applying
              proven methodologies, measuring outcomes consistently and enabling transformation
              with the right capabilities and technology.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              The Business Performance Platform™ is Delacruz Innovations’ integrated ecosystem of
              proprietary frameworks, executive diagnostics, advisory capabilities and digital
              platforms designed to help organisations improve performance, accelerate
              transformation and deliver measurable business outcomes.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Rather than offering disconnected consulting services, the platform provides a
              structured journey—from executive insight and strategic planning to implementation,
              governance and continuous performance improvement.
            </p>
          </div>
        </div>
      </section>

      {/* One Platform. Four Connected Layers. */}
      <section id="platform-layers" className="scroll-mt-24 bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={layersHeaderRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              One Platform. Four Connected Layers.
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              The Business Performance Platform™ brings together everything required to improve
              organisational performance.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Unlike traditional consulting engagements that focus on solving isolated business
              problems, our platform provides a connected ecosystem supporting continuous
              improvement across every stage of the business transformation journey.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Each layer builds upon the previous one, ensuring every decision is informed by
              evidence, every initiative is aligned to strategy and every investment contributes
              measurable business value.
            </p>
          </div>
        </div>
      </section>

      {/* Layer One — Executive Intelligence */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div ref={layerOneHeaderRef} className="mx-auto mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Layer One
            </p>
            <h2 className="mb-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Executive Intelligence
            </h2>
            <h3 className="mb-6 text-lg font-medium text-purple-300">
              Better Decisions Start with Better Insight.
            </h3>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Transformation should never begin with assumptions.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Executive teams require objective insight into organisational performance before
              making strategic investments.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Our executive diagnostics establish a clear understanding of current capability,
              operational maturity and transformation readiness, providing leaders with the
              confidence to prioritise initiatives that deliver measurable value.
            </p>
          </div>

          <div ref={diagnosticsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {diagnostics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="diagnostic-card rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60 sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20">
                    <Icon className="h-6 w-6 text-purple-400" aria-hidden="true" />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-white">{item.title}</h4>
                  <p className="mb-5 text-sm leading-relaxed text-gray-300 sm:text-base">
                    {item.description}
                  </p>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                    Typical Outcomes
                  </p>
                  <ul className="space-y-2">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" aria-hidden="true" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Layer Two — Business Performance Frameworks */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div ref={layerTwoHeaderRef} className="mx-auto mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Layer Two
            </p>
            <h2 className="mb-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Business Performance Frameworks
            </h2>
            <h3 className="mb-6 text-lg font-medium text-purple-300">
              Proven Methodologies for Sustainable Business Performance.
            </h3>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Successful transformation requires more than experience.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              It requires a repeatable methodology.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Our proprietary frameworks provide the structure, governance and discipline
              necessary to improve business performance consistently across industries while
              reducing implementation risk.
            </p>
          </div>

          <div ref={frameworksRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {frameworks.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="framework-card rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60 sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20">
                    <Icon className="h-6 w-6 text-purple-400" aria-hidden="true" />
                  </div>
                  <h4 className="mb-3 text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Layer Three — Advisory Solutions */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={layerThreeHeaderRef}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Layer Three
            </p>
            <h2 className="mb-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Advisory Solutions
            </h2>
            <h3 className="mb-6 text-lg font-medium text-purple-300">
              Turning Insight into Measurable Results.
            </h3>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Insight alone does not transform organisations.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Execution does.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Using the outputs generated through our diagnostics and Business Performance
              Engineering™ methodologies, our consultants work alongside executive teams to
              deliver practical improvements that strengthen governance, optimise operations and
              accelerate transformation.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Our advisory capabilities include:
            </p>
          </div>

          <ul ref={capabilitiesRef} className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {advisoryCapabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-gray-300">{capability}</span>
              </li>
            ))}
          </ul>

          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            Each engagement is tailored to the organisation’s strategic priorities while remaining
            aligned to measurable business outcomes.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl md:text-center">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Ready to Explore the Business Performance Platform™?
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
            Every engagement begins with an Executive Discovery Session. Together, we’ll explore
            where the Business Performance Platform™ can create the greatest value for your
            organisation.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:justify-center">
            <span ref={primaryCtaRef} className="inline-block rounded-full">
              <CalendlyPopup
                text="Book an Executive Discovery Session"
                className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base"
              />
            </span>
            <span ref={secondaryCtaRef} className="inline-block rounded-full">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4"
              >
                Talk to Our Team
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPerformancePlatformPage;
