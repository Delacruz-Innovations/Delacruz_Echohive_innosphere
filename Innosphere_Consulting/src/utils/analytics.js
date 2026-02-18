// src/utils/analytics.js
import ReactGA from "react-ga4";

const isDevelopment = process.env.NODE_ENV === 'development';

// Storage keys
const STORAGE_KEYS = {
  FIRST_VISIT: 'ga_first_visit',
  PAGE_COUNT: 'ga_page_count',
  SESSION_START: 'ga_session_start'
};

// Initialize GA4
export const initGA = () => {
  try {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-JJ7L25T8TX";

    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        debug_mode: isDevelopment,
      },
      gtagOptions: {
        send_page_view: false // We'll handle page views manually
      }
    });

    // Track first visit
    trackFirstVisit();

    if (isDevelopment) {
      console.log("GA4 Initialized successfully with ID:", GA_MEASUREMENT_ID);
    }
  } catch (error) {
    console.error("Failed to initialize GA4:", error);
  }
};

// Track first visit
const trackFirstVisit = () => {
  try {
    const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);

    if (!firstVisit) {
      // This is the user's first visit
      const timestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, timestamp);
      localStorage.setItem(STORAGE_KEYS.PAGE_COUNT, '0');

      // Send first visit event
      ReactGA.event({
        category: 'User Journey',
        action: 'First Visit',
        label: 'New User',
        nonInteraction: false
      });

      if (isDevelopment) {
        console.log('✓ First Visit tracked:', timestamp);
      }
    } else {
      // Returning user
      const daysSinceFirstVisit = Math.floor(
        (Date.now() - new Date(firstVisit).getTime()) / (1000 * 60 * 60 * 24)
      );

      if (isDevelopment) {
        console.log(`Returning user - First visited ${daysSinceFirstVisit} days ago`);
      }
    }
  } catch (error) {
    console.error("Error tracking first visit:", error);
  }
};

// Get user stats
export const getUserStats = () => {
  try {
    const firstVisit = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
    const pageCount = parseInt(localStorage.getItem(STORAGE_KEYS.PAGE_COUNT) || '0');

    return {
      isFirstVisit: !firstVisit,
      firstVisitDate: firstVisit,
      totalPagesViewed: pageCount
    };
  } catch (error) {
    return {
      isFirstVisit: true,
      firstVisitDate: null,
      totalPagesViewed: 0
    };
  }
};

// Helper function to get page title from pathname
const getPageTitle = (pathname) => {
  const routes = {
    '/': 'Home',
    '/about': 'About Us',
    '/solutions': 'Solutions',
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

  if (routes[pathname]) return routes[pathname];
  if (pathname.startsWith('/solution/')) return 'Solution Detail';
  if (pathname.startsWith('/cases/')) return 'Case Study Detail';
  if (pathname.startsWith('/insights/')) return 'Insight Detail';
  return '404 Not Found';
};

// Log page views
// Log page views (GA4 optimized)
export const logPageView = (path, title) => {
  try {
    const pagePath = path || window.location.pathname + window.location.search;
    const pageTitle = title || getPageTitle(window.location.pathname);

    // Increment page count
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.PAGE_COUNT) || '0');
    const newCount = currentCount + 1;
    localStorage.setItem(STORAGE_KEYS.PAGE_COUNT, newCount.toString());

    // Use gtag for GA4
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
        page_count: newCount
      });
    }

    // Fallback to ReactGA
    ReactGA.send({
      hitType: "pageview",
      page: pagePath,
      title: pageTitle
    });

    // Track pages viewed milestone
    if ([1, 5, 10, 20, 50].includes(newCount)) {
      ReactGA.event({
        category: 'User Journey',
        action: 'Pages Viewed Milestone',
        label: `${newCount} Pages`,
        value: newCount
      });
    }

    if (isDevelopment) {
      console.log(`✓ Page view logged: ${pagePath} - ${pageTitle} (Total: ${newCount} pages)`);
    }
  } catch (error) {
    console.error("Error logging page view:", error);
  }
};

