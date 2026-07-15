import { ArrowRight, BarChart3, BrainCircuit, Gauge, Rocket, ShieldCheck, TrendingUp, Workflow } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars -- used as JSX tag <motion.div>, false-positive in this eslint version
import { motion } from 'framer-motion';
import CalendlyPopup from './CalendlyPopup';
import AutoScrollCarousel from './AutoScrollCarousel';
import SnapshotModal from './SnapshotModal';
import ExecutiveTrustSection from './ExecutiveTrustSection';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const snapshotContent = {
  heading: 'Every Organisation Has More Potential Than It Is Currently Delivering.',
  copy:
    'Business performance is rarely limited by ambition.\n\n' +
    'It is limited when strategy, governance, people, processes, data and technology no longer work together to achieve the outcomes the organisation was created to deliver.\n\n' +
    'Many organisations invest significantly in transformation, yet continue to face operational inefficiencies, fragmented decision-making, inconsistent execution, rising costs and unrealised value.\n\n' +
    'At Delacruz Innovations, we help organisations across Nigeria and Africa solve these challenges through Business Performance Engineering™—our proprietary methodology for improving organisational performance by aligning strategy, governance, operations, people, data, artificial intelligence and technology around measurable business outcomes.\n\n' +
    'Whether your priority is improving operational efficiency, strengthening governance, accelerating growth, modernising technology or preparing your organisation for AI, we help you transform business ambition into measurable performance.',
  trustStatement:
    'Helping organisations improve business performance through strategy, governance, operational excellence, artificial intelligence and enterprise technology.',
  heroPrimaryCTA: { label: 'Request an Executive Performance Assessment' },
  heroSecondaryCTA: { label: 'Explore Business Performance Engineering™', to: '/services' },
  dashboardMetrics: [
    { label: 'Operational Efficiency', value: 38 },
    { label: 'Governance Maturity', value: 42 },
    { label: 'Executive Decision Intelligence', value: 91 },
    { label: 'Business Agility', value: 76 },
    { label: 'Transformation Progress', value: 88 },
    { label: 'AI Readiness', value: 76 },
    { label: 'Customer Experience', value: 88 },
    { label: 'Performance & Value Realisation', value: 82 },
  ],
  dashboardNote:
    'Illustrative business performance indicators demonstrating the organisational capabilities strengthened through Business Performance Engineering™.',
  outcomesHeading: 'Business Performance Is Measured by Outcomes Not Activity.',
  outcomesIntro:
    'Executive teams are not measured by the number of projects completed.\n\n' +
    'They are measured by the value those projects create. That is why every engagement begins by understanding the business outcome your organisation is trying to achieve before recommending any solution, technology or transformation initiative.',
  outcomes: [
    {
      icon: Gauge,
      title: 'Improve Operational Efficiency',
      description:
        'Reduce operational complexity, improve productivity and optimise the way work flows across your organisation through structured process improvement and operating model optimisation.',
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: ShieldCheck,
      title: 'Strengthen Governance & Compliance',
      description:
        'Improve governance structures, strengthen internal controls, enhance regulatory confidence and build resilient organisations prepared for change.',
      image:
        'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: Rocket,
      title: 'Accelerate Sustainable Growth',
      description:
        'Create scalable operating models, strengthen strategic execution and build organisational capability that supports long-term business growth.',
      image:
        'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: BarChart3,
      title: 'Improve Executive Decision-Making',
      description:
        'Enable confident, evidence-based decisions through trusted data, executive dashboards, governance and actionable business intelligence.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: BrainCircuit,
      title: 'Build an AI-Ready Organisation',
      description:
        'Adopt artificial intelligence responsibly by establishing strong governance, trusted data foundations and practical implementation strategies that deliver measurable business value.',
      image:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=85&w=1600',
    },
    {
      icon: Workflow,
      title: 'Deliver Transformation That Creates Value',
      description:
        'Move beyond technology implementation by embedding sustainable organisational capability and measurable business outcomes.',
      image:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=85&w=1600',
    },
  ],
  transitionHeading: 'Technology alone does not improve organisational performance.',
  transitionCopy:
    'Performance improves when leadership, strategy, governance, people, processes, data and technology work together toward a common purpose.\n\n' +
    'That is the principle behind Business Performance Engineering™.\n\n' +
    'Continue below to discover how the Business Performance Engineering Framework™ (BPEF™) helps organisations solve complex business challenges and deliver measurable results.',
  transitionPrimaryCTA: { label: 'Discover the Business Performance Engineering Framework™', to: '/services' },
  transitionSecondaryCTA: { label: 'Explore Our Business Solutions', to: '/services' },
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

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 transition-colors duration-300 hover:bg-white/5 motion-reduce:transition-none">
      <span className="text-sm text-gray-300 transition-colors group-hover:text-white">
        {metric.label}
      </span>
      <span className="flex items-center gap-2">
        <span className="text-lg font-bold tabular-nums text-white">{value}%</span>
        <TrendingUp className="h-5 w-5 text-emerald-400" aria-hidden="true" />
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
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-purple-300">
        Business Performance Snapshot
      </h3>

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
  const outcomesHeaderRef = useRef(null);
  const transitionRef = useRef(null);
  const heroPrimaryCtaRef = useRef(null);
  const heroSecondaryCtaRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useGsapReveal(introRef, { y: 28, stagger: 0.15, duration: 0.9 });
  useGsapReveal(outcomesHeaderRef);
  useGsapReveal(transitionRef, { selector: ':scope > *', stagger: 0.12 });
  useHoverGlow(heroPrimaryCtaRef);
  useHoverGlow(heroSecondaryCtaRef, { scale: 1.03 });
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  return (
    <>
      {/* Second hero — full-height intro + dashboard */}
      <section className="relative flex min-h-screen items-center bg-black px-3 py-2 sm:px-5 lg:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div ref={introRef} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
                {snapshotContent.heading}
              </h2>
              <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-gray-300 sm:text-lg">
                {snapshotContent.copy}
              </p>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                {/* <span ref={heroPrimaryCtaRef} className="inline-block rounded-full">
                  <CalendlyPopup
                    text={snapshotContent.heroPrimaryCTA.label}
                    className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base"
                  />
                </span> */}
                <span ref={heroSecondaryCtaRef} className="inline-block rounded-full">
                  <Link
                    to={snapshotContent.heroSecondaryCTA.to}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4"
                  >
                    {snapshotContent.heroSecondaryCTA.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </span>
              </div>

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

      <ExecutiveTrustSection />

      {/* Outcomes + transition CTA */}
      <section className="bg-black px-3 py-3 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div ref={outcomesHeaderRef} className="mx-auto mb-10 max-w-3xl md:text-center">
            <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              {snapshotContent.outcomesHeading}
            </h2>
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-300 sm:text-lg">
              {snapshotContent.outcomesIntro}
            </p>
          </div>

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
            className="mx-auto mt-8 max-w-3xl border-t border-white/10 pt-8 md:text-center"
          >
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              {snapshotContent.transitionHeading}
            </h2>
            <p className="mb-8 whitespace-pre-line text-sm leading-relaxed text-gray-400 sm:text-base">
              {snapshotContent.transitionCopy}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <span ref={primaryCtaRef} className="inline-block rounded-full">
                <Link
                  to={snapshotContent.transitionPrimaryCTA.to}
                  className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4 sm:text-base"
                >
                  {snapshotContent.transitionPrimaryCTA.label}
                </Link>
              </span>
              <span ref={secondaryCtaRef} className="inline-block rounded-full">
                <Link
                  to={snapshotContent.transitionSecondaryCTA.to}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4"
                >
                  {snapshotContent.transitionSecondaryCTA.label}
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
