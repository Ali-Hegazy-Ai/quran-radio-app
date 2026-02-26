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

const STREAM_URL = process.env.NEXT_PUBLIC_STREAM_URL || 'https://stream.radiojar.com/8s5u5tpdtwzuv'
const OFFICIAL_URL = 'https://misrquran.gov.eg/'
const GITHUB_URL = 'https://github.com/Ali-Hegazy-Ai/quran-radio-app'

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export default function PlayerCard() {
  const [lang, setLang] = useState<Lang>('ar')
  const [snap, setSnap] = useState<EngineSnapshot>({
    state: 'IDLE', volume: 0.8, muted: false, mode: 'medium', errorCount: 0, dspActive: true,
  })

  useEffect(() => { setLang(detectLang()) }, [])

  useEffect(() => {
    const el = document.documentElement
    el.lang = lang; el.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    const eng = getEngine(); eng.init(STREAM_URL)
    return eng.on(setSnap)
  }, [])

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
        <h1 className="font-cairo font-extrabold text-text-primary text-[24px] md:text-[28px] leading-snug text-center tracking-tight">
          {t('title', lang)}
        </h1>
        <span className="text-accent font-bold text-base mt-1">{t('country', lang)}</span>
        <p className="text-text-secondary text-[12px] text-center mt-2">{t('subtitle', lang)}</p>
      </div>

      <div className="w-[85%] h-px bg-gradient-to-r from-transparent via-border to-transparent my-5" />

      <section className="w-full px-7 md:px-9" aria-label={lang === 'ar' ? 'مشغل الصوت' : 'Audio Player'}>
        {showError ? (
          <ErrorFallback onRetry={handleRetry} streamUrl={STREAM_URL} lang={lang} />
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

        {/* GitHub button */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-border hover:border-accent/30 hover:bg-white/[0.06] text-text-secondary hover:text-text-primary transition-all duration-300 text-[11px] font-semibold"
          aria-label="View source on GitHub"
        >
          <GitHubIcon />
          <span>{lang === 'ar' ? 'المصدر على GitHub' : 'View on GitHub'}</span>
        </a>
      </footer>
    </article>
  )
}
