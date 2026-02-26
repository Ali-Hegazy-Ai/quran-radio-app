import { Metadata } from 'next'
import { getAllReciters, getReciterBySlug } from '@/lib/api/reciters'
import PlayerCard from '@/components/PlayerCard'

export async function generateStaticParams() {
    const reciters = await getAllReciters()
    return reciters.map((r) => ({
        reciterSlug: r.slug,
    }))
}

export async function generateMetadata({ params }: { params: { reciterSlug: string } }): Promise<Metadata> {
    const reciter = await getReciterBySlug(params.reciterSlug)

    if (!reciter) {
        return { title: 'Reciter Not Found' }
    }

    const title = `Listen to ${reciter.name} (${reciter.arabic_name}) Quran Recitation Live`
    const description = `Stream the beautiful Quran recitation of Sheikh ${reciter.name}. Listen live to Egyptian Radio broadcasting ${reciter.name} online 24/7.`

    return {
        title,
        description,
        keywords: [
            reciter.name,
            reciter.arabic_name,
            `${reciter.name} quran live`,
            'listen quran online',
            'islamic radio live',
            'qari streaming',
            'egypt quran radio'
        ],
        openGraph: {
            title,
            description,
            type: 'profile',
        },
        twitter: {
            title,
            description,
        }
    }
}

export default async function ReciterPage({ params }: { params: { reciterSlug: string } }) {
    const reciter = await getReciterBySlug(params.reciterSlug)

    if (!reciter) {
        return (
            <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
                <h1 className="text-text-primary text-2xl">404 - Qari Not Found</h1>
            </main>
        )
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Person',
            name: reciter.name,
            alternateName: reciter.arabic_name,
            description: `Renowned Quran reciter (Qari) frequently broadcasted on Quran Kareem Radio Egypt.`,
        }
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
                    <header className="mb-8 border-b border-border/50 pb-6">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald to-accent mb-2">
                            {reciter.name}
                        </h1>
                        <h2 className="text-2xl text-text-secondary font-cairo mb-4" dir="rtl">
                            الشيخ {reciter.arabic_name}
                        </h2>
                        <div className="flex gap-4 text-sm text-text-muted">
                            <span className="bg-white/[0.05] px-3 py-1 rounded-full">Famous Egyptian Qari</span>
                        </div>
                    </header>

                    <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-6">
                        <p>
                            Welcome to the dedicated streaming page for the honorable Sheikh <strong>{reciter.name}</strong> ({reciter.arabic_name}).
                            Known for his extraordinary vocal control and spiritual depth, his recitations have moved millions of Muslims worldwide.
                        </p>

                        <h3>Listen to {reciter.name}</h3>
                        <p>
                            The audio player on this page streams Surah Al-Baqarah recited by <strong>{reciter.name}</strong>.
                            If you wish to listen to the continuous 24/7 transmission of Quran Kareem Radio Egypt, please navigate back to the homepage.
                        </p>

                        <h3>Why Listen to {reciter.name}?</h3>
                        <p>
                            His voice perfectly preserves the traditional and profound experience of tuning into Cairo's finest
                            Qaris. Sit back, reflect, and enjoy the pure recitation.
                        </p>
                    </div>
                </article>

                {/* Right Side: The Player */}
                <div className="w-full lg:w-[400px] flex-shrink-0 sticky top-8">
                    <PlayerCard
                        customTitle={`${reciter.name} - Surah Al-Baqarah`}
                        customStreamUrl={
                            reciter.slug === "abdul-basit" ? "https://server7.mp3quran.net/basit/002.mp3" :
                                reciter.slug === "mahmoud-al-hussary" ? "https://server8.mp3quran.net/husr/002.mp3" :
                                    reciter.slug === "mishary-alafasy" ? "https://server8.mp3quran.net/afs/002.mp3" :
                                        reciter.slug === "mohamed-el-minshawi" ? "https://server10.mp3quran.net/minsh/002.mp3" :
                                            "https://server8.mp3quran.net/husr/002.mp3"
                        }
                    />
                </div>

            </div>
        </main>
    )
}
