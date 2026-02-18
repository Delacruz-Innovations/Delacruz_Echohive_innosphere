# Blog Data Upload Guide

**Date**: February 6, 2026  
**Status**: ✅ **READY TO UPLOAD**

---

## 📊 **What Will Be Uploaded**

### **EchoHive Creatives** (5 news items):
1. Top 10 Creative Trends Shaping Nigeria's Media Industry in 2025
2. How Drone Technology Is Transforming Event Coverage in Nigeria
3. Best Gear to Use for Professional Photography in 2025
4. Why Your Business Needs Strong Visual Branding
5. How to Plan a Stress-Free Corporate Event

### **Delacruz Innovations** (3 insights):
1. Why Nigerian SMEs Must Embrace Automation in 2025
2. How SaaS Platforms Are Transforming Education in Africa
3. The Hidden Cost of Manual Workflows in Nigerian Businesses

**Total**: 8 blog posts  
**Status**: All will be saved as **DRAFTS**

---

## 🚀 **How to Upload**

### **Option 1: Run the Upload Script** (Recommended)

```bash
# Navigate to scripts folder
cd Blog_Admin_Dashboard/scripts

# Install dependencies (if not already done)
npm install

# Run the upload script
npm run upload
```

### **Option 2: Manual Upload via Blog Admin Dashboard**

1. Open Blog Admin Dashboard
2. For each organization (EchoHive, Delacruz):
   - Click "Create New Blog"
   - Copy data from JSON files
   - Paste into form fields
   - Save as draft

---

## 📁 **Source Files**

### **EchoHive Creatives**:
```
EchoHive_Creatives/src/data/NewsList.json
```

### **Delacruz Innovations**:
```
Delacuz_Innovations/src/InsightsData.json
```

---

## 🔄 **Data Transformation**

The script automatically transforms the JSON data to match the blog schema:

### **EchoHive News → Blog Format**:
- `title` → `title`
- `id` → `slug`
- `description[0]` → `excerpt` and `intro`
- `description[1+]` → `sections`
- `image` → `media.coverImage`
- `category` → `category`
- `date` → `date`
- **Status**: Set to `draft`

### **Delacruz Insights → Blog Format**:
- `title` → `title`
- `slug` → `slug`
- `excerpt` → `excerpt`
- `content.intro` → `content.intro`
- `content.sections` → `content.sections`
- `author` → `author`
- `image` → `media.coverImage`
- **Status**: Set to `draft`

---

## ✅ **What Happens After Upload**

1. **Data is saved to Firebase** in the `blogs` collection
2. **All posts are set to DRAFT status**
3. **Timestamps are added** (createdAt, updatedAt)
4. **SEO fields are auto-generated** from title and excerpt
5. **Read time is calculated** from word count

---

## 📝 **Next Steps After Upload**

1. **Go to Blog Admin Dashboard**
   - EchoHive: `http://localhost:5173/echohive/dashboard`
   - Delacruz: `http://localhost:5173/delacruz/dashboard`

2. **Review each draft**:
   - Check formatting
   - Add/edit images if needed
   - Verify content accuracy
   - Update SEO fields

3. **Publish when ready**:
   - Click "Edit" on each draft
   - Review in preview mode
   - Click "Publish"

---

## 🧪 **Testing the Upload**

### **Before Running**:
- [ ] Firebase config is correct
- [ ] JSON files exist and are valid
- [ ] Dependencies are installed

### **After Running**:
- [ ] Check console for success messages
- [ ] Verify in Blog Admin Dashboard
- [ ] Check Firebase Console (Firestore)
- [ ] Test editing a draft
- [ ] Test publishing a draft

---

## 🔧 **Troubleshooting**

### **"Cannot find module 'firebase'"**
```bash
cd scripts
npm install
```

### **"Permission denied" or "EACCES"**
```bash
# Run as administrator or check file permissions
```

### **"Invalid Firebase config"**
- Check Firebase config in `uploadBlogData.js`
- Verify project IDs match your Firebase projects

### **"Collection not found"**
- The script will create the `blogs` collection automatically
- No action needed

---

## 📊 **Expected Output**

```
═══════════════════════════════════════════════════════
  📤 BLOG DATA UPLOAD TO FIREBASE
═══════════════════════════════════════════════════════

🚀 Starting EchoHive news upload...

📄 Found 5 news items to upload

✅ Uploaded: "Top 10 Creative Trends Shaping Nigeria's Media Industry in 2025"
   ID: abc123xyz

✅ Uploaded: "How Drone Technology Is Transforming Event Coverage in Nigeria"
   ID: def456uvw

... (3 more)

🎉 EchoHive news upload complete!

🚀 Starting Delacruz insights upload...

📄 Found 3 insights to upload

✅ Uploaded: "Why Nigerian SMEs Must Embrace Automation in 2025"
   ID: ghi789rst

... (2 more)

🎉 Delacruz insights upload complete!

═══════════════════════════════════════════════════════
  ✅ ALL UPLOADS COMPLETE!
═══════════════════════════════════════════════════════

📊 Summary:
   - EchoHive Creatives: 5 news items uploaded
   - Delacruz Innovations: 3 insights uploaded
   - All items saved as DRAFTS

💡 Next steps:
   1. Go to Blog Admin Dashboard
   2. Review and edit the drafts
   3. Publish when ready
```

---

## 🔒 **Security Notes**

- ✅ All posts are saved as **DRAFTS** (not public)
- ✅ Firebase config uses environment variables
- ✅ No sensitive data in JSON files
- ✅ Upload script is local (not exposed to web)

---

## 📈 **Data Summary**

| Organization | Items | Categories | Featured |
|--------------|-------|------------|----------|
| **EchoHive** | 5 | Trends, Innovation, Gear Guide, Brand Strategy, Event Planning | 0 |
| **Delacruz** | 3 | Business Automation, Education Technology, Business Efficiency | 1 |
| **Total** | **8** | **8 unique** | **1** |

---

## 🎯 **Success Criteria**

Upload is successful when:
- [x] Script runs without errors
- [x] All 8 posts appear in Firebase
- [x] All posts are in DRAFT status
- [x] Posts appear in Blog Admin Dashboard
- [x] Posts can be edited and published

---

**Ready to upload!** 🚀

Run `npm run upload` in the `scripts` folder to start the upload process.
