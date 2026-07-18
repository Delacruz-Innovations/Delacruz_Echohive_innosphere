import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Building2,
  HeartPulse,
  Zap,
  Factory,
  Cpu,
  ShoppingBag,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import PageHero from '../Components/PageHero';
import CalendlyPopup from '../Components/CalendlyPopup';
import HorizontalScrollRow from '../Components/HorizontalScrollRow';
import SEO, { SITE_URL } from '../utils/SEO';
import useGsapReveal from '../utils/useGsapReveal';
import useHoverGlow from '../utils/useHoverGlow';
import usePrefersReducedMotion from '../utils/usePrefersReducedMotion';

const industries = [
  {
    id: 'financial-services',
    icon: Landmark,
    title: 'Financial Services',
    subtitle: 'Building Resilient Financial Institutions for the Digital Economy',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Legacy Banking Systems',
      'Digital Banking Transformation',
      'Regulatory Compliance',
      'Fraud & Operational Risk',
      'Customer Experience',
      'Data Governance',
      'Artificial Intelligence Adoption',
      'Cost Optimisation',
    ],
    howWeHelp:
      'We help banks, fintechs, insurers and financial institutions strengthen governance, modernise business capabilities, improve operational performance and execute enterprise transformation programmes that deliver measurable business value.',
  },
  {
    id: 'public-sector-government',
    icon: Building2,
    title: 'Public Sector & Government',
    subtitle: 'Transforming Public Services Through Better Governance',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Digital Government',
      'Service Delivery Improvement',
      'Governance & Accountability',
      'Legacy Processes',
      'Performance Management',
      'Cross-Agency Collaboration',
      'Data Management',
    ],
    howWeHelp:
      'We partner with public sector organisations to modernise service delivery, improve governance, redesign operating models and strengthen organisational capability.',
  },
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare',
    subtitle: 'Improving Healthcare Performance Through Better Operations',
    image: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Patient Journey Optimisation',
      'Clinical Operations',
      'Healthcare Data Governance',
      'Digital Health',
      'Regulatory Compliance',
      'Workforce Optimisation',
      'Resource Planning',
    ],
    howWeHelp:
      'Our Business Performance Engineering™ methodology enables healthcare organisations to improve operational efficiency, governance and long-term organisational resilience.',
  },
  {
    id: 'energy-utilities-natural-resources',
    icon: Zap,
    title: 'Energy, Utilities & Natural Resources',
    subtitle: 'Building Operational Resilience Across Critical Infrastructure',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Operational Resilience',
      'Asset Management',
      'Regulatory Compliance',
      'Sustainability',
      'Risk Management',
      'Digital Transformation',
      'Data Integration',
    ],
    howWeHelp:
      'We help energy and utility organisations strengthen governance, improve operational performance and prepare for future transformation.',
  },
  {
    id: 'manufacturing-industrial',
    icon: Factory,
    title: 'Manufacturing & Industrial',
    subtitle: 'Driving Productivity Through Operational Excellence',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Lean Operations',
      'Supply Chain Optimisation',
      'Production Efficiency',
      'AI Readiness',
      'Operational Excellence',
      'Workforce Productivity',
      'Business Continuity',
    ],
    howWeHelp:
      'We support manufacturers through process optimisation, governance improvement, business architecture and enterprise transformation.',
  },
  {
    id: 'telecommunications-technology',
    icon: Cpu,
    title: 'Telecommunications & Technology',
    subtitle: 'Accelerating Innovation Without Increasing Complexity',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Digital Service Delivery',
      'Infrastructure Transformation',
      'Customer Retention',
      'Data Governance',
      'AI Adoption',
      'Cyber Resilience',
      'Business Scalability',
    ],
    howWeHelp:
      'We help technology organisations improve governance, strengthen operational capability and accelerate business transformation.',
  },
  {
    id: 'retail-consumer-goods-ecommerce',
    icon: ShoppingBag,
    title: 'Retail, Consumer Goods & E-Commerce',
    subtitle: 'Creating Better Customer Experiences Through Better Business Performance',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Omnichannel Retail',
      'Customer Experience',
      'Inventory Optimisation',
      'Digital Commerce',
      'Supply Chain Performance',
      'Business Agility',
    ],
    howWeHelp:
      'We enable retailers to improve operational performance, optimise decision-making and strengthen governance while supporting long-term digital transformation.',
  },
  {
    id: 'professional-services',
    icon: Briefcase,
    title: 'Professional Services',
    subtitle: 'Helping Professional Services Firms Scale Sustainably',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600',
    challenges: [
      'Business Growth',
      'Operating Model Optimisation',
      'Knowledge Management',
      'Service Delivery',
      'Digital Enablement',
      'Resource Planning',
    ],
    howWeHelp:
      'We help professional service firms improve governance, strengthen organisational capability and build scalable operating models.',
  },
];

