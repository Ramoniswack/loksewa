# Firebase Setup Guide for Google Authentication

## Overview
This guide will help you set up Firebase Google Authentication for the Loksewa Preparation Portal.

---

## Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
- Visit: https://console.firebase.google.com/
- Click "Add project" or "Create a project"

### 1.2 Project Setup
1. **Project name**: Enter "Loksewa Portal" (or your preferred name)
2. **Google Analytics**: Enable or disable (optional)
3. Click "Create project"
4. Wait for project creation (takes 30-60 seconds)
5. Click "Continue"

---

## Step 2: Enable Google Authentication

### 2.1 Navigate to Authentication
1. In the left sidebar, click "Build" → "Authentication"
2. Click "Get started" button

### 2.2 Enable Google Sign-In
1. Click on "Sign-in method" tab
2. Find "Google" in the list of providers
3. Click on "Google"
4. Toggle "Enable" switch to ON
5. **Project support email**: Select your email from dropdown
6. Click "Save"

---

## Step 3: Register Your Web App

### 3.1 Add Web App
1. Go to Project Overview (home icon in sidebar)
2. Click the "</>" (Web) icon to add a web app
3. **App nickname**: Enter "Loksewa Web App"
4. **Firebase Hosting**: Leave unchecked (optional)
5. Click "Register app"

### 3.2 Copy Configuration
You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**IMPORTANT**: Copy these values - you'll need them in the next step!

---

## Step 4: Configure Environment Variables

### 4.1 Create .env.local File
If you don't have a `.env.local` file, create one in the root directory:

```bash
copy .env.local.example .env.local
```

### 4.2 Add Firebase Configuration
Open `.env.local` and add your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**Replace** the values with your actual Firebase configuration from Step 3.2!

---

## Step 5: Configure Authorized Domains

### 5.1 Add Localhost (Development)
1. In Firebase Console, go to "Authentication" → "Settings" tab
2. Scroll to "Authorized domains"
3. `localhost` should already be there
4. If not, click "Add domain" and add `localhost`

### 5.2 Add Production Domain (When Deploying)
When you deploy to production:
1. Click "Add domain"
2. Enter your production domain (e.g., `your-app.vercel.app`)
3. Click "Add"

---

## Step 6: Test the Setup

### 6.1 Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

### 6.2 Test Google Sign-In
1. Open http://localhost:3000/login
2. Click "Continue with Google" button
3. Select your Google account
4. Grant permissions
5. You should be redirected to the dashboard!

---

## Complete .env.local Example

Here's what your complete `.env.local` file should look like:

```env
# Google OAuth Configuration (NextAuth - Optional)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Firebase Configuration (Required for Google Sign-In)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

---

## Troubleshooting

### Issue 1: "Firebase: Error (auth/configuration-not-found)"
**Solution**: Make sure all Firebase environment variables are set correctly in `.env.local`

### Issue 2: "This domain is not authorized"
**Solution**: 
1. Go to Firebase Console → Authentication → Settings
2. Add your domain to "Authorized domains"
3. For localhost: Add `localhost`
4. For production: Add your actual domain

### Issue 3: Google Sign-In popup closes immediately
**Solution**:
1. Check browser console for errors
2. Verify Firebase configuration is correct
3. Make sure popup blockers are disabled
4. Try in incognito/private mode

### Issue 4: "Firebase App named '[DEFAULT]' already exists"
**Solution**: This is normal and handled by the code. Ignore this warning.

### Issue 5: User not redirected after sign-in
**Solution**:
1. Check browser console for errors
2. Clear localStorage: `localStorage.clear()`
3. Try signing in again

---

## How It Works

### Authentication Flow:

1. **User clicks "Continue with Google"**
   - Opens Google sign-in popup
   - User selects Google account
   - Grants permissions

2. **Firebase handles authentication**
   - Verifies user with Google
   - Returns user data (name, email, photo)

3. **App stores user data**
   - Saves to localStorage
   - Redirects to dashboard

4. **User is authenticated**
   - Can access protected routes
   - Can take quizzes
   - Can view results

### Logout Flow:

1. **User clicks logout button**
   - Signs out from Firebase
   - Clears localStorage
   - Redirects to home page

---

## Features

### What's Included:

✅ **Google Sign-In with Firebase**
- One-click authentication
- Secure and reliable
- No password needed

✅ **User Profile**
- Name from Google account
- Email address
- Profile photo

✅ **Session Management**
- Persistent login
- Automatic logout
- Secure token handling

✅ **Dual Authentication**
- Firebase Google Sign-In (new)
- Email/Password (existing)
- NextAuth Google OAuth (existing)

---

## Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env.local` to Git
- ✅ Use different Firebase projects for dev/prod
- ✅ Rotate API keys periodically

### 2. Firebase Rules
- ✅ Enable only required authentication methods
- ✅ Set up proper security rules
- ✅ Monitor authentication logs

### 3. Domain Authorization
- ✅ Only add trusted domains
- ✅ Remove unused domains
- ✅ Use HTTPS in production

---

## Production Deployment

### Vercel Deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Firebase authentication"
   git push
   ```

2. **Deploy to Vercel**
   - Go to vercel.com
   - Import your repository
   - Add environment variables in Vercel dashboard

3. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all Firebase variables:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

4. **Update Firebase Authorized Domains**
   - Go to Firebase Console
   - Authentication → Settings → Authorized domains
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

5. **Redeploy**
   - Vercel will automatically redeploy
   - Test Google Sign-In on production

---

## Cost

### Firebase Free Tier (Spark Plan):
- ✅ **Authentication**: 50,000 monthly active users
- ✅ **Storage**: 1 GB
- ✅ **Bandwidth**: 10 GB/month
- ✅ **More than enough for most apps!**

### When to Upgrade:
- More than 50,000 monthly users
- Need advanced features
- Require higher limits

---

## Support

### Getting Help:

1. **Firebase Documentation**
   - https://firebase.google.com/docs/auth

2. **Firebase Console**
   - Check authentication logs
   - View user list
   - Monitor usage

3. **Browser Console**
   - Check for error messages
   - View network requests
   - Debug issues

---

## Summary

### What You Did:
1. ✅ Created Firebase project
2. ✅ Enabled Google authentication
3. ✅ Registered web app
4. ✅ Configured environment variables
5. ✅ Tested Google Sign-In

### What You Can Do Now:
- ✅ Users can sign in with Google
- ✅ No password required
- ✅ Secure authentication
- ✅ Profile photos displayed
- ✅ Persistent sessions

### Next Steps:
- Test thoroughly
- Deploy to production
- Monitor usage
- Add more features

---

**🎉 Congratulations! Firebase Google Authentication is now set up!**

**Users can now sign in with their Google accounts in one click! 🚀**

---

*For questions or issues, check the Troubleshooting section above.*
