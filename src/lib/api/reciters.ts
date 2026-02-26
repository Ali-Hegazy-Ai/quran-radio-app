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
    { id: 6, name: 'Maher Al-Muaiqly', arabic_name: 'ماهر المعيقلي', slug: 'maher-al-muaiqly' },
    { id: 7, name: 'Saad Al-Ghamdi', arabic_name: 'سعد الغامدي', slug: 'saad-al-ghamdi' },
    { id: 8, name: 'Abu Bakr Al-Shatri', arabic_name: 'أبو بكر الشاطري', slug: 'abu-bakr-al-shatri' },
    { id: 9, name: 'Ali Jaber', arabic_name: 'علي جابر', slug: 'ali-jaber' },
    { id: 10, name: 'Yasser Al-Dosari', arabic_name: 'ياسر الدوسري', slug: 'yasser-al-dosari' },
    { id: 11, name: 'Fares Abbad', arabic_name: 'فارس عباد', slug: 'fares-abbad' },
    { id: 12, name: 'Abdul Rahman Al-Sudais', arabic_name: 'عبد الرحمن السديس', slug: 'abdul-rahman-al-sudais' },
    { id: 13, name: 'Saud Al-Shuraim', arabic_name: 'سعود الشريم', slug: 'saud-al-shuraim' },
    { id: 14, name: 'Khaled Al-Qahtani', arabic_name: 'خالد القحطاني', slug: 'khaled-al-qahtani' },
    { id: 15, name: 'Shirazad Taher', arabic_name: 'شيرزاد طاهر', slug: 'shirazad-taher' },
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
