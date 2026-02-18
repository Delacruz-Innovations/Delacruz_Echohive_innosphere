# Auto-Save Implementation Guide

**Date**: February 6, 2026  
**Status**: ✅ **HOOKS & COMPONENTS READY**  
**Next**: Integration into BlogForm

---

## ✅ What's Been Created

### 1. **Custom Hooks**

#### `useLocalStorage.js`
- Manages localStorage with automatic JSON serialization
- Provides `[value, setValue, removeValue]` API
- Error handling for localStorage operations

#### `useAutoSave.js`
- Auto-saves to localStorage every 30 seconds
- Auto-saves to Firebase every 2 minutes
- Tracks last saved timestamp
- Provides `{ lastSaved, isSaving, forceSave, clearDraft }`
- Saves before page unload
- Only saves when data has changed

### 2. **UI Components**

#### `SaveIndicator.jsx`
- Shows current save status
- Displays "Saving...", "Saved X ago", or "Save failed"
- Organization-specific theming
- Uses `date-fns` for relative time

#### `DraftRecoveryPrompt.jsx`
- Prompts user to recover unsaved draft
- Shows when draft was saved
- "Recover" or "Discard" options
- Organization-specific theming

### 3. **Dependencies Installed**
- ✅ `date-fns` - Date formatting library

---

## 🔧 How to Integrate into BlogForm

### Step 1: Import Dependencies

Add to top of `BlogForm.jsx`:

```javascript
import { useAutoSave } from '../hooks/useAutoSave';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SaveIndicator from './SaveIndicator';
import DraftRecoveryPrompt from './DraftRecoveryPrompt';
```

### Step 2: Set Up Auto-Save Hook

Inside the `BlogForm` component, after state declarations:

```javascript
const BlogForm = () => {
  const { orgId, id } = useParams();
  const navigate = useNavigate();
  const blogService = getServiceByOrgId(orgId);
  
  // ... existing state declarations ...
  
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
      if (id && data.status !== 'draft') return;
      
      if (id) {
        // Update existing draft
        await blogService.updateBlog(id, data, 'auto-save-user');
      } else {
        // For new posts, only save to localStorage
        // Don't create Firebase document until user manually saves
      }
    },
    enabled: true,
    localInterval: 30000,   // 30 seconds
    remoteInterval: 120000  // 2 minutes
  });
  
  // ... rest of component ...
};
```

### Step 3: Check for Saved Draft on Mount

Add this `useEffect` after the existing `loadBlog` useEffect:

```javascript
// Check for saved draft on mount
useEffect(() => {
  if (!id && savedDraft) {
    // New post with saved draft
    setShowRecoveryPrompt(true);
  }
}, [id, savedDraft]);
```

### Step 4: Add Recovery Functions

Add these functions after existing functions:

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

### Step 5: Clear Draft on Successful Save

Modify the `handleSave` function to clear draft after successful save:

```javascript
const handleSave = async (status = 'draft') => {
  // ... existing validation ...
  
  try {
    setLoading(true);
    
    // ... existing save logic ...
    
    // Clear auto-save draft after successful save
    clearDraft();
    
    // ... existing navigation ...
  } catch (error) {
    // ... existing error handling ...
  } finally {
    setLoading(false);
  }
};
```

### Step 6: Add UI Components

Add the recovery prompt and save indicator to the JSX:

```javascript
return (
  <div className="max-w-6xl mx-auto px-6 py-10">
    {/* Recovery Prompt */}
    {showRecoveryPrompt && (
      <DraftRecoveryPrompt
        onRecover={handleRecoverDraft}
        onDiscard={handleDiscardDraft}
        draftDate={savedDraft?.dates?.updatedAt}
        orgId={orgId}
      />
    )}
    
    {/* Header with Save Indicator */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? 'Edit' : 'Create'} {terminology.entry}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <SaveIndicator 
          lastSaved={lastSaved}
          isSaving={isSaving}
          orgId={orgId}
        />
        
        {/* Existing buttons */}
        <button onClick={() => forceSave()}>
          Force Save
        </button>
      </div>
    </div>
    
    {/* Rest of form */}
  </div>
);
```

---

## 🎯 Features Implemented

### ✅ Auto-Save to localStorage
- Saves every 30 seconds
- Only saves when data changes
- Persists across page refreshes

### ✅ Auto-Save to Firebase
- Saves every 2 minutes
- Only for draft posts
- Prevents creating unnecessary documents

### ✅ Draft Recovery
- Detects unsaved drafts on page load
- Prompts user to recover or discard
- Shows when draft was saved

### ✅ Save Status Indicator
- Shows "Saving..." during save
- Shows "Saved X ago" after save
- Shows "Save failed" on error
- Organization-specific colors

### ✅ Manual Force Save
- User can trigger immediate save
- Saves to both localStorage and Firebase

### ✅ Draft Cleanup
- Clears draft after successful publish
- User can manually discard draft

---

## 🧪 Testing Checklist

- [ ] Create new post → Type content → Wait 30s → Check localStorage
- [ ] Create new post → Type content → Close tab → Reopen → See recovery prompt
- [ ] Recover draft → Content restored correctly
- [ ] Discard draft → localStorage cleared
- [ ] Edit existing post → Auto-save updates Firebase
- [ ] Publish post → Draft cleared from localStorage
- [ ] Force save button → Immediate save
- [ ] Save indicator shows correct status
- [ ] Works across all 3 organizations

---

## 📊 localStorage Structure

```javascript
// Key format
`blog-draft-${orgId}-${id || 'new'}`

// Examples
'blog-draft-innosphere-new'
'blog-draft-delacruz-abc123'
'blog-draft-echohive-xyz789'

// Stored data (same as formData)
{
  title: "...",
  slug: "...",
  category: "...",
  introduction: "...",
  sections: [...],
  // ... all form fields
}
```

---

## 🔒 Security Considerations

1. **localStorage Limits**: ~5-10MB per domain
   - Large blog posts with many images might hit limits
   - Consider compressing data or storing only text

2. **Sensitive Data**: localStorage is not encrypted
   - Don't store passwords or API keys
   - Blog content is generally safe

3. **Multiple Tabs**: 
   - Each tab has its own auto-save timer
   - Last tab to save wins
   - Consider adding tab synchronization later

---

## 🚀 Future Enhancements

1. **Conflict Resolution**
   - Detect if post was edited in another tab
   - Show diff and let user choose version

2. **Compression**
   - Compress large content before storing
   - Use LZ-string library

3. **Offline Mode**
   - Queue saves when offline
   - Sync when back online

4. **Version Snapshots**
   - Save multiple versions in localStorage
   - Let user browse history

---

## 📝 Next Steps

1. ✅ Hooks created
2. ✅ Components created
3. ✅ Dependencies installed
4. ⏳ **Integrate into BlogForm** (Next task)
5. ⏳ Test functionality
6. ⏳ Fix any issues
7. ⏳ Document for users

---

**Auto-Save infrastructure is ready!** 🎉

Next step: Integrate into BlogForm.jsx
