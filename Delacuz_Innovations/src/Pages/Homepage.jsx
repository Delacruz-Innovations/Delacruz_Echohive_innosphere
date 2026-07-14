import React from 'react'
import Hero from '../Components/Hero'
import PerformanceSnapshot from '../Components/PerformanceSnapshot'
import Casestudy from '../Components/CaseStudy'
import TuneIn from '../Components/TuneIn'
import HelpOurClient from '../Components/HelpOurClient'
import Careers from '../Components/Careers'
import SocialImapact from '../Components/SocialImpact'
import CTABanner from '../Components/CTABanner'
import SEO from '../utils/SEO'


const Homepage = () => {
  return (
    <>
    <SEO
      title="Business Performance Engineering™ | Enterprise Business Transformation & AI Consulting"
      description="Engineer better business performance with Delacruz Innovations. We help organisations across Nigeria and Africa improve operational efficiency, strengthen governance, accelerate transformation, adopt AI responsibly, and achieve measurable business outcomes through Business Performance Engineering™."
    />
    <div>

        <Hero />
        <PerformanceSnapshot />
        <Casestudy />
     
        <HelpOurClient />
        
        <CTABanner />
       
    </div>
    </>
  )
}

export default Homepage