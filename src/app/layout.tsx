import type { Metadata, Viewport } from 'next'
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
  title: 'إذاعة القرآن الكريم مصر بث مباشر | Quran Kareem Radio Egypt Live',
  description: 'استمع إلى إذاعة القرآن الكريم من مصر بث مباشر على مدار الساعة. Listen to Quran Kareem Radio Egypt live 24/7 — Islamic radio streaming online.',
  keywords: [
    'إذاعة القرآن الكريم', 'بث مباشر قرآن كريم', 'راديو القرآن مصر', 'استماع القرآن الكريم مباشر', 'إذاعة اسلامية مباشرة',
    'Quran Kareem Radio', 'Listen Quran Live', 'Quran Radio Egypt', 'Quran Streaming Online', 'Islamic Radio Live',
  ],
  authors: [{ name: 'Quran Kareem Radio' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: SITE_URL,
    languages: { 'ar': SITE_URL, 'en': SITE_URL },
  },
  openGraph: {
    title: 'إذاعة القرآن الكريم - مصر | Quran Kareem Radio',
    description: 'بث مباشر عبر المصدر الرسمي على مدار الساعة. Live Quran radio from Egypt, 24/7.',
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'إذاعة القرآن الكريم',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Quran Kareem Radio Egypt' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إذاعة القرآن الكريم مصر بث مباشر',
    description: 'استمع إلى القرآن الكريم بث مباشر من مصر. Listen to Quran live from Egypt.',
    images: [`${SITE_URL}/og-image.png`],
  },
  other: {
    'geo.region': 'EG',
    'geo.placename': 'Cairo, Egypt',
    'geo.position': '30.0444;31.2357',
    'ICBM': '30.0444, 31.2357',
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
    broadcastDisplayName: 'إذاعة القرآن الكريم',
    inLanguage: ['ar', 'en'],
    areaServed: { '@type': 'Country', name: 'Egypt' },
    broadcastFrequency: '98.2 FM',
    genre: 'Religious',
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(radioStation) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }} />
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="ar" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <link rel="preconnect" href="https://stream.radiojar.com" />
        <link rel="dns-prefetch" href="https://stream.radiojar.com" />
        <JsonLd />
      </head>
      <body className="bg-bg text-text-primary font-cairo antialiased min-h-screen">{children}</body>
    </html>
  )
}
