# P&J GLASS - WEBSITE PROJECT

## 🎯 Project Overview

Modern, high-performance website for P&J Glass built with **Next.js 14**, **React**, and **Tailwind CSS**.

### Features:
- ✅ Fast, responsive design optimized for mobile
- ✅ Custom glass solutions showcase
- ✅ Online design/quote tools
- ✅ E-commerce ready structure
- ✅ SEO optimized with metadata
- ✅ Modern glassmorphism UI effects

---

## 📁 Project Structure

```
pj-glass-website/
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout with Header/Footer
│   │   ├── page.js                # Homepage
│   │   ├── globals.css            # Global styles + components
│   │   ├── contact/
│   │   │   └── page.js            # Contact page with form
│   │   └── services/
│   │       ├── balustrades/
│   │       │   └── page.js        # Glass balustrades service
│   │       ├── splashbacks/
│   │       ├── showers/
│   │       └── mirrors/
│   │
│   └── components/
│       ├── Header.js              # Navigation with dropdowns
│       └── Footer.js              # Footer with links & contact
│
├── public/
│   └── images/
│       ├── hero/                  # Hero section images
│       └── services/              # Service page images
│
├── tailwind.config.js             # Tailwind + brand colors
├── package.json                   # Dependencies
├── postcss.config.js              # PostCSS config
├── next.config.js                 # Next.js config
└── README.md                      # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion (for animations)

### 2. Add Images

**Required images** (add to `/public/images/`):

```
public/images/
├── logo.svg                       # White background logo
├── logo-white.svg                 # White logo for dark backgrounds
├── hero-balustrade.jpg            # Homepage hero image
├── contact-hero.jpg               # Contact page hero
├── og-image.jpg                   # Social media preview (1200x630)
└── services/
    ├── balustrades-hero.jpg
    ├── frameless-balustrade.jpg
    ├── semi-frameless-balustrade.jpg
    └── juliet-balcony.jpg
```

**Stock image sources:**
- [Unsplash](https://unsplash.com/s/photos/glass-balustrade)
- [Pexels](https://www.pexels.com/search/glass-railing/)
- Use keywords: "glass balustrade", "glass railing", "modern staircase"

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Update Content

#### Contact Information
Edit [src/components/Footer.js](src/components/Footer.js):
```javascript
// Lines 29-62: Update phone, email, address
```

#### Google Maps
Edit [src/app/contact/page.js](src/app/contact/page.js):
```javascript
// Line 237: Replace with your Google Maps embed URL
```

#### Form Endpoint
Edit [src/app/contact/page.js](src/app/contact/page.js):
```javascript
// Line 31: Replace 'YOUR_FORM_ID' with Formspree ID
// Get free ID at: https://formspree.io
```

---

## 🎨 Design System

### Brand Colors (from [tailwind.config.js](tailwind.config.js))

```css
Primary Blue:    #1E88E5
Secondary Teal:  #00ACC1
Success Green:   #43A047
Charcoal:        #263238
Grey:            #546E7A
```

### Component Classes (from [globals.css](src/app/globals.css))

```html
<!-- Buttons -->
<button class="btn-primary">Primary CTA</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-outline">Outline Button</button>

<!-- Cards -->
<div class="card">Card with shadow</div>

<!-- Forms -->
<input class="input-field" type="text" />

