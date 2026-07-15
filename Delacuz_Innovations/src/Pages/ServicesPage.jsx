import React, { useRef } from 'react';
import servicesData from '../ServicesData.json';
import SEO, { SITE_URL } from '../utils/SEO';
import PageHero from '../Components/PageHero';
import FrameworkHighlight from '../Components/FrameworkHighlight';
import PracticeCardGrid from '../Components/PracticeCardGrid';
import DifferentiatorSection from '../Components/DifferentiatorSection';
import PracticeAreasCTA from '../Components/PracticeAreasCTA';
import useGsapReveal from '../utils/useGsapReveal';

const ServicesPage = () => {
  const introRef = useRef(null);

  useGsapReveal(introRef, { selector: ':scope > *', stagger: 0.1 });

  const practiceAreasSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: servicesData.services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Business Transformation & Enterprise Consulting Solutions',
    url: `${SITE_URL}/services`,
  };

  return (
    <>
      <SEO
        title="Business Transformation & Enterprise Consulting Solutions | Delacruz Innovations Nigeria"
        description="Discover Business Performance Engineering™ solutions from Delacruz Innovations. We help organisations across Nigeria and Africa improve operational performance, strengthen governance, optimise business processes, implement AI responsibly and deliver measurable business outcomes."
        jsonLd={[practiceAreasSchema, webPageSchema]}
      />

      <PageHero
        eyebrow="Solutions"
        headline="Business Challenges Don’t Need More Technology. They Need Better Business Performance."
        copy="Organisations rarely struggle because they lack technology. More often, they struggle because strategy, governance, people, processes, data and technology are no longer working together effectively."
        primaryCTALabel="Request an Executive Performance Assessment"
        secondaryCTALabel="Explore Business Performance Engineering™"
        secondaryCTATo="/business-performance-engineering"
        scrollLabel="Explore Our Solutions"
        heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=70&w=1600"
      />

      {/* Introduction */}
      <section className="bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div ref={introRef}>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              As businesses grow, complexity increases. Decision-making slows. Operational costs
              rise. Customer expectations evolve. Regulatory requirements become more demanding.
              Technology investments multiply without always delivering proportional value.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              At Delacruz Innovations, we help organisations solve these challenges through
              Business Performance Engineering™—our proprietary methodology for improving
              organisational performance by aligning strategy, governance, operations, data,
              artificial intelligence, people and technology around measurable business outcomes.
            </p>
            <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
              Rather than asking, “What service do you need?”, we begin with a different question:
            </p>
            <p className="mb-6 max-w-2xl border-l-2 border-purple-500/60 pl-4 text-xl font-semibold italic leading-relaxed text-white">
              “What business outcome are you trying to achieve?”
            </p>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
              That question shapes every engagement.
            </p>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <FrameworkHighlight />

      {/* Our Solutions */}
      <PracticeCardGrid />
      <DifferentiatorSection />
      <PracticeAreasCTA />
    </>
  );
};

export default ServicesPage;
