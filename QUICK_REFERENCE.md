# ⚡ Quick Reference Card

## 🚀 Essential Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🔑 Environment Variables

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing page |
| `app/dashboard/page.tsx` | Dashboard |
| `app/quiz/[id]/page.tsx` | Quiz interface |
| `data/questions/set1.json` | General Knowledge questions |
| `components/Header.tsx` | Navigation header |
| `contexts/LanguageContext.tsx` | Language switching |

## 🎯 Key Routes

```
/                    → Landing page
/login              → Login page
/dashboard          → Dashboard (protected)
/quiz/1             → General Knowledge quiz
/quiz/2             → Mathematics quiz
/quiz/3             → Computer quiz
/quiz/4             → Language quiz
/result             → Results page
/blog               → Blog listing
/syllabus           → Syllabus page
/model-papers       → Model papers
```

## 🎨 Color Codes

```css
Primary Blue:    #0056e0
Primary Dark:    #00337a
Success Green:   #10b981
Warning Orange:  #f59e0b
Error Red:       #ef4444
```

## 📝 Adding Questions

Edit `data/questions/setX.json`:

```json
{
  "question_en": "Your question?",
  "question_np": "तपाईंको प्रश्न?",
  "options_en": ["A", "B", "C", "D"],
  "options_np": ["क", "ख", "ग", "घ"],
  "correct_answer": 0
}
```

## 🌐 Language Keys

Common translation keys in `contexts/LanguageContext.tsx`:
- `appTitle` - App name
- `home` - Home
- `dashboard` - Dashboard
- `login` - Login
- `logout` - Logout
- `startQuiz` - Start Quiz
- `submit` - Submit

## 🔧 Common Tasks

### Change Timer Duration
File: `app/quiz/[id]/page.tsx`
```typescript
const [timeLeft, setTimeLeft] = useState(600); // 600 = 10 minutes
```

### Change Primary Color
File: `tailwind.config.ts`
```typescript
colors: {
  primary: {
    600: '#0056e0', // Change this
  }
}
```

### Add New Question Set
1. Create `data/questions/set5.json`
2. Add translations in `contexts/LanguageContext.tsx`
3. Add card in `app/dashboard/page.tsx`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| OAuth error | Check redirect URI in Google Console |
| Build fails | Delete `.next` and `node_modules`, reinstall |
| Questions not loading | Verify JSON syntax in question files |
| Dark mode not working | Clear localStorage |
| Timer not working | Check browser console for errors |

## 📦 Dependencies

```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "next-auth": "^4.24.0",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "tailwindcss": "^3.4.0"
}
```

## 🔒 Security Checklist

- [ ] Environment variables set
- [ ] OAuth redirect URIs configured
- [ ] NEXTAUTH_SECRET generated
- [ ] HTTPS enabled in production
- [ ] Protected routes working

## 📱 Testing Checklist

- [ ] Login works
- [ ] All quizzes load
- [ ] Timer counts down
- [ ] Results display correctly
- [ ] Language switching works
- [ ] Dark mode toggles
- [ ] Mobile responsive
- [ ] All links work

## 🚀 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables added
- [ ] Google OAuth updated
- [ ] Build successful
- [ ] All pages accessible
- [ ] Performance tested
- [ ] SEO optimized

## 📊 File Structure Quick View

```
loksewa-portal/
├── app/              # Pages
├── components/       # UI components
├── contexts/         # State management
├── data/            # Questions
├── lib/             # Utilities
├── types/           # TypeScript types
├── public/          # Static files
└── *.md             # Documentation
```

## 💡 Pro Tips

1. **Development**: Use `npm run dev` for hot reload
2. **Questions**: Keep JSON files properly formatted
3. **Translations**: Add both English and Nepali
4. **Testing**: Test on mobile devices
5. **Performance**: Optimize images before adding
6. **Security**: Never commit `.env.local`
7. **Deployment**: Use Vercel for easiest setup
8. **Updates**: Keep dependencies updated

## 🎓 Learning Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- NextAuth: https://next-auth.js.org
- Chart.js: https://www.chartjs.org/docs

## 📞 Quick Links

- PSC Official: https://psc.gov.np
- GitHub Repo: [Your repo URL]
- Live Demo: [Your demo URL]
- Documentation: See README.md

---

**Keep this card handy for quick reference!** 📌
