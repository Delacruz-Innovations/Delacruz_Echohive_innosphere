import { ArrowRight, HeartPulse, Landmark, Plane } from 'lucide-react'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import useGsapReveal from '../utils/useGsapReveal'
import useHoverGlow from '../utils/useHoverGlow'

const featuredCases = [
  {
    id: 2,
    icon: HeartPulse,
    tags: ['CRM Modernisation', 'Healthcare'],
    title: 'NHS England – Replatforming & CRM Modernisation',
    client: 'Healthcare / Public Sector',
    metricValue: 'Enhanced UX',
    metricDescription: 'Improved experience for call handlers and administrators.',
  },
  {
    id: 3,
    icon: Plane,
    tags: ['Digital Retail', 'Revenue Growth'],
    title: 'Easyjet – Digital Retail & Ancillary Revenue Growth',
    client: 'Aviation / Travel',
    metricValue: 'Revenue Growth',
    metricDescription: 'Increased ancillary revenue through personalised retail experiences.',
  },
  {
    id: 5,
    icon: Landmark,
    tags: ['Systems Consolidation', 'Banking'],
    title: 'Lloyds Banking Group – Legacy Systems Consolidation',
    client: 'Banking / Financial Services',
    metricValue: '30%',
    metricDescription: 'Reduction in loan processing times.',
  },
];

const Casestudy = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  useGsapReveal(headerRef);
  useGsapReveal(gridRef, { stagger: 0.15 });
  useHoverGlow(ctaRef);

  return (
    <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
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

        <div ref={gridRef} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/case-studies#case-${item.id}`}
                className="group flex flex-col rounded-3xl border border-white/10 bg-gray-900/60 p-6 transition-colors duration-300 hover:border-purple-400/60"
              >
                <Icon className="mb-4 h-8 w-8 text-purple-400" aria-hidden="true" />

                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-1 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mb-4 text-sm text-gray-500">{item.client}</p>

                <div className="mt-auto border-t border-white/10 pt-4">
                  <p className="text-xl font-bold text-purple-300">{item.metricValue}</p>
                  <p className="text-sm leading-relaxed text-gray-300">{item.metricDescription}</p>
                </div>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-300 group-hover:text-purple-300">
                  Read case study
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
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
