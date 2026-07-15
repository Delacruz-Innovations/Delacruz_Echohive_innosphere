import { ArrowRight, HeartPulse, Landmark, Plane } from 'lucide-react'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars -- used as JSX tag <motion.div>, false-positive in this eslint version
import { motion } from 'framer-motion'
import useGsapReveal from '../utils/useGsapReveal'
import useHoverGlow from '../utils/useHoverGlow'
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion'
import AutoScrollCarousel from './AutoScrollCarousel'

const featuredCases = [
  {
    id: 2,
    icon: HeartPulse,
    tags: ['CRM Modernisation', 'Healthcare'],
    title: 'NHS England – Replatforming & CRM Modernisation',
    client: 'Healthcare / Public Sector',
    metricValue: 'Enhanced UX',
    metricDescription: 'Improved experience for call handlers and administrators.',
    image:
      'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&q=85&w=1600',
  },
  {
    id: 3,
    icon: Plane,
    tags: ['Digital Retail', 'Revenue Growth'],
    title: 'Easyjet – Digital Retail & Ancillary Revenue Growth',
    client: 'Aviation / Travel',
    metricValue: 'Revenue Growth',
    metricDescription: 'Increased ancillary revenue through personalised retail experiences.',
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=1600',
  },
  {
    id: 5,
    icon: Landmark,
    tags: ['Systems Consolidation', 'Banking'],
    title: 'Lloyds Banking Group – Legacy Systems Consolidation',
    client: 'Banking / Financial Services',
    metricValue: '30%',
    metricDescription: 'Reduction in loan processing times.',
    image:
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=85&w=1600',
  },
];

const caseSlides = featuredCases.map((item) => ({
  icon: item.icon,
  title: item.title,
  description: `${item.client} — ${item.metricValue}: ${item.metricDescription}`,
  image: item.image,
  to: `/case-studies#case-${item.id}`,
}));

const Casestudy = () => {
  const headerRef = useRef(null);
  const ctaRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useGsapReveal(headerRef);
  useHoverGlow(ctaRef);

  return (
    <section className="bg-black px-3 py-2 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto max-w-3xl md:text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300 sm:text-sm">
            Case Studies
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Real Results for Real Organisations
          </h2>
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            See how we've helped organisations across healthcare, aviation and banking transform
            operations, modernise systems and improve business performance.
          </p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto mt-8 max-w-3xl"
        >
          <AutoScrollCarousel items={caseSlides} />
        </motion.div>

        <div className="mt-8 text-center">
          <span ref={ctaRef} className="inline-block rounded-full">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View All Case Studies
              <ArrowRight className="h-5 w-5" />
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Casestudy
