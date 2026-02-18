// ============================================================================
// ANALYTICS UTILITY - Professional Google Analytics 4 Implementation
// ============================================================================
// This module provides comprehensive tracking for user behavior, device info,
// and page engagement metrics while filtering out refresh-based false positives
// ============================================================================

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------

const CONFIG = {
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-CYJ7TCWXCD', // Use env variable or fallback
  API_ENDPOINTS: {
    TIME_TRACKING: '/api/track-time',
    SESSION_TRACKING: '/api/track-session',
  },
  THRESHOLDS: {
    MIN_TIME_TO_LOG: 3, // Minimum seconds before logging (filters out refreshes)
    CHECKPOINT_INTERVAL: 30000, // 30 seconds
    MAX_LOCAL_STORAGE: 200, // Maximum entries to keep
  },
  RETRY: {
    INTERVAL: 5 * 60 * 1000, // 5 minutes
    MAX_ATTEMPTS: 3,
  }
};

// ----------------------------------------------------------------------------
// USER & SESSION MANAGEMENT
// ----------------------------------------------------------------------------

/**
 * Generate or retrieve anonymous user ID
 * Persists across sessions using localStorage
 */
const getAnonymousUserId = () => {
  let userId = localStorage.getItem('anonymousUserId');

  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('anonymousUserId', userId);

    // Mark as new user
    localStorage.setItem('userType', 'new');
    localStorage.setItem('firstVisit', new Date().toISOString());
  }

  return userId;
};

/**
 * Determine if user is new or returning
 */
const getUserType = () => {
  const userType = localStorage.getItem('userType');
  const firstVisit = localStorage.getItem('firstVisit');

  if (!userType) {
    // First time visitor
    localStorage.setItem('userType', 'new');
    localStorage.setItem('firstVisit', new Date().toISOString());
    return 'new';
  }

  // Check if it's been more than 30 minutes since first visit
  // If yes, they're now a returning user
  if (firstVisit) {
    const firstVisitTime = new Date(firstVisit).getTime();
    const thirtyMinutes = 30 * 60 * 1000;

    if (Date.now() - firstVisitTime > thirtyMinutes) {
      localStorage.setItem('userType', 'returning');
      return 'returning';
    }
  }

  return userType;
};

/**
 * Get total number of sessions for this user
 */
const getUserSessionCount = () => {
  const count = parseInt(localStorage.getItem('totalSessions') || '0');
  return count;
};

/**
 * Increment session count
 */
const incrementSessionCount = () => {
  const count = getUserSessionCount();
  localStorage.setItem('totalSessions', (count + 1).toString());
  return count + 1;
};

/**
 * Generate or retrieve session ID
 * New session created on browser close or after 30 minutes of inactivity
 */
const getSessionId = () => {
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();

  let sessionData = sessionStorage.getItem('userSession');

  if (sessionData) {
    sessionData = JSON.parse(sessionData);
    const timeSinceLastActivity = now - sessionData.lastActivity;

    // If session is still active, update last activity and return existing ID
    if (timeSinceLastActivity < SESSION_TIMEOUT) {
      sessionData.lastActivity = now;
      sessionStorage.setItem('userSession', JSON.stringify(sessionData));
      return sessionData.sessionId;
    }
  }

  // Create new session
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newSessionData = {
    sessionId: newSessionId,
    startTime: now,
    lastActivity: now,
    userType: getUserType(),
    sessionNumber: incrementSessionCount(),
  };

  sessionStorage.setItem('userSession', JSON.stringify(newSessionData));

  // Log new vs returning user
  logUserType(newSessionData.userType, newSessionData.sessionNumber);

  return newSessionId;
};

/**
 * Check if current page load is a refresh
 * Uses Navigation Timing API and performance entries
 */
const isPageRefresh = () => {
  // Check navigation type
  const navEntry = performance.getEntriesByType('navigation')[0];

  if (navEntry && navEntry.type === 'reload') {
    return true;
  }

  // Fallback for older browsers
  if (performance.navigation && performance.navigation.type === 1) {
    return true;
  }

  return false;
};

/**
 * Track if this is first page view in session
 */
const isFirstPageViewInSession = () => {
  const hasSeenPage = sessionStorage.getItem('hasPageView');

  if (!hasSeenPage) {
    sessionStorage.setItem('hasPageView', 'true');
    return true;
  }

  return false;
};

// ----------------------------------------------------------------------------
// LOCATION DETECTION
// ----------------------------------------------------------------------------

/**
 * Get user's approximate location using IP geolocation
 * Returns cached location if available, otherwise fetches from API
 */
