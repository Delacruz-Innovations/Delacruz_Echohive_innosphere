# Auto-Save Integration - Step-by-Step Guide

**Date**: February 6, 2026  
**Status**: ✅ **READY TO INTEGRATE**  
**File**: `BlogForm.jsx`

---

## ✅ Step 1: Imports (COMPLETE)

The following imports have been added to `BlogForm.jsx`:

```javascript
import { useAutoSave } from '../hooks/useAutoSave';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SaveIndicator from './SaveIndicator';
import DraftRecoveryPrompt from './DraftRecoveryPrompt';
```

---

## ⏳ Step 2: Add Auto-Save State (MANUAL INTEGRATION NEEDED)

**Location**: After line 140 (after `formData` state declaration)

**Add this code**:

```javascript
// Auto-save setup
const draftKey = `blog-draft-${orgId}-${id || 'new'}`;
const [showRecoveryPrompt, setShowRecoveryPrompt] = useState(false);
const [savedDraft, , removeSavedDraft] = useLocalStorage(draftKey, null);

// Auto-save hook
const { lastSaved, isSaving, forceSave, clearDraft } = useAutoSave({
    data: formData,
    key: draftKey,
    onSave: async (data) => {
        // Only auto-save drafts, not published posts
        if (data.status === 'published') return;
        
        // For existing posts, update Firebase
        if (id) {
            await blogService.updateBlog(id, data, 'auto-save-user');
        }
        // For new posts, only save to localStorage (don't create Firebase document)
    },
    enabled: true,
    localInterval: 30000,   // 30 seconds
    remoteInterval: 120000  // 2 minutes
});
```

---

## ⏳ Step 3: Add Draft Recovery Check (MANUAL INTEGRATION NEEDED)

**Location**: After the existing `useEffect` for `loadBlog` (around line 147)

**Add this code**:

```javascript
// Check for saved draft on mount
useEffect(() => {
    if (!id && savedDraft) {
        // New post with saved draft
        setShowRecoveryPrompt(true);
    }
}, [id, savedDraft]);
```

---

## ⏳ Step 4: Add Recovery Functions (MANUAL INTEGRATION NEEDED)

**Location**: After the `loadBlog` function (around line 163)

**Add these functions**:

```javascript
const handleRecoverDraft = () => {
    if (savedDraft) {
        setFormData(savedDraft);
        setShowRecoveryPrompt(false);
    }
};

const handleDiscardDraft = () => {
    clearDraft();
    removeSavedDraft();
    setShowRecoveryPrompt(false);
};
```

---

## ⏳ Step 5: Update handleSave Function (MANUAL INTEGRATION NEEDED)

**Location**: Inside the `handleSave` function, after successful save (around line 442)

**Find this code**:

```javascript
alert(`${isDelacruz ? 'Innovation' : isEchoHive ? 'News' : 'Blog'} saved successfully!`);
navigate(`/${orgId}/dashboard`);
```

**Add BEFORE navigate**:

```javascript
// Clear auto-save draft after successful save
clearDraft();
```

**Final code should look like**:

```javascript
alert(`${isDelacruz ? 'Innovation' : isEchoHive ? 'News' : 'Blog'} saved successfully!`);
// Clear auto-save draft after successful save
clearDraft();
navigate(`/${orgId}/dashboard`);
```

---

## ⏳ Step 6: Add UI Components to JSX (MANUAL INTEGRATION NEEDED)

**Location**: In the return statement, after line 458 (after the opening div)

**Find this code**:

```javascript
return (
    <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
```

**Add AFTER the opening div and BEFORE the Header comment**:

```javascript
return (
    <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Recovery Prompt */}
        {showRecoveryPrompt && (
            <DraftRecoveryPrompt
                onRecover={handleRecoverDraft}
                onDiscard={handleDiscardDraft}
                draftDate={savedDraft?.dates?.updatedAt}
                orgId={orgId}
            />
        )}
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:flex-items-end justify-between mb-12 border-b border-gray-100 pb-8">
```

---

## ⏳ Step 7: Add Save Indicator to Header (MANUAL INTEGRATION NEEDED)

**Location**: In the header section, around line 468

**Find this code**:

```javascript
<div className="mt-6 md:mt-0 flex items-center gap-3">
    <button
        onClick={() => setShowPreview(true)}
```

**Add BEFORE the buttons**:

```javascript
<div className="mt-6 md:mt-0 flex items-center gap-3">
    {/* Save Indicator */}
    <SaveIndicator 
        lastSaved={lastSaved}
        isSaving={isSaving}
        orgId={orgId}
    />
    
    <button
        onClick={() => setShowPreview(true)}
```

---

## 📋 Complete Integration Checklist

- [x] Step 1: Imports added ✅
- [ ] Step 2: Add auto-save state
- [ ] Step 3: Add draft recovery check
- [ ] Step 4: Add recovery functions
- [ ] Step 5: Update handleSave function
- [ ] Step 6: Add recovery prompt to JSX
- [ ] Step 7: Add save indicator to header

---

## 🧪 Testing After Integration

1. **Test Auto-Save**:
   - Create new post
   - Type some content
   - Wait 30 seconds
   - Check localStorage (DevTools → Application → Local Storage)
   - Should see `blog-draft-innosphere-new` (or similar)

2. **Test Recovery**:
   - Create new post
   - Type content
   - Wait for auto-save
   - Close tab
   - Reopen create page
   - Should see recovery prompt

3. **Test Discard**:
   - See recovery prompt
   - Click "Discard"
   - localStorage should be cleared

4. **Test Recover**:
   - See recovery prompt
   - Click "Recover Draft"
   - Content should be restored

5. **Test Clear on Publish**:
   - Create post with auto-save
   - Publish the post
   - localStorage should be cleared

---

## 🎯 Expected Behavior

### Auto-Save:
- Saves to localStorage every 30 seconds
- Saves to Firebase every 2 minutes (for existing drafts only)
- Only saves when data changes
- Shows "Saving..." indicator
- Shows "Saved X ago" after save

### Recovery:
- Prompts on page load if draft exists
- Shows when draft was saved
- User can recover or discard
- Clears after successful publish

---

## 📝 Alternative: Quick Integration Script

If you prefer, here's the complete code to add in one go:

**After line 140 (after formData state)**:
```javascript
// [STEP 2 CODE HERE]
```

**After line 147 (after loadBlog useEffect)**:
```javascript
// [STEP 3 CODE HERE]
```

**After line 163 (after loadBlog function)**:
```javascript
// [STEP 4 CODE HERE]
```

**In handleSave function (before navigate)**:
```javascript
// [STEP 5 CODE HERE]
```

**In return JSX (after opening div)**:
```javascript
// [STEP 6 CODE HERE]
```

**In header buttons section**:
```javascript
// [STEP 7 CODE HERE]
```

---

**Ready to integrate!** 🚀

All the infrastructure is built. Just follow the 7 steps above to complete the integration.