const coreCapabilities = [
  'Business Performance Engineering™',
  'Business Transformation',
  'Executive Advisory',
  'Governance, Risk & Compliance',
  'Operational Excellence',
  'Business Architecture',
  'Data Governance',
  'AI Readiness',
  'Strategy Execution',
  'Enterprise Change Management',
];

const expandingIndustries = [
  {
    name: 'Agriculture & Agribusiness',
    image: 'https://i.pinimg.com/1200x/d2/31/3b/d2313bf47264e5aad16515bc9070ef32.jpg',
  },
  {
    name: 'Aviation',
    image: 'https://i.pinimg.com/1200x/fd/29/21/fd29212e010a2b5030af338f75a60900.jpg',
  },
  {
    name: 'Construction & Infrastructure',
    image: 'https://i.pinimg.com/736x/1a/0a/b4/1a0ab4e00a136fbdbf475d4bc3f0b7aa.jpg',
  },
  {
    name: 'Education',
    image: 'https://i.pinimg.com/736x/f3/7c/7c/f37c7cc838e2ade26d7e60362b2e7a1c.jpg',
  },
  {
    name: 'Hospitality & Tourism',
    image: 'https://i.pinimg.com/736x/e3/13/d4/e313d431f644577e77951d4ef1675241.jpg',
  },
  {
    name: 'Logistics & Transportation',
    image: 'https://i.pinimg.com/736x/52/a3/54/52a354f4771c32531f615680b052a115.jpg',
  },
  {
    name: 'Oil & Gas Services',
    image: 'https://i.pinimg.com/1200x/b1/02/26/b10226dabfa9e476d0e65c10131c9565.jpg',
  },
  {
    name: 'Real Estate',
    image: 'https://i.pinimg.com/1200x/36/7c/eb/367cebffa69f3a9f08620b3915429e5e.jpg',
  },
  {
    name: 'Non-Profit & Development Organisations',
    image: 'https://i.pinimg.com/736x/7e/87/86/7e87861b3dbc7123f46191bc54a4e5f1.jpg',
  },
];

const scrollToIndustry = (id) => (event) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
};

