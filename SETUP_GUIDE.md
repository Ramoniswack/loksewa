# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Setup Google OAuth

### 2.1 Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2.2 Create a New Project
- Click "Select a project" → "New Project"
- Enter project name: "Loksewa Portal"
- Click "Create"

### 2.3 Enable Google+ API
- Go to "APIs & Services" → "Library"
- Search for "Google+ API"
- Click and enable it

### 2.4 Create OAuth Credentials
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth 2.0 Client ID"
- Configure consent screen if prompted:
  - User Type: External
  - App name: Loksewa Preparation Portal
  - User support email: your-email@gmail.com
  - Developer contact: your-email@gmail.com
  - Save and continue through all steps

### 2.5 Create OAuth Client ID
- Application type: Web application
- Name: Loksewa Portal Web Client
- Authorized redirect URIs:
  - http://localhost:3000/api/auth/callback/google
  - (Add production URL later)
- Click "Create"
- Copy Client ID and Client Secret

## Step 3: Configure Environment Variables

### 3.1 Create .env.local file
```bash
copy .env.local.example .env.local
```

### 3.2 Fill in the values
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_this_secret
```

### 3.3 Generate NEXTAUTH_SECRET
Run this command:
```bash
openssl rand -base64 32
```
Copy the output and paste it as NEXTAUTH_SECRET value

## Step 4: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser

## Step 5: Test the Application

1. Click "Login with Google"
2. Sign in with your Google account
3. You'll be redirected to the dashboard
4. Try taking a quiz
5. View your results

## 🎉 You're Done!

The portal is now running locally. You can:
- Take quizzes
- View results with charts
- Read blog articles
- Check syllabus
- Browse model papers
- Switch between English and Nepali
- Toggle dark mode

## 📝 Adding More Questions

Edit files in `data/questions/` folder:
- `set1.json` - General Knowledge
- `set2.json` - Mathematics
- `set3.json` - Computer Knowledge
- `set4.json` - Language

Each question format:
```json
{
  "question_en": "Your question in English?",
  "question_np": "तपाईंको प्रश्न नेपालीमा?",
  "options_en": ["Option A", "Option B", "Option C", "Option D"],
  "options_np": ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
  "correct_answer": 0
}
```

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Update Google OAuth redirect URI to include production URL
6. Deploy!

## ❓ Troubleshooting

### Issue: "Error: Invalid redirect URI"
- Make sure you added the correct redirect URI in Google Console
- Format: `http://localhost:3000/api/auth/callback/google`

### Issue: "Error: NEXTAUTH_SECRET not set"
- Generate a secret using `openssl rand -base64 32`
- Add it to `.env.local`

### Issue: Questions not loading
- Check if JSON files exist in `data/questions/` folder
- Verify JSON syntax is correct

### Issue: Dark mode not working
- Clear browser cache
- Check if localStorage is enabled

## 📧 Need Help?

Create an issue in the repository with:
- Error message
- Steps to reproduce
- Screenshots (if applicable)

---

**Happy Coding! 🇳🇵**
