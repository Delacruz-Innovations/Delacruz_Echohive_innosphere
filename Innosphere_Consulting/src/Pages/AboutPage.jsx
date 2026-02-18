import React, { useEffect } from 'react'
import StrategyAccordion from '../Components/StrategyAccordion'
import HeroSection from '../Components/HeroSection'
import LeadershipTeam from '../Components/LeadershipTeam'
import MissionVisionValues from '../Components/MissionVisionValues'
import AboutUs from '../Components/AboutUs'
import { 
  logPageView, 
  setupScrollTracking, 
  setupSectionTracking, 
  setupTimeTracking 
} from '../utils/analytics'
import FeatureCarousel from '../Components/FeatureCarousel'
import InnosphereValues from '../Components/InnosphereValues'

const AboutPage = () => {
  useEffect(() => {
    // Track page view
   logPageView('About Us', '/about')

    // Setup scroll tracking
    const cleanupScroll = setupScrollTracking('About Us')

    // Setup section visibility tracking
    const cleanupSections = setupSectionTracking('About Us')

    // Setup time on page tracking
    const cleanupTime = setupTimeTracking('About Us')

    // Cleanup all tracking on unmount
    return () => {
      cleanupScroll()
      cleanupSections()
      cleanupTime()
    }
  }, [])

  return (
    <>
    <div className='bg-slate-950'>
   {/* <HeroSection /> */}
      <div data-section="about-us">
        <AboutUs />
      </div>
      <InnosphereValues />
   
      <div data-section="mission-vision-values">
        <MissionVisionValues />
      </div>
      {/* <div data-section="leadership-team">
        <LeadershipTeam />
      </div> */}
     
    </div>
   
    </>
  )
}

export default AboutPage