const getUserLocation = async () => {
  // Check if location is already cached (valid for 24 hours)
  const cachedLocation = localStorage.getItem('userLocation');
  const cacheTimestamp = localStorage.getItem('locationTimestamp');

  if (cachedLocation && cacheTimestamp) {
    const cacheAge = Date.now() - parseInt(cacheTimestamp);
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (cacheAge < twentyFourHours) {
      return JSON.parse(cachedLocation);
    }
  }

  try {
    // Try primary API - ipapi.co (free, no key needed)
    const response = await fetch('https://ipapi.co/json/');

    if (!response.ok) {
      throw new Error('Primary geolocation API failed');
    }

    const data = await response.json();

    const locationData = {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'Unknown',
      region: data.region || 'Unknown',
      city: data.city || 'Unknown',
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      timezone: data.timezone || 'Unknown',
      ip: data.ip || 'Unknown',
      isp: data.org || 'Unknown',
    };

    // Cache the location data
    localStorage.setItem('userLocation', JSON.stringify(locationData));
    localStorage.setItem('locationTimestamp', Date.now().toString());

    return locationData;
  } catch (error) {
    console.error('❌ Error fetching location:', error);

    // Fallback: try alternate free API
    try {
      const fallbackResponse = await fetch('https://ip-api.com/json/');
      const fallbackData = await fallbackResponse.json();

      const locationData = {
        country: fallbackData.country || 'Unknown',
        countryCode: fallbackData.countryCode || 'Unknown',
        region: fallbackData.regionName || 'Unknown',
        city: fallbackData.city || 'Unknown',
        latitude: fallbackData.lat || null,
        longitude: fallbackData.lon || null,
        timezone: fallbackData.timezone || 'Unknown',
        ip: fallbackData.query || 'Unknown',
        isp: fallbackData.isp || 'Unknown',
      };

      localStorage.setItem('userLocation', JSON.stringify(locationData));
      localStorage.setItem('locationTimestamp', Date.now().toString());

      return locationData;
    } catch (fallbackError) {
      console.error('❌ Fallback location API also failed:', fallbackError);

      // Return unknown location
      return {
        country: 'Unknown',
        countryCode: 'Unknown',
        region: 'Unknown',
        city: 'Unknown',
        latitude: null,
        longitude: null,
        timezone: 'Unknown',
        ip: 'Unknown',
        isp: 'Unknown',
      };
    }
  }
};

/**
 * Get formatted location string
 */
const getLocationString = async () => {
  const location = await getUserLocation();
  return `${location.city}, ${location.region}, ${location.country}`;
};

/**
 * Detect device type with high accuracy
 */
const getDeviceType = () => {
  const ua = navigator.userAgent;
  const width = window.innerWidth;

  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua);
  const isMobile = /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua);

  if (isTablet || (width >= 768 && width <= 1024)) {
    return 'tablet';
  } else if (isMobile || width < 768) {
    return 'mobile';
  } else {
    return 'desktop';
  }
};

/**
 * Get comprehensive device information
 */