const IndustriesPage = () => {
  const introRef = useRef(null);
  const jumpNavRef = useRef(null);
  const cardsRef = useRef(null);
  const crossIndustryRef = useRef(null);
  const expandingRef = useRef(null);
  const primaryCtaRef = useRef(null);
  const secondaryCtaRef = useRef(null);

  useGsapReveal(introRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(jumpNavRef, { selector: 'a', stagger: 0.03, y: 12 });
  useGsapReveal(cardsRef, { selector: '.industry-card', stagger: 0.08, y: 24 });
  useGsapReveal(crossIndustryRef, { selector: ':scope > *', stagger: 0.1 });
  useGsapReveal(expandingRef, { selector: ':scope > *', stagger: 0.1 });
  useHoverGlow(primaryCtaRef);
  useHoverGlow(secondaryCtaRef, { scale: 1.03 });

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Industries We Serve',
    url: `${SITE_URL}/industries`,
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Industry Advisory Services',
    description:
      'Business Performance Engineering™ advisory services tailored across financial services, government, healthcare, energy, manufacturing, technology, retail and professional services.',
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
        title="Industries | Business Transformation Consulting Nigeria"
        description="Discover how Delacruz Innovations helps organisations across financial services, government, healthcare, manufacturing, retail, energy and technology improve business performance through Business Performance Engineering™, governance, operational excellence and digital transformation."
        canonical={`${SITE_URL}/industries`}
        jsonLd={[webPageSchema, serviceSchema]}
      />

      <PageHero
        eyebrow="Industries"
        headline="Industry Expertise. Business Performance Excellence."
        copy="Every industry operates within its own regulatory environment, competitive landscape and operational challenges. At Delacruz Innovations, we apply Business Performance Engineering™ to help organisations across Nigeria and Africa deliver measurable business outcomes."
        primaryCTALabel="Speak to an Industry Specialist"
        secondaryCTALabel="Book an Executive Discovery Session"
        secondaryCTATo="/contact"
        scrollLabel="Explore Industries We Serve"
        heroImage="https://i.pinimg.com/1200x/09/6e/35/096e359e1e0bee3457c3517b09c4d165.jpg"
        showCarousel={false}
      />

      {/* Introduction */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={introRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Industry Challenges Are Different. Business Performance Is Universal.
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Every industry faces unique regulatory requirements, customer expectations and
              operational complexities.
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              Our approach combines industry knowledge with Business Performance Engineering™ to
              help organisations improve decision-making, optimise operations and deliver
              sustainable business value.
            </p>
          </div>
        </div>
      </section>

      {/* Jump Navigation */}
      <section className="border-y border-white/10 bg-black px-4 py-6 sm:px-6 lg:px-8">
        <div ref={jumpNavRef} className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <a
              key={industry.id}
              href={`#${industry.id}`}
              onClick={scrollToIndustry(industry.id)}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white"
            >
              {industry.title}
            </a>
          ))}
        </div>
      </section>

      {/* Industry Cards */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div ref={cardsRef} className="mx-auto max-w-7xl">
          <HorizontalScrollRow>
            <div className="contents">
              {industries.map((industry) => (
                <IndustryCard key={industry.id} industry={industry} />
              ))}
            </div>
          </HorizontalScrollRow>
        </div>
      </section>

      {/* Cross-Industry Expertise */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={crossIndustryRef}>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Cross-Industry Expertise
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Although industries differ, the foundations of business performance remain
              consistent.
            </p>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg">
              Our cross-sector experience enables us to transfer proven methodologies while
              tailoring every engagement to the operational realities of each organisation.
            </p>

            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Core Capabilities
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {coreCapabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-gray-300">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Expanding Industries */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div ref={expandingRef} className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-center">
            Industries We Are Expanding Into
          </h2>
          <p className="mb-10 text-base leading-relaxed text-gray-300 sm:text-lg md:text-center">
            As our{' '}
            <Link to="/business-performance-platform" className="text-purple-300 underline decoration-purple-500/40 underline-offset-2 transition-colors hover:text-purple-200">
              Business Performance Platform™
            </Link>{' '}
            evolves, we continue expanding our expertise into additional sectors.
          </p>
        </div>

        <ExpandingIndustriesCarousel items={expandingIndustries} />
      </section>

      {/* Final CTA */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl md:text-center">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            Every Industry Is Different. Better Business Performance Is Universal.
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
            Whether you’re modernising operations, strengthening governance, preparing for AI
            adoption or leading enterprise transformation, Delacruz Innovations provides the
            expertise, methodology and platform to help your organisation achieve measurable
            business outcomes.
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
                Talk to an Industry Specialist
              </Link>
            </span>
          </div>

          {/* Internal Links */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8 md:justify-center">
            <Link to="/business-performance-engineering" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white">
              Business Performance Engineering™
            </Link>
            <Link to="/services" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white">
              Solutions
            </Link>
            <Link to="/insights" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white">
              Insights
            </Link>
            <Link to="/about" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white">
              About Us
            </Link>
            <Link to="/contact" className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars -- Icon used as JSX tag <Icon />, false-positive in this eslint version
const IconBadge = ({ Icon }) => (
  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-sm">
    <Icon className="h-5 w-5 text-purple-300" aria-hidden="true" />
  </div>
);

const IndustryCard = ({ industry }) => {
  const Icon = industry.icon;
  const [isOpen, setIsOpen] = useState(false);

  const peelBase = 'absolute h-1/5 w-1/5 overflow-hidden transition-all duration-500 ease-out lg:group-hover:h-1/2 lg:group-hover:w-full lg:group-focus-within:h-1/2 lg:group-focus-within:w-full';
  const peelOpen = isOpen ? 'h-1/2 w-full' : '';

  return (
    <div
      id={industry.id}
      className="industry-card scroll-mt-24 w-[85vw] shrink-0 snap-start sm:w-[420px]"
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={`${industry.title} — view industry challenges and how we help`}
        className="group relative block h-[27rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        <img
          src={industry.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 lg:group-hover:scale-105 lg:group-focus-within:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-500 lg:group-hover:opacity-40 lg:group-focus-within:opacity-40 ${
            isOpen ? 'opacity-40' : ''
          }`}
        />

        {/* Default face: icon, title, mini description */}
        <div
          className={`absolute inset-0 flex flex-col items-start justify-end gap-2 p-7 transition-opacity duration-300 lg:group-hover:opacity-0 lg:group-focus-within:opacity-0 ${
            isOpen ? 'opacity-0' : ''
          }`}
        >
          <IconBadge Icon={Icon} />
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
            {industry.title}
          </h2>
          <h3 className="max-w-[85%] text-sm font-medium text-purple-300">{industry.subtitle}</h3>
        </div>

        {/* Top-right peel: Industry Challenges */}
        <div
          className={`${peelBase} right-0 top-0 rounded-bl-full bg-gray-950/95 lg:group-hover:rounded-bl-none lg:group-focus-within:rounded-bl-none ${peelOpen} ${
            isOpen ? 'rounded-bl-none' : ''
          }`}
        >
          <div
            className={`p-5 opacity-0 transition-opacity delay-150 duration-300 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 ${
              isOpen ? 'opacity-100' : ''
            }`}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Industry Challenges
            </p>
            <div className="flex flex-wrap gap-1.5">
              {industry.challenges.map((challenge) => (
                <span
                  key={challenge}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] leading-none text-gray-300"
                >
                  {challenge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom-left peel: How We Help */}
        <div
          className={`${peelBase} bottom-0 left-0 rounded-tr-full bg-purple-950/95 lg:group-hover:rounded-tr-none lg:group-focus-within:rounded-tr-none ${peelOpen} ${
            isOpen ? 'rounded-tr-none' : ''
          }`}
        >
          <div
            className={`p-5 opacity-0 transition-opacity delay-150 duration-300 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 ${
              isOpen ? 'opacity-100' : ''
            }`}
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-200">
              How We Help
            </p>
            <p className="text-sm leading-relaxed text-gray-200">{industry.howWeHelp}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

const ExpandingIndustriesCarousel = ({ items }) => {
  const reduced = usePrefersReducedMotion();
  const angleStep = 360 / items.length;
  const radius = 240;
  const cardSize = { width: 150, height: 200 };

  if (reduced) {
    return (
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 px-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="relative h-40 w-32 overflow-hidden rounded-xl border border-white/10"
          >
            <img src={item.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-2 text-xs font-semibold leading-tight text-white">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10" style={{ perspective: '1000px' }}>
      <div
        className="expanding-3d-ring relative"
        style={{ width: cardSize.width, height: cardSize.height }}
        tabIndex={0}
      >
        {items.map((item, index) => (
          <div
            key={item.name}
            className="expanding-3d-card absolute overflow-hidden rounded-xl border border-white/15 shadow-xl shadow-black/50"
            style={{
              width: cardSize.width,
              height: cardSize.height,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotateY(${index * angleStep}deg) translateZ(${radius}px)`,
              animationDelay: `${-(index * (28 / items.length))}s`,
            }}
          >
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold leading-tight text-white">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustriesPage;
