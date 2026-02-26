import { MetadataRoute } from 'next'
import { getAllSurahs } from '@/lib/api/quran'
import { getAllReciters } from '@/lib/api/reciters'

const SITE_URL = 'https://quran-radio-app.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/reciters`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/surahs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.4,
        },
    ]

    // Dynamic surah pages
    let surahPages: MetadataRoute.Sitemap = []
    try {
        const surahs = await getAllSurahs()
        surahPages = surahs.map((surah) => ({
            url: `${SITE_URL}/surah/${surah.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    } catch {
        // Fail silently — static pages still served
    }

    // Dynamic reciter pages
    let reciterPages: MetadataRoute.Sitemap = []
    try {
        const reciters = await getAllReciters()
        reciterPages = reciters.map((reciter) => ({
            url: `${SITE_URL}/reciter/${reciter.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    } catch {
        // Fail silently
    }

    return [...staticPages, ...surahPages, ...reciterPages]
}
