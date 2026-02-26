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

      {/* Crawlable SEO content */}
      <section className="max-w-card w-full mx-auto mt-8 px-4 relative z-10" aria-label="About">
        <h2 className="text-text-secondary text-sm font-semibold text-center mb-3">
          Quran Kareem Radio — إذاعة القرآن الكريم
        </h2>
        <div className="text-text-muted/40 text-[10px] leading-relaxed text-center space-y-2">
          <p>
            Listen to Quran Kareem Radio Egypt live 24/7. The official Egyptian Quran radio station
            broadcasts continuous Quran recitation from Cairo, available worldwide through online
            Islamic radio streaming.
          </p>
          <p lang="ar" dir="rtl">
            استمع إلى إذاعة القرآن الكريم من مصر بث مباشر على مدار الساعة. بث إسلامي مباشر
            من القاهرة متاح في جميع أنحاء العالم. راديو القرآن الكريم — تلاوة مستمرة للقرآن الكريم.
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
