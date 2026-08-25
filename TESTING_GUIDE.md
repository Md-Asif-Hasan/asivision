# Partnership Program - Local Testing Guide

## 🚀 Dev Server Running
**URL:** http://localhost:3000/

## 🧪 Test Scenarios

### Scenario 1: New User Quote Request Flow

1. **Navigate to Quote Page:**
   - Go to http://localhost:3000/partnership/quote
   - Should redirect to login if not signed in

2. **Sign Up / Sign In:**
   - Click "Sign In" or go to http://localhost:3000/login
   - Create account with Google or email/password
   - After login, you'll be redirected back to quote page

3. **Submit Quote Request:**
   - Fill in all form fields:
     - Name: Your Name
     - Email: your@email.com
     - Phone: +123 456 7890
     - App Name: Test Partner App
     - App Description: A test application for the partnership program
     - App Link: https://play.google.com/store/apps/details?id=com.test.app
     - Website: https://testapp.com
     - Preferred Payment: Choose any (Bkash, PayPal, etc.)
     - Message: Test quote request
   - Click "Submit Partnership Quote Request"
   - You should see success page with instructions

4. **Verify Firestore:**
   - Open Firebase Console → Firestore Database
   - Check `quoteRequests` collection
   - Your quote should be there with status "pending"

---

### Scenario 2: Admin Activates Partnership

1. **Sign Out and Sign In as Admin:**
   - Log out from test user account
   - Sign in with admin email: `asifhasan10122000@gmail.com`
   - Make sure this account exists in Firebase Auth

2. **Go to Admin Panel:**
   - Navigate to http://localhost:3000/admin
   - You should see the Admin Operations Dashboard
   - If you see "Admin Operations Portal Locked", try the master passcode: `asivision2026`

3. **View Quote Requests:**
   - Click "Partners & Quotes" tab
   - You should see your test quote request
   - Note the email of the user who submitted it

4. **Activate Partnership:**
   - Click "User Management" tab
   - Search for the test user email
   - Click "Activate Partnership" button
   - Confirm the action
   - User's profile should now show "🤝 Partner" badge

5. **Verify Firestore:**
   - Open Firebase Console → Firestore → `users` collection
   - Find the user document by UID
   - `isPartner` should be `true`
   - `partnerActivatedAt` timestamp should exist

---

### Scenario 3: Partner Registers an App

1. **Sign Out and Back In as Test User:**
   - Log out from admin account
   - Sign in with the test user account you used earlier

2. **Check Navbar:**
   - Look at the header navbar
   - You should now see **"Partnership"** tab/button
   - (If not visible, refresh the page to reload auth context)

3. **Navigate to Partnership Dashboard:**
   - Click "Partnership" in navbar
   - Or go to http://localhost:3000/partnership
   - You should see "Partnership Program" page

4. **Register New App:**
   - Click "Register New App" button
   - Fill in the form:
     - **App Name:** My Test Partner App
     - **App ID:** (auto-generated from name) `partner_my_test_partner_app`
     - **Category:** Mobile App - Productivity
     - **App Link:** https://play.google.com/store/apps/details?id=com.myapp
     - **Description:** This is a test partner application for demonstration purposes.
     - **Logo URL:** Use any test image URL, e.g.:
       - `https://via.placeholder.com/150` (placeholder)
       - Or upload to Cloudflare R2 and use that URL
     - **Preview URL:** Same as above or different image
       - `https://via.placeholder.com/600x400`

5. **Privacy Policy Mode:**
   - Choose "📝 Fill in Privacy Form (Recommended)"
   - Fill in the privacy policy sections:
     - **Effective Date:** January 1, 2027
     - **Disclaimer:** This is a test app for demonstration purposes.
     - **Information Collected:** User email, device type, usage analytics
     - **How Used:** To provide app functionality and improve user experience
     - **Storage & Security:** Data encrypted at rest and in transit
     - **User Rights:** Users can request data deletion via support@myapp.com
   - Click "Save App & Privacy Policy"

6. **Verify App Registration:**
   - You should see success message
   - App appears in "Your Registered Apps" list
   - Logo and preview images should display (if URLs are valid)

7. **Test Privacy Policy Page:**
   - Click "View Privacy Page" button
   - Opens new tab: http://localhost:3000/privacy/partner_my_test_partner_app
   - Should display formatted privacy policy with all sections

8. **Test Edit App:**
   - Back on partnership page, click "Edit App"
   - Change description or any field
   - Click "Save App & Privacy Policy"
   - Changes should persist

9. **Verify Firestore:**
   - Firebase Console → Firestore → `partnerApps` collection
   - Your app document should exist
   - Fields: `appName`, `appId`, `logoUrl`, `ownerUid`, `ownerEmail`, etc.

---

### Scenario 4: Admin Views Partner Apps

1. **Sign In as Admin Again:**
   - Log out, sign in as `asifhasan10122000@gmail.com`

2. **Go to Admin Panel → Partners & Quotes Tab:**
   - Should see "Quote Requests" section with your test quote
   - Should see "Registered Partner Apps" section

3. **Verify Partner App Display:**
   - Your test app should appear in the list
   - Shows logo, name, category, description, owner email
   - Has "View Privacy" and "Delete" buttons

4. **Test Delete (Optional):**
   - Click "Delete" on your test app
   - Confirm deletion
   - App should be removed from list
   - Check Firestore - document should be deleted

