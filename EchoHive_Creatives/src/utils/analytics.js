import ReactGA from "react-ga4";

// Robustly get the GA4 instance (handles various bundler interop scenarios)
const getGA = () => {
    if (typeof ReactGA.initialize === 'function') return ReactGA;
    if (ReactGA.default && typeof ReactGA.default.initialize === 'function') return ReactGA.default;
    // If imported as * as ReactGA, it might be in ReactGA.default.default
    if (ReactGA.default && ReactGA.default.default && typeof ReactGA.default.default.initialize === 'function') return ReactGA.default.default;
    return ReactGA;
};

const isDevelopment = import.meta.env.MODE === 'development';

// Storage keys
const STORAGE_KEYS = {
    FIRST_VISIT: 'ga_first_visit',
    PAGE_COUNT: 'ga_page_count',
    SESSION_START: 'ga_session_start'
};

// Initialize GA4
export const initGA = () => {
    try {
        const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

        if (!GA_MEASUREMENT_ID) {
            console.warn("GA4 Measurement ID missing. Skipping initialization.");
            return;
        }

        getGA().initialize(GA_MEASUREMENT_ID, {
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
            getGA().event({
                category: 'User Journey',
                action: 'First Visit',
                label: 'New User',
                nonInteraction: false
            });

            if (isDevelopment) {
                console.log('✓ First Visit tracked:', timestamp);
            }
        }
    } catch (error) {
        console.error("Error tracking first visit:", error);
    }
};

// Get page title based on route
export const getPageTitle = (pathname) => {
    const routes = {
        '/': 'Home',
        '/contact': 'Contact Us',
        '/careers': 'Careers',
        '/about': 'About Us',
        '/locations': 'Our Locations',
        '/services': 'Our Services',
        '/work': 'Our Work',
        '/news': 'Newsroom',
        '/privacy': 'Privacy Statement',
        '/terms': 'Terms & Conditions',
        '/allcareers': 'All Careers'
    };

    if (routes[pathname]) return routes[pathname];

    // Handle dynamic routes
    if (pathname.startsWith('/services/')) return 'Service Details';
    if (pathname.startsWith('/work/')) return 'Case Study Detail';
    if (pathname.startsWith('/news/')) return 'News Details';
    if (pathname.startsWith('/allcareers/')) return 'Career Details';

    return '404 Not Found';
};

// Log page views
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
        getGA().send({
            hitType: "pageview",
            page: pagePath,
            title: pageTitle
        });

        // Track pages viewed milestone
        if ([1, 5, 10, 20, 50].includes(newCount)) {
            getGA().event({
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

        getGA().event(eventParams);

        if (isDevelopment) {
            console.log(`✓ Event logged: ${category} - ${action}${label ? ` - ${label}` : ''}${value !== null ? ` (${value})` : ''}`);
        }
    } catch (error) {
        console.error("Error logging event:", error);
    }
};

// Specific event trackers
export const trackButtonClick = (buttonName) => logEvent("Button", "Click", buttonName);
export const trackFormSubmit = (formName, success = true) => logEvent("Form", success ? "Submit" : "Submit Failed", formName);
export const trackOutboundLink = (url) => logEvent("Outbound Link", "Click", url);
export const trackCTAConversion = (ctaName, ctaLocation) => logEvent('CTA', 'Conversion', `${ctaName} - ${ctaLocation}`);

export default {
    initGA,
    logPageView,
    logEvent,
    getPageTitle,
    trackButtonClick,
    trackFormSubmit,
    trackOutboundLink,
    trackCTAConversion
};
