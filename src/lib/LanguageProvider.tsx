'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { detectLang, saveLang } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

interface LanguageContextValue {
    lang: Lang
    setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextValue>({
    lang: 'ar',
    setLang: () => { },
})

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>('ar')

    useEffect(() => {
        setLangState(detectLang())
    }, [])

    const setLang = (l: Lang) => {
        saveLang(l)
        setLangState(l)
        // Update html attributes globally
        const el = document.documentElement
        el.lang = l
        el.dir = l === 'ar' ? 'rtl' : 'ltr'
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLang(): LanguageContextValue {
    return useContext(LanguageContext)
}
