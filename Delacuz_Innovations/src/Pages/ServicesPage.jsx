import React from 'react';
import servicesData from '../ServicesData.json';
import SEO, { SITE_URL } from '../utils/SEO';
import PageHero from '../Components/PageHero';
import OutcomeNavigator from '../Components/OutcomeNavigator';
import FrameworkHighlight from '../Components/FrameworkHighlight';
import PracticeCardGrid from '../Components/PracticeCardGrid';
import DifferentiatorSection from '../Components/DifferentiatorSection';
import PracticeAreasCTA from '../Components/PracticeAreasCTA';

const ServicesPage = () => {
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

  return (
    <>
      <SEO
        title="Business Performance Engineering™ Practice Areas"
        description="Discover how Delacruz Innovations helps organisations across Nigeria and Africa improve operational performance, strengthen governance, modernise technology and achieve measurable business outcomes through Business Performance Engineering™."
        jsonLd={practiceAreasSchema}
      />

      <PageHero
        eyebrow="PRACTICE AREAS"
        headline="Business Challenges Require Business Performance Solutions."
        copy="We don't begin with technology. We begin by understanding the business outcome you need to achieve, then combine strategy, governance, people, processes, data and technology through our Business Performance Engineering Framework™ (BPEF™) to deliver it."
        primaryCTALabel="Request an Executive Performance Assessment"
        secondaryCTALabel="Explore Business Performance Engineering™"
        secondaryCTATo="/services#framework"
        scrollLabel="Explore Our Practice Areas"
        ghostWord="PERFORM"
        heroImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1974"
      />

      <OutcomeNavigator />
      <FrameworkHighlight />
      <PracticeCardGrid />
      <DifferentiatorSection />
      <PracticeAreasCTA />
    </>
  );
};

export default ServicesPage;
