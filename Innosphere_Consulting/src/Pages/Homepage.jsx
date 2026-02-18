import React from 'react'
import Hero from '../Components/Hero'
import StatsBar from '../Components/StatsBar'
import ServicesOverview from '../Components/ServicesOverview'
import StrategicDifferentiators from '../Components/StrategicDifferentiators'
import IndustriesWeServe from '../Components/IndustriesWeServe'
import CTABanner from '../Components/CTABanner'
import SolutionsApp from '../Components/SolutionsApp'
import AboutUs from '../Components/AboutUs'
import Testimonials from '../Components/Testimonials'
import RequestCallBack from '../Components/CTABanner1'
import InnosphereHero from '../Components/InnosphereAbout'

const Homepage = () => {
  return (
    <>
    <div className='bg-gray-950'>
 <Hero />
    <StatsBar />
    {/* <InnosphereHero /> */}
    {/* <SolutionsApp /> */}
    {/* <AboutUs /> */}
    <Testimonials />
    {/* <ServicesOverview /> */}
    {/* <StrategicDifferentiators /> */}
    {/* <IndustriesWeServe /> */}
    <RequestCallBack />
    </div>
   
    </>
  )
}

export default Homepage