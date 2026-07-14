import { ArrowRight, BarChart3, BrainCircuit, Gauge, Rocket, ShieldCheck, TrendingDown, TrendingUp, Workflow } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- used as JSX tag <motion.div>, false-positive in this eslint version
import { motion } from 'framer-motion';
import CalendlyPopup from './CalendlyPopup';
import AutoScrollCarousel from './AutoScrollCarousel';
import SnapshotModal from './SnapshotModal';
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
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: ShieldCheck,
      title: 'Strengthen Governance & Compliance',
      description:
        'Build resilient governance structures, strengthen internal controls and improve regulatory confidence.',
      image:
        'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: Rocket,
      title: 'Accelerate Sustainable Growth',
      description:
        'Design scalable operating models that support business expansion and long-term competitiveness.',
      image:
        'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: BarChart3,
      title: 'Improve Executive Decision-Making',
      description:
        'Enable leaders with trusted data, actionable insights and better organisational visibility.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: BrainCircuit,
      title: 'Adopt AI with Confidence',
      description:
        'Implement artificial intelligence responsibly through governance, business strategy and measurable value creation.',
      image:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: Workflow,
      title: 'Deliver Transformation That Works',
      description:
        'Move beyond technology implementation by embedding sustainable organisational capability and measurable business outcomes.',
      image:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=85&w=1600',
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

const PerformanceSnapshot = () => {
  const reduced = usePrefersReducedMotion();
  const introRef = useRef(null);
  const transitionRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useGsapReveal(introRef, { y: 28, stagger: 0.15, duration: 0.9 });
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

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-gray-900/60 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
              >
                View Performance Snapshot
              </button>
            </div>

            <div className="hidden lg:block">
              <BusinessPerformanceDashboard
                metrics={snapshotContent.dashboardMetrics}
                note={snapshotContent.dashboardNote}
                reduced={reduced}
              />
            </div>
          </div>
        </div>
      </section>

      <SnapshotModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <BusinessPerformanceDashboard
          metrics={snapshotContent.dashboardMetrics}
          note={snapshotContent.dashboardNote}
          reduced={reduced}
        />
      </SnapshotModal>

      {/* Outcomes + transition CTA */}
      <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto max-w-3xl"
          >
            <AutoScrollCarousel items={snapshotContent.outcomes} />
          </motion.div>

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
