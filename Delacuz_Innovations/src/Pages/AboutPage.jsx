import {useEffect} from 'react'
import PageHero from '../Components/PageHero'
import BetterBusiness from '../Components/BetterBusiness'
import MissionVision from '../Components/MissionVission'
import BrandEcoSyst from '../Components/BandEcoSystem'
import AboutFeatures from '../Components/AboutFeatures'
import FeaturedImpact from '../Components/FeaturedImpact'
import FAQ from '../Components/FQA'
import OurHistory from '../Components/OurHistory'
import MissionVisionValues from '../Components/MissionVission'
import DelacruzLeadership from '../Components/DelacruzLeadership'
import SEO from '../utils/SEO'

const AboutPage = () => {
  useEffect(() => {
  const start = Date.now();

  const handleBeforeUnload = () => {
    const duration = (Date.now() - start) / 1000; // seconds
    window.gtag('event', 'time_on_page', {
      event_category: 'engagement',
      value: duration,
    });
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, []);

  return (
    <>
    <SEO
      title="About Delacruz Innovations | 15+ Years of Strategic IT Excellence"
      description="Learn about Delacruz Innovations' mission, leadership, and history. We are a global consultancy with offices in Lagos, Nigeria and Ajman, UAE."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Delacruz Innovations',
        url: 'https://delacruzinnovation.com/about',
        mainEntity: {
          '@type': 'Organization',
          name: 'Delacruz Innovations',
          url: 'https://delacruzinnovation.com',
        },
      }}
    />
    <div>
         <PageHero
           eyebrow="ABOUT US"
           headline="Shaping Africa’s Digital Future One Solution at a Time."
           copy="A digitally empowered Africa where innovation drives inclusion, efficiency, and sustainable growth."
           primaryCTALabel="Speak to an Expert"
           scrollLabel="Learn More About Us"
           ghostWord="FUTURE"
           heroImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop"
         />
         <OurHistory />
    {/* <BetterBusiness /> */}
    <MissionVisionValues />
    {/* <AboutFeatures /> */}
    <DelacruzLeadership/>
    <BrandEcoSyst />
    {/* <FeaturedImpact /> */}
    
    </div>
    </>
  )
}

export default AboutPage