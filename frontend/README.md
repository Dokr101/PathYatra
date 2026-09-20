# YatraPath — Frontend Guide & Developer Documentation

> *"Let the path find you"* · Nepal Tourism Intelligent Itinerary Engine  
> 6th Semester BCA Capstone Project · Tribhuvan University

---

## 1. Quick Start

```bash
cd frontend
npm install
npm run dev
```

The application will start at `http://localhost:5173`.  
All API calls directed to `/api/*` are automatically proxied to Apache / XAMPP at `http://localhost/Yatra/api`.

---

## 2. Developer Customization Handbook

### A. How to Swap Hero Images & Slideshow
The Hero section features a **Living Landscape** slideshow synced with the headline's rotating word ticker in `src/components/home/Hero.jsx`:

```javascript
// In src/components/home/Hero.jsx
const HERO_SCENES = [
  {
    name: 'Annapurna Range',
    region: 'Gandaki Province',
    coords: '28.5961° N, 83.8203° E',
    tone: '#1B3B4B',
    accent: 'rgba(211, 160, 69, 0.3)',
    // To add real photos:
    // image: '/heroes/annapurna.webp'
  },
  ...
];
```
Place new high-resolution images in `public/heroes/` and reference them directly.

---

### B. Logo Asset Location & Preservation Rules
- **Physical file location**: `public/logo.svg` and `src/assets/logo.svg`
- **Rule**: The logo SVG must remain **untouched and crisp**. It is loaded via standard `<img>` tags across the application (`/logo.svg`).
- **Shared FLIP motion**: In `src/components/intro/IntroOverlay.jsx`, the logo measures the target navbar slot using `getBoundingClientRect()` and animates GPU transforms (`x`, `y`, `scale`, temporary motion blur) directly to `data-nav-logo`.

---

### C. Design Tokens & Color Palette
All tokens are defined as CSS variables in `src/styles/tokens.css`:

```css
:root {
  --ink:        #0F1A22;   /* Deep Himalayan night (dark sections) */
  --pine:       #1B3B4B;   /* Forest / brand-dark */
  --slate:      #2B3A45;   /* Secondary dark */
  --snow:       #F4EFE6;   /* Warm ivory (main light background) */
  --paper:      #EAE3D6;   /* Section alternate */
  --marigold:   #D3A045;   /* Muted saffron accent (CTAs, highlights) */
  --terracotta: #B4533A;   /* Brick / sindoor secondary accent */
  --sage:       #8FA58A;   /* Soft supporting green */
  --stone:      #A39B8D;   /* Muted text / hairline borders */
}
```

---

### D. Cinematic Intro Timing Tweaks
All intro timeline milliseconds are exposed as clean constants at the top of `src/components/intro/IntroOverlay.jsx`:

```javascript
export const INTRO_TIMING = {
  BEAT_HOLD: 150,      // Screen is pure ink
  REVEAL_START: 100,   // Logo opacity/scale starts
  REVEAL_END: 650,     // Logo sharp
  HOLD_END: 900,       // Logo holds still
  TRAVEL_START: 900,   // FLIP translation to navbar begins
  TRAVEL_END: 1550,    // Logo docks at navbar position
  BACKDROP_START: 950, // Ink background fades out
  BACKDROP_END: 1500,  // Hero visible
  STAGGER_START: 1200, // Hero content fades & slides up
  TOTAL: 1800,         // Intro unmounts, scroll unlocks
};
```

- To test the intro again in the same browser session: clear sessionStorage or run `sessionStorage.removeItem('yp_intro_seen')`.
- Reduced motion: Users with `prefers-reduced-motion` skip travel/blur and receive a 300ms gentle crossfade.
