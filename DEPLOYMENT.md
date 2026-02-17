# 🚀 Deployment Guide

## Deploying to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- Google OAuth credentials

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Loksewa Preparation Portal"
git branch -M main
git remote add origin https://github.com/yourusername/loksewa-portal.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

### Step 3: Add Environment Variables

In Vercel dashboard, go to Settings → Environment Variables:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_generated_secret
```

### Step 4: Update Google OAuth

1. Go to Google Cloud Console
2. Navigate to your OAuth credentials
3. Add authorized redirect URI:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
4. Save changes

### Step 5: Deploy

Click "Deploy" in Vercel dashboard. Your site will be live in ~2 minutes!

---

## Deploying to Netlify

### Step 1: Build Settings

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Environment Variables

Add in Netlify dashboard:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

### Step 3: Deploy

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## Deploying to Custom Server (VPS)

### Prerequisites
- Ubuntu 20.04+ server
- Node.js 18+
- Nginx
- Domain name

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Step 2: Clone and Build

```bash
# Clone repository
git clone https://github.com/yourusername/loksewa-portal.git
cd loksewa-portal

# Install dependencies
npm install

# Create .env.local
nano .env.local
# Add your environment variables

# Build
npm run build
```

### Step 3: Start with PM2

```bash
# Start application
pm2 start npm --name "loksewa-portal" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Step 4: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/loksewa-portal
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/loksewa-portal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## Deploying to Railway

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login and Deploy

```bash
railway login
railway init
railway up
```

### Step 3: Add Environment Variables

```bash
railway variables set GOOGLE_CLIENT_ID=your_value
railway variables set GOOGLE_CLIENT_SECRET=your_value
railway variables set NEXTAUTH_URL=https://your-app.railway.app
railway variables set NEXTAUTH_SECRET=your_secret
```

---

## Post-Deployment Checklist

### ✅ Functionality Testing
- [ ] Login with Google works
- [ ] All pages load correctly
- [ ] Quiz timer functions properly
- [ ] Results are displayed with charts
- [ ] Language switching works
- [ ] Dark mode toggles correctly
- [ ] Mobile responsive on all devices

### ✅ Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score > 90

### ✅ SEO Optimization
- [ ] Meta tags present
- [ ] Open Graph tags added
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Analytics integrated (optional)

### ✅ Security
- [ ] HTTPS enabled
- [ ] Environment variables secure
- [ ] OAuth redirect URIs correct
- [ ] No sensitive data exposed
- [ ] CORS configured properly

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS:
   ```
   A Record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```

---

## Monitoring & Maintenance

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
```

### Uptime Monitoring
- Use UptimeRobot (free)
- Use Pingdom
- Use StatusCake

---

## Backup Strategy

### Database (if added later)
```bash
# Automated daily backups
0 2 * * * /usr/bin/mongodump --out /backup/$(date +\%Y\%m\%d)
```

### Code Repository
- Keep GitHub repository updated
- Tag releases: `git tag v1.0.0`
- Maintain changelog

---

## Scaling Considerations

### When to Scale
- > 10,000 daily users
- > 100,000 quiz attempts/month
- Response time > 2 seconds

### Scaling Options
1. **Vercel Pro** - $20/month
   - More bandwidth
   - Better performance
   - Priority support

2. **Add CDN** - Cloudflare (free)
   - Faster global delivery
   - DDoS protection
   - Caching

3. **Database** - MongoDB Atlas (free tier)
   - Persistent data storage
   - User analytics
   - Result history

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### OAuth Not Working
- Check redirect URIs match exactly
- Verify environment variables
- Check Google Console for errors

### Slow Performance
- Enable image optimization
- Add caching headers
- Minimize bundle size
- Use CDN

---

## Support & Updates

### Keeping Updated
```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix vulnerabilities
npm audit fix
```

### Getting Help
- Check documentation
- Review error logs
- Contact support
- Community forums

---

**Your Loksewa Portal is now live! 🎉🇳🇵**

Share it with students and help them prepare for their exams!
