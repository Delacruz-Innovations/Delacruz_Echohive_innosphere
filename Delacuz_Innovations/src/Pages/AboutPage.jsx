import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown, Check, Users, Building2, X } from 'lucide-react';
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
      'Business Performance Engineering™ (BPE™) is Delacruz Innovations’ proprietary methodology that combines business strategy, operational excellence, enterprise architecture, business analysis, intelligent automation, AI, governance and change management to deliver lasting value.',
  },
  {
    question: 'How is Delacruz different from a traditional IT consulting company?',
    answer:
      'Unlike traditional consulting firms that focus solely on technology implementation, we take a business-first approach. Every recommendation, solution and transformation programme is designed around measurable business outcomes.',
  },
  {
    question: 'Which countries do you serve?',
    answer:
      'Founded in Nigeria with a vision to serve Africa and global markets, we primarily support organisations across Nigeria and Africa while also partnering with international organisations delivering programmes within the region.',
  },
];

const coreCapabilities = [
  'Business Performance Engineering™',
  'Business Strategy & Transformation',
  'Digital Transformation',
  'Enterprise Architecture',
  'Business Analysis',
  'Business Process Improvement & Optimisation',
  'Artificial Intelligence & Intelligent Automation',
  'Product Strategy & Product Management',
  'Governance, Risk & Compliance (GRC)',
  'Business Change & Transformation',
  'Programme & Project Delivery',
  'Operational Excellence',
  'Data & Business Intelligence',
  'Enterprise Technology Advisory',
  'Organisational Capability Development',
];

const industriesServed = [
  'Financial Services',
  'Banking & FinTech',
  'Government & Public Sector',
  'Healthcare',
  'Retail & E-commerce',
  'Manufacturing',
  'Telecommunications',
  'Logistics & Supply Chain',
  'Energy & Utilities',
  'Professional Services',
  'Education',
  'Technology & Start-ups',
];

const differencePrinciples = [
  'Business First',
  'Value Before Technology',
  'Evidence-Based Decision Making',
  'Measurable Business Outcomes',
  'Continuous Improvement',
];

const ourValues = [
  'Integrity',
  'Excellence',
  'Innovation',
  'Accountability',
  'Collaboration',
  'Customer Success',
  'Continuous Learning',
];

const corporateInfo = [
  { label: 'Legal Entity', value: 'Delacruz Innovation Limited' },
  { label: 'CAC Registration', value: 'Corporate Affairs Commission (CAC) Registered' },
  { label: 'Company Registration Number', value: '8432281' },
  { label: 'Company Type', value: 'Private Company Limited by Shares' },
  { label: 'Jurisdiction', value: 'Federal Republic of Nigeria' },
  { label: 'Date of Incorporation', value: '23 April 2025' },
  { label: 'Regulatory Framework', value: 'Companies and Allied Matters Act (CAMA) 2020' },
  { label: 'AML Compliance', value: 'SCUML Compliant (Special Control Unit against Money Laundering)' },
  { label: 'Registered Address', value: '5th Floor, Mosesola House, 103 Allen Ave, Allen, Ikeja, Lagos' },
];

