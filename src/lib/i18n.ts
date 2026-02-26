export type Lang = 'ar' | 'en';
const LANG_KEY = 'quran_radio_lang';

export function detectLang(): Lang {
    if (typeof window === 'undefined') return 'ar';

    // 1. Respect user's explicit saved preference
    try {
        const saved = localStorage.getItem(LANG_KEY);
        if (saved === 'en') return 'en';
        if (saved === 'ar') return 'ar';
    } catch { }

    // 2. No saved preference — detect from browser locale
    // If primary browser language is English, show English; otherwise default Arabic
    try {
        const browserLangs = navigator.languages ?? [navigator.language];
        const primary = (browserLangs[0] || '').toLowerCase();
        if (primary.startsWith('en')) return 'en';
    } catch { }

    // 3. Default: Arabic
    return 'ar';
}

export function saveLang(lang: Lang): void {
    try { localStorage.setItem(LANG_KEY, lang); } catch { }
}

const S = {
    // ── Hero / Card ────────────────────────────────────────────────────────────
    title: { ar: 'إذاعة القرآن الكريم بث مباشر', en: 'Quran Kareem Radio Live Stream' },
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
        ar: 'أسأل الله العظيم أن يهديني ويصلح حالي. لا تنسوني من صالح دعائكم بظهر الغيب. جزاكم الله خيراً وأثابكم الجنة. ندعو الله أن يتقبل منا ومنكم صالح الأعمال.',
        en: 'I ask Allah the Almighty to guide me and rectify my affairs. Please keep me in your sincere prayers. May Allah reward you with goodness and Paradise. We pray that Allah accepts our good deeds.',
    },
    share: { ar: 'شارك الإذاعة', en: 'Share Radio' },
    legal: {
        ar: 'هذا مشروع ويب مفتوح المصدر تم تصميمه بجهد شخصي. هذا الموقع غير تابع لإذاعة القرآن الكريم الرسمية في مصر بأي شكل من الأشكال. جميع حقوق الملكية وحقوق البث محفوظة بالكامل للمصدر الرسمي للإذاعة. يهدف هذا المشروع التقني فقط إلى تسهيل الوصول للبث الصوتي المباشر عبر الإنترنت. نسعى من خلال هذه المنصة إلى تحسين تجربة الاستماع بصوت نقي للمسلمين في جميع أنحاء العالم. نتمنى لكم استماعاً خاشعاً ومريحاً.',
        en: 'This is an independent open-source web project. It is created through personal effort. This site is not affiliated with the official Egyptian Quran Kareem Radio in any capacity. All broadcast rights, intellectual property, and stream ownership belong entirely to the official broadcast source. This technical project exists solely to make the online audio stream more accessible globally. We strive to enhance the listening experience for Muslims worldwide. We hope you enjoy a peaceful and clear audio streaming experience.',
    },
    officialSource: {
        ar: 'الموقع الرسمي للإذاعة',
        en: 'Official Radio Website',
    },
    disclaimer: {
        ar: 'لا أملك أي حقوق نشر على المحتوى الصوتي المُذاع. جميع حقوق الملكية الفكرية لصوتيات وبرامج إذاعة القرآن الكريم محفوظة للمصدر.',
        en: 'I hold no copyright over the broadcast audio content. All intellectual property rights for the programs are reserved to the source.',
    },

    // ── Language toggle ────────────────────────────────────────────────────────
    langToggle: { ar: 'EN', en: 'عربي' },
} as const;

export type StringKey = keyof typeof S;
export function t(key: StringKey, lang: Lang): string { return S[key]?.[lang] ?? key; }