const getDeviceInfo = () => {
  const deviceType = getDeviceType();
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    deviceType,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: width,
    viewportHeight: height,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${width}x${height}`,
    pixelRatio: window.devicePixelRatio || 1,
    orientation: width > height ? 'landscape' : 'portrait',
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };
};

// ----------------------------------------------------------------------------
// GOOGLE ANALYTICS 4 INITIALIZATION
// ----------------------------------------------------------------------------

/**
 * Initialize Google Analytics 4
 */
const initGA = () => {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', CONFIG.GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle page views manually
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  // Set user ID
  const userId = getAnonymousUserId();
  window.gtag('config', CONFIG.GA_MEASUREMENT_ID, {
    user_id: userId,
  });

  console.log('✅ Google Analytics initialized');
};

// ----------------------------------------------------------------------------
// EVENT TRACKING
// ----------------------------------------------------------------------------

/**
 * Log page view to GA4 with comprehensive tracking
 * Filters out page refreshes to maintain data accuracy
 */
const logPageView = async (path = window.location.pathname) => {
  if (!window.gtag) return;

  const isRefresh = isPageRefresh();
  const isFirstView = isFirstPageViewInSession();
  const deviceInfo = getDeviceInfo();
  const pageInfo = getPageInfo(path);
  const userType = getUserType();
  const sessionData = JSON.parse(sessionStorage.getItem('userSession') || '{}');

  // Get location (this is async but we'll send it separately)
  const location = await getUserLocation();

  // Don't log if it's a refresh (unless it's the first page in session)
  if (isRefresh && !isFirstView) {
    console.log('🔄 Page refresh detected - skipping duplicate page view');
    return;
  }

  // Send page view to GA4 with comprehensive data
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: pageInfo.title,
    page_location: pageInfo.url,
    page_route_name: pageInfo.routeName,

    // Device info
    device_type: deviceInfo.deviceType,
    viewport_width: deviceInfo.viewportWidth,
    viewport_height: deviceInfo.viewportHeight,
    screen_resolution: deviceInfo.screenResolution,

    // User info
    user_type: userType,
    session_number: sessionData.sessionNumber || 1,

    // Location info
    country: location.country,
    country_code: location.countryCode,
    region: location.region,
    city: location.city,
    timezone: location.timezone,

    // Metadata
    is_refresh: isRefresh,
    is_first_page_view: isFirstView,
  });

  // Also send as a custom event for better tracking
  window.gtag('event', 'route_visit', {
    route_name: pageInfo.routeName,
    page_path: path,
    page_title: pageInfo.title,
    device_type: deviceInfo.deviceType,
    user_type: userType,
    location: `${location.city}, ${location.region}, ${location.country}`,
  });

  console.log(`📄 Page: ${pageInfo.routeName} | ${pageInfo.title}`);
  console.log(`📍 Location: ${location.city}, ${location.region}, ${location.country}`);
  console.log(`👤 User: ${userType} | Device: ${deviceInfo.deviceType}`);
};


const getPageInfo = (path = window.location.pathname) => {
  const routeMap = {
    '/': { title: 'Home', routeName: 'homepage' },
    '/about': { title: 'About Us', routeName: 'about' },
    '/services': { title: 'Services', routeName: 'services' },
    '/contact': { title: 'Contact', routeName: 'contact' },
    '/jobs': { title: 'Jobs', routeName: 'jobs' },
    '/insights': { title: 'Insights', routeName: 'insights' },
    // Add more routes as needed
  };

  // Handle dynamic routes
  if (path.startsWith('/services/')) return { title: 'Service Details', routeName: 'service-details' };
  if (path.startsWith('/job/')) return { title: 'Job Details', routeName: 'job-details' };
  if (path.startsWith('/insights/')) return { title: 'Insight Details', routeName: 'insight-details' };

  return routeMap[path] || {
    title: document.title || 'Unknown Page',
    routeName: path.replace(/\//g, '-') || 'unknown',
    url: window.location.href
  };
};

/**
 * Log user type (new vs returning)
 */
const logUserType = (userType, sessionNumber) => {
  if (!window.gtag) return;

  window.gtag('event', 'user_type', {
    user_type: userType,
    session_number: sessionNumber,
    total_sessions: getUserSessionCount(),
  });

  // Set as user property for segmentation
  window.gtag('set', 'user_properties', {
    user_category: userType,
    total_sessions: getUserSessionCount(),
  });

  console.log(`👤 User Type: ${userType} | Session #${sessionNumber}`);
};

/**
 * Log device type as a one-time event per session
 */
const logDeviceType = async () => {
  if (!window.gtag) return null;

  const deviceInfo = getDeviceInfo();
  const location = await getUserLocation();
  const userType = getUserType();

  window.gtag('event', 'device_info', {
    device_type: deviceInfo.deviceType,
    screen_resolution: deviceInfo.screenResolution,
    viewport_size: deviceInfo.viewportSize,
    pixel_ratio: deviceInfo.pixelRatio,
    orientation: deviceInfo.orientation,
    touch_support: deviceInfo.touchSupport,
    country: location.country,
    city: location.city,
    user_type: userType,
  });

  window.gtag('set', 'user_properties', {
    device_category: deviceInfo.deviceType,
    user_country: location.country,
    user_city: location.city,
  });

  console.log(`📱 Device: ${deviceInfo.deviceType} | Resolution: ${deviceInfo.screenResolution}`);
  console.log(`📍 Location: ${location.city}, ${location.country}`);

  return { deviceInfo, location };
};

/**
 * Log time spent on page
 */
const logPageTime = (path, timeInSeconds) => {
  if (!window.gtag) return;

  // Filter out very short times (likely accidental)
  if (timeInSeconds < CONFIG.THRESHOLDS.MIN_TIME_TO_LOG) {
    return;
  }

  window.gtag('event', 'page_engagement', {
    page_path: path,
    engagement_time_seconds: timeInSeconds,
    device_type: getDeviceType(),
  });

  console.log(`⏱️  Engagement: ${timeInSeconds}s on ${path}`);
};

