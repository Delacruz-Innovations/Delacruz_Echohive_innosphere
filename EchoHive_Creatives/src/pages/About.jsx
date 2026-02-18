import React from 'react'
import CurvedVideoHero from '../components/sections/CurvedVideoHero'

import GrowthSection from '../components/sections/GrowthSection'
import StickyAbout from '../components/sections/StickyAbout'
import CommunityPosts from '../components/sections/CommunityPosts'
import CommunityAboutSection from '../components/sections/CommunityAboutSection'
import CommunityLeaders from '../components/sections/communityLeaders'
import CTA from '../components/sections/CTA'

const About = () => {
  return (
    <>
    <div>
      <CurvedVideoHero />
     
      <GrowthSection />
      <StickyAbout />
      {/* <CommunityAboutSection /> */}
      <CommunityLeaders />
      <CTA />
    </div>
    </>
  )
}

export default About