import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown } from 'lucide-react';
// eslint-disable-next-line no-unused-vars -- motion used as JSX tag <motion.div>, false-positive in this eslint version
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../Components/PageHero';
import CalendlyPopup from '../Components/CalendlyPopup';
import SEO, { SITE_URL } from '../utils/SEO';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';

const faqPreview = [
  {
    question: 'What is Business Performance Engineering™?',
    answer:
      'Business Performance Engineering™ is Delacruz Innovations’ proprietary approach to improving organisational performance by aligning strategy, governance, people, processes, data and technology. Rather than implementing technology in isolation, we help organisations achieve measurable business outcomes through structured transformation.',
  },
  {
    question: 'How is Delacruz different from a traditional IT consulting company?',
    answer:
      'Traditional IT consultancies often focus on implementing technology. Delacruz begins with your business objectives. We assess organisational performance, identify constraints and design solutions that improve measurable outcomes using our Business Performance Engineering Framework™ (BPEF™).',
  },
  {
    question: 'Which countries do you serve?',
    answer:
      'We primarily support organisations across Nigeria and Africa while also partnering with international organisations delivering programmes within the region.',
  },
];

const whatWeBelieve = [
  {
    title: 'Business outcomes come before technology.',
    description: 'Technology creates lasting value only when it supports clearly defined business objectives.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Strategy creates value only when it can be executed.',
    description: 'Successful execution requires effective governance, accountable leadership, capable people and practical operating models.',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Good governance enables sustainable growth.',
    description: 'Strong governance strengthens decision-making, improves accountability and creates confidence for responsible innovation.',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Trusted information supports better decisions.',
    description: 'Reliable data should empower leaders to make informed, timely and evidence-based decisions.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Organisations become stronger by building capability.',
    description: 'Every engagement should leave an organisation more capable than when it began through knowledge transfer, governance and continuous improvement.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Continuous improvement is a leadership discipline.',
    description: 'Improving organisational performance is not a one-time initiative. It is an ongoing commitment to learning, adapting and delivering better outcomes.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
  },
];

const engagementPrinciples = [
  'Evidence before assumption.',
  'Business outcomes before technology.',
  'Governance throughout delivery.',
  'Practical recommendations over unnecessary complexity.',
  'Capability transfer over long-term dependency.',
  'Measurable value realisation.',
  'Continuous improvement.',
];

const corporateInfo = [
  { label: 'Legal Entity', value: 'Delacruz Innovation Limited' },
  { label: 'Company Registration Number', value: '8432281' },
  { label: 'Company Type', value: 'Private Company Limited by Shares' },
  { label: 'Jurisdiction', value: 'Federal Republic of Nigeria' },
  { label: 'Date of Incorporation', value: '23 April 2025' },
];

const bpefCapabilities = [
  'Improve strategy execution.',
  'Strengthen governance and accountability.',
  'Optimise business processes and operational performance.',
  'Improve executive decision-making.',
  'Build trusted data foundations.',
  'Adopt artificial intelligence responsibly.',
  'Align technology investments with business priorities.',
  'Deliver measurable and sustainable business outcomes.',
];

