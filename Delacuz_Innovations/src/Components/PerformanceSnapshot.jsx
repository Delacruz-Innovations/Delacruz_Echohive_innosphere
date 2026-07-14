import { ArrowRight, BarChart3, BrainCircuit, Gauge, Rocket, ShieldCheck, TrendingDown, TrendingUp, Workflow } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CalendlyPopup from './CalendlyPopup';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const snapshotContent = {
  heading: 'Engineering Better Business Performance Starts with Better Business Outcomes.',
  copy:
    'Growth doesn’t become difficult because organisations lack ambition. It becomes difficult when strategy, people, processes, data, governance and technology stop working together.\n\n' +
    'Executive teams are not measured by the number of technology projects delivered. They are measured by business performance.\n\n' +
    'Whether your organisation is focused on increasing profitability, improving operational efficiency, strengthening governance, modernising legacy systems, preparing for artificial intelligence or accelerating growth, sustainable success depends on aligning strategy, people, processes, data and technology. Business Performance Engineering™ provides the structured approach to make that happen.',
  trustStatement:
    'Trusted by forward-thinking organisations seeking measurable improvements in operational performance, governance, transformation, data, AI and enterprise capability.',
  dashboardMetrics: [
    { label: 'Operational Efficiency', trend: 'up', value: 38 },
    { label: 'Governance Maturity', trend: 'up', value: 42 },
    { label: 'Executive Decision Intelligence', trend: 'up', value: 91 },
    { label: 'Business Agility', trend: 'up', value: 76 },
    { label: 'AI Readiness', trend: 'up', value: 76 },
    { label: 'Customer Experience', trend: 'up', value: 88 },
    { label: 'Risk Exposure', trend: 'down', value: 27 },
    { label: 'Transformation Success', trend: 'up', value: 88 },
  ],
  dashboardNote:
    'Illustrative indicators used to communicate the types of outcomes our engagements target. Actual client results vary by organisation and engagement.',
  outcomes: [
    {
      icon: Gauge,
      title: 'Improve Operational Efficiency',
      description:
        'Reduce operational waste, simplify complex processes and improve productivity across the enterprise.',
    },
    {
      icon: ShieldCheck,
      title: 'Strengthen Governance & Compliance',
      description:
        'Build resilient governance structures, strengthen internal controls and improve regulatory confidence.',
    },
    {
      icon: Rocket,
      title: 'Accelerate Sustainable Growth',
      description:
        'Design scalable operating models that support business expansion and long-term competitiveness.',
    },
    {
      icon: BarChart3,
      title: 'Improve Executive Decision-Making',
      description:
        'Enable leaders with trusted data, actionable insights and better organisational visibility.',
    },
    {
      icon: BrainCircuit,
      title: 'Adopt AI with Confidence',
      description:
        'Implement artificial intelligence responsibly through governance, business strategy and measurable value creation.',
    },
    {
      icon: Workflow,
      title: 'Deliver Transformation That Works',
      description:
        'Move beyond technology implementation by embedding sustainable organisational capability and measurable business outcomes.',
    },
  ],
  transitionHeading: "Technology Doesn't Transform Organisations. Business Performance Does.",
  transitionCopy:
    'Continue below to discover why so many transformation programmes underperform—and how the Business Performance Engineering Framework™ helps organisations achieve lasting results.',
  primaryCTA: { label: 'Request an Executive Performance Assessment' },
  secondaryCTA: { label: 'Explore the Business Performance Engineering Framework™', to: '/services' },
};

// Count-up animation that settles immediately when reduced motion is preferred
function useCountUp(target, run, reduced) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf;
    let start;
    const duration = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduced]);

  return value;
}

const MetricRow = ({ metric, inView, reduced }) => {
  const value = useCountUp(metric.value, inView, reduced);
  const isUp = metric.trend === 'up';

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 transition-colors duration-300 hover:bg-white/5 motion-reduce:transition-none">
      <span className="text-sm text-gray-300 transition-colors group-hover:text-white">
        {metric.label}
      </span>
      <span className="flex items-center gap-2">
        <span className="text-lg font-bold tabular-nums text-white">{value}%</span>
        {isUp ? (
          <TrendingUp className="h-5 w-5 text-emerald-400" aria-hidden="true" />
        ) : (
          <TrendingDown className="h-5 w-5 text-rose-400" aria-hidden="true" />
        )}
      </span>
    </li>
  );
};

const BusinessPerformanceDashboard = ({ metrics, note, reduced }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-white/10 bg-gray-900/70 p-6 shadow-2xl backdrop-blur-md transition-colors duration-300 hover:border-purple-400/60 sm:p-8"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-300">
        Business Performance Snapshot
      </h3>
      <p className="mb-6 mt-1 text-xs text-gray-500">
        Illustrative outcomes our engagements target
      </p>

      <ul className="space-y-3">
        {metrics.map((metric) => (
          <MetricRow key={metric.label} metric={metric} inView={inView} reduced={reduced} />
        ))}
      </ul>

      <p className="mt-6 text-[11px] leading-snug text-gray-500">{note}</p>
    </div>
  );
};

const OutcomeCard = ({ outcome }) => {
  const Icon = outcome.icon;
  return (
    <div className="group rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60">
      <Icon className="mb-4 h-8 w-8 text-purple-400" aria-hidden="true" />
      <h3 className="mb-2 text-lg font-semibold text-white">{outcome.title}</h3>
      <p className="text-sm leading-relaxed text-gray-300">{outcome.description}</p>
    </div>
  );
};

const PerformanceSnapshot = () => {
  const reduced = usePrefersReducedMotion();
  const introRef = useRef(null);
  const cardsRef = useRef(null);
  const transitionRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);

  useGsapReveal(introRef, { y: 28, stagger: 0.15, duration: 0.9 });
  useGsapReveal(cardsRef, { stagger: 0.1 });
  useGsapReveal(transitionRef, { selector: ':scope > *', stagger: 0.12 });
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  return (
    <>
      {/* Second hero — full-height intro + dashboard */}
      <section className="relative flex min-h-screen items-center bg-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div ref={introRef} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
                {snapshotContent.heading}
              </h2>
              <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-gray-300 sm:text-lg">
                {snapshotContent.copy}
              </p>
              <p className="max-w-2xl border-l-2 border-purple-500/60 pl-4 text-sm italic text-gray-400">
                {snapshotContent.trustStatement}
              </p>
            </div>

            <BusinessPerformanceDashboard
              metrics={snapshotContent.dashboardMetrics}
              note={snapshotContent.dashboardNote}
              reduced={reduced}
            />
          </div>
        </div>
      </section>

      {/* Outcomes + transition CTA */}
      <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            ref={cardsRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {snapshotContent.outcomes.map((outcome) => (
              <OutcomeCard key={outcome.title} outcome={outcome} />
            ))}
          </div>

          <div
            ref={transitionRef}
            className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-14 text-center"
          >
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              {snapshotContent.transitionHeading}
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
              {snapshotContent.transitionCopy}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <span ref={primaryCtaRef} className="inline-block rounded-full">
                <CalendlyPopup
                  text={snapshotContent.primaryCTA.label}
                  className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base"
                />
              </span>
              <span ref={secondaryCtaRef} className="inline-block rounded-full">
                <Link
                  to={snapshotContent.secondaryCTA.to}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4"
                >
                  {snapshotContent.secondaryCTA.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PerformanceSnapshot;
