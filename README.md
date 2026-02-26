<div align="center">

# 🕌 Quran Kareem Radio | إذاعة القرآن الكريم

**بث مباشر — Live Stream from Egypt**

A modern, open-source web app for listening to Quran Kareem Radio from Egypt — with SEO-optimised pages for all 114 Surahs and top reciters.

مشروع مفتوح المصدر للاستماع إلى إذاعة القرآن الكريم من مصر، مع صفحات محسّنة لـ 114 سورة وكبار القراء.

[![License: MIT](https://img.shields.io/badge/License-MIT-D4A853.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000.svg)](https://quran-radio-app.vercel.app)
[![SEO](https://img.shields.io/badge/SEO-Optimised-2D8B6F.svg)](#-seo--geo-optimization)

**[🌐 Live Demo → quran-radio-app.vercel.app](https://quran-radio-app.vercel.app)**

</div>

---

## ⚠️ Disclaimer | إخلاء مسؤولية

> **This project is NOT affiliated with the official Quran Kareem broadcast in Egypt.**
> I do not own any rights to the content being broadcast.
> All broadcast rights belong to the official source: [misrquran.gov.eg](https://misrquran.gov.eg/)
> This project only aims to make the stream more accessible.

> **هذا المشروع غير تابع لإذاعة القرآن الكريم الرسمية في مصر.**
> لا أملك أي حقوق على المحتوى المذاع.
> جميع حقوق البث محفوظة للمصدر الرسمي: [misrquran.gov.eg](https://misrquran.gov.eg/)
> هذا المشروع يهدف فقط لتسهيل الوصول للبث.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎙️ Live Radio | 24/7 stream from official Egyptian Quran Radio |
| 📖 114 Surah Pages | Dedicated SEO page for every Surah with individual player |
| 🎤 Reciter Pages | Dedicated pages for top reciters (Abdul Basit, Al-Hussary, Alafasy…) |
| 🎛️ DSP Quality Modes | Low / Medium / High / Studio (Web Audio API) |
| 📊 Frequency Spectrum | Real-time audio visualizer |
| 🌐 Bilingual | Arabic (RTL) + English (LTR), auto-detected from browser |
| 🗺️ Navigation | Responsive navbar with Radio, Reciters, Surahs, Contact tabs |
| 🎨 Premium UI | Glassmorphism, geometric Islamic patterns, micro-animations |
| 📱 Responsive | Mobile-first, works on all screen sizes |
| 🔍 SEO Optimised | JSON-LD, hreflang, geo tags, OG/Twitter cards, full sitemap |
| ⚡ Performance | Next.js SSG/ISR, preloaded fonts, Core Web Vitals optimised |

---

## 🔍 SEO & GEO Optimization

The app is fully optimised for search engines and Arabic-speaking audiences:

### Technical SEO
- **Dynamic `sitemap.xml`** — includes homepage, `/reciters`, `/surahs`, `/contact`, all 114 surah pages, and all reciter pages with correct `priority` and `changeFreq`
- **`robots.txt`** — allows all crawlers, blocks AI scrapers (GPTBot, CCBot), declares sitemap and host
- **Canonical URLs** on every page
- **hreflang tags** (`ar`, `en`, `x-default`) in the global layout
- **Title template** — `[Page Title] | إذاعة القرآن الكريم` for consistent branding

### Structured Data (JSON-LD)
- `RadioStation` schema — name, frequency, genre, area, language
- `WebSite` schema — with `SearchAction` potentialAction
- `BreadcrumbList` schema on the homepage
- `AudioObject` schema on each Surah page
- `ProfilePage` schema on each Reciter page

### GEO Targeting
- `geo.region: EG`, `geo.placename: Cairo, Egypt`, `geo.position` + `ICBM` meta tags
- Open Graph locale set to `ar_EG`

### Open Graph & Twitter Cards
- `summary_large_image` Twitter card
- 1200×630 OG image at `/og-image.png`
- Bilingual OG descriptions (Arabic + English)

### Content SEO
- All 114 Surah pages individually crawlable with unique titles, descriptions, and JSON-LD
- All reciter pages individually crawlable with Profile schema
- Crawlable Arabic + English content blocks on the homepage for search indexing
- Keyword-rich metadata: surah names, reciter names, Arabic + English queries

### Performance
- Cairo font preloaded via `rel="preload"` for CLS optimisation
- `preconnect` + `dns-prefetch` for the stream CDN
- Static generation (SSG) for all surah and reciter pages
- 24-hour ISR revalidation for Quran API data

---

## 🗂️ Page Structure

| URL | Description |
|---|---|
| `/` | Main hero page with live radio player |
| `/reciters` | Browse all Quran reciters |
| `/reciter/[slug]` | Individual reciter page with dedicated player |
| `/surahs` | Browse all 114 Surahs |
| `/surah/[slug]` | Individual Surah page with dedicated player |
| `/contact` | Contact page with email |
| `/sitemap.xml` | Auto-generated XML sitemap |
| `/robots.txt` | Crawl directives |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | SSG, ISR, routing, metadata API |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Web Audio API** | DSP processing, AnalyserNode, spectrum visualizer |
| **Quran.com API v4** | Surah data (names, verse counts, slugs) |
| **Vercel** | Hosting, Analytics, Speed Insights |

---

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/Ali-Hegazy-Ai/quran-radio-app.git
cd quran-radio-app

# Install
npm install

# Create env file
echo "NEXT_PUBLIC_STREAM_URL=https://stream.radiojar.com/8s5u5tpdtwzuv" > .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout — global SEO metadata, NavBar
│   ├── page.tsx             # Homepage — live radio hero
│   ├── sitemap.ts           # Dynamic XML sitemap (all pages)
│   ├── robots.ts            # robots.txt directives
│   ├── globals.css          # Global styles, animations, Tailwind
│   ├── contact/             # Contact page
│   ├── reciters/            # Reciters listing page
│   ├── reciter/[slug]/      # Dynamic reciter pages (SSG)
│   ├── surahs/              # Surahs listing page
│   └── surah/[slug]/        # Dynamic surah pages (SSG, 114 pages)
├── components/
│   ├── NavBar.tsx           # Responsive top navigation bar
│   ├── PlayerCard.tsx       # Main audio player component
│   ├── AudioController.tsx  # Play/pause/volume/DSP controls
│   ├── AudioSpectrum.tsx    # Frequency visualizer (canvas)
│   ├── QualitySelector.tsx  # DSP mode selector
│   ├── StatusIndicator.tsx  # Connection state display
│   ├── LiveBadge.tsx        # LIVE badge
│   ├── LanguageToggle.tsx   # AR/EN switcher
│   ├── DecorativeMotif.tsx  # Islamic geometric SVG motif
│   └── ErrorFallback.tsx    # Stream error UI
└── lib/
    ├── audioEngine.ts       # Web Audio API state machine
    ├── i18n.ts              # Bilingual string map (AR/EN)
    └── api/
        ├── quran.ts         # Quran.com API wrapper
        └── reciters.ts      # Static reciters list
```

---

## 📄 License

[MIT](LICENSE) — see LICENSE file for details.

All broadcast content rights belong to the official Quran Kareem Radio — Egypt.

---

<div align="center">

**أسأل الله أن يهديني، فلا تنسوني من دعائكم.**

*I ask Allah to guide me, please remember me in your prayers.*

📧 [ali.hegazy.dev.1@gmail.com](mailto:ali.hegazy.dev.1@gmail.com)

</div>
