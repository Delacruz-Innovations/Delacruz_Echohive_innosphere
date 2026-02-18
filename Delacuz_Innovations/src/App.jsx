import React, { Suspense, lazy, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import PersonalInformation from './Components/PersonalInformation'
import JobPortalApp from './Pages/JobPortalApp'
import ContactPage from './Pages/ContactPage'
import { jobsData } from './Components/jobsData'
import JobListingsPage from './Pages/JobListingsPage'
import JobDetailsPage from './Pages/JobDetailsPage'
import ApplicationPage from './Pages/ApplicationPage'
import FAQ from './Components/FAQ'
import ITConsultantForm from './Pages/ITConsultantForm'
import DeChatbot from './Components/DeChatbot'
import CalendlyTracker from './Components/CalendlyTracker'

import {
  initGA,
  logPageView,
  logPageTime,
  sendTimeDataToBackend,
  getAnonymousUserId,
  getSessionId,
  getUserType,
  getUserSessionCount,
  retryFailedTimeRequests,
  logDeviceType,
  getDeviceType,
  getDeviceInfo,
  trackOrientationChange,
  storeTimeDataLocally,
  isPageRefresh,
  getUserLocation,
  getPageInfo,
  CONFIG
} from "./utils/analytics";

// ============================================================================
// LOADING COMPONENT
// ============================================================================
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    width: '100%'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

// ============================================================================
// LAZY LOADED COMPONENTS
// ============================================================================
const Homepage = lazy(() => import('./Pages/Homepage'))
const AboutPage = lazy(() => import('./Pages/AboutPage'))
const ServicesPage = lazy(() => import('./Pages/ServicesPage'))
const ServiceDetailsPage = lazy(() => import('./Pages/SericeDetailsPage'))
const CaseStudies = lazy(() => import('./Pages/CaseStudies'))
const OfficesSection = lazy(() => import('./Pages/OfficesSection'))
const InsightsListPage = lazy(() => import('./Pages/InsightsListPage'))
const InsightDetailPage = lazy(() => import('./Pages/InsightDetailPage'))
const TermOfUse = lazy(() => import('./Components/TermOfUse'))
const AccessibilityStatement = lazy(() => import('./Components/AccessibilityStatement'))
const PrivacyPolicy = lazy(() => import('./Components/PrivacyPolicy'))
const NotFound = lazy(() => import('./Pages/NotFound'))
const ApplicationForm = lazy(() => import('./Components/ApplicationForm'))

// ============================================================================
// SCROLL TO TOP - Ensures page starts from top on navigation AND refresh
// ============================================================================
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0)

    // Also reset scroll on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [pathname])

  return null
}

