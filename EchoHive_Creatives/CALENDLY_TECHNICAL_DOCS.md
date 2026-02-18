# Calendly Integration - Technical Documentation

## 🏗️ Architecture Overview

### Component Hierarchy
```
App.jsx (Root)
│
├── CalendlyTracker (Global Event Listener)
│   └── Listens for: calendly.event_scheduled
│
└── CalendlyPopup (Reusable Component)
    ├── Used in: HeroCanvas
    ├── Used in: MenuOverlay
    ├── Used in: CTA Section
    ├── Used in: Services Page
    └── Used in: Navbar
```

---

## 📦 Dependencies

### Package Installation
```bash
npm install react-calendly
```

### Import Statements
```javascript
// In components using Calendly
import CalendlyPopup from './components/CalendlyPopup';

// In App.jsx
import CalendlyTracker from './components/CalendlyTracker';

// From react-calendly
import { PopupButton } from "react-calendly";
```

---

## 🧩 Component API

### CalendlyPopup Component

**File**: `src/components/CalendlyPopup.jsx`

#### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `text` | string | `"Book a Free Consultation"` | No | Button text content |
| `className` | string | `""` | No | CSS classes for styling |
| `children` | ReactNode | `null` | No | Custom button content (overrides text) |

#### Usage Examples

**Basic Usage**:
```jsx
<CalendlyPopup text="Book Now" />
```

**With Custom Styling**:
```jsx
<CalendlyPopup 
  text="Schedule a Call"
  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700"
/>
```

**With Custom Children**:
```jsx
<CalendlyPopup className="custom-button">
  <span>Book Consultation</span>
  <ArrowRight className="ml-2" />
</CalendlyPopup>
```

**With Framer Motion**:
```jsx
<motion.div whileHover={{ scale: 1.05 }}>
  <CalendlyPopup 
    text="Get Started"
    className="btn-primary"
  />
</motion.div>
```

#### Component Source
```javascript
import React from "react";
import { PopupButton } from "react-calendly";

const CalendlyPopup = ({ 
  text = "Book a Free Consultation", 
  className = "",
  children 
}) => {
  return (
    <PopupButton
      url="https://calendly.com/innosphere/strategy-call"
      rootElement={document.getElementById("root")}
      text={text}
      className={className}
    >
      {children || text}
    </PopupButton>
  );
};

export default CalendlyPopup;
```

---

### CalendlyTracker Component

**File**: `src/components/CalendlyTracker.jsx`

#### Props
None - This is a global event listener component.

#### Functionality
- Listens for `message` events from Calendly iframe
- Filters for `calendly.event_scheduled` events
- Sends conversion data to analytics platforms
- Logs booking data to console

#### Analytics Integration

**Google Analytics (gtag)**:
```javascript
if (window.gtag) {
  window.gtag("event", "conversion", {
    event_category: "Calendly",
    event_label: "Strategy Call Booked",
  });
}
```

**Facebook Pixel (fbq)**:
```javascript
if (window.fbq) {
  window.fbq("track", "Schedule", {
    content_name: "Strategy Call",
  });
}
```

**Google Tag Manager (dataLayer)**:
```javascript
if (window.dataLayer) {
  window.dataLayer.push({
    event: "calendly_booking_completed",
    calendly_event_type: "strategy_call",
  });
}
```

#### Component Source
```javascript
import { useEffect } from "react";

const CalendlyTracker = () => {
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.event === "calendly.event_scheduled") {
        console.log("Calendly booking completed:", e.data.payload);

        // Google Analytics
        if (window.gtag) {
          window.gtag("event", "conversion", {
            event_category: "Calendly",
            event_label: "Strategy Call Booked",
          });
        }

        // Facebook Pixel
        if (window.fbq) {
          window.fbq("track", "Schedule", {
            content_name: "Strategy Call",
          });
        }

        // Google Tag Manager
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "calendly_booking_completed",
            calendly_event_type: "strategy_call",
          });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
};

export default CalendlyTracker;
```

---

## 🔧 Implementation Guide

### Step 1: Install Package
```bash
npm install react-calendly
```

### Step 2: Create CalendlyPopup Component
Create `src/components/CalendlyPopup.jsx` with the component code above.

### Step 3: Create CalendlyTracker Component
Create `src/components/CalendlyTracker.jsx` with the component code above.

### Step 4: Add Tracker to App.jsx
```javascript
import CalendlyTracker from './components/CalendlyTracker';

// Inside AppContent component
return (
  <div className="min-h-screen bg-black">
    <BeeOverlay />
    <CalendlyTracker />  {/* Add here */}
    <ScrollToTop />
    <Header />
    {/* ... rest of app */}
  </div>
);
```

### Step 5: Replace CTAs
Import and use CalendlyPopup in place of contact links:

**Before**:
```jsx
<Link to="/contact">
  <button>Book a Call</button>
</Link>
```

**After**:
```jsx
import CalendlyPopup from '../components/CalendlyPopup';

<CalendlyPopup 
  text="Book a Call"
  className="button-class"
/>
```

---

## 🎨 Styling Guide

### Preserving Existing Styles

When replacing CTAs, copy the exact `className` from the original element:

**Example**:
```jsx
// Original
<a 
  href="#contact"
  className="group px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full"
>
  Request a Quote
</a>

// Replacement
<CalendlyPopup 
  text="Request a Quote"
  className="group px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full"
/>
```

### Working with Framer Motion

Wrap CalendlyPopup in a motion.div:

```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="w-full sm:w-auto"
>
  <CalendlyPopup 
    text="Book Now"
    className="btn-primary w-full"
  />
</motion.div>
```

