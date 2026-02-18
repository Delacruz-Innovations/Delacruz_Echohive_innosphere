import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import * as ReactGA from 'react-ga4'

// Initialize GA4 with safety check for bundler compatibility
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
if (GA_ID && ReactGA) {
  const ga = (ReactGA.default && ReactGA.default.initialize) ? ReactGA.default : ReactGA;
  if (ga.initialize) {
    ga.initialize(GA_ID);
    ga.send({ hitType: "pageview", page: window.location.pathname });
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
