import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Homepage from './Pages/Homepage'
import AboutPage from './Pages/AboutPage'
import NotFound from './Components/NotFound'
import ServicesShowcase from './Components/ServicesShowcase'
import ExploreSolutions from './Components/ExploreSolutions'
import ServicePage from './Pages/ServicePage'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  return (
    <Router basename="/Dlacruz/">
      <ScrollToTop />
      <Navbar />

      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="about" element={<AboutPage />} />
           <Route path="services/:serviceName" element={<ServicePage />} />
          {/* <Route path='/Services_Showcase' element={<ServicesShowcase />}/>
          <Route path='/Explore_Solutions' element={<ExploreSolutions />}/> */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App
