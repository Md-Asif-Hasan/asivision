# 🔥 Firestore Setup - REQUIRED BEFORE TESTING

## ❌ Current Error:
```
@firebase/firestore: Firestore (12.17.0): Database '(default)' not found. 
Please check your project configuration.
```

## ✅ Solution: Enable Firestore in Firebase Console

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select your project: **asivision-payments**

### Step 2: Enable Cloud Firestore
1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"** button
3. Choose a starting mode:
   - **Production mode** (Recommended for security)
   - OR **Test mode** (Open for 30 days - easier for initial testing)

### Step 3: Select Firestore Location
1. Choose a location close to your users:
   - **asia-south1** (Mumbai, India) - Recommended for Bangladesh
   - OR **us-central1** (Iowa, USA)
2. Click **"Enable"**
3. Wait 1-2 minutes for Firestore to provision

### Step 4: Deploy Security Rules

**Option A: Manual Copy/Paste (Easiest - Recommended)**

1. In Firebase Console → Firestore Database → **Rules** tab
2. Open `E:\Special Project\asivision\firestore.rules` in your editor
3. Copy ALL the content
4. Paste into Firebase Console Rules editor
5. Click **"Publish"**

**Option B: Using Firebase CLI (Advanced)**

First install Firebase CLI:
```bash
npm install -g firebase-tools
```

Then deploy:
```bash
cd "E:\Special Project\asivision"
firebase login
firebase deploy --only firestore:rules
```

---

## 🚀 Quick Test Mode Setup (Fast Testing)

If you want to test immediately without deploying rules:

1. In Firebase Console → Firestore Database → **Rules** tab
2. Use these TEMPORARY test rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2027, 1, 1);
    }
  }
}
```

3. Click **"Publish"**
4. **⚠️ Remember to deploy proper rules later!**

---

## ✅ Verification

After enabling Firestore:

1. **Refresh your browser** at http://localhost:3000/
2. **Check browser console** - Firestore errors should be gone
3. **Sign in** with a test account
4. **Go to Firebase Console** → Firestore Database → **Data** tab
5. You should see a `users` collection appear after login

---

## 📊 Expected Collections After Testing

Once Firestore is enabled and you test the app:

- **`users`** - Created when users sign in
  - Document ID = Firebase Auth UID
  - Fields: email, displayName, isPartner, etc.

- **`quoteRequests`** - Created when users submit partnership quotes
  - Document ID = auto-generated
  - Fields: name, email, appName, preferredPayment, etc.

- **`partnerApps`** - Created when partners register apps
  - Document ID = appId (e.g., "partner_my_app")
  - Fields: appName, logoUrl, ownerUid, etc.

---

## 🔧 Troubleshooting

### If you still see errors after enabling Firestore:

1. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Reload page

2. **Check Firebase project ID:**
   - Open `src/lib/firebase.js`
   - Verify `projectId: "asivision-payments"` matches your Firebase project

3. **Verify Firestore is enabled:**
   - Firebase Console → Project Settings → General
   - Ensure "Cloud Firestore" shows as enabled

4. **Check network connectivity:**
   - Firestore requires internet connection
   - Check if firewall/antivirus is blocking Firebase domains

5. **Check browser console for auth errors:**
   - If Firebase Auth fails, Firestore won't work
   - Verify `VITE_FIREBASE_API_KEY` in `.env` is correct

---

## 🎯 Next Steps After Firestore is Enabled

1. ✅ Refresh browser - errors should be gone
2. ✅ Sign in with test account
3. ✅ Check Firestore Console - `users` collection should appear
4. ✅ Continue with `TESTING_GUIDE.md`

---

## 📞 Quick Reference

- **Firebase Console:** https://console.firebase.google.com/
- **Project:** asivision-payments
- **Firestore Rules Location:** `E:\Special Project\asivision\firestore.rules`
- **Deploy Command:** `firebase deploy --only firestore:rules`

---

## ⏱️ Estimated Time
- Enable Firestore: 2-3 minutes
- Deploy rules: 30 seconds
- Total: **5 minutes**

**After this, the app will work perfectly! 🚀**
