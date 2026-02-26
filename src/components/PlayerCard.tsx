'use client'

import { useEffect, useState, useCallback } from 'react'
import { getEngine } from '@/lib/audioEngine'
import type { EngineSnapshot } from '@/lib/audioEngine'
import { detectLang, t } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import DecorativeMotif from './DecorativeMotif'
import LanguageToggle from './LanguageToggle'
import LiveBadge from './LiveBadge'
import AudioController from './AudioController'
import QualitySelector from './QualitySelector'
import StatusIndicator from './StatusIndicator'
import ErrorFallback from './ErrorFallback'

const DEFAULT_STREAM_URL = process.env.NEXT_PUBLIC_STREAM_URL || 'https://stream.radiojar.com/8s5u5tpdtwzuv'
const OFFICIAL_URL = 'https://misrquran.gov.eg/'

interface PlayerCardProps {
  customStreamUrl?: string;
  customTitle?: string;
}

export default function PlayerCard({ customStreamUrl, customTitle }: PlayerCardProps = {}) {
  const [lang, setLang] = useState<Lang>('ar')
  const [snap, setSnap] = useState<EngineSnapshot>({
    state: 'IDLE', volume: 0.8, muted: false, mode: 'medium', errorCount: 0, dspActive: true,
  })

  const streamUrlToUse = customStreamUrl || DEFAULT_STREAM_URL

  useEffect(() => { setLang(detectLang()) }, [])

  useEffect(() => {
    const el = document.documentElement
    el.lang = lang; el.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    const eng = getEngine(); eng.init(streamUrlToUse)
    return eng.on(setSnap)
  }, [streamUrlToUse])

  const handleRetry = useCallback(() => { getEngine().retry() }, [])
  const showError = snap.state === 'ERROR' && snap.errorCount >= 5

  return (
    <article className={`card-glass rounded-card max-w-card w-full mx-auto flex flex-col items-center relative z-10 animate-fade-up overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-gradient-radial from-accent/[0.04] to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="w-full px-7 md:px-9 pt-8 pb-3 flex justify-between items-center">
        <LanguageToggle lang={lang} onToggle={setLang} />
        <LiveBadge isLive={snap.state === 'PLAYING'} lang={lang} />
      </div>

      <div className="w-full px-7 md:px-9 flex flex-col items-center pb-2">
        <DecorativeMotif className="mb-4 animate-float" />
        <h1 className="font-cairo font-extrabold text-text-primary text-[26px] md:text-[32px] leading-snug text-center tracking-tight drop-shadow-lg">
          {customTitle || t('title', lang)}
        </h1>
        <span className="text-accent font-bold text-[17px] md:text-[18px] mt-1">{t('country', lang)}</span>
        <p className="text-text-secondary text-[13px] md:text-[14px] text-center mt-2 font-medium">{t('subtitle', lang)}</p>
      </div>

      <div className="w-[85%] h-px bg-gradient-to-r from-transparent via-border to-transparent my-5" />

      <section className="w-full px-7 md:px-9" aria-label={lang === 'ar' ? 'مشغل الصوت' : 'Audio Player'}>
        {showError ? (
          <ErrorFallback onRetry={handleRetry} streamUrl={streamUrlToUse} lang={lang} />
        ) : (
          <AudioController snapshot={snap} lang={lang} />
        )}
      </section>

      <div className="mt-4"><StatusIndicator state={snap.state} lang={lang} /></div>

      <div className="w-[85%] h-px bg-gradient-to-r from-transparent via-border to-transparent my-5" />

      <section className="w-full px-7 md:px-9">
        <div className="panel-inner rounded-panel p-4">
          <QualitySelector snapshot={snap} lang={lang} />
        </div>
      </section>

      <div className="w-[85%] h-px bg-gradient-to-r from-transparent via-border to-transparent my-5" />

      <footer className="w-full px-7 md:px-9 pb-8 flex flex-col items-center gap-4">
        <p className="text-accent text-[14px] md:text-[15px] text-center leading-loose font-semibold">
          {t('dua', lang)}
        </p>

        {/* Disclaimer */}
        <div className="w-full bg-white/[0.02] border border-border rounded-xl p-4 text-center space-y-2">
          <p className="text-text-muted/60 text-[10px] leading-relaxed">
            {t('legal', lang)}
          </p>
          <p className="text-text-muted/50 text-[10px] leading-relaxed">
            {t('disclaimer', lang)}
          </p>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent/70 hover:text-accent text-[11px] font-semibold transition-colors underline underline-offset-4"
          >
            {t('officialSource', lang)} ↗
          </a>
        </div>

        {/* Contact link */}
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 text-text-muted/50 hover:text-accent text-[11px] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-70" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
        </a>
      </footer>
    </article>
  )
}