// ============================================================================
// PAGE TIME TRACKER - Professional time tracking with refresh filtering
// ============================================================================
const PageTimeTracker = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const currentPathRef = useRef(location.pathname);
  const hiddenTimeRef = useRef(0);
  const isActiveRef = useRef(true);
  const hasLoggedInitialView = useRef(false);

  useEffect(() => {
    const userId = getAnonymousUserId();
    const sessionId = getSessionId();
    const deviceInfo = getDeviceInfo();
    const userType = getUserType();

    // Get location asynchronously
    let userLocation = null;
    getUserLocation().then(location => {
      userLocation = location;
    });

    // Log time spent on page
    const logTimeSpent = async (path, timeSpent) => {
      const timeInSeconds = Math.round(timeSpent / 1000);

      // Filter out very short times and page refreshes
      if (timeInSeconds < CONFIG.THRESHOLDS.MIN_TIME_TO_LOG) {
        console.log(`⏭️  Skipped logging (${timeInSeconds}s < ${CONFIG.THRESHOLDS.MIN_TIME_TO_LOG}s minimum)`);
        return;
      }

      console.log(`⏱️  Time spent on ${path}: ${timeInSeconds}s`);

      // Send to Google Analytics
      logPageTime(path, timeInSeconds);

      // Get fresh location data
      const location = userLocation || await getUserLocation();
      const pageInfo = getPageInfo(path);

      // Prepare comprehensive data for backend
      const timeData = {
        path,
        pageTitle: pageInfo.title,
        routeName: pageInfo.routeName,
        timeSpent: timeInSeconds,
        timestamp: new Date().toISOString(),

        // User info
        userId,
        sessionId,
        userType,
        sessionNumber: getUserSessionCount(),

        // Device info
        deviceType: deviceInfo.deviceType,
        screenResolution: deviceInfo.screenResolution,
        viewportSize: deviceInfo.viewportSize,
        orientation: deviceInfo.orientation,
        touchSupport: deviceInfo.touchSupport,
        userAgent: navigator.userAgent,

        // Location info
        country: location.country,
        countryCode: location.countryCode,
        region: location.region,
        city: location.city,
        timezone: location.timezone,
        ip: location.ip,

        // Metadata
        referrer: document.referrer,
      };

      // Send to backend
      await sendTimeDataToBackend(timeData);

      // Store locally for backup
      storeTimeDataLocally(timeData);
    };

    // When route changes, log time for previous page
    if (currentPathRef.current !== location.pathname) {
      const timeSpent = Date.now() - startTimeRef.current;

      if (isActiveRef.current && timeSpent > 0) {
        logTimeSpent(currentPathRef.current, timeSpent);
      }

      // Reset for new page
      startTimeRef.current = Date.now();
      currentPathRef.current = location.pathname;
      isActiveRef.current = true;
      hasLoggedInitialView.current = false;
    }

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTimeRef.current = Date.now();
        isActiveRef.current = false;
      } else {
        if (hiddenTimeRef.current > 0) {
          const hiddenDuration = Date.now() - hiddenTimeRef.current;
          startTimeRef.current += hiddenDuration;
          hiddenTimeRef.current = 0;
          isActiveRef.current = true;
        }
      }
    };

    // Handle page unload
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTimeRef.current;

      if (timeSpent > 0 && isActiveRef.current) {
        const timeInSeconds = Math.round(timeSpent / 1000);

        // Only log if meets minimum threshold
        if (timeInSeconds >= CONFIG.THRESHOLDS.MIN_TIME_TO_LOG) {
          const timeData = {
            path: currentPathRef.current,
            timeSpent: timeInSeconds,
            timestamp: new Date().toISOString(),
            userId,
            sessionId,
            exitType: 'page_unload',
            deviceType: deviceInfo.deviceType,
          };

          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(timeData)], { type: 'application/json' });
            navigator.sendBeacon(CONFIG.API_ENDPOINTS.TIME_TRACKING, blob);
          }
        }
      }
    };

    // Handle focus/blur
    const handleFocus = () => {
      if (hiddenTimeRef.current > 0) {
        const hiddenDuration = Date.now() - hiddenTimeRef.current;
        startTimeRef.current += hiddenDuration;
        hiddenTimeRef.current = 0;
      }
      isActiveRef.current = true;
    };

    const handleBlur = () => {
      hiddenTimeRef.current = Date.now();
      isActiveRef.current = false;
    };

    // Event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Periodic checkpoint (every 30 seconds)
    const saveInterval = setInterval(() => {
      if (isActiveRef.current) {
        const currentTime = Date.now() - startTimeRef.current;

        if (currentTime > CONFIG.THRESHOLDS.CHECKPOINT_INTERVAL) {
          const timeInSeconds = Math.round(currentTime / 1000);
          console.log(`💾 Checkpoint: ${timeInSeconds}s on ${currentPathRef.current}`);

          const timeData = {
            path: currentPathRef.current,
            timeSpent: timeInSeconds,
            timestamp: new Date().toISOString(),
            userId,
            sessionId,
            isCheckpoint: true,
            deviceType: deviceInfo.deviceType,
          };

          sendTimeDataToBackend(timeData);
        }
      }
    }, CONFIG.THRESHOLDS.CHECKPOINT_INTERVAL);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      clearInterval(saveInterval);
    };
  }, [location]);

  return null;
};

// ============================================================================
// ROUTE TRACKER - GA4 page view tracking with refresh filtering
// ============================================================================
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Log page view (automatically filters out unwanted refreshes)
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

