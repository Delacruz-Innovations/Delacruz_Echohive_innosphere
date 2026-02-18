# Blog Admin - Quick Reference

## 🎯 Network Error Component

### Usage
```javascript
import NetworkError from './components/NetworkError';

<NetworkError 
  onRetry={yourRetryFunction} 
  message="Custom error message" 
  orgId="innosphere|delacruz|echohive" 
/>
```

### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onRetry` | Function | ✅ Yes | - | Function to call when retry button clicked |
| `message` | String | ❌ No | Default message | Custom error message to display |
| `orgId` | String | ❌ No | 'innosphere' | Organization for theming |

---

## 📋 Top 5 Planned Features

| Feature | Priority | Impact | Benefit |
|---------|----------|--------|---------|
| **Auto-Save** | 🔴 HIGH | Prevents data loss | Save work automatically every 30s |
| **Image Optimization** | 🔴 HIGH | Faster loading | Compress images before upload |
| **SEO Tools** | 🔴 HIGH | Better rankings | Meta tags, keywords, preview |
| **Content Preview** | 🟡 MEDIUM | Better UX | See post before publishing |
| **Validation** | 🟡 MEDIUM | Fewer errors | Real-time field validation |

---

## 🚀 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run tests (when implemented)
npm test
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── NetworkError.jsx    ← Network error UI
│   ├── BlogForm.jsx         ← Blog creation/edit
│   ├── BlogList.jsx         ← Blog dashboard
│   └── OrgSelector.jsx      ← Organization picker
├── services/
│   ├── blogService.js       ← Innosphere service
│   ├── delacruzBlogService.js
│   ├── echohiveBlogService.js
│   └── serviceFactory.js    ← Service selector
└── firebase/
    ├── config.js            ← Innosphere config
    ├── delacruzConfig.js
    └── echohiveConfig.js
```

---

## 🎨 Organization Themes

| Org | Color | Icon | Terminology |
|-----|-------|------|-------------|
| **Innosphere** | Blue | i | Vault / Entry |
| **Delacruz** | Purple | D | Innovation Lab / Protocol |
| **EchoHive** | Emerald | E | Newsroom / Broadcast |

---

## 🐛 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Network error on load | Firebase offline | Check internet, retry |
| Can't upload image | File too large | Compress image first |
| Changes not saving | Network issue | Check connection, retry |
| Wrong org theme | Wrong orgId | Verify URL parameter |

---

## ✅ Testing Checklist

- [ ] Network error displays correctly
- [ ] Retry button works
- [ ] Theme matches organization
- [ ] Error message is clear
- [ ] Loading states work
- [ ] Data loads after retry

---

## 📞 Quick Links

- **Enhancement Plan**: `BLOG_FORM_ENHANCEMENT_PLAN.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`
- **Firebase Console**: https://console.firebase.google.com/

---

**Last Updated**: February 6, 2026
