import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

export default function ErrorFallback({ onRetry, streamUrl, lang }: { onRetry: () => void; streamUrl: string; lang: Lang }) {
  return (
    <div className="w-full bg-live/[0.05] border border-live/15 rounded-panel p-5 animate-fade-up">
      <div className="flex flex-col items-center gap-3 text-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-red-400">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-red-300 text-sm font-semibold">{t('errorTitle', lang)}</p>
        <p className="text-text-muted text-xs">{t('errorDetail', lang)}</p>
        <div className="flex items-center gap-3 mt-2">
          <button onClick={onRetry} className="bg-live/80 hover:bg-live text-white text-sm px-5 py-2 rounded-xl transition-all active:scale-95" aria-label={t('retry', lang)}>
            {t('retry', lang)}
          </button>
          <a href={streamUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-muted text-sm underline underline-offset-4 transition-colors" aria-label={t('openStream', lang)}>
            {t('openStream', lang)}
          </a>
        </div>
      </div>
    </div>
  )
}
