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
    // ── Hero / Card ────────────────────────────────────────────────────────────
    title: { ar: 'إذاعة القرآن الكريم', en: 'Quran Kareem Radio' },
    country: { ar: 'جمهورية مصر العربية', en: 'Egypt' },
    subtitle: {
        ar: 'بث مباشر من المصدر الرسمي — على مدار الساعة',
        en: 'Live 24/7 · Official Egyptian broadcast'
    },

    // ── Live badge ─────────────────────────────────────────────────────────────
    live: { ar: 'مباشر', en: 'LIVE' },
    offline: { ar: 'غير متصل', en: 'Offline' },

    // ── Player states ──────────────────────────────────────────────────────────
    statusIdle: { ar: 'جاهز للبث', en: 'Ready · tap to listen' },
    statusBuffering: { ar: 'جاري الاتصال…', en: 'Connecting…' },
    statusPlaying: { ar: 'يُبثّ الآن ◉', en: 'Now on air ◉' },
    statusPaused: { ar: 'متوقف مؤقتاً', en: 'Paused' },
    statusError: { ar: 'تعذّر الاتصال بالخادم', en: 'Stream unavailable' },

    // ── Controls ───────────────────────────────────────────────────────────────
    play: { ar: 'تشغيل', en: 'Play' },
    pause: { ar: 'إيقاف مؤقت', en: 'Pause' },
    mute: { ar: 'كتم الصوت', en: 'Mute' },
    unmute: { ar: 'إعادة الصوت', en: 'Unmute' },
    volume: { ar: 'مستوى الصوت', en: 'Volume' },

    // ── Quality / DSP ──────────────────────────────────────────────────────────
    qualityLabel: { ar: 'جودة الصوت', en: 'Stream Quality' },
    low: { ar: 'منخفضة', en: 'Low' },
    medium: { ar: 'متوسطة', en: 'Medium' },
    high: { ar: 'عالية', en: 'High' },
    studio: { ar: 'استوديو', en: 'Studio' },
    dspUnavailable: { ar: 'معالجة الصوت غير متاحة', en: 'Audio DSP unavailable in this browser' },

    // ── Error fallback ─────────────────────────────────────────────────────────
    errorTitle: {
        ar: 'تعذّر الاتصال بالبث المباشر',
        en: 'Unable to connect to the live stream'
    },
    errorDetail: {
        ar: 'تحقق من اتصالك بالإنترنت ثم حاول مجدداً',
        en: 'Check your internet connection and try again'
    },
    retry: { ar: 'إعادة المحاولة', en: 'Try again' },
    openStream: { ar: 'فتح البث مباشرةً', en: 'Open stream directly' },

    // ── Footer ─────────────────────────────────────────────────────────────────
    dua: {
        ar: 'أسأل الله أن يهديني، فلا تنسوني من دعائكم.',
        en: 'I ask Allah to guide me — please keep me in your prayers.',
    },
    legal: {
        ar: 'هذا مشروع مفتوح المصدر وغير تابع لإذاعة القرآن الكريم الرسمية في مصر. جميع حقوق البث محفوظة للمصدر الرسمي، ويهدف هذا المشروع فقط لتسهيل الوصول للبث.',
        en: 'This is an independent open-source project, not affiliated with the official Egyptian Quran Kareem Radio. All broadcast rights belong to the official source. This project exists solely to make the stream more accessible.',
    },
    officialSource: {
        ar: 'الموقع الرسمي',
        en: 'Official Website',
    },
    disclaimer: {
        ar: 'لا أملك أي حقوق على المحتوى المُذاع. جميع الحقوق محفوظة لإذاعة القرآن الكريم — مصر.',
        en: 'I hold no rights over the broadcast content. All rights reserved — Quran Kareem Radio, Egypt.',
    },

    // ── Language toggle ────────────────────────────────────────────────────────
    langToggle: { ar: 'EN', en: 'عربي' },
} as const;

export type StringKey = keyof typeof S;
export function t(key: StringKey, lang: Lang): string { return S[key]?.[lang] ?? key; }
