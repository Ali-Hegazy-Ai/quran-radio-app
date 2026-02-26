'use client'

import { useState } from 'react'
import { useLang } from '@/lib/LanguageProvider'

const EMAIL = 'ali.hegazy.dev.1@gmail.com'

export default function ContactPage() {
    const [copied, setCopied] = useState(false)
    const { lang } = useLang()
    const ar = lang === 'ar'

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 relative overflow-hidden" dir={ar ? 'rtl' : 'ltr'}>
            <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-radial from-accent/[0.04] to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-radial from-emerald/[0.03] to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-lg animate-fade-up">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-5">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <h1 className="font-cairo font-extrabold text-text-primary text-[28px] md:text-[34px] leading-tight mb-2">
                        {ar ? 'تواصل معنا' : 'Contact Us'}
                    </h1>
                    <p className="text-text-secondary text-[14px] md:text-[15px]">
                        {ar ? 'نسعد بتواصلك معنا عبر البريد الإلكتروني' : 'Reach out to us via email anytime'}
                    </p>
                </div>

                {/* Card */}
                <div className="card-glass rounded-2xl p-7 md:p-9 flex flex-col gap-6 border border-border/60">
                    <div className="flex flex-col gap-3">
                        <label className="text-text-muted text-[12px] uppercase tracking-widest font-semibold">
                            {ar ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <div className="flex items-center gap-3 bg-white/[0.04] border border-border rounded-xl px-4 py-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0" aria-hidden="true">
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="text-text-primary font-semibold text-[13px] md:text-[14px] hover:text-accent transition-colors flex-1 truncate"
                                dir="ltr"
                            >
                                {EMAIL}
                            </a>
                            <button
                                onClick={copyEmail}
                                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent/40 text-accent text-[11px] font-bold transition-all duration-200"
                                aria-label={ar ? 'نسخ البريد الإلكتروني' : 'Copy email address'}
                            >
                                {copied ? (
                                    <>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>{ar ? 'تم!' : 'Copied!'}</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        <span>{ar ? 'نسخ' : 'Copy'}</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <a
                            href={`mailto:${EMAIL}`}
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-[#0A1628] font-bold text-[14px] hover:bg-accent/90 transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/30"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            {ar ? 'إرسال رسالة' : 'Send Email'}
                        </a>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <p className="text-accent/80 text-[13px] text-center leading-loose font-semibold font-cairo" dir="rtl">
                        أسأل الله أن يهديني، فلا تنسوني من دعائكم.
                    </p>
                    <p className="text-text-muted/60 text-[11px] text-center">
                        I ask Allah to guide me — please keep me in your prayers.
                    </p>
                </div>

                <a
                    href="/"
                    className="mt-6 flex items-center justify-center gap-2 text-text-muted/60 hover:text-text-secondary text-[12px] transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 3 12 9 6" /><line x1="3" y1="12" x2="21" y2="12" />
                    </svg>
                    {ar ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
                </a>
            </div>
        </main>
    )
}
