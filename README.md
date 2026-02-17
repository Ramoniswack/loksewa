# 🇳🇵 Loksewa Preparation Portal | लोक सेवा तयारी पोर्टल

A simple, clean, government-style web portal for Nepal Loksewa (Public Service Commission) exam preparation with bilingual support (English & Nepali).

## ✨ Features

- 🔐 **Google OAuth Authentication** - Secure login with NextAuth
- 🌐 **Bilingual Support** - Full English and Nepali language support with persistence
- 🎨 **Professional Icons** - Lucide React icons throughout the interface
- 📚 **4 Quiz Sets**:
  - General Knowledge (Nepal Geography, Constitution, History)
  - Mathematics (Percentage, Ratio, Arithmetic, Reasoning)
  - Computer Knowledge (Fundamentals, Internet, Networking)
  - Language (Grammar, Vocabulary, Sentence Correction)
- ⏱️ **Quiz Timer** - 10 minutes per quiz
- 📊 **Result Analysis** - Pie chart visualization with Chart.js
- 📖 **Blog & Articles** - Study materials, preparation tips, and guides
- 📋 **Syllabus Section** - Detailed syllabus for different PSC positions
- 📄 **Model Papers** - Sample question papers with download options
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistence
- 💾 **Persistent Preferences** - Language and theme choices saved across sessions
- 📱 **Mobile Responsive** - Works on all devices
- 🎨 **Government Style UI** - Blue & white theme, simple layout
- 🔍 **Content Rich** - Statistics, features showcase, and why choose us section
- ⚡ **Fast Loading** - Optimized for low internet connections

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Tailwind CSS with custom government theme

## 📋 Prerequisites

- Node.js 18+ installed
- Google Cloud Console account for OAuth credentials

## 🚀 Installation

1. **Clone or download the project**

2. **Install dependencies**:
```bash
npm install
```

3. **Set up Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret

4. **Configure environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your credentials:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

   - Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

5. **Run the development server**:
```bash
npm run dev
```

6. **Open your browser**:
   - Navigate to `http://localhost:3000`

## 📁 Project Structure

```
loksewa-portal/
├── app/
│   ├── api/auth/[...nextauth]/    # NextAuth API routes
│   ├── blog/                       # Blog listing page
│   │   └── [id]/                   # Individual blog post
│   ├── dashboard/                  # Dashboard page
│   ├── login/                      # Login page
│   ├── model-papers/               # Model papers page
│   ├── quiz/[id]/                  # Quiz page (dynamic)
│   ├── result/                     # Result page
│   ├── syllabus/                   # Syllabus page
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   └── providers.tsx               # Context providers
├── components/
│   └── Header.tsx                  # Header component
├── contexts/
│   ├── LanguageContext.tsx         # Language switching
│   └── ThemeContext.tsx            # Dark mode
├── data/
│   └── questions/                  # Question JSON files
│       ├── set1.json               # General Knowledge
│       ├── set2.json               # Mathematics
│       ├── set3.json               # Computer Knowledge
│       └── set4.json               # Language
├── lib/
│   └── auth.ts                     # NextAuth configuration
├── types/
│   ├── index.ts                    # TypeScript types
│   └── next-auth.d.ts              # NextAuth types
├── .env.local.example              # Environment variables template
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🎯 Usage

1. **Login**: Click "Login with Google" on the landing page
2. **Explore Content**: 
   - Browse blog articles for study tips
   - Check syllabus for different positions
   - View model papers
3. **Dashboard**: View your stats and select a question set
4. **Take Quiz**: Answer questions with 10-minute timer
5. **View Results**: See your score with pie chart analysis
6. **Retake**: Practice again to improve your score

## 🌐 Language Switching

- Toggle between English and Nepali using the language button in header
- All content (questions, UI, messages) switches automatically
- Default language: Nepali

## 🌙 Dark Mode

- Toggle dark mode using the moon/sun icon in header
- Preference saved in browser localStorage

## 📊 Question Format

Each question includes:
- Bilingual question text (English & Nepali)
- 4 options in both languages
- Correct answer index (0-3)
- Options displayed as A, B, C, D

## 🔒 Security

- Protected routes (Dashboard, Quiz, Result)
- Only authenticated users can access
- Google OAuth for secure authentication
- No database required - results stored locally

## 🎨 Customization

### Adding More Questions

Edit JSON files in `data/questions/`:
```json
{
  "question_en": "Your question in English?",
  "question_np": "तपाईंको प्रश्न नेपालीमा?",
  "options_en": ["Option A", "Option B", "Option C", "Option D"],
  "options_np": ["विकल्प A", "विकल्प B", "विकल्प C", "विकल्प D"],
  "correct_answer": 0
}
```

### Changing Colors

Edit `tailwind.config.ts` to modify the primary color scheme.

### Adjusting Timer

Edit `app/quiz/[id]/page.tsx` and change:
```typescript
const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Update Google OAuth redirect URI to production URL
5. Deploy

### Other Platforms

Build the project:
```bash
npm run build
npm start
```

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more questions
- Improve UI/UX
- Fix bugs
- Add new features

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for Nepal Loksewa Aspirants**

नेपाल सरकारी सेवा परीक्षाको तयारीको लागि शुभकामना! 🇳🇵
