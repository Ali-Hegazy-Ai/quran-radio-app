'use client'
import type { Lang } from '@/lib/i18n'
import { t, saveLang } from '@/lib/i18n'

export default function LanguageToggle({ lang, onToggle }: { lang: Lang; onToggle: (l: Lang) => void }) {
    const next = lang === 'ar' ? 'en' : 'ar';
    return (
        <button
            onClick={() => { saveLang(next); onToggle(next); }}
            className="text-text-secondary hover:text-accent text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border border-border hover:border-accent/30 transition-all duration-300"
            aria-label={t('langToggle', lang)}
        >
            {t('langToggle', lang)}
        </button>
    )
}
