'use client'
import PlayerCard from '@/components/PlayerCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Static geometric background — professional, no animations */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {/* Geometric diamond grid */}
        <div className="absolute inset-0 opacity-[0.018]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g1" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="#D4A853" strokeWidth="0.4" />
                <circle cx="40" cy="40" r="12" fill="none" stroke="#2D8B6F" strokeWidth="0.3" />
                <path d="M40 28L52 40L40 52L28 40Z" fill="none" stroke="#D4A853" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g1)" />
          </svg>
        </div>

        {/* Concentric circles — static */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.025]">
          <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="95" fill="none" stroke="#2D8B6F" strokeWidth="0.3" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#D4A853" strokeWidth="0.25" />
            <circle cx="100" cy="100" r="55" fill="none" stroke="#2D8B6F" strokeWidth="0.2" />
            <circle cx="100" cy="100" r="35" fill="none" stroke="#D4A853" strokeWidth="0.15" />
          </svg>
        </div>

        {/* Corner decorative stars */}
        <div className="absolute top-[8%] left-[8%] w-[120px] h-[120px] opacity-[0.02]">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L61 39L95 39L67 59L78 93L50 73L22 93L33 59L5 39L39 39Z" fill="none" stroke="#D4A853" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-[8%] right-[8%] w-[100px] h-[100px] opacity-[0.02]">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L58 38L88 38L64 56L72 84L50 68L28 84L36 56L12 38L42 38Z" fill="none" stroke="#2D8B6F" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Radial glows — static */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-radial from-accent/[0.035] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-radial from-emerald/[0.025] to-transparent rounded-full blur-3xl" />
      </div>

      <PlayerCard />

      {/* Featured Surahs & Reciters — styled cards (also crawlable by SEO bots) */}
      <nav
        className="max-w-card w-full mx-auto mt-8 px-4 relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        dir="rtl"
        aria-label="روابط سريعة"
      >
        {/* Surahs Card */}
        <div className="card-glass rounded-2xl border border-border/60 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border/40 bg-white/[0.02]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h3 className="text-text-primary font-cairo font-bold text-[14px]">أبرز السور</h3>
          </div>
          <ul className="divide-y divide-border/20">
            {[
              { href: '/surah/al-baqarah', label: 'سورة البقرة' },
              { href: '/surah/ya-sin', label: 'سورة يس' },
              { href: '/surah/ar-rahman', label: 'سورة الرحمن' },
              { href: '/surah/al-kahf', label: 'سورة الكهف' },
              { href: '/surah/al-waqi-ah', label: 'سورة الواقعة' },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center justify-between gap-3 px-5 py-2.5 text-[13px] text-text-secondary hover:text-accent hover:bg-white/[0.03] transition-all group"
                >
                  <span className="font-semibold">{label}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-accent/40 group-hover:text-accent transition-colors shrink-0" aria-hidden="true">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 border-t border-border/30 bg-white/[0.015]">
            <a href="/surahs" className="flex items-center justify-center gap-1.5 text-accent/60 hover:text-accent text-[11px] font-semibold transition-colors">
              عرض جميع السور
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                <polyline points="9 18 3 12 9 6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Reciters Card */}
        <div className="card-glass rounded-2xl border border-border/60 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border/40 bg-white/[0.02]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3 className="text-text-primary font-cairo font-bold text-[14px]">كبار القراء</h3>
          </div>
          <ul className="divide-y divide-border/20">
            {[
              { href: '/reciter/abdul-basit', label: 'الشيخ عبد الباسط عبد الصمد' },
              { href: '/reciter/mahmoud-al-hussary', label: 'الشيخ محمود خليل الحصري' },
              { href: '/reciter/mishary-alafasy', label: 'الشيخ مشاري راشد العفاسي' },
              { href: '/reciter/mohamed-el-minshawi', label: 'الشيخ محمد صديق المنشاوي' },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center justify-between gap-3 px-5 py-2.5 text-[13px] text-text-secondary hover:text-accent hover:bg-white/[0.03] transition-all group"
                >
                  <span className="font-semibold">{label}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-accent/40 group-hover:text-accent transition-colors shrink-0" aria-hidden="true">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 border-t border-border/30 bg-white/[0.015]">
            <a href="/reciters" className="flex items-center justify-center gap-1.5 text-accent/60 hover:text-accent text-[11px] font-semibold transition-colors">
              عرض جميع القراء
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
                <polyline points="9 18 3 12 9 6" />
              </svg>
            </a>
          </div>
        </div>
      </nav>


      {/* Crawlable SEO content */}
      <section className="max-w-card w-full mx-auto mt-12 px-4 relative z-10" aria-label="عن الإذاعة">
        <h2 className="text-text-secondary text-sm font-semibold text-center mb-3">
          Quran Kareem Radio — إذاعة القرآن الكريم
        </h2>
        <div className="text-text-muted/40 text-[10px] leading-relaxed text-center space-y-2">
          <p lang="ar" dir="rtl">
            استمع إلى إذاعة القرآن الكريم من القاهرة بث مباشر على مدار الساعة 24/7.
            المحطة الإذاعية الرسمية للقرآن الكريم في مصر تبث تلاوات قرآنية وبرامج إسلامية مستمرة،
            متاحة لجميع المسلمين حول العالم عبر البث الإسلامي المباشر.
          </p>
          <p lang="ar" dir="rtl">
            راديو القرآن الكريم — تلاوة مستمرة للقرآن الكريم بأصوات كبار قراء مصر والعالم الإسلامي.
          </p>
        </div>
        <h3 className="sr-only">Keywords</h3>
        <p className="sr-only">
          Quran Radio Egypt, Islamic Radio Live, Quran Streaming Online, Listen Quran Live,
          إذاعة اسلامية مباشرة, بث مباشر قرآن كريم, راديو القرآن مصر, استماع القرآن الكريم مباشر
        </p>
      </section>
    </main>
  )
}
