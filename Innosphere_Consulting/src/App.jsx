// src/App.js
import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import Footer from './Components/Footer';
import AboutPage from './Pages/AboutPage';
import SolutionPages from '../src/Pages/ServicesPage';
import SolutionDetail from './Components/ServiceDetail';
import ScrollToTop from './Components/ScrollToTop';
import Notfound from './Components/Notfound';
import CaseStudies from './Pages/CaseStudiesList';
import CaseStudyDetails from './Components/CaseStudyDetails';
import InsightsList from './Pages/InsightsList';
import InsightDetails from './Components/InsightDetails';
import ContactPage from './Pages/ContactPage';
import ConsultantForm from './Pages/ConsultantForm';
import DeChatbot from './Components/DeChatbot';
import TermsAndConditions from './Components/TermsAndConditions';
import Policy from './Pages/Policy';
import Academy from './Pages/Academy';
import Industries from './Pages/Industries';
import CalendlyTracker from './Components/CalendlyTracker';

import { initGA, logPageView, logEvent } from './utils/analytics';

const isDevelopment = process.env.NODE_ENV === 'development';

// Get page title based on route
const getPageTitle = (pathname) => {
  const routes = {
    '/': 'Home',
    '/about': 'About Us',
    '/service': 'Solutions',
    '/cases': 'Case Studies',
    '/insights': 'Insights',
    '/contact': 'Contact',
    '/Consultation': 'Consultation',
    '/Privacy_Policy': 'Privacy Policy',
    '/Term_&_Condition': 'Terms & Conditions',
    '/Academy': 'Academy',
    '/Industries': 'Industries',
    '/our_services': 'Our Services'
  };

  // Check exact match first
  if (routes[pathname]) {
    return routes[pathname];
  }

  // Handle dynamic routes
  if (pathname.startsWith('/service/')) return 'Solution Detail';
  if (pathname.startsWith('/cases/')) return 'Case Study Detail';
  if (pathname.startsWith('/insights/')) return 'Insight Detail';

  return '404 Not Found';
};

// Safe wrapper for GA events
const safeLogEvent = (...args) => {
  try {
    logEvent(...args);
  } catch (error) {
    if (isDevelopment) {
      console.error('GA Event Error:', error);
    }
  }
};

// Component to track route changes and user behavior
function RouteTracker() {
  const location = useLocation();
  const pageStartTime = useRef(Date.now());
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const pageTitle = getPageTitle(location.pathname);

    // Track time on previous page before navigating
    if (previousPath.current !== location.pathname && previousPath.current) {
      const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
      const previousTitle = getPageTitle(previousPath.current);
      if (timeSpent > 0) {
        safeLogEvent('Engagement', 'Time on Page', previousTitle, timeSpent);
      }
    }

    // Log new page view
    try {
      logPageView(currentPath, pageTitle);
    } catch (error) {
      if (isDevelopment) {
        console.error('GA Page View Error:', error);
      }
    }

    pageStartTime.current = Date.now();
    previousPath.current = location.pathname;
  }, [location]);

  // Track time on page when component unmounts (route change)
  useEffect(() => {
    return () => {
      const currentPageTime = Math.round((Date.now() - pageStartTime.current) / 1000);
      const currentTitle = getPageTitle(previousPath.current);

      if (currentPageTime > 0) {
        safeLogEvent('Engagement', 'Time on Page', currentTitle, currentPageTime);
      }
    };
  }, []);

  return null;
}

