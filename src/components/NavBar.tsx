'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useLang } from '@/lib/LanguageProvider'

const NAV_LINKS = [
    {
        href: '/',
        labelAr: 'الرئيسية',
        labelEn: 'Radio',
        icon2: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="2" />
                <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
            </svg>
        ),
    },
    {
        href: '/reciters',
        labelAr: 'القراء',
        labelEn: 'Reciters',
        icon2: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        href: '/surahs',
        labelAr: 'السور',
        labelEn: 'Surahs',
        icon2: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
    {
        href: '/contact',
        labelAr: 'تواصل',
        labelEn: 'Contact',
        icon2: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
]

export default function NavBar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const { lang, setLang } = useLang()
    const ar = lang === 'ar'

    const LangToggle = ({ className = '' }: { className?: string }) => (
        <button
            onClick={() => setLang(ar ? 'en' : 'ar')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[12px] font-bold tracking-wide transition-all duration-200
                bg-accent/10 border-accent/25 text-accent hover:bg-accent/20 hover:border-accent/50 ${className}`}
            aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {ar ? 'EN' : 'عربي'}
        </button>
    )

    return (
        <header className="fixed top-0 inset-x-0 z-50">
            <nav
                className="mx-auto flex items-center justify-between px-4 md:px-8 h-14 md:h-16
                       bg-[rgba(10,22,40,0.85)] backdrop-blur-xl border-b border-white/[0.06]
                       shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-accent font-cairo font-extrabold text-[15px] md:text-[17px] tracking-wide hover:opacity-80 transition-opacity shrink-0"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                        <circle cx="12" cy="12" r="2" />
                        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                    </svg>
                    <span className="hidden sm:inline">{ar ? 'إذاعة القرآن الكريم' : 'Quran Kareem Radio'}</span>
                    <span className="sm:hidden">{ar ? 'القرآن' : 'Quran'}</span>
                </Link>

                {/* Desktop nav links + lang toggle */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200
                    ${isActive
                                        ? 'bg-accent/15 text-accent border border-accent/25'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.05]'
                                    }`}
                            >
                                {link.icon2}
                                <span>{ar ? link.labelAr : link.labelEn}</span>
                            </Link>
                        )
                    })}

                    {/* Lang toggle */}
                    <div className="ml-2 pl-2 border-l border-border/40">
                        <LangToggle />
                    </div>
                </div>

                {/* Mobile: lang toggle + hamburger */}
                <div className="md:hidden flex items-center gap-2">
                    <LangToggle />
                    <button
                        className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-accent hover:bg-white/[0.05] transition-all"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-[rgba(10,22,40,0.97)] border-b border-white/[0.07] backdrop-blur-xl shadow-xl">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-5 py-3.5 text-[14px] font-semibold border-b border-white/[0.04] transition-all
                    ${isActive ? 'text-accent bg-accent/[0.08]' : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'}`}
                            >
                                {link.icon2}
                                <span>{ar ? link.labelAr : link.labelEn}</span>
                            </Link>
                        )
                    })}
                </div>
            )}
        </header>
    )
}
