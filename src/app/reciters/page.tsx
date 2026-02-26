import { getAllReciters } from '@/lib/api/reciters'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'كبار القراء | Quran Kareem Radio',
    description: 'تصفح قائمة قراء القرآن الكريم واستمع إلى تلاواتهم العطرة مباشرة. Browse top Quran reciters and listen to their recitation live.',
}

export default async function RecitersPage() {
    const reciters = await getAllReciters()

    return (
        <main className="min-h-screen bg-bg flex flex-col items-center p-6 pt-10 relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-radial from-accent/[0.035] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-3xl animate-fade-up">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <h1 className="font-cairo font-extrabold text-text-primary text-[26px] md:text-[32px] mb-1">كبار القراء</h1>
                    <p className="text-text-secondary text-[13px]">Top Quran Reciters · اختر قارئاً للاستماع</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reciters.map((reciter) => (
                        <Link
                            key={reciter.slug}
                            href={`/reciter/${reciter.slug}`}
                            className="group card-glass rounded-2xl p-5 flex items-center gap-4 border border-border/60
                         hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-250"
                        >
                            {/* Avatar circle */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-emerald/10 border border-accent/20
                              flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M9 18V5l12-2v13" />
                                    <circle cx="6" cy="18" r="3" />
                                    <circle cx="18" cy="16" r="3" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-text-primary font-cairo font-bold text-[15px] leading-tight truncate" dir="rtl">
                                    {reciter.arabic_name}
                                </p>
                                <p className="text-text-muted/70 text-[11px] mt-0.5 truncate">{reciter.name}</p>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="text-text-muted/40 group-hover:text-accent transition-colors shrink-0 rotate-180">
                                <polyline points="9 18 3 12 9 6" />
                            </svg>
                        </Link>
                    ))}
                </div>

                {/* Back link */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-text-muted/50 hover:text-text-secondary text-[12px] transition-colors inline-flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 3 12 9 6" /><line x1="3" y1="12" x2="21" y2="12" />
                        </svg>
                        العودة للرئيسية
                    </Link>
                </div>
            </div>
        </main>
    )
}