function ScrollDepthTracker() {
  const location = useLocation();
  const trackedDepths = useRef(new Set());
  const scrollTimeout = useRef(null);

  useEffect(() => {
    trackedDepths.current = new Set();

    const handleScroll = () => {
      // Debounce scroll events
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        [25, 50, 75, 100].forEach(milestone => {
          if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
            trackedDepths.current.add(milestone);
            safeLogEvent('Scroll', `${milestone}% Depth`, getPageTitle(location.pathname));
          }
        });
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [location.pathname]);

  return null;
}

function InteractionTracker() {
  useEffect(() => {
    const handleClick = (e) => {
      try {
        const link = e.target.closest('a');
        const button = e.target.closest('button');

        if (link) {
          const href = link.getAttribute('href');
          if (href?.startsWith('http') && !href.includes(window.location.hostname)) {
            safeLogEvent('Outbound Link', 'Click', href);
          }
        }

        if (button) {
          const buttonText = button.textContent?.trim() || button.getAttribute('aria-label') || 'Unknown Button';
          safeLogEvent('Button', 'Click', buttonText);
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('Click tracking error:', error);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

// Track when user leaves the site
function BeforeUnloadTracker() {
  const sessionStartTime = useRef(Date.now());
  const pageStartTime = useRef(Date.now());
  const location = useLocation();

  useEffect(() => {
    pageStartTime.current = Date.now();
  }, [location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const totalSessionTime = Math.round((Date.now() - sessionStartTime.current) / 1000);
      const currentPageTime = Math.round((Date.now() - pageStartTime.current) / 1000);
      const currentTitle = getPageTitle(location.pathname);

      if (currentPageTime > 0) {
        safeLogEvent('Engagement', 'Time on Page', currentTitle, currentPageTime);
      }
      if (totalSessionTime > 0) {
        safeLogEvent('Engagement', 'Total Session Time', 'Site Wide', totalSessionTime);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  return null;
}

const App = () => {
  const appMountTime = useRef(Date.now());

  useEffect(() => {
    // Initialize GA4
    try {
      initGA();
    } catch (error) {
      console.error('Failed to initialize GA:', error);
    }

    // Log initial page view
    try {
      logPageView();
    } catch (error) {
      if (isDevelopment) {
        console.error('Initial page view error:', error);
      }
    }

    // Track browser and device info with null checks
    try {
      const userAgent = navigator.userAgent || 'Unknown';
      const browser = userAgent.split(' ').pop() || 'Unknown';
      safeLogEvent('User Info', 'Browser', browser);
      safeLogEvent('User Info', 'Platform', navigator.platform || 'Unknown');
      safeLogEvent('User Info', 'Screen Size', `${window.screen.width}x${window.screen.height}`);
      safeLogEvent('User Info', 'Viewport Size', `${window.innerWidth}x${window.innerHeight}`);
    } catch (error) {
      if (isDevelopment) {
        console.error('User info tracking error:', error);
      }
    }

    // Track performance metrics using modern API
    if (window.performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          try {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries && perfEntries.length > 0) {
              const perfData = perfEntries[0];
              const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;

              if (pageLoadTime > 0) {
                safeLogEvent('Performance', 'Page Load Time', 'Homepage', Math.round(pageLoadTime));
                if (isDevelopment) {
                  console.log(`Page load time: ${pageLoadTime}ms`);
                }
              }
            } else {
              // Fallback to deprecated API if needed
              const timing = performance.timing;
              if (timing && timing.loadEventEnd && timing.navigationStart) {
                const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                if (pageLoadTime > 0) {
                  safeLogEvent('Performance', 'Page Load Time', 'Homepage', Math.round(pageLoadTime));
                  if (isDevelopment) {
                    console.log(`Page load time (fallback): ${pageLoadTime}ms`);
                  }
                }
              }
            }
          } catch (error) {
            if (isDevelopment) {
              console.error('Performance tracking error:', error);
            }
          }
        }, 0);
      });
    }

    // Track visibility changes (tab switching)
    const handleVisibilityChange = () => {
      try {
        if (document.hidden) {
          safeLogEvent('User Behavior', 'Tab Hidden', window.location.pathname);
        } else {
          safeLogEvent('User Behavior', 'Tab Visible', window.location.pathname);
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('Visibility tracking error:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Router >
      <CalendlyTracker />
      <ScrollToTop />
      <RouteTracker />
      <ScrollDepthTracker />
      <InteractionTracker />
      <BeforeUnloadTracker />
      <Navbar />
      <Routes >
        <Route path='/' element={<Homepage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='solutions' element={<SolutionPages />} />
        <Route path='service/:slug' element={<SolutionDetail />} />
        <Route path='cases' element={<CaseStudies />} />
        <Route path='cases/:slug' element={<CaseStudyDetails />} />
        <Route path='insights' element={<InsightsList />} />
        <Route path='insights/:slug' element={<InsightDetails />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='Consultation' element={<ConsultantForm />} />
        <Route path='Privacy_Policy' element={<Policy />} />
        <Route path='Term_&_Condition' element={<TermsAndConditions />} />
        <Route path='Academy' element={<Academy />} />
        <Route path='Industries' element={<Industries />} />
        <Route path='our_services' element={<SolutionPages />} />
        <Route path='*' element={<Notfound />} />
      </Routes>

      <Footer />
      <DeChatbot />
    </Router>
  );
};

export default App;