import React from 'react'
import AboutHero from '../Components/AboutHero'
import BetterBusiness from '../Components/BetterBusiness'
import MissionVision from '../Components/MissionVission'
import BrandEcoSyst from '../Components/BandEcoSystem'
import AboutFeatures from '../Components/AboutFeatures'
import FeaturedImpact from '../Components/FeaturedImpact'
import FAQ from '../Components/FQA'

const AboutPage = () => {
  return (
    <>
  <div>
    <AboutHero />
    <BetterBusiness />
    <AboutFeatures />
    <MissionVision />
    <FeaturedImpact />
    <BrandEcoSyst />
    <FAQ />
  </div>
    </>
  )
}

export default AboutPage