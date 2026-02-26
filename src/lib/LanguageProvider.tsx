'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { saveLang } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

interface LanguageContextValue {
    lang: Lang
    setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
    lang: 'ar',
    setLang: () => { },
})

// Read a cookie value by name (client-side only)
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
    return match ? decodeURIComponent(match[1]) : null
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>('ar') // SSR default

    useEffect(() => {
        // Priority 1: Cookie — set by middleware from geo or by user's manual choice
        const cookie = getCookie('quran_radio_lang')
        if (cookie === 'ar' || cookie === 'en') {
            setLangState(cookie)
            applyToDocument(cookie)
            return
        }

        // Priority 2: Browser locale as fallback (e.g. dev / no middleware)
        try {
            const browserLangs = navigator.languages ?? [navigator.language]
            const primary = (browserLangs[0] || '').toLowerCase()
            const detected: Lang = primary.startsWith('en') ? 'en' : 'ar'
            setLangState(detected)
            applyToDocument(detected)
        } catch {
            // Priority 3: Default Arabic
            applyToDocument('ar')
        }
    }, [])

    const setLang = (l: Lang) => {
        saveLang(l) // localStorage
        // Also update cookie so middleware sees the user's choice next visit
        document.cookie = `quran_radio_lang=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
        setLangState(l)
        applyToDocument(l)
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

function applyToDocument(lang: Lang) {
    if (typeof document === 'undefined') return
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export function useLang(): LanguageContextValue {
    return useContext(LanguageContext)
}
