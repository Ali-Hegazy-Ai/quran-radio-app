'use client'

import { useEffect, useState, useCallback } from 'react'
import { getEngine } from '@/lib/audioEngine'
import type { EngineSnapshot } from '@/lib/audioEngine'
import { t } from '@/lib/i18n'
import { useLang } from '@/lib/LanguageProvider'
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
  const { lang, setLang } = useLang()
  const [snap, setSnap] = useState<EngineSnapshot>({
    state: 'IDLE', volume: 0.8, muted: false, mode: 'medium', errorCount: 0, dspActive: true,
  })

  const streamUrlToUse = customStreamUrl || DEFAULT_STREAM_URL

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

        {/* Social Share */}
        <div className="flex flex-col items-center gap-2 mt-2 w-full">
          <span className="text-text-muted font-medium text-[12px] uppercase tracking-wider">{t('share', lang)}</span>
          <div className="flex items-center gap-3">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://quran-radio-app.vercel.app')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] hover:bg-white/[0.06] rounded-full text-text-secondary hover:text-accent transition-colors">
              <span className="sr-only">Facebook</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://quran-radio-app.vercel.app')}&text=${encodeURIComponent('استمع إلى إذاعة القرآن الكريم من القاهرة بث مباشر 24/7')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] hover:bg-white/[0.06] rounded-full text-text-secondary hover:text-accent transition-colors">
              <span className="sr-only">X (Twitter)</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('استمع إلى إذاعة القرآن الكريم من القاهرة بث مباشر 24/7: https://quran-radio-app.vercel.app')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] hover:bg-white/[0.06] rounded-full text-text-secondary hover:text-accent transition-colors">
              <span className="sr-only">WhatsApp</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.385 0 12c0 2.128.552 4.133 1.523 5.92L0 24l6.234-1.636A11.968 11.968 0 0012.031 24c6.645 0 12-5.385 12-12s-5.355-12-12.031-12zm6.49 17.3c-.279.79-1.363 1.503-2.174 1.637-.624.103-1.42.3-3.99-1.026-3.116-1.603-5.146-5.836-5.303-6.046-.157-.21-1.265-1.684-1.265-3.21 0-1.527.788-2.28 1.074-2.593.284-.313.627-.39.835-.39.21 0 .419.003.606.012.2.008.468-.075.733.565.333.805 1.14 2.784 1.244 2.994.104.21.173.454.043.714-.131.262-.198.419-.395.649-.198.23-.414.505-.596.697-.198.208-.408.435-.178.828.23.39 1.023 1.684 2.193 2.723 1.508 1.34 2.76 1.75 3.155 1.936.395.187.625.155.856-.11s.992-1.166 1.254-1.567c.261-.403.522-.336.885-.198.363.138 2.302 1.087 2.697 1.284.394.198.657.296.751.464.094.167.094.966-.185 1.756z" /></svg>
            </a>
          </div>
        </div>

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
