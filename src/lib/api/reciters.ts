export interface Reciter {
    id: number
    name: string
    arabic_name: string
    slug: string
}

const STATIC_RECITERS: Reciter[] = [
    { id: 1, name: 'Abdul Basit \'Abd us-Samad', arabic_name: 'عبد الباسط عبد الصمد', slug: 'abdul-basit' },
    { id: 2, name: 'Mahmoud Khalil Al-Hussary', arabic_name: 'محمود خليل الحصري', slug: 'mahmoud-al-hussary' },
    { id: 3, name: 'Mishary Rashid Alafasy', arabic_name: 'مشاري راشد العفاسي', slug: 'mishary-alafasy' },
    { id: 4, name: 'Mohamed Siddiq El-Minshawi', arabic_name: 'محمد صديق المنشاوي', slug: 'mohamed-el-minshawi' },
    { id: 5, name: 'Mustafa Ismail', arabic_name: 'مصطفى إسماعيل', slug: 'mustafa-ismail' },
]

export async function getAllReciters(): Promise<Reciter[]> {
    // Using a curated static list of top Egyptian/Global reciters
    // Frequently heard on the Quran Radio.
    return STATIC_RECITERS
}

export async function getReciterBySlug(slug: string): Promise<Reciter | null> {
    const reciters = await getAllReciters()
    return reciters.find((r) => r.slug === slug) || null
}
