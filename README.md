# Fitness Zone – City Walk Dubai | Premium Landing Page

A production-ready, minimalist, contemporary, and high-conversion landing page engineered for **Fitness Zone – City Walk Dubai**, located at City Walk Mall, next to Beit el Kel Restaurant, Al Wasl, Dubai, United Arab Emirates.

---

## 🏛️ Business Profile & Verified Information

- **Brand Name**: Fitness Zone – City Walk Dubai
- **Category**: Gym / Fitness Club
- **Google Rating**: `4.6 / 5.0`
- **Total Google Reviews**: `203`
- **Address**: City Walk Mall, next to Beit el Kel Restaurant, Al Wasl, Dubai, UAE
- **Google Plus Code**: `6746+QJ Dubai, United Arab Emirates`
- **Phone**: `+971 54 727 4777` (Click-to-call: `tel:+971547274777`)
- **Direct WhatsApp**: `https://wa.me/971547274777`
- **Reported Operating Hours**: Open until 11:00 PM (as reported on Google listing)

---

## ⚡ Tech Stack & Architecture

- **Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom editorial dark design tokens
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & Manrope (Google Fonts)
- **Accessibility**: WCAG 2.2 AA compliant (Skip-to-content link, semantic ARIA roles, high contrast, full keyboard navigation)
- **SEO & Structured Data**: Open Graph, Twitter cards, meta tags, and `schema.org/HealthClub` JSON-LD schema
- **Deployment**: Static build output in `dist/` with `robots.txt` and `sitemap.xml`

---

## 📂 Project Structure

```text
gym.website/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Sticky navigation with glassmorphism & mobile drawer
│   │   ├── Hero.tsx               # Immersive hero with dark cinematic overlays & rating badge
│   │   ├── AboutClub.tsx          # "More Than a Workout" split editorial brand philosophy
│   │   ├── TrainingExperience.tsx # 3 editorial training cards with category sync
│   │   ├── FeatureShowcase.tsx    # "Show Up. Put in the Work. Become Stronger."
│   │   ├── WhyFitnessZone.tsx     # 4 concise benefits with bespoke minimal line icons
│   │   ├── GoogleRating.tsx       # "The Experience Speaks" 4.6★ / 203 reviews proof section
│   │   ├── MembershipEnquiry.tsx  # High-impact conversion form + WhatsApp instant dispatch
│   │   ├── LocationContact.tsx    # Directions, interactive map, and direct calling
│   │   ├── FAQ.tsx                # Accessible accordion answering verified questions
│   │   ├── Footer.tsx             # Refined dark footer with dynamic year & verified details
│   │   └── MobileQuickBar.tsx     # Mobile-only sticky bottom bar for 1-tap conversion
│   ├── data/
│   │   └── clubData.ts            # Centralized business configuration file
│   ├── App.tsx                    # Main landing page coordinator & state flow
│   ├── index.css                  # Tailwind styles, glassmorphism, & scrollbar definitions
│   └── main.tsx                   # React root entry
├── index.html                     # Preconnect fonts, SEO meta tags, & JSON-LD
├── tailwind.config.js             # Custom palette (#101010, #C6FF3D, #B8B8B8, etc.)
└── package.json
```

---

## ⚙️ Centralized Content Configuration

All business information, addresses, phone numbers, review metrics, FAQ answers, and training cards are located in a single file:
👉 **[`src/data/clubData.ts`](file:///C:/Users/Syed%20Ghazi%20Ali%20Zaidi/Desktop/gym.website/src/data/clubData.ts)**

To update business details, phone numbers, or hours, edit `CLUB_DATA` in `src/data/clubData.ts`. Changes propagate across all components, meta data, and actions automatically.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```