// Track custom events
export const logEvent = (category, action, label = null, value = null) => {
  try {
    const eventParams = {
      category: category,
      action: action,
    };

    if (label) eventParams.label = label;
    if (value !== null) eventParams.value = value;

    ReactGA.event(eventParams);

    if (isDevelopment) {
      console.log(`✓ Event logged: ${category} - ${action}${label ? ` - ${label}` : ''}${value !== null ? ` (${value})` : ''}`);
    }
  } catch (error) {
    console.error("Error logging event:", error);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  logEvent("Button", "Click", buttonName);
};

// Track form submissions
export const trackFormSubmit = (formName, success = true) => {
  logEvent("Form", success ? "Submit" : "Submit Failed", formName);
};

// Track external link clicks
export const trackOutboundLink = (url) => {
  logEvent("Outbound Link", "Click", url);
};

// Track downloads
export const trackDownload = (fileName) => {
  logEvent("Download", "Click", fileName);
};

// ============================================
// KEY EVENTS TRACKING
// ============================================

// Track key conversion events
export const trackKeyEvent = (eventName, eventParams = {}) => {
  try {
    ReactGA.event({
      category: 'Key Events',
      action: eventName,
      label: eventParams.label || null,
      value: eventParams.value || null,
      ...eventParams
    });

    if (isDevelopment) {
      console.log(`✓ Key Event: ${eventName}`, eventParams);
    }
  } catch (error) {
    console.error("Error tracking key event:", error);
  }
};

// Specific key events
export const trackFormSubmission = (formName, formData = {}) => {
  trackKeyEvent('Form Submission', {
    label: formName,
    form_name: formName,
    ...formData
  });
};

export const trackConsultationRequest = (details = {}) => {
  trackKeyEvent('Consultation Request', {
    label: 'Consultation Form',
    ...details
  });
};

export const trackContactSubmission = (contactType = 'General') => {
  trackKeyEvent('Contact Submission', {
    label: contactType,
    contact_type: contactType
  });
};

export const trackNewsletterSignup = (email = null) => {
  trackKeyEvent('Newsletter Signup', {
    label: 'Newsletter',
    has_email: !!email
  });
};

export const trackCTAConversion = (ctaName, ctaLocation) => {
  trackKeyEvent('CTA Conversion', {
    label: `${ctaName} - ${ctaLocation}`,
    cta_name: ctaName,
    cta_location: ctaLocation
  });
};

export const trackResourceDownload = (resourceName, resourceType) => {
  trackKeyEvent('Resource Download', {
    label: resourceName,
    resource_name: resourceName,
    resource_type: resourceType
  });
};

export const trackPhoneClick = () => {
  trackKeyEvent('Phone Click', {
    label: 'Phone Number Clicked'
  });
};

export const trackEmailClick = () => {
  trackKeyEvent('Email Click', {
    label: 'Email Address Clicked'
  });
};

export const trackSocialEngagement = (platform, action = 'Click') => {
  trackKeyEvent('Social Engagement', {
    label: platform,
    platform: platform,
    action: action
  });
};

export const trackCaseStudyView = (caseStudyName) => {
  trackKeyEvent('Case Study View', {
    label: caseStudyName,
    case_study: caseStudyName
  });
};

export const trackInsightView = (insightTitle) => {
  trackKeyEvent('Insight View', {
    label: insightTitle,
    insight: insightTitle
  });
};

export const trackSolutionView = (solutionName) => {
  trackKeyEvent('Solution View', {
    label: solutionName,
    solution: solutionName
  });
};

export const trackVideoEngagement = (videoTitle, action, progress = null) => {
  trackKeyEvent('Video Engagement', {
    label: `${videoTitle} - ${action}`,
    video_title: videoTitle,
    video_action: action,
    video_progress: progress
  });
};

export const trackChatbotInteraction = (action, message = null) => {
  trackKeyEvent('Chatbot Interaction', {
    label: action,
    chatbot_action: action,
    message_preview: message ? message.substring(0, 50) : null
  });
};

// ============================================
// END KEY EVENTS TRACKING
// ============================================

// Track scroll depth
export const trackScrollDepth = (depth, pageTitle) => {
  logEvent("Scroll", `${depth}% Depth`, pageTitle);
};

// Track section views
export const trackSectionView = (sectionName, pageTitle) => {
  logEvent("Section View", "Visible", `${pageTitle} - ${sectionName}`);
};

// Track time on page (in seconds)
export const trackTimeOnPage = (seconds, pageTitle) => {
  logEvent("Engagement", "Time on Page", pageTitle, seconds);
};

// Track accordion/collapsible interactions
export const trackAccordionToggle = (accordionName, isExpanded) => {
  logEvent("Accordion", isExpanded ? "Expand" : "Collapse", accordionName);
};

// Track CTA (Call to Action) clicks
export const trackCTAClick = (ctaName, ctaLocation) => {
  logEvent("CTA", "Click", `${ctaName} - ${ctaLocation}`);
};

// Track video interactions
export const trackVideoPlay = (videoTitle) => {
  logEvent("Video", "Play", videoTitle);
};

export const trackVideoComplete = (videoTitle) => {
  logEvent("Video", "Complete", videoTitle);
};

// Track search
export const trackSearch = (searchTerm, resultsCount = null) => {
  logEvent("Search", "Query", searchTerm, resultsCount);
};

// Track social media clicks
export const trackSocialClick = (platform, action = "Click") => {
  logEvent("Social", action, platform);
};

// Track errors
export const trackError = (errorMessage, errorType = "general") => {
  logEvent("Error", errorType, errorMessage);
};

// Track form interactions
export const trackFormStart = (formName) => {
  logEvent("Form", "Start", formName);
};

export const trackFormFieldInteraction = (formName, fieldName) => {
  logEvent("Form", "Field Interaction", `${formName} - ${fieldName}`);
};

// Track navigation
export const trackNavigation = (linkText, destination) => {
  logEvent("Navigation", "Click", `${linkText} -> ${destination}`);
};

// Scroll tracking utility
export const setupScrollTracking = (pageTitle, milestones = [25, 50, 75, 100]) => {
  let maxScroll = 0;
  const tracked = new Set();

  const handleScroll = () => {
    try {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          trackScrollDepth(milestone, pageTitle);
        }
      });
    } catch (error) {
      console.error("Scroll tracking error:", error);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

// Section visibility tracking utility
export const setupSectionTracking = (pageTitle) => {
  try {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              trackSectionView(sectionName, pageTitle);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  } catch (error) {
    console.error("Section tracking setup error:", error);
    return () => { };
  }
};

// Time on page tracking utility
export const setupTimeTracking = (pageTitle) => {
  const startTime = Date.now();

  return () => {
    try {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 0) {
        trackTimeOnPage(timeSpent, pageTitle);
      }
    } catch (error) {
      console.error("Time tracking error:", error);
    }
  };
};

export default {
  initGA,
  logPageView,
  logEvent,
  getUserStats,
  trackButtonClick,
  trackFormSubmit,
  trackOutboundLink,
  trackDownload,
  trackScrollDepth,
  trackSectionView,
  trackTimeOnPage,
  trackAccordionToggle,
  trackCTAClick,
  trackVideoPlay,
  trackVideoComplete,
  trackSearch,
  trackSocialClick,
  trackError,
  trackFormStart,
  trackFormFieldInteraction,
  trackNavigation,
  setupScrollTracking,
  setupSectionTracking,
  setupTimeTracking,
  // Key Events
  trackKeyEvent,
  trackFormSubmission,
  trackConsultationRequest,
  trackContactSubmission,
  trackNewsletterSignup,
  trackCTAConversion,
  trackResourceDownload,
  trackPhoneClick,
  trackEmailClick,
  trackSocialEngagement,
  trackCaseStudyView,
  trackInsightView,
  trackSolutionView,
  trackVideoEngagement,
  trackChatbotInteraction,
};