---

### Scenario 5: Mobile Testing

1. **Open Chrome DevTools:**
   - Press F12 or right-click → Inspect
   - Click "Toggle device toolbar" icon (Ctrl+Shift+M)
   - Choose "iPhone 12 Pro" or "Galaxy S20"

2. **Test Key Pages:**
   - **Home:** http://localhost:3000/
     - Hero section should stack vertically
     - Stats grid should show 2 columns
     - Navbar should show hamburger menu
   
   - **Pricing:** http://localhost:3000/pricing
     - Pricing cards should stack (1 column)
     - Buttons should be full-width
   
   - **Account:** http://localhost:3000/account
     - Profile card should be mobile-friendly
     - Countdown timer should be readable
     - App links should be accessible
   
   - **Partnership Quote:** http://localhost:3000/partnership/quote
     - Form fields should be full-width
     - Buttons should be large and touch-friendly
   
   - **Partnership Dashboard:** http://localhost:3000/partnership
     - App registration form should stack
     - Registered apps list should be scrollable
   
   - **Admin Panel:** http://localhost:3000/admin
     - Tabs should scroll horizontally
     - Forms should be mobile-friendly
     - User cards should stack

3. **Test Navigation:**
   - Click hamburger menu (☰) icon
   - Drawer menu should open
   - All links should be accessible
   - Partnership tab should show if activated
   - Admin tab should show for admin users

---

## 🔍 What to Check

### ✅ Expected Behaviors:

1. **Authentication:**
   - [x] Login/signup works with email/password
   - [x] Login works with Google
   - [x] Logout works correctly
   - [x] Protected routes redirect to login

2. **Partnership Tab Visibility:**
   - [x] Hidden for non-partner users
   - [x] Visible for partner users after activation
   - [x] Updates without requiring logout/login after activation

3. **Quote Submission:**
   - [x] Form validation works
   - [x] Success message shows after submission
   - [x] Data saved to Firestore `quoteRequests` collection

4. **Admin Panel:**
   - [x] Users tab loads all Firestore users
   - [x] Search works by email/name/UID
   - [x] Activate/Deactivate partnership buttons work
   - [x] Edit user profile saves changes
   - [x] Partners & Quotes tab shows all data

5. **App Registration:**
   - [x] Form validation works
   - [x] App saves to Firestore `partnerApps` collection
   - [x] Images display from Cloudflare URLs
   - [x] Edit app loads existing data
   - [x] Delete app removes from Firestore

6. **Privacy Policies:**
   - [x] Generated page shows all sections
   - [x] External URL mode redirects correctly
   - [x] Partner apps appear in privacy pages
   - [x] Works for both localStorage apps and Firestore apps

7. **Mobile Responsiveness:**
   - [x] All pages are usable on mobile
   - [x] Forms are touch-friendly
   - [x] Buttons are large enough to tap
   - [x] No horizontal scroll issues

---

## 🐛 Common Issues & Fixes

### Issue: "Partnership tab not showing after activation"
**Fix:** Refresh the page. The `isPartner` state is cached and needs a re-check.

### Issue: "Admin panel shows locked screen"
**Fix:** 
- Ensure you're signed in with `asifhasan10122000@gmail.com`
- OR use master passcode: `asivision2026` or `asif2026`

### Issue: "Firestore permission denied errors in console"
**Fix:** Deploy the updated `firestore.rules`:
```bash
cd "E:\Special Project\asivision"
firebase deploy --only firestore:rules
```

### Issue: "Partner app images not displaying"
**Fix:** 
- Use valid image URLs (test with https://via.placeholder.com/150)
- Ensure Cloudflare R2 bucket has public access enabled
- Check browser console for CORS errors

### Issue: "Quote request doesn't appear in admin panel"
**Fix:**
- Check Firebase Console → Firestore → `quoteRequests` collection manually
- Verify Firestore rules allow admin to read the collection
- Check browser console for errors

### Issue: "Users tab shows 'No users found'"
**Fix:**
- Users are only created in Firestore after first login
- Sign in with a test account first
- Then check admin panel again

---

## 📊 Firestore Collections to Monitor

While testing, keep Firebase Console open to these collections:

1. **`users`** - User profiles & partner status
   - Watch for `isPartner` flag changes
   - Check `partnerActivatedAt` timestamps

2. **`partnerApps`** - Partner app registrations
   - Verify all fields are populated
   - Check `ownerUid` matches user who created it

3. **`quoteRequests`** - Partnership quote submissions
   - Monitor for new submissions
   - Check `status` field (should be "pending")

---

## ✅ Production Readiness Checklist

After completing all test scenarios:

- [ ] Quote submission flow works end-to-end
- [ ] Admin can activate partnerships
- [ ] Partnership tab appears for activated users
- [ ] App registration saves correctly
- [ ] Privacy policies generate correctly
- [ ] Admin panel shows all data
- [ ] Mobile experience is smooth
- [ ] No console errors during normal flows
- [ ] Firestore rules are deployed
- [ ] Image URLs work (Cloudflare R2 configured)

**If all checked, you're ready to deploy to production! 🚀**

---

## 📞 Need Help?

- Check `PARTNERSHIP_DEPLOYMENT_NOTES.md` for deployment instructions
- Review `firestore.rules` for security configuration
- Contact: asifhasan10122000@gmail.com
