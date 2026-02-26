'use client'
import PlayerCard from '@/components/PlayerCard'
import { useLang } from '@/lib/LanguageProvider'

export default function Home() {
  const { lang } = useLang()
  const ar = lang === 'ar'
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
        dir={ar ? 'rtl' : 'ltr'}
        aria-label={ar ? 'روابط سريعة' : 'Quick links'}
      >
        {/* Surahs Card */}
        <div className="card-glass rounded-2xl border border-border/60 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border/40 bg-white/[0.02]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h3 className="text-text-primary font-cairo font-bold text-[14px]">{ar ? 'أبرز السور' : 'Featured Surahs'}</h3>
          </div>
          <ul className="divide-y divide-border/20">
            {[
              { href: '/surah/al-baqarah', labelAr: 'سورة البقرة', labelEn: 'Surah Al-Baqarah' },
              { href: '/surah/ya-sin', labelAr: 'سورة يس', labelEn: 'Surah Ya-Sin' },
              { href: '/surah/ar-rahman', labelAr: 'سورة الرحمن', labelEn: 'Surah Ar-Rahman' },
              { href: '/surah/al-kahf', labelAr: 'سورة الكهف', labelEn: 'Surah Al-Kahf' },
              { href: '/surah/al-waqi-ah', labelAr: 'سورة الواقعة', labelEn: 'Surah Al-Waqi\u2019ah' },
            ].map(({ href, labelAr, labelEn }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center justify-between gap-3 px-5 py-2.5 text-[13px] text-text-secondary hover:text-accent hover:bg-white/[0.03] transition-all group"
                >
                  <span className="font-semibold">{ar ? labelAr : labelEn}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-accent/40 group-hover:text-accent transition-colors shrink-0" aria-hidden="true">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 border-t border-border/30 bg-white/[0.015]">
            <a href="/surahs" className="flex items-center justify-center gap-1.5 text-accent/60 hover:text-accent text-[11px] font-semibold transition-colors">
              {ar ? 'عرض جميع السور' : 'View all Surahs'}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={ar ? 'rotate-180' : ''}>
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
            <h3 className="text-text-primary font-cairo font-bold text-[14px]">{ar ? 'كبار القراء' : 'Top Reciters'}</h3>
          </div>
          <ul className="divide-y divide-border/20">
            {[
              { href: '/reciter/abdul-basit', labelAr: 'الشيخ عبد الباسط عبد الصمد', labelEn: 'Sheikh Abdul Basit Abd us-Samad' },
              { href: '/reciter/mahmoud-al-hussary', labelAr: 'الشيخ محمود خليل الحصري', labelEn: 'Sheikh Mahmoud Khalil Al-Hussary' },
              { href: '/reciter/mishary-alafasy', labelAr: 'الشيخ مشاري راشد العفاسي', labelEn: 'Sheikh Mishary Rashid Alafasy' },
              { href: '/reciter/mohamed-el-minshawi', labelAr: 'الشيخ محمد صديق المنشاوي', labelEn: 'Sheikh Mohamed Siddiq El-Minshawi' },
            ].map(({ href, labelAr, labelEn }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center justify-between gap-3 px-5 py-2.5 text-[13px] text-text-secondary hover:text-accent hover:bg-white/[0.03] transition-all group"
                >
                  <span className="font-semibold">{ar ? labelAr : labelEn}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-accent/40 group-hover:text-accent transition-colors shrink-0" aria-hidden="true">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 border-t border-border/30 bg-white/[0.015]">
            <a href="/reciters" className="flex items-center justify-center gap-1.5 text-accent/60 hover:text-accent text-[11px] font-semibold transition-colors">
              {ar ? 'عرض جميع القراء' : 'View all Reciters'}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={ar ? 'rotate-180' : ''}>
                <polyline points="9 18 3 12 9 6" />
              </svg>
            </a>
          </div>
        </div>
      </nav>


      {/* Crawlable SEO content - Expanded significantly for word count & search intent */}
      <section className="max-w-card w-full mx-auto mt-12 px-4 relative z-10 pb-12" aria-label="عن الإذاعة">
        <h2 className="text-text-secondary text-lg font-bold text-center mb-6">
          Quran Kareem Radio — إذاعة القرآن الكريم من القاهرة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-text-muted/60 text-[11px] leading-loose">
          <div dir="rtl" className="space-y-4 text-right">
            <h3 className="font-bold text-accent/80 text-[13px] mb-2">تاريخ إذاعة القرآن الكريم من مصر</h3>
            <p>
              تعتبر إذاعة القرآن الكريم من القاهرة أول واقدم محطة إذاعية دينية إسلامية على مستوى العالم.
              بدأ بثها في يوم 25 مارس عام 1964، وكان الغرض الأساسي من إنشائها هو إذاعة المصحف المرتل برواية حفص عن عاصم،
              وذلك كخطوة رائدة للحفاظ على كتاب الله من التحريف ولتسهيل حفظه تلاوته ومراجعته للمسلمين في شتى بقاع الأرض.
              إنها ليست مجرد محطة إذاعية، بل مؤسسة ثقافية ودينية راسخة في وجدان الملايين من المسلمين.
            </p>
            <p>
              على مدار العقود الماضية، قدمت إذاعة القرآن بثاً مستمراً يجمع بين التلاوات الخاشعة لأعظم القراء،
              مثل الشيخ عبد الباسط عبد الصمد، والشيخ محمود خليل الحصري، والشيخ محمد صديق المنشاوي، والشيخ مصطفى إسماعيل،
              بالإضافة إلى نخبة من البرامج العلمية والفقهية والفتاوى التي تثري الفكر الإسلامي وتوجه المسلم في حياته اليومية.
            </p>

            <h3 className="font-bold text-accent/80 text-[13px] mb-2 mt-6">عن منصة البث الرقمي</h3>
            <p>
              تم تصميم هذه المنصة الرقمية الحديثة خصيصاً كصدقة جارية لتسهيل الاستماع إلى البث الحي المباشر للإذاعة
              من خلال الهواتف الذكية والحواسيب. يوفر هذا الموقع اتصالاً مستقراً ونقياً على مدار 24 ساعة في اليوم،
              وبلا أي انقطاع، مما يسمح للمغتربين والمسلمين في جميع أنحاء المعمورة بالبقاء على اتصال دائم بأصوات التلاوة المصرية الخالصة.
            </p>
            <p>
              يتميز تطبيق الويب الخاص بنا بمعالجة الصوت الرقمي المتقدمة (DSP)، حيث يمكن للمستمع الاختيار بين
              تجهيزات صوتية متعددة مثل "جودة الاستوديو" لتعزيز نقاء الصوت وعمق التلاوة. لا يتطلب الموقع أي تحميل لتطبيقات
              مضافة، ويعمل بكفاءة عالية على جميع الأجهزة الذكية سواء كانت تعمل بنظام أندرويد أو عبر متصفحات أنظمة أبل.
            </p>
          </div>

          <div dir="ltr" className="space-y-4 text-left font-sans">
            <h3 className="font-bold text-accent/80 text-[13px] mb-2">History of the Holy Quran Radio in Egypt</h3>
            <p>
              The Holy Quran Radio from Cairo stands as the first and oldest Islamic religious broadcasting station globally.
              Launched on March 25, 1964, its primary objective was to broadcast the continuously recited text of the Holy Quran
              (specifically the Hafs an Asim recitation). This pioneering step was monumental in preserving the Book of Allah
              from any alteration, making it profoundly accessible for Muslims around the world to memorize, revise, and study.
              It is not merely a radio station, but a deeply rooted cultural and religious institution in the hearts of millions.
            </p>
            <p>
              Over the past several decades, the Quran Radio has provided continuous broadcasting that combines the soul-stirring
              recitations of the greatest Qaris, such as Sheikh Abdul Basit Abd us-Samad, Sheikh Mahmoud Khalil Al-Hussary,
              Sheikh Mohamed Siddiq El-Minshawi, and Sheikh Mustafa Ismail. This is perfectly complemented by an elite selection
              of educational programs, Fiqh (jurisprudence) discussions, and Fatwas that enrich Islamic thought and guide daily Muslim life.
            </p>

            <h3 className="font-bold text-accent/80 text-[13px] mb-2 mt-6">About Our Digital Streaming Platform</h3>
            <p>
              This modern digital platform is designed as an ongoing charity (Sadaqah Jariyah) specifically to facilitate
              listening to the live audio broadcast of the station through smartphones and computers. This website provides
              a stable, crystal clear, 24/7 continuous stream without any interruption. It perfectly allows expatriates
              and Muslims across the globe to remain permanently connected with the pure Egyptian recitations they grew up loving.
            </p>
            <p>
              Our web application features advanced Digital Signal Processing (DSP). Listeners can choose between multiple
              audio equalization presets, such as "Studio Quality", to drastically enhance audio clarity and the depth of the recitation.
              The site requires absolutely no extra app downloads and operates with high efficiency on all smart devices,
              whether you are browsing on an Android system or an iPhone.
            </p>
          </div>
        </div>

        <h3 className="sr-only">Additional Keywords</h3>
        <p className="sr-only">
          Quran Radio Egypt, Islamic Radio Live, Quran Streaming Online, Listen Quran Live,
          إذاعة اسلامية مباشرة, بث مباشر قرآن كريم, راديو القرآن مصر, استماع القرآن الكريم مباشر,
          Holy Quran MP3, 24 Hour Islamic Broadcast, Cairo Religious Radio, Al-Azhar Broadcast,
          Listen to Alafasy, Sudais Audio Live, Live Makkah Audio, Taraweeh Broadcast.
        </p>
      </section>
    </main>
  )
}
