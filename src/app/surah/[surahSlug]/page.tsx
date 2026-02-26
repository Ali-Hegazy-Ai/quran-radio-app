import { Metadata } from 'next'
import { getAllSurahs, getSurahBySlug } from '@/lib/api/quran'
import PlayerCard from '@/components/PlayerCard'

// Generate static params so these pages are pre-rendered at build time
export async function generateStaticParams() {
    const surahs = await getAllSurahs()
    return surahs.map((surah) => ({
        surahSlug: surah.slug,
    }))
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { surahSlug: string } }): Promise<Metadata> {
    const surah = await getSurahBySlug(params.surahSlug)

    if (!surah) {
        return { title: 'Surah Not Found' }
    }

    const title = `Surah ${surah.name_simple} (${surah.name_arabic}) Audio Streaming | Quran Radio Egypt Live`
    const description = `Listen to Surah ${surah.name_simple} online. Streaming live Quran recitation from Cairo, Egypt. Beautiful audio recitation of the Holy Quran, ${surah.revelation_place} revelation containing ${surah.verses_count} verses.`

    return {
        title,
        description,
        keywords: [
            `Surah ${surah.name_simple}`,
            `sura ${surah.name_simple}`,
            surah.name_arabic,
            'listen quran online',
            'surah audio streaming',
            `${surah.name_simple} mp3`,
            'Quran Radio Live',
        ],
        openGraph: {
            title,
            description,
            type: 'article',
        },
        twitter: {
            title,
            description,
        }
    }
}

export default async function SurahPage({ params }: { params: { surahSlug: string } }) {
    const surah = await getSurahBySlug(params.surahSlug)

    if (!surah) {
        return (
            <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
                <h1 className="text-text-primary text-2xl">404 - Surah Not Found</h1>
            </main>
        )
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AudioObject',
        name: `Surah ${surah.name_simple} Audio Stream`,
        description: `Continuous live recitation of the Quran, frequently featuring Surah ${surah.name_simple}.`,
        contentUrl: 'https://stream.radiojar.com/8s5u5tpdtwzuv', /* Fallback live stream */
        encodingFormat: 'audio/mpeg',
    }

    return (
        <main className="min-h-screen bg-bg flex flex-col items-center justify-start p-4 md:p-8 relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Decorative Background Matches the Homepage */}
            <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-radial from-accent/[0.035] to-transparent rounded-full blur-3xl opacity-50" />
            </div>

            <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start relative z-10">

                {/* Left Side: SEO Content */}
                <article className="flex-1 w-full bg-white/[0.02] border border-border rounded-xl p-6 md:p-8">
                    <header className="mb-6 mb-8 border-b border-border/50 pb-6">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald to-accent mb-2">
                            Surah {surah.name_simple}
                        </h1>
                        <h2 className="text-2xl text-text-secondary font-cairo mb-4" dir="rtl">
                            {surah.name_arabic}
                        </h2>
                        <div className="flex gap-4 text-sm text-text-muted">
                            <span className="bg-white/[0.05] px-3 py-1 rounded-full">{surah.revelation_place}</span>
                            <span className="bg-white/[0.05] px-3 py-1 rounded-full">{surah.verses_count} Verses</span>
                        </div>
                    </header>

                    <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-6">
                        <p>
                            Welcome to the dedicated streaming page for <strong>Surah {surah.name_simple}</strong> ({surah.name_arabic}).
                            Listening to the Quran provides peace to the heart and guidance to the soul. You are currently tuned into the official
                            broadcast from Cairo, Egypt.
                        </p>

                        <h3>About Surah {surah.name_simple}</h3>
                        <p>
                            This beautiful Surah is a <em>{surah.revelation_place}</em> revelation and consists of {surah.verses_count} verses.
                            Reciting and listening to this Surah is deeply beneficial for believers searching for spiritual clarity and reflection.
                        </p>

                        <h3>Live Audio Streaming</h3>
                        <p>
                            Our player on the right connects directly to the 24/7 transmission of Quran Kareem Radio. While the radio
                            plays a continuous loop of various Surahs and programs across the day, Surah {surah.name_simple} is frequently
                            recited by some of the most esteemed Egyptian Qaris, such as Abdul Basit 'Abd us-Samad and Mahmoud Khalil Al-Hussary.
                        </p>

                        <p className="text-sm text-text-muted mt-8 pt-4 border-t border-border/30">
                            Note: The audio player streams the live radio broadcast. Specific tracking to exactly when Surah {surah.name_simple}
                            plays depends on the live Egyptian schedule.
                        </p>
                    </div>
                </article>

                {/* Right Side: The Player */}
                <div className="w-full lg:w-[400px] flex-shrink-0 sticky top-8">
                    <PlayerCard />
                </div>

            </div>
        </main>
    )
}