// ============================================================================
// SESSION MANAGER - Manages analytics session lifecycle
// ============================================================================
const SessionManager = () => {
  useEffect(() => {
    const sessionId = getSessionId();
    const userId = getAnonymousUserId();
    const deviceInfo = getDeviceInfo();

    console.log('📊 Analytics Session Initialized');
    console.log('├─ Session ID:', sessionId);
    console.log('├─ User ID:', userId);
    console.log('├─ Device:', deviceInfo.deviceType);
    console.log('└─ Resolution:', deviceInfo.screenResolution);

    // Retry failed requests on app load
    retryFailedTimeRequests().then(result => {
      if (result.retriedCount > 0) {
        console.log(`✅ Retried ${result.retriedCount} failed requests`);
      }
      if (result.stillFailedCount > 0) {
        console.warn(`⚠️  ${result.stillFailedCount} requests still failed`);
      }
    });

    // Periodic retry
    const retryInterval = setInterval(() => {
      retryFailedTimeRequests();
    }, CONFIG.RETRY.INTERVAL);

    // Track session end
    const trackSessionEnd = () => {
      const sessionData = JSON.parse(sessionStorage.getItem('userSession') || 'null');

      if (sessionData) {
        const sessionDuration = Math.round((Date.now() - sessionData.startTime) / 1000);
        console.log(`🏁 Session ended | Duration: ${sessionDuration}s`);

        const sessionEndData = {
          sessionId: sessionData.sessionId,
          duration: sessionDuration,
          timestamp: new Date().toISOString(),
          userId: getAnonymousUserId(),
          deviceType: deviceInfo.deviceType,
        };

        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(sessionEndData)], { type: 'application/json' });
          navigator.sendBeacon(CONFIG.API_ENDPOINTS.SESSION_TRACKING, blob);
        }
      }
    };

    window.addEventListener('beforeunload', trackSessionEnd);

    return () => {
      clearInterval(retryInterval);
      window.removeEventListener('beforeunload', trackSessionEnd);
    };
  }, []);

  return null;
};

// ============================================================================
// APP ROUTES
// ============================================================================
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <RouteTracker />
      <PageTimeTracker />
      <SessionManager />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:serviceId" element={<ServiceDetailsPage />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="offices" element={<OfficesSection />} />
          <Route path="insights" element={<InsightsListPage />} />
          <Route path="insights/:insightId" element={<InsightDetailPage />} />
          <Route path="/jobs" element={<JobListingsPage jobsData={jobsData} />} />
          <Route path="/job/:jobId" element={<JobDetailsPage jobsData={jobsData} />} />
          <Route path="/job/:jobId/apply" element={<ApplicationPage jobsData={jobsData} />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='consultation_form' element={<ITConsultantForm />} />
          <Route path='terms-of-use' element={<TermOfUse />} />
          <Route path='accessibility-statement' element={<AccessibilityStatement />} />
          <Route path='faq' element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const App = () => {
  useEffect(() => {
    // Force scroll to top on initial load/refresh
    window.scrollTo(0, 0);

    // Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Initialize analytics asynchronously
    const initializeAnalytics = async () => {
      // Initialize Google Analytics
      initGA();

      // Get location data
      const location = await getUserLocation();

      // Log device info once per session
      const { deviceInfo } = await logDeviceType();

      // Track orientation changes
      trackOrientationChange();

      // Log initial page view (with location data)
      await logPageView();

      // Check if this is a page refresh
      const isRefresh = isPageRefresh();
      const userType = getUserType();
      const sessionCount = getUserSessionCount();

      if (isRefresh) {
        console.log('🔄 Page refresh detected');
      }

      // Professional initialization log
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🚀 Application Initialized');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Analytics Status: ✅ Active');
      console.log('');
      console.log('👤 USER INFORMATION');
      console.log('├─ User ID:', getAnonymousUserId());
      console.log('├─ Session ID:', getSessionId());
      console.log('├─ User Type:', userType.toUpperCase());
      console.log('└─ Total Sessions:', sessionCount);
      console.log('');
      console.log('📱 DEVICE INFORMATION');
      console.log('├─ Device:', deviceInfo.deviceType.toUpperCase());
      console.log('├─ Screen:', deviceInfo.screenResolution);
      console.log('├─ Viewport:', deviceInfo.viewportSize);
      console.log('└─ Touch Support:', deviceInfo.touchSupport ? 'Yes' : 'No');
      console.log('');
      console.log('📍 LOCATION INFORMATION');
      console.log('├─ Country:', location.country);
      console.log('├─ Region:', location.region);
      console.log('├─ City:', location.city);
      console.log('├─ Timezone:', location.timezone);
      console.log('└─ ISP:', location.isp);
      console.log('');
      console.log('🔄 SESSION STATUS');
      console.log('└─ Is Refresh:', isRefresh ? 'Yes' : 'No');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    };

    initializeAnalytics();
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <AppRoutes />
        <Footer />
        <DeChatbot />
        <CalendlyTracker />
      </Router>
    </div>
  )
}

export default App