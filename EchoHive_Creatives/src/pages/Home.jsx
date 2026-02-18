import React from 'react'
import HeroCanvas from '../components/three/HeroCanvas'
import ShapeSection from '../components/three/ShapeSection'

import LatestProjects from '../components/sections/LatestProjects'
import Creativity from '../components/sections/Creativity'
import OurServices from '../components/sections/OurServices'
import CTA from '../components/sections/CTA'


const Home = () => {
  return (
    <>
      <HeroCanvas />
      <ShapeSection />
      <LatestProjects />
      <Creativity />
      {/* <OurServices /> */}
      <CTA />

    </>
  )
}

export default Home