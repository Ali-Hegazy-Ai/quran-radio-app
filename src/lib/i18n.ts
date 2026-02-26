export type Lang = 'ar' | 'en';
const LANG_KEY = 'quran_radio_lang';

export function detectLang(): Lang {
    if (typeof window === 'undefined') return 'ar';
    try { const s = localStorage.getItem(LANG_KEY); if (s === 'en') return 'en'; } catch { }
    return 'ar';
}

export function saveLang(lang: Lang): void {
    try { localStorage.setItem(LANG_KEY, lang); } catch { }
}

const S = {
    title: { ar: 'إذاعة القرآن الكريم', en: 'Quran Kareem Radio' },
    country: { ar: 'مصر', en: 'Egypt' },
    subtitle: { ar: 'بث مباشر عبر المصدر الرسمي', en: 'Live broadcast from the official source' },
    live: { ar: 'مباشر', en: 'LIVE' },
    offline: { ar: 'غير مباشر', en: 'Offline' },
    statusIdle: { ar: 'جاهز للتشغيل', en: 'Ready to play' },
    statusBuffering: { ar: 'جاري الاتصال…', en: 'Connecting…' },
    statusPlaying: { ar: 'جاري البث الآن', en: 'Now streaming' },
    statusPaused: { ar: 'متوقف مؤقتاً', en: 'Paused' },
    statusError: { ar: 'غير متاح حالياً', en: 'Currently unavailable' },
    play: { ar: 'تشغيل البث', en: 'Play stream' },
    pause: { ar: 'إيقاف البث', en: 'Pause stream' },
    mute: { ar: 'كتم الصوت', en: 'Mute' },
    unmute: { ar: 'إلغاء كتم الصوت', en: 'Unmute' },
    volume: { ar: 'مستوى الصوت', en: 'Volume level' },
    qualityLabel: { ar: 'جودة الصوت', en: 'Audio Quality' },
    low: { ar: 'منخفضة', en: 'Low' },
    medium: { ar: 'متوسطة', en: 'Medium' },
    high: { ar: 'عالية', en: 'High' },
    studio: { ar: 'استوديو', en: 'Studio' },
    errorTitle: { ar: 'تعذر الاتصال بالبث المباشر', en: 'Unable to connect to live stream' },
    errorDetail: { ar: 'يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى', en: 'Please check your internet and try again' },
    retry: { ar: 'إعادة المحاولة', en: 'Retry' },
    openStream: { ar: 'فتح البث مباشرة', en: 'Open stream directly' },
    dua: { ar: 'أسأل الله أن يهديني، فلا تنسوني من دعائكم.', en: 'I ask Allah to guide me, please remember me in your prayers.' },
    legal: {
        ar: 'هذا مشروع مفتوح المصدر وغير تابع لإذاعة القرآن الكريم الرسمية في مصر. جميع حقوق البث محفوظة للمصدر الرسمي. هذا المشروع يهدف فقط لتسهيل الوصول للبث.',
        en: 'This is an open-source project and is NOT affiliated with the official Quran Kareem broadcast in Egypt. All broadcast rights belong to the official source. This project only aims to make the stream more accessible.'
    },
    officialSource: {
        ar: 'المصدر الرسمي',
        en: 'Official Source'
    },
    disclaimer: {
        ar: 'لا أملك أي حقوق على المحتوى المُذاع. جميع الحقوق محفوظة لإذاعة القرآن الكريم الرسمية — مصر.',
        en: 'I do not own any rights to the content being broadcast. All rights belong to the official Quran Kareem Radio — Egypt.'
    },
    langToggle: { ar: 'EN', en: 'عربي' },
    dspUnavailable: { ar: 'المعالجة الصوتية غير متاحة', en: 'Audio processing unavailable' },
} as const;

export type StringKey = keyof typeof S;
export function t(key: StringKey, lang: Lang): string { return S[key]?.[lang] ?? key; }
