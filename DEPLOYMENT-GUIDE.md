# 🚀 P&J GLASS - DEPLOYMENT GUIDE

## GitHub & Vercel Deployment Steps

### ✅ Step 1: Push to GitHub

After creating your repository on GitHub, run these commands:

```bash
cd "/Users/navjotsinghhundal/Documents/P&J Glass"

# Set your GitHub repository URL (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/pj-glass-website.git

# Rename branch to main (if not already)
git branch -M main

# Push your code
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

### ✅ Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"** (use GitHub account)
3. Click **"Add New..."** → **"Project"**
4. **Import** your `pj-glass-website` repository
5. Vercel will auto-detect Next.js settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment
8. 🎉 Your site is live!

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? [your-username]
# - Link to existing project? N
# - Project name? pj-glass-website
# - Directory? ./
# - Override settings? N

# For production deployment
vercel --prod
```

---

### 🌐 Your Live URLs

After deployment, you'll get:

- **Preview URL:** `https://pj-glass-website-[random].vercel.app`
- **Production URL:** `https://pj-glass-website.vercel.app`

---

### 🔧 Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `pjglass.co.uk`)
4. Follow DNS setup instructions
5. SSL certificate is automatic!

---

### 📝 Environment Variables (If Needed Later)

When you add Formspree or other services:

1. Go to project **"Settings"** → **"Environment Variables"**
2. Add variables like:
   - `NEXT_PUBLIC_FORMSPREE_ID`
   - `NEXT_PUBLIC_GA_ID` (Google Analytics)
3. Redeploy for changes to take effect

---

### 🔄 Future Updates

To update your live site after making changes:

```bash
# Make your changes to the code
# Then commit and push:

git add .
git commit -m "Description of changes"
git push

# Vercel will automatically redeploy!
```

---

### ✅ Post-Deployment Checklist

After your site is live:

- [ ] Test all pages work
- [ ] Check mobile responsiveness
- [ ] Verify all links function
- [ ] Test contact form (once Formspree is set up)
- [ ] Update contact information with real details
- [ ] Add Google Analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Share your new website! 🎉

---

### 🆘 Common Issues

**Build fails on Vercel:**
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Run `npm run build` locally to test

**404 errors:**
- Check Next.js routing (all pages should be in `src/app/`)
- Verify file names are correct

**Images not loading:**
- Images in `/public/images/` are accessible at `/images/`
- Use proper image paths in your code

---

### 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Docs:** https://docs.github.com

---

**Your website is ready to go live! 🚀**