<!-- Effects -->
<div class="glass-effect">Glassmorphism background</div>
<div class="hero-overlay">Dark gradient overlay</div>
```

---

## 📄 Pages to Build Next

### Priority 1 (This Week):
1. **Service Pages** - Copy [balustrades/page.js](src/app/services/balustrades/page.js) structure for:
   - `/services/splashbacks`
   - `/services/showers`
   - `/services/mirrors`

2. **About Page** - `/about`
   - Company story
   - Team photos
   - Certifications
   - Timeline

3. **Portfolio Page** - `/portfolio`
   - Project gallery
   - Before/after photos
   - Customer testimonials

### Priority 2 (Next Week):
4. **Online Store** - `/store`
   - Product categories
   - Color selector tool
   - Price calculator
   - Add to cart

5. **Trade Services** - `/trade`
   - B2B information
   - Trade pricing
   - Bulk order form

---

## 🛒 E-commerce Integration

### Recommended: Stripe + Custom Cart

**Install Stripe:**
```bash
npm install @stripe/stripe-js stripe
```

**Create files:**
```
src/lib/stripe.js          # Stripe configuration
src/lib/products.js        # Product catalog
src/components/Cart.js     # Shopping cart
src/app/checkout/page.js   # Checkout page
```

**Environment variables (.env.local):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## 📱 Mobile Testing

Test on multiple devices:
- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPad (768px)
- Desktop (1920px)

Use Chrome DevTools Device Mode (Cmd+Shift+M on Mac).

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Free features:**
- Automatic HTTPS
- Global CDN
- Zero-config deployment
- Instant preview URLs

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

### Environment Variables

Add these in your hosting dashboard:
```
NEXT_PUBLIC_SITE_URL=https://pjglass.co.uk
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
FORMSPREE_ID=your_formspree_id
```

---

## ✅ Pre-Launch Checklist

### Content:
- [ ] Replace all placeholder images
- [ ] Update contact information (phone, email, address)
- [ ] Add real company logo
- [ ] Write SEO meta descriptions
- [ ] Add Google Analytics tracking ID
- [ ] Set up Google Maps embed
- [ ] Configure form submission (Formspree)

### Technical:
- [ ] Test all navigation links
- [ ] Test contact form submission
- [ ] Verify mobile responsiveness
- [ ] Check page load speed (GTmetrix, PageSpeed)
- [ ] Test on Safari, Chrome, Firefox, Edge
- [ ] Set up 301 redirects from old WordPress URLs
- [ ] Submit sitemap to Google Search Console
- [ ] Add SSL certificate (automatic on Vercel)

### Legal:
- [ ] Add Privacy Policy page
- [ ] Add Terms & Conditions page
- [ ] Add Cookie Consent banner (if needed)
- [ ] Update company registration number in footer

---

## 🔧 Customization Tips

### Change Colors

Edit [tailwind.config.js](tailwind.config.js):
```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',  // Change primary blue
  },
}
```

### Add Animation

Use Framer Motion in any component:
```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content here
</motion.div>
```

### Add New Page

```bash
# Create folder and file
mkdir -p src/app/new-page
touch src/app/new-page/page.js
```

```javascript
// src/app/new-page/page.js
export const metadata = {
  title: 'Page Title | P&J Glass',
};

export default function NewPage() {
  return <main>Your content</main>;
}
```

---

## 📚 Documentation & Resources

### Next.js:
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools:
- [Formspree](https://formspree.io) - Form handling
- [Stripe](https://stripe.com/docs) - Payments
- [Unsplash](https://unsplash.com) - Free stock images
- [SVGR](https://react-svgr.com) - SVG to React component

### Performance:
- [PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- [WebPageTest](https://www.webpagetest.org)

---

## 🐛 Troubleshooting

### Images not loading?
- Ensure images are in `/public/images/`
- Check file extensions match (jpg vs jpeg)
- Update `next.config.js` domains if using external images

### Tailwind classes not working?
```bash
# Restart dev server
npm run dev
```

### Build errors?
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## 📞 Support

Built by: **GitHub Copilot**  
Date: January 2026  
Version: 1.0.0  

For technical issues, check the [migration plan](pj-glass-wordpress-to-custom-code-migration.md) for detailed implementation guides.

---

## 📈 Next Steps

1. **Today:** Run `npm install` → Add images → Run `npm run dev`
2. **This Week:** Build remaining service pages + about page
3. **Next Week:** Add e-commerce functionality
4. **Week 3-4:** Content review, testing, and deployment

**Good luck with the build! 🚀**