### Custom Icons

Use children prop for custom content:

```jsx
import { ArrowRight } from 'lucide-react';

<CalendlyPopup className="flex items-center gap-2">
  Request a Quote
  <ArrowRight className="w-5 h-5" />
</CalendlyPopup>
```

---

## 🔍 Debugging

### Console Logging

The CalendlyTracker logs all booking events:

```javascript
console.log("Calendly booking completed:", e.data.payload);
```

**Expected Output**:
```javascript
{
  event: "calendly.event_scheduled",
  payload: {
    event: {
      uri: "https://api.calendly.com/scheduled_events/...",
      // ... other event data
    },
    invitee: {
      uri: "https://api.calendly.com/scheduled_events/.../invitees/...",
      // ... invitee data
    }
  }
}
```

### Common Issues

**Issue**: Popup doesn't open
- **Check**: `document.getElementById("root")` exists
- **Solution**: Ensure root element has id="root" in index.html

**Issue**: Tracking not firing
- **Check**: Analytics scripts loaded before CalendlyTracker
- **Solution**: Add analytics scripts to index.html head

**Issue**: Styling not applied
- **Check**: className prop is passed correctly
- **Solution**: Verify Tailwind/CSS classes are available

---

## 📊 Analytics Setup

### Google Analytics (gtag.js)

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel

Add to `index.html`:
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### Google Tag Manager

Add to `index.html`:
```html
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

---

## 🚀 Advanced Customization

### Custom Calendly URL

To use different Calendly event types:

```javascript
// In CalendlyPopup.jsx
const CalendlyPopup = ({ 
  text = "Book a Free Consultation", 
  className = "",
  children,
  calendlyUrl = "https://calendly.com/innosphere/strategy-call" // Add this prop
}) => {
  return (
    <PopupButton
      url={calendlyUrl}  // Use prop instead of hardcoded
      rootElement={document.getElementById("root")}
      text={text}
      className={className}
    >
      {children || text}
    </PopupButton>
  );
};
```

**Usage**:
```jsx
<CalendlyPopup 
  text="Book Demo"
  calendlyUrl="https://calendly.com/innosphere/product-demo"
/>
```

### Prefill User Data

```javascript
const CalendlyPopup = ({ 
  text, 
  className, 
  children,
  prefill = {} // Add prefill prop
}) => {
  return (
    <PopupButton
      url="https://calendly.com/innosphere/strategy-call"
      rootElement={document.getElementById("root")}
      text={text}
      className={className}
      prefill={prefill}  // Pass to PopupButton
    >
      {children || text}
    </PopupButton>
  );
};
```

**Usage**:
```jsx
<CalendlyPopup 
  text="Book Now"
  prefill={{
    name: "John Doe",
    email: "john@example.com",
    customAnswers: {
      a1: "Enterprise Plan"
    }
  }}
/>
```

### UTM Tracking

```javascript
const CalendlyPopup = ({ 
  text, 
  className, 
  children,
  utm = {} // Add UTM prop
}) => {
  return (
    <PopupButton
      url="https://calendly.com/innosphere/strategy-call"
      rootElement={document.getElementById("root")}
      text={text}
      className={className}
      utm={utm}  // Pass to PopupButton
    >
      {children || text}
    </PopupButton>
  );
};
```

**Usage**:
```jsx
<CalendlyPopup 
  text="Book Now"
  utm={{
    utmCampaign: "spring_sale",
    utmSource: "website",
    utmMedium: "hero_cta"
  }}
/>
```

---

## 🧪 Testing Checklist

### Manual Testing

- [ ] Click CTA - popup opens
- [ ] Fill booking form
- [ ] Complete booking
- [ ] Check console for event log
- [ ] Verify analytics fired
- [ ] Test on mobile
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari

### Automated Testing

```javascript
// Example test with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import CalendlyPopup from './CalendlyPopup';

test('renders calendly popup button', () => {
  render(<CalendlyPopup text="Book Now" />);
  const button = screen.getByText('Book Now');
  expect(button).toBeInTheDocument();
});

test('applies custom className', () => {
  render(<CalendlyPopup text="Book Now" className="custom-class" />);
  const button = screen.getByText('Book Now');
  expect(button).toHaveClass('custom-class');
});
```

---

## 📝 Maintenance Notes

### Updating Calendly URL

To change the booking URL globally:
1. Open `src/components/CalendlyPopup.jsx`
2. Update the `url` prop value
3. Save and rebuild

### Adding New CTAs

1. Import CalendlyPopup
2. Replace existing CTA element
3. Copy className from original
4. Set appropriate text prop
5. Test functionality

### Removing Integration

1. Uninstall package: `npm uninstall react-calendly`
2. Remove CalendlyTracker from App.jsx
3. Delete `src/components/CalendlyPopup.jsx`
4. Delete `src/components/CalendlyTracker.jsx`
5. Restore original CTA elements

---

## 🔐 Security Considerations

- ✅ No sensitive data in client-side code
- ✅ Calendly handles all PII securely
- ✅ HTTPS enforced for all connections
- ✅ No API keys exposed
- ✅ Event listener validates message source

---

## 📚 Resources

- [Calendly Developer Docs](https://developer.calendly.com/)
- [react-calendly GitHub](https://github.com/tcampb/react-calendly)
- [Calendly Embed Options](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview)
- [Calendly Event Types](https://help.calendly.com/hc/en-us/articles/223195488-Event-types-overview)

---

**Last Updated**: January 23, 2026
**Version**: 1.0.0
**Maintainer**: Development Team