/**
 * Track orientation changes
 */
const trackOrientationChange = () => {
  const logOrientation = () => {
    if (!window.gtag) return;

    const deviceInfo = getDeviceInfo();

    window.gtag('event', 'orientation_change', {
      new_orientation: deviceInfo.orientation,
      device_type: deviceInfo.deviceType,
      viewport_size: deviceInfo.viewportSize,
    });

    console.log(`🔄 Orientation: ${deviceInfo.orientation}`);
  };

  window.addEventListener('orientationchange', logOrientation);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(logOrientation, 250);
  });
};

// ----------------------------------------------------------------------------
// BACKEND API COMMUNICATION
// ----------------------------------------------------------------------------

/**
 * Send time tracking data to backend
 */
const sendTimeDataToBackend = async (timeData) => {
  try {
    // Enhance time data with location if not already present
    if (!timeData.location) {
      const location = await getUserLocation();
      timeData.location = location;
      timeData.userType = getUserType();
      timeData.sessionNumber = getUserSessionCount();
    }

    const response = await fetch(CONFIG.API_ENDPOINTS.TIME_TRACKING, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timeData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Failed to send time data:', error);

    // Store failed requests for retry
    const failedRequests = JSON.parse(localStorage.getItem('failedTimeRequests') || '[]');
    failedRequests.push({
      data: timeData,
      timestamp: Date.now(),
      attempts: 1,
    });
    localStorage.setItem('failedTimeRequests', JSON.stringify(failedRequests));

    return null;
  }
};

/**
 * Retry failed time tracking requests
 */
const retryFailedTimeRequests = async () => {
  const failedRequests = JSON.parse(localStorage.getItem('failedTimeRequests') || '[]');

  if (failedRequests.length === 0) {
    return { retriedCount: 0, stillFailedCount: 0 };
  }

  let retriedCount = 0;
  let stillFailed = [];

  for (const request of failedRequests) {
    if (request.attempts >= CONFIG.RETRY.MAX_ATTEMPTS) {
      continue; // Skip if max attempts reached
    }

    const result = await sendTimeDataToBackend(request.data);

    if (result) {
      retriedCount++;
    } else {
      request.attempts++;
      stillFailed.push(request);
    }
  }

  localStorage.setItem('failedTimeRequests', JSON.stringify(stillFailed));

  return {
    retriedCount,
    stillFailedCount: stillFailed.length,
  };
};

// ----------------------------------------------------------------------------
// LOCAL STORAGE MANAGEMENT
// ----------------------------------------------------------------------------

/**
 * Store time data locally for backup
 */
const storeTimeDataLocally = (timeData) => {
  try {
    const timeDataArray = JSON.parse(localStorage.getItem('pageTimeData') || '[]');
    timeDataArray.push(timeData);

    if (timeDataArray.length > CONFIG.THRESHOLDS.MAX_LOCAL_STORAGE) {
      timeDataArray.splice(0, timeDataArray.length - CONFIG.THRESHOLDS.MAX_LOCAL_STORAGE);
    }

    localStorage.setItem('pageTimeData', JSON.stringify(timeDataArray));
  } catch (error) {
    console.error('❌ Error storing time data locally:', error);
  }
};

/**
 * Get all stored time data
 */
const getStoredTimeData = () => {
  try {
    return JSON.parse(localStorage.getItem('pageTimeData') || '[]');
  } catch (error) {
    console.error('❌ Error retrieving stored time data:', error);
    return [];
  }
};

/**
 * Clear all stored analytics data
 */
const clearStoredAnalyticsData = () => {
  localStorage.removeItem('pageTimeData');
  localStorage.removeItem('failedTimeRequests');
  console.log('🗑️  Analytics data cleared');
};

// ----------------------------------------------------------------------------
// S
// ----------------------------------------------------------------------------

export {
  // Configuration
  CONFIG,

  // Initialization
  initGA,

  // User & Session
  getAnonymousUserId,
  getSessionId,
  getUserType,
  getUserSessionCount,
  isPageRefresh,
  isFirstPageViewInSession,

  // Location
  getUserLocation,
  getLocationString,

  // Device Detection
  getDeviceType,
  getDeviceInfo,

  // Page Tracking
  getPageInfo,

  // Event Tracking
  logPageView,
  logDeviceType,
  logUserType,
  logPageTime,
  trackOrientationChange,

  // Backend Communication
  sendTimeDataToBackend,
  retryFailedTimeRequests,

  // Storage Management
  storeTimeDataLocally,
  getStoredTimeData,
  clearStoredAnalyticsData,
};