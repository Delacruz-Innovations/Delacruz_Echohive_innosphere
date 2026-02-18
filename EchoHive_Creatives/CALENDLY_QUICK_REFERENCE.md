# Calendly Integration - Quick Reference

## 🚀 Quick Start

### Using CalendlyPopup in Your Component

```javascript
// 1. Import the component
import CalendlyPopup from '../components/CalendlyPopup';

// 2. Use it in your JSX
<CalendlyPopup 
  text="Book a Consultation"
  className="your-button-classes"
/>
```

---

## 📍 All CTA Locations

| Location | File | Line | CTA Text | Status |
|----------|------|------|----------|--------|
| Hero Section | `src/components/three/HeroCanvas.jsx` | ~207 | "Request a Quote" | ✅ Active |
| Mobile Menu | `src/components/layout/MenuOverlay.jsx` | ~53 | "Let's Create Together" | ✅ Active |
| CTA Section | `src/components/sections/CTA.jsx` | ~289 | "Get in Contact" | ✅ Active |
| Services Page | `src/pages/Services.jsx` | ~438 | "START CONSULTATION" | ✅ Active |
| Navbar | `src/components/Navbar.jsx` | ~196 | "CONTACT" | ✅ Active |

---

## 🎨 Common Use Cases

### Basic Button
```jsx
<CalendlyPopup text="Book Now" />
```

### Styled Button
```jsx
<CalendlyPopup 
  text="Schedule Call"
  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
/>
```

### With Icon
```jsx
<CalendlyPopup className="flex items-center gap-2">
  Book Consultation
  <ArrowRight className="w-4 h-4" />
</CalendlyPopup>
```

### With Animation
```jsx
<motion.div whileHover={{ scale: 1.05 }}>
  <CalendlyPopup text="Get Started" />
</motion.div>
```

---

## 🔍 Checking If It Works

### 1. Visual Check
- Click any booking CTA
- Calendly popup should appear
- No page redirect should occur

### 2. Console Check
- Open browser DevTools (F12)
- Go to Console tab
- Complete a test booking
- Look for: `"Calendly booking completed:"`

### 3. Analytics Check
- Complete a test booking
- Check Google Analytics Real-Time events
- Look for "conversion" event with "Calendly" category

---

## 🐛 Troubleshooting

### Popup Not Opening?
```javascript
// Check if root element exists
console.log(document.getElementById("root")); // Should not be null
```

### Tracking Not Working?
```javascript
// Check if analytics loaded
console.log(window.gtag);      // Should be a function
console.log(window.fbq);       // Should be a function
console.log(window.dataLayer); // Should be an array
```

### Styling Issues?
- Verify className is passed correctly
- Check if Tailwind classes are available
- Inspect element in DevTools

---

## 📊 Analytics Events

### What Gets Tracked?
- ✅ Booking completions
- ✅ Event type (strategy_call)
- ✅ Timestamp
- ✅ Invitee data (via Calendly)

### Where to View?
- **Google Analytics**: Conversions > Events > "conversion"
- **Facebook Pixel**: Events Manager > "Schedule"
- **GTM**: Preview Mode > dataLayer > "calendly_booking_completed"

---

## 🔧 Customization

### Change Calendly URL
Edit `src/components/CalendlyPopup.jsx`:
```javascript
url="https://calendly.com/your-username/your-event"
```

### Add Prefill Data
```jsx
<CalendlyPopup 
  text="Book Now"
  // Note: Requires component modification for prefill support
/>
```

### Multiple Event Types
Create separate components or add `calendlyUrl` prop:
```jsx
<CalendlyPopup 
  text="Book Demo"
  calendlyUrl="https://calendly.com/innosphere/demo"
/>
```

---

## ✅ Pre-Launch Checklist

- [ ] Test all 5 CTA locations
- [ ] Verify popup opens on each
- [ ] Complete test booking
- [ ] Check console for tracking event
- [ ] Verify analytics received event
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Check in Chrome
- [ ] Check in Firefox
- [ ] Check in Safari

---

## 📞 Support

### Issues?
1. Check console for errors
2. Verify Calendly URL is correct
3. Ensure root element exists
4. Check analytics scripts loaded

### Need Help?
- Review: `CALENDLY_TECHNICAL_DOCS.md`
- Check: `CALENDLY_INTEGRATION_SUMMARY.md`
- Contact: Development Team

---

## 🎯 Key Metrics to Monitor

| Metric | Where to Find | Target |
|--------|---------------|--------|
| Popup Opens | Custom Event | Track manually |
| Bookings Completed | Calendly Dashboard | Monitor weekly |
| Conversion Rate | GA4 | Optimize over time |
| Booking Sources | UTM Parameters | Identify best CTAs |

---

## 🚨 Important Notes

- ✅ **DO**: Use CalendlyPopup for sales/consultation CTAs
- ❌ **DON'T**: Replace career application forms
- ❌ **DON'T**: Replace support contact forms
- ✅ **DO**: Preserve original button styling
- ✅ **DO**: Test after any changes

---

## 📱 Mobile Considerations

- Popup is fully responsive
- Works on all screen sizes
- Touch-friendly interface
- Auto-adjusts for viewport

---

## 🔄 Update Process

### To Update CTA Text:
```jsx
// Change the text prop
<CalendlyPopup text="New CTA Text" />
```

### To Update Styling:
```jsx
// Modify className prop
<CalendlyPopup 
  text="Book Now"
  className="new-classes-here"
/>
```

### To Add New CTA:
1. Import CalendlyPopup
2. Add component where needed
3. Style appropriately
4. Test functionality

---

**Quick Reference Version**: 1.0
**Last Updated**: January 23, 2026
