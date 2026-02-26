import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import NavBar from '@/components/NavBar'
import { LanguageProvider } from '@/lib/LanguageProvider'
import './globals.css'

const SITE_URL = 'https://quran-radio-app.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A1628',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'إذاعة القرآن الكريم من القاهرة بث مباشر | Quran Kareem Radio Live',
    template: '%s | إذاعة القرآن الكريم',
  },
  description: 'راديو إذاعة القرآن الكريم من القاهرة بث مباشر MP3 بلا انقطاع. تصفح 114 سورة وأبرز القراء. Listen to Quran Radio Egypt live 24/7.',
  keywords: [
    'إذاعة القرآن الكريم', 'من القاهرة بث مباشر', 'بث مباشر MP3 بلا انقطاع',
    'استماع القرآن الكريم مباشر', 'إذاعة اسلامية مباشرة', 'سور القرآن الكريم',
    'قراء القرآن', 'عبد الباسط عبد الصمد', 'محمود خليل الحصري', 'مشاري العفاسي',
    'Quran Kareem Radio', 'Listen Quran Live', 'Quran Radio Egypt',
    'Quran Streaming Online', 'Islamic Radio Live', 'Quran Reciters',
    'Surah Al-Baqarah', 'Surah Yaseen', 'Quran MP3 Online', 'Egypt Islamic Radio',
    'quran audio streaming', 'live quran recitation', 'Abdul Basit quran',
  ],
  authors: [{ name: 'Ali Hegazy', url: 'mailto:ali.hegazy.dev.1@gmail.com' }],
  creator: 'Ali Hegazy',
  category: 'religion',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { 'ar': SITE_URL, 'en': SITE_URL, 'x-default': SITE_URL },
  },
  openGraph: {
    title: 'إذاعة القرآن الكريم من القاهرة بث مباشر | Quran Kareem Radio',
    description: 'الاستماع إلى راديو إذاعة القرآن الكريم من القاهرة بث مباشر MP3 بلا انقطاع عبر المصدر الرسمي على مدار الساعة. 114 سورة وكبار القراء.',
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'إذاعة القرآن الكريم',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'إذاعة القرآن الكريم من القاهرة بث مباشر' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إذاعة القرآن الكريم من القاهرة بث مباشر | Quran Radio Live',
    description: 'الاستماع إلى راديو إذاعة القرآن الكريم من القاهرة بث مباشر MP3 بلا انقطاع عبر المصدر الرسمي على مدار الساعة.',
    images: [`${SITE_URL}/og-image.png`],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Quran Radio',
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Cairo, Egypt',
    'geo.position': '30.0444;31.2357',
    'ICBM': '30.0444, 31.2357',
    'rating': 'general',
    'revisit-after': '7 days',
  },
}

function JsonLd() {
  const radioStation = {
    '@context': 'https://schema.org',
    '@type': 'RadioStation',
    name: 'إذاعة القرآن الكريم - مصر',
    alternateName: 'Quran Kareem Radio Egypt',
    description: 'Egyptian national Quran radio station broadcasting 24/7 live Quran recitation from Cairo.',
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    broadcastDisplayName: 'إذاعة القرآن الكريم',
    inLanguage: ['ar', 'en'],
    areaServed: { '@type': 'Country', name: 'Egypt' },
    broadcastFrequency: '98.2 FM',
    genre: 'Religious',
    priceRange: 'Free',
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'إذاعة القرآن الكريم | Quran Kareem Radio',
    url: SITE_URL,
    inLanguage: ['ar', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL
    }]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(radioStation).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c') }} />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://stream.radiojar.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://stream.radiojar.com" />
        <link rel="apple-touch-icon" href={`${SITE_URL}/apple-touch-icon.png`} />

        {/* Preload Cairo font for Core Web Vitals (CLS optimization) */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&amp;display=swap"
          as="style"
        />
        <JsonLd />
      </head>
      <body className="bg-bg text-text-primary font-cairo antialiased min-h-screen pt-14 md:pt-16">
        <LanguageProvider>
          <NavBar />
          {children}
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