const whyChooseUs = [
  'Translate business strategy into measurable execution',
  'Simplify complex transformation programmes',
  'Deliver practical, outcome-driven solutions',
  'Improve operational efficiency',
  'Enable digital innovation',
  'Strengthen governance and organisational resilience',
  'Build sustainable capabilities rather than short-term fixes',
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
  const founderRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const industriesRef = useRef(null);
  const differenceRef = useRef(null);
  const principlesRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const governanceRef = useRef(null);
  const whyChooseRef = useRef(null);
  const lookingAheadRef = useRef(null);
  const faqHeaderRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);
  const [openFaqQuestion, setOpenFaqQuestion] = useState(faqPreview[0].question);
  const [isFounderStoryOpen, setIsFounderStoryOpen] = useState(false);

  useEffect(() => {
    if (!isFounderStoryOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsFounderStoryOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isFounderStoryOpen]);

  useGsapReveal(introRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(storyRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(founderRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(whatWeDoRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(industriesRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(differenceRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(principlesRef, { stagger: 0.06 });
  useGsapReveal(visionRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(missionRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(valuesRef, { stagger: 0.06 });
  useGsapReveal(governanceRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(whyChooseRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(lookingAheadRef, { selector: ':scope > *', stagger: 0.1 });
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
      founder: {
        '@type': 'Person',
        name: 'Tosin Samuel Ojo',
      },
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
        title="About Delacruz Innovations | Engineering Better Business Performance"
        description="Delacruz Innovation Limited is a business and technology consulting firm that helps businesses, government institutions and growing enterprises engineer better business performance through strategy, digital transformation, operational excellence and AI."
        jsonLd={aboutSchema}
      />

      <PageHero
        eyebrow="About Us"
        headline="Engineering Better Business Performance."
        copy="At Delacruz Innovation Limited, we believe that exceptional business performance doesn’t happen by chance, it is engineered."
        primaryCTALabel="Request an Executive Performance Assessment"
        scrollLabel="Learn More About Us"
        heroImage="https://i.pinimg.com/736x/b7/0e/ed/b70eed55c37ed66369a46208175a0413.jpg"
      />

      {/* Intro */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={introRef}>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              At Delacruz Innovation Limited, we believe that exceptional business performance
              doesn’t happen by chance, it is engineered.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              We are a business and technology consulting firm that partners with ambitious
              businesses, government institutions, and growing enterprises to solve complex
              business challenges through strategy, digital transformation, operational
              excellence, artificial intelligence, and technology-enabled innovation.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Founded in Nigeria with a vision to serve Africa and global markets, Delacruz
              Innovations exists to bridge the gap between business strategy and technology
              execution. We help businesses transform how they operate, optimise performance,
              reduce operational risk, and unlock sustainable growth.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Unlike traditional consulting firms that focus solely on technology implementation,
              we take a business-first approach. Every recommendation, every solution, and every
              transformation programme is designed around measurable business outcomes.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              This philosophy forms the foundation of our proprietary Business Performance
              Engineering™ (BPE™) methodology, a structured approach that combines business
              strategy, operational excellence, enterprise architecture, business analysis,
              intelligent automation, AI, governance, and change management to deliver lasting
              value.
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
              Delacruz Innovations was founded by Tosin Samuel Ojo, an experienced business
              transformation and technology consultant with over a decade of international
              consulting experience delivering enterprise-scale transformation programmes across
              the United Kingdom, the United Arab Emirates, and Africa.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Throughout his career, Tosin has worked with globally recognised consulting
              organisations and leading public and private sector institutions, contributing to
              complex digital transformation initiatives across financial services, government,
              healthcare, transportation, telecommunications, and technology.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              His consulting experience includes engagements involving internationally recognised
              organisations and enterprise clients such as Lloyds Banking Group, the UK Department
              for Business and Trade, Social Security Scotland, NHS England, Brooks Macdonald, Sky
              Betting &amp; Gaming, Go-Ahead Group, and other major organisations, delivering
              business analysis, enterprise change, digital transformation, governance, and
              operational improvement initiatives. His professional journey has also included
              consulting experience with globally recognised consulting firms, helping shape the
              expertise that underpins Delacruz Innovations today.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              That experience exposed a recurring challenge across organisations of every size:
            </p>
            <p className="mb-6 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
              Businesses often invest heavily in technology without first redesigning the business
              itself.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Delacruz Innovations was established to change that.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Today, we help organisations align strategy, people, processes, technology, data,
              and governance into high-performing business ecosystems capable of delivering
              measurable and sustainable results.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Founder */}
      <section className="bg-black px-4 pt-2 pb-2 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div ref={founderRef} className="flex flex-col items-center text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Meet Our Founder
            </p>

            <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[300px] flex-col justify-end overflow-hidden rounded-[28px] border border-white/10 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
                <span className="text-7xl font-bold tracking-wide text-white/15">TSO</span>
              </div>

              <div className="relative bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-4 pt-12 text-left backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">Tosin Samuel Ojo</h2>
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-600">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-1 text-sm leading-snug text-gray-300">
                  Founder &amp; CEO, Delacruz Innovation Limited
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" aria-hidden="true" />
                      10+ yrs
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4 text-gray-400" aria-hidden="true" />
                      3 regions
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFounderStoryOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={isFounderStoryOpen}
                    className="inline-flex items-center gap-1 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  >
                    MORE
                    <ChevronDown className="h-4 w-4 flex-shrink-0 -rotate-90" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isFounderStoryOpen && (
                <motion.div
                  key="founder-modal-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
                  onClick={() => setIsFounderStoryOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Tosin Samuel Ojo's full story"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl sm:p-10"
                  >
                    <button
                      type="button"
                      onClick={() => setIsFounderStoryOpen(false)}
                      aria-label="Close"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors duration-300 hover:border-purple-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                      Meet Our Founder
                    </p>
                    <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
                      Tosin Samuel Ojo
                    </h2>

                    <p className="mb-6 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
                    “Businesses don’t transform because they buy better technology. They transform
                    because they build better systems, make better decisions, and execute with
                    discipline.”
                  </p>

                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    That belief has guided my career for more than a decade.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    It is the principle upon which Delacruz Innovation Limited was founded, and it
                    continues to shape every client engagement, every framework we develop, and
                    every solution we deliver.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    My journey into consulting did not begin with a desire to build a consulting
                    firm. It began with a simple curiosity understanding why some organisations
                    consistently outperform others, even when they have access to similar
                    technology, similar talent, and similar resources.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Over the years, I discovered that the answer rarely lies in technology alone.
                    High-performing organisations are built on clarity of purpose, disciplined
                    execution, effective leadership, well-designed processes, robust governance,
                    and a culture of continuous improvement. Technology simply amplifies those
                    strengths.
                  </p>
                  <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
                    That realisation ultimately became the foundation of Delacruz Innovations and
                    our Business Performance Engineering™ methodology.
                  </p>

                  <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                    Where My Journey Began
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    My professional consulting journey began in the United Kingdom at the Care
                    Quality Commission (CQC), England’s independent regulator of health and social
                    care services.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Working within a highly regulated environment taught me lessons that continue
                    to influence my leadership today.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    I learned that governance is not bureaucracy. Compliance is not simply about
                    meeting regulations. Processes are not documentation exercises. They exist
                    because they directly influence people’s lives.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    At the Care Quality Commission, I developed a deep appreciation for business
                    analysis, stakeholder engagement, governance, quality assurance, process
                    improvement and organisational accountability. I learned how structured
                    thinking, evidence-based decision making and disciplined execution could
                    improve both organisational performance and public outcomes.
                  </p>
                  <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Although I did not know it then, those experiences laid the foundations for
                    everything that would follow.
                  </p>

                  <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                    Expanding My Perspective
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    After the Care Quality Commission, my career evolved across several
                    industries, each presenting new challenges and opportunities to learn.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Working with the Go-Ahead Group, I gained valuable experience supporting
                    business transformation within one of the United Kingdom’s leading transport
                    organisations. The complexity of large-scale operations reinforced the
                    importance of aligning people, operational processes, technology and customer
                    experience.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    My journey then led me into healthcare transformation through NHS England,
                    where I contributed to programmes supporting one of the world’s largest public
                    healthcare systems.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Healthcare taught me an important lesson. Transformation is never just about
                    systems. Every project ultimately affects patients, clinicians, frontline
                    teams and communities. Success therefore depends on understanding people as
                    much as understanding technology.
                  </p>
                  <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Those experiences strengthened my ability to navigate complex stakeholder
                    environments while balancing operational requirements, governance obligations
                    and strategic objectives.
                  </p>

                  <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                    Enterprise Transformation at Scale
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    As my experience grew, so did the scale and complexity of the programmes I
                    supported. One of the defining chapters of my career involved contributing to
                    transformation initiatives supporting Lloyds Banking Group, delivered through
                    BJSS.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Financial services introduced an entirely different level of complexity.
                    Highly regulated environments require precision. Risk cannot be an
                    afterthought. Governance must be embedded into every decision. Transformation
                    programmes must deliver innovation while maintaining resilience, security and
                    regulatory compliance.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Working within this environment refined my capabilities in enterprise business
                    analysis, Agile delivery, stakeholder management, digital transformation and
                    strategic execution.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    I later contributed to transformation programmes at Social Security Scotland,
                    supporting the modernisation of essential public services through digital
                    innovation. These programmes demonstrated how thoughtfully designed services
                    could improve accessibility, efficiency and the overall experience for
                    millions of citizens.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    My consulting journey also included work supporting the UK Department for
                    Business and Trade, where I contributed to initiatives focused on enabling
                    economic growth, improving public services and strengthening organisational
                    capability.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Across every engagement, regardless of industry, one observation remained
                    consistent. The organisations that achieved lasting success were never those
                    with the most sophisticated technology.
                  </p>
                  <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
                    They were the organisations with the clearest strategy, the strongest
                    operating model, the most disciplined governance and the greatest commitment
                    to continuous improvement.
                  </p>

                  <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                    Broadening My International Perspective
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    My professional journey eventually expanded beyond the United Kingdom into the
                    United Arab Emirates.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Working within one of the world’s fastest-growing innovation ecosystems
                    exposed me to new markets, ambitious transformation agendas and globally
                    competitive business environments.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    The UAE reinforced an important principle. Businesses succeed when they
                    continuously evolve. Markets change. Technology changes. Customer expectations
                    change. The organisations that remain competitive are those capable of
                    adapting faster than the pace of change itself.
                  </p>
                  <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
                    International consulting experience across the United Kingdom, the Middle East
                    and Africa has given me the opportunity to understand transformation from
                    multiple perspectives public sector and private sector, mature economies and
                    emerging markets, enterprise organisations and growing businesses. Those
                    experiences continue to shape how we advise clients today.
                  </p>

                  <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                    Why I Founded Delacruz Innovations
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Throughout my consulting career I noticed the same pattern repeated across
                    organisations of every size.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Businesses invested millions in technology. Projects were delivered
                    successfully. Systems went live. Yet operational performance often changed
                    very little.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    The problem was rarely the technology. The real challenge was that technology
                    had been introduced without fundamentally redesigning how the business
                    operated.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Technology cannot fix broken processes. Artificial intelligence cannot
                    compensate for poor governance. Automation cannot replace ineffective
                    strategy. Digital transformation without business transformation is simply
                    digital change.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    That insight became the catalyst for founding Delacruz Innovation Limited. I
                    wanted to build a consultancy that would help organisations solve the right
                    problems before recommending the right technology.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Rather than asking, <span className="italic text-white">“Which software should we buy?”</span>,
                    we begin with a different question:
                  </p>
                  <p className="mb-8 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
                    “What business outcome are we trying to achieve?”
                  </p>
                  <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Everything else follows from that answer.
                  </p>

                  <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                    The Birth of Business Performance Engineering™
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    As I reflected on years of consulting across government, financial services,
                    healthcare, transportation and enterprise organisations, I recognised that
                    successful transformation followed a repeatable pattern.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Strategy had to align with execution. People had to be enabled rather than
                    managed. Processes had to be intentionally designed. Technology had to support
                    business objectives. Data had to inform decisions. Governance had to create
                    confidence.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    These principles evolved into what is now known as Business Performance
                    Engineering™ our proprietary methodology for designing, improving and
                    sustaining high-performing organisations.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Business Performance Engineering™ is not another management framework. It is a
                    practical operating philosophy built on international consulting experience,
                    disciplined execution and measurable business outcomes. It reflects everything
                    I have learned throughout my career and everything we continue to refine
                    through our work with clients.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Today, Delacruz Innovation Limited exists to help organisations become more
                    efficient, more resilient, more innovative and more prepared for the future.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    Our ambition extends beyond delivering consulting projects. We are building a
                    firm that contributes to the future of business across Nigeria, Africa and
                    beyond one that combines global consulting standards with local understanding,
                    integrity with innovation, and strategy with disciplined execution.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    My vision is clear:
                  </p>
                  <p className="mb-8 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
                    To establish Delacruz Innovations as one of Africa’s most trusted business and
                    technology consulting firms, recognised not simply for the quality of our
                    ideas, but for the measurable value we create for every client we serve.
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                    If my journey has taught me one lesson above all else, it is this:
                  </p>
                  <p className="text-xl font-semibold italic leading-relaxed text-white">
                    Great organisations are not built by chance. They are engineered. And that is
                    the work we are privileged to do every day.
                  </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={whatWeDoRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              What We Do
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              We provide advisory, consulting, and delivery services across the full business
              transformation lifecycle. Our core capabilities include:
            </p>

            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {coreCapabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-gray-300">{capability}</span>
                </li>
              ))}
            </ul>

            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Our work is designed to improve efficiency, strengthen governance, accelerate
              innovation, reduce costs, and create measurable business value.
            </p>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={industriesRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              Our experience spans a wide range of industries, including:
            </p>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {industriesServed.map((industry) => (
                <li key={industry} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-gray-300">{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Difference */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={differenceRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Our Difference
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Technology alone rarely transforms a business.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Real transformation happens when strategy, operations, people, governance, data, and
              technology work together. This belief is reflected in everything we do.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Rather than delivering isolated consulting projects, we partner with our clients to
              engineer sustainable business performance through practical, measurable, and
              scalable solutions. Every engagement is guided by five principles:
            </p>
          </div>

          <ul ref={principlesRef} className="mt-8 space-y-3">
            {differencePrinciples.map((principle) => (
              <li key={principle} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-gray-300 sm:text-base">{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Vision */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={visionRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Our Vision
            </h2>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              To become Africa’s most trusted Business Performance Engineering™ consultancy,
              empowering businesses to achieve sustainable growth through strategy, innovation,
              operational excellence, and intelligent technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={missionRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Our Mission
            </h2>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              To help businesses unlock measurable performance by combining strategic thinking,
              operational excellence, digital transformation, artificial intelligence, and
              disciplined execution into practical solutions that create lasting value.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Our Values
          </h2>
          <p className="mb-10 text-base leading-relaxed text-gray-300 sm:text-lg">
            Our culture is built on principles that shape every engagement:
          </p>

          <ul ref={valuesRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ourValues.map((value) => (
              <li key={value} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-gray-300 sm:text-base">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Governance & Compliance */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={governanceRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Governance &amp; Compliance
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              Delacruz Innovation Limited is committed to the highest standards of
              professionalism, corporate governance, regulatory compliance, and ethical business
              conduct.
            </p>

            <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gray-900/60">
              <p className="border-b border-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                Corporate Information
              </p>
              <dl className="divide-y divide-white/10">
                {corporateInfo.map((item) => (
                  <div key={item.label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="text-sm text-gray-400">{item.label}</dt>
                    <dd className="text-sm font-semibold text-white sm:text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              We maintain a strong commitment to ethical business practices, confidentiality,
              transparency, and regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Delacruz Innovations */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={whyChooseRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Why Businesses Choose Delacruz Innovations
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              Businesses choose Delacruz Innovations because we combine global consulting
              experience with practical execution tailored to African markets. Our clients value
              our ability to:
            </p>

            <ul className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {whyChooseUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mb-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              Whether supporting a start-up, a scaling enterprise, or a large organisation, our
              objective remains the same:
            </p>
            <p className="text-xl font-semibold italic leading-relaxed text-white">
              To engineer better business performance that creates measurable, lasting impact.
            </p>
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={lookingAheadRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Looking Ahead
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              As businesses navigate rapid technological change, artificial intelligence, evolving
              regulations, and increasing competitive pressure, success will belong to
              organisations that continuously adapt and improve.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Delacruz Innovations exists to help businesses make that transition with confidence.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              We don’t simply implement technology. We redesign businesses for sustainable
              success.
            </p>
            <p className="text-xl font-semibold italic leading-relaxed text-white">
              Delacruz Innovations. Engineering Better Business Performance.
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

export default AboutPage;
