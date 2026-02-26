'use client'

import { getAllSurahs } from '@/lib/api/quran'
import Link from 'next/link'
import { useLang } from '@/lib/LanguageProvider'
import { useEffect, useState } from 'react'
import type { Surah } from '@/lib/api/quran'

export default function SurahsPage() {
    const { lang } = useLang()
    const ar = lang === 'ar'
    const [surahs, setSurahs] = useState<Surah[]>([])

    useEffect(() => {
        getAllSurahs().then(setSurahs)
    }, [])

    return (
        <main className="min-h-screen bg-bg flex flex-col items-center p-6 pt-10 relative overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
            <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-radial from-accent/[0.035] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-3xl animate-fade-up">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-4">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                    </div>
                    <h1 className="font-cairo font-extrabold text-text-primary text-[26px] md:text-[32px] mb-1">
                        {ar ? 'سور القرآن الكريم' : 'Quran Surahs'}
                    </h1>
                    <p className="text-text-secondary text-[13px]">
                        {ar ? 'اختر سورة للاستماع إليها' : 'Choose a Surah to listen to'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {surahs.map((surah) => (
                        <Link
                            key={surah.slug}
                            href={`/surah/${surah.slug}`}
                            className="group card-glass rounded-xl p-4 flex items-center gap-3 border border-border/60
                                       hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-200"
                        >
                            <span className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/15 flex items-center justify-center
                                             text-accent font-bold text-[12px] shrink-0 group-hover:border-accent/35 transition-colors">
                                {surah.id}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-text-primary font-cairo font-bold text-[14px] leading-tight truncate">
                                    {ar ? surah.name_arabic : surah.name_simple}
                                </p>
                                <p className="text-text-muted/60 text-[10px] mt-0.5 truncate">
                                    {ar ? `${surah.name_simple} · ${surah.verses_count} آية` : `${surah.name_arabic} · ${surah.verses_count} verses`}
                                </p>
                            </div>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                className={`text-text-muted/30 group-hover:text-accent transition-colors shrink-0 ${ar ? 'rotate-180' : ''}`}>
                                <polyline points="9 18 3 12 9 6" />
                            </svg>
                        </Link>
                    ))}
                </div>

                {surahs.length === 0 && (
                    <div className="text-center py-20 text-text-muted/40 text-[13px]">
                        {ar ? 'جاري التحميل…' : 'Loading…'}
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link href="/" className="text-text-muted/50 hover:text-text-secondary text-[12px] transition-colors inline-flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 3 12 9 6" /><line x1="3" y1="12" x2="21" y2="12" />
                        </svg>
                        {ar ? 'العودة للرئيسية' : 'Back to Home'}
                    </Link>
                </div>
            </div>
        </main>
    )
}
