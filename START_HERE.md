# 🚀 START HERE - Quick Start Guide

## Welcome to Loksewa Preparation Portal!

This is your complete guide to get the portal running in 5 minutes.

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies (2 min)
```bash
npm install
```

### Step 2: Setup Google OAuth (2 min)
1. Go to https://console.cloud.google.com/
2. Create project → Enable Google+ API
3. Create OAuth credentials
4. Copy Client ID and Secret

### Step 3: Create Environment File (30 sec)
Copy `.env.local.example` to `.env.local`:
```bash
copy .env.local.example .env.local
```

Edit `.env.local`:
```env
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run_openssl_rand_base64_32
```

Generate secret:
```bash
openssl rand -base64 32
```

### Step 4: Run the App (30 sec)
```bash
npm run dev
```

### Step 5: Open Browser
```
http://localhost:3000
```

---

## 🎯 Test It Out

### Option 1: Use Demo Account
```
Email: demo@loksewa.com
Password: demo123
```

### Option 2: Create New Account
1. Click "Create an account"
2. Fill in your details
3. Login

### Option 3: Google Login
1. Click "Continue with Google"
2. Select your account

---

## ✅ What You Can Do

### 1. Take Quizzes
- Click any quiz card
- Answer 20 questions
- 10-minute timer
- See results with chart

### 2. View Dashboard
- See your statistics
- Total attempts
- Average score
- Recent results

### 3. Explore Content
- Read blog articles
- Check syllabus
- View model papers

### 4. Customize
- Switch language (English/Nepali)
- Toggle dark mode
- All preferences saved

---

## 📊 Available Quizzes

1. **General Knowledge** (20 Q)
   - Nepal Geography
   - Constitution 2072
   - History

2. **Mathematics** (20 Q)
   - Percentage, Ratio
   - Algebra, Geometry
   - Problem solving

3. **Computer Knowledge** (20 Q)
   - Fundamentals
   - Internet, MS Office
   - Networking

4. **Language/English** (20 Q)
   - Grammar
   - Vocabulary
   - Sentence correction

---

## 🔧 Troubleshooting

### Questions Not Loading?
✅ **FIXED!** Questions are now in `public/data/questions/`

### Can't Login?
- Check `.env.local` file exists
- Verify Google OAuth credentials
- Try demo account first

### Page Not Found?
- Make sure dev server is running
- Check URL: `http://localhost:3000`

### Dark Mode Not Working?
- Clear browser cache
- Hard refresh (Ctrl + Shift + R)

---

## 📱 Features Overview

### ✅ Authentication
- Email/Password registration
- Google OAuth login
- Session management
- Protected routes

### ✅ Quiz System
- 80 questions (20 per set)
- 10-minute timer
- Answer selection
- Auto-submit

### ✅ Results
- Score calculation
- Pie chart visualization
- Performance stats
- Result history

### ✅ UI/UX
- Bilingual (English/Nepali)
- Dark mode
- Mobile responsive
- Professional icons

---

## 📚 Documentation

### Essential Guides
- **README.md** - Complete documentation
- **SETUP_GUIDE.md** - Detailed setup
- **FINAL_SUMMARY.md** - Project overview
- **QUICK_REFERENCE.md** - Quick commands

### Specific Topics
- **AUTH_GUIDE.md** - Authentication
- **QUESTION_MODEL.md** - Questions
- **DEPLOYMENT.md** - Deploy to production
- **TEST_GUIDE.md** - Testing

---

## 🎓 For Students

### How to Prepare
1. **Register** your account
2. **Take quizzes** regularly
3. **Review results** to identify weak areas
4. **Practice** until you improve
5. **Read** study materials

### Study Tips
- Take one quiz per day
- Review wrong answers
- Time yourself
- Focus on weak subjects
- Use bilingual mode to learn

---

## 👨‍💻 For Developers

### Project Structure
```
app/          → Pages and routes
components/   → Reusable components
contexts/     → State management
lib/          → Utilities
public/       → Static files (questions)
types/        → TypeScript types
```

### Key Files
- `app/quiz/[id]/page.tsx` - Quiz interface
- `app/result/page.tsx` - Results page
- `public/data/questions/` - Question files
- `contexts/LanguageContext.tsx` - Translations

### Adding Questions
1. Edit `public/data/questions/setX.json`
2. Follow the format
3. Test in browser

---

## 🚀 Next Steps

### After Setup
1. ✅ Test all features
2. ✅ Try demo account
3. ✅ Create your account
4. ✅ Take a quiz
5. ✅ Check results

### Customization
- Change colors in `tailwind.config.ts`
- Add more questions in `public/data/questions/`
- Modify timer in quiz page
- Update translations

### Deployment
- Push to GitHub
- Deploy to Vercel
- Add production env variables
- Update OAuth redirect URIs

---

## 💡 Pro Tips

### For Best Experience
1. Use Chrome or Firefox
2. Enable JavaScript
3. Allow localStorage
4. Good internet connection

### For Development
1. Use VS Code
2. Install ESLint extension
3. Enable auto-save
4. Use terminal in VS Code

---

## 🎉 You're Ready!

The portal is complete and ready to use. Start by:

1. **Running** `npm run dev`
2. **Opening** http://localhost:3000
3. **Logging in** with demo account
4. **Taking** your first quiz!

---

## 📞 Need Help?

### Quick Checks
- [ ] Dependencies installed?
- [ ] `.env.local` file created?
- [ ] Dev server running?
- [ ] Browser open to localhost:3000?

### Common Issues
- **Port 3000 in use**: Stop other apps or use different port
- **Module not found**: Run `npm install` again
- **OAuth error**: Check Google Console settings
- **Questions not loading**: Verify `public/data/questions/` exists

---

## ✨ Features at a Glance

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ | Email/Password + Google OAuth |
| Quizzes | ✅ | 80 questions, 4 sets |
| Timer | ✅ | 10 minutes per quiz |
| Results | ✅ | Charts and analytics |
| Bilingual | ✅ | English & Nepali |
| Dark Mode | ✅ | Theme toggle |
| Mobile | ✅ | Fully responsive |
| Dashboard | ✅ | Stats and history |

---

## 🎯 Success Checklist

- [ ] Installed dependencies
- [ ] Created `.env.local`
- [ ] Started dev server
- [ ] Opened in browser
- [ ] Logged in successfully
- [ ] Took a quiz
- [ ] Viewed results
- [ ] Tested language toggle
- [ ] Tested dark mode
- [ ] Checked dashboard

---

**🎉 Congratulations! You're all set to start using the Loksewa Preparation Portal!**

**Good luck with your preparation! 🇳🇵**

---

*Questions? Check the documentation files or create an issue on GitHub.*