const AboutPage = () => {
  useEffect(() => {
    const start = Date.now();

    const handleBeforeUnload = () => {
      const duration = (Date.now() - start) / 1000;
      window.gtag('event', 'time_on_page', {
        event_category: 'engagement',
        value: duration,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const introRef = useRef(null);
  const storyRef = useRef(null);
  const philosophyRef = useRef(null);
  const believeHeaderRef = useRef(null);
  const believeRef = useRef(null);
  const principlesRef = useRef(null);
  const differentRef = useRef(null);
  const governanceRef = useRef(null);
  const bpefRef = useRef(null);
  const faqHeaderRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);
  const [openFaqQuestion, setOpenFaqQuestion] = useState(faqPreview[0].question);

  useGsapReveal(introRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(storyRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(philosophyRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(believeHeaderRef);
  useGsapReveal(believeRef, { selector: '.belief-card', stagger: 0.06, y: 24 });
  useGsapReveal(principlesRef, { stagger: 0.06 });
  useGsapReveal(differentRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(governanceRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(bpefRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(faqHeaderRef);
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Delacruz Innovations',
    url: `${SITE_URL}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Delacruz Innovation Limited',
      alternateName: 'Delacruz Innovations',
      url: SITE_URL,
      foundingDate: '2025-04-23',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '5th Floor, Mosesola House, 103 Allen Ave, Allen',
        addressLocality: 'Ikeja, Lagos',
        postalCode: '101233',
        addressCountry: 'NG',
      },
    },
  };

  return (
    <>
      <SEO
        title="About Delacruz Innovations | Business Performance Engineering™"
        description="Delacruz Innovation Limited helps organisations improve measurable business performance by aligning strategy, governance, people, processes, data and technology through Business Performance Engineering™."
        jsonLd={aboutSchema}
      />

      <PageHero
        eyebrow="About Us"
        headline="Engineering Better Business Performance."
        copy="We help organisations align strategy, governance, people, processes, data and technology around clearly defined business outcomes."
        primaryCTALabel="Request an Executive Performance Assessment"
        scrollLabel="Learn More About Us"
        heroImage="https://i.pinimg.com/736x/b7/0e/ed/b70eed55c37ed66369a46208175a0413.jpg"
      />

      {/* Intro */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={introRef}>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Organisations today operate in an environment shaped by economic uncertainty,
              evolving customer expectations, increasing regulatory requirements and rapid
              technological change. As organisations grow, so does the complexity of executing
              strategy, managing operations and delivering sustainable business value.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Many invest significantly in digital transformation, enterprise technology and
              operational initiatives with the expectation that business performance will
              improve. Yet many continue to experience the same challenges: strategies that are
              difficult to execute, fragmented operations, reactive governance, slow
              decision-making, inconsistent processes and technology investments that do not
              deliver the expected business outcomes.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              At Delacruz Innovation Limited, we believe these are not simply technology
              challenges. They are business performance challenges.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              To address them, we developed Business Performance Engineering™—our proprietary
              approach to helping organisations improve measurable business performance by
              aligning strategy, governance, people, processes, data and technology around
              clearly defined business outcomes.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Our philosophy is simple:
            </p>
            <p className="mb-6 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
              Technology should enable business performance, not define it!
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Every engagement begins by understanding the business outcome an organisation is
              trying to achieve before recommending solutions, technologies or transformation
              initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={storyRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Our Story
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Delacruz Innovation Limited was established because we observed a recurring pattern
              across organisations.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Technology was often introduced before the underlying business problem had been
              fully understood. Transformation programmes were frequently measured by activity
              rather than measurable business outcomes. Business processes became increasingly
              complex as organisations expanded. Leadership teams had access to more information
              than ever before but often lacked the clarity needed to make timely, confident
              decisions.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              These observations shaped our thinking.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Rather than creating another technology consultancy, we established Delacruz
              Innovation Limited to help organisations improve how they execute strategy,
              strengthen governance, optimise operations, make informed decisions and realise
              sustainable business value.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              This thinking became the foundation of Business Performance Engineering™.
            </p>
          </div>
        </div>
      </section>

      {/* The Delacruz Philosophy */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={philosophyRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              The Delacruz Philosophy
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              We believe better organisations are engineered—not simply digitised.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Technology alone does not improve organisational performance. Sustainable
              improvement occurs when strategy, governance, people, processes, data and
              technology work together in a structured, measurable and disciplined way.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              For this reason, every engagement begins with one question:
            </p>
            <p className="mb-6 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
              “What business outcome is your organisation trying to achieve?”
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              The answer shapes every recommendation we make. It informs our assessments,
              advisory engagements, transformation programmes and implementation approach.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              We do not begin with technology. We begin with the business.
            </p>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div ref={believeHeaderRef} className="mx-auto max-w-3xl md:text-center">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              What We Believe
            </h2>
          </div>

          <div ref={believeRef} className="mt-6">
            <WhatWeBelieveCarousel items={whatWeBelieve} />
          </div>
        </div>
      </section>

      {/* Our Engagement Principles */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Our Engagement Principles
          </h2>
          <p className="mb-10 text-base leading-relaxed text-gray-300 sm:text-lg">
            Every engagement is guided by principles that reinforce consistency, transparency and
            measurable value.
          </p>

          <ul ref={principlesRef} className="mb-6 space-y-3">
            {engagementPrinciples.map((principle) => (
              <li key={principle} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-gray-300 sm:text-base">{principle}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
            These principles shape how we assess business challenges, develop recommendations and
            support organisational transformation.
          </p>
        </div>
      </section>

      {/* What Makes Delacruz Different */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={differentRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              What Makes Delacruz Different?
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Many consulting firms begin with technology. We begin with the business.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Rather than asking, <span className="italic text-white">“Which system should we implement?”</span>, we ask,{' '}
              <span className="italic text-white">“What business problem are we trying to solve?”</span>
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              That distinction changes the quality of every decision that follows.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              By focusing on organisational performance before technology selection, we help
              organisations make better investment decisions, strengthen governance, improve
              operational effectiveness and increase the likelihood of achieving sustainable
              business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Governance & Trust */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={governanceRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Governance &amp; Trust
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              Delacruz Innovation Limited is incorporated in the Federal Republic of Nigeria as a
              Private Company Limited by Shares under the Companies and Allied Matters Act (CAMA)
              2020.
            </p>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gray-900/60">
              <p className="border-b border-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                Corporate Information
              </p>
              <dl className="divide-y divide-white/10">
                {corporateInfo.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="text-sm text-gray-400">{item.label}</dt>
                    <dd className="text-sm font-semibold text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              We are committed to conducting our business with professionalism, integrity,
              transparency and accountability while supporting organisations across Nigeria and
              beyond with practical, business-led advisory and transformation services.
            </p>
          </div>
        </div>
      </section>

      {/* Business Performance Engineering */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={bpefRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Business Performance Engineering™
            </h2>
            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Business Performance Engineering™ is the foundation of every engagement we
              undertake.
            </p>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              Supported by the Business Performance Engineering Framework™ (BPEF™), our
              methodology helps organisations:
            </p>

            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {bpefCapabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-gray-300">{capability}</span>
                </li>
              ))}
            </ul>

            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Rather than treating these disciplines independently, Business Performance
              Engineering™ integrates them into a single, business led approach that helps
              organisations perform better.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div ref={faqHeaderRef} className="mb-10 md:text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Frequently Asked Questions
            </p>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Have Questions About Working With Us?
            </h2>
          </div>

          <div>
            {faqPreview.map((item) => {
              const isOpen = openFaqQuestion === item.question;
              return (
                <div key={item.question} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqQuestion((current) => (current === item.question ? null : item.question))
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-purple-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm leading-relaxed text-gray-300 sm:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-10 md:text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              View More FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl md:text-center">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Begin with an Executive Performance Assessment
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            Every successful transformation begins with understanding where performance can
            improve. Our Executive Performance Assessment helps leadership teams identify
            organisational constraints, prioritise improvement opportunities and build a
            practical roadmap for measurable business performance.
          </p>
          <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
            Whether your organisation is pursuing growth, strengthening governance, improving
            operational efficiency, preparing for AI adoption or undertaking enterprise
            transformation, we can help you establish a stronger foundation for long term
            success.
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
                to="/business-performance-engineering"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-8 sm:py-4"
              >
                Explore Business Performance Engineering™
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

const WhatWeBelieveCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="belief-carousel">
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={item.title}
            type="button"
            className={`belief-card${isActive ? ' active' : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={() => setActiveIndex(index)}
            aria-expanded={isActive}
            aria-label={`View belief: ${item.title}`}
          >
            <div className="belief-card-row">
              <div className="belief-card-icon">{index + 1}</div>
              <div className="belief-card-description">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AboutPage;
