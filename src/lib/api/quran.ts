export interface Surah {
    id: number
    name_simple: string
    name_complex: string
    name_arabic: string
    revelation_place: string
    verses_count: number
    slug: string
}

/**
 * Fetches all Surahs from the actual Quran.com API (V4).
 * This data is used to generate the static paths for SSR.
 */
export async function getAllSurahs(): Promise<Surah[]> {
    try {
        const res = await fetch('https://api.quran.com/api/v4/chapters', {
            next: { revalidate: 86400 } // Cache for 24 hours
        })

        if (!res.ok) throw new Error('Failed to fetch surahs')

        const data = await res.json()
        return data.chapters.map((chapter: any) => ({
            id: chapter.id,
            name_simple: chapter.name_simple,
            name_complex: chapter.name_complex,
            name_arabic: chapter.name_arabic,
            revelation_place: chapter.revelation_place,
            verses_count: chapter.verses_count,
            slug: chapter.name_simple.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }))
    } catch (error) {
        console.error('Error fetching surahs:', error)
        return []
    }
}

export async function getSurahBySlug(slug: string): Promise<Surah | null> {
    const surahs = await getAllSurahs()
    return surahs.find(s => s.slug === slug) || null
}
