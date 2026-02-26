import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

export default function LiveBadge({ isLive, lang }: { isLive: boolean; lang: Lang }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all duration-500 ${isLive ? 'bg-live/12 text-red-300 border border-live/25 shadow-[0_0_16px_rgba(220,53,69,0.08)]' : 'bg-white/[0.02] text-text-muted border border-border'
        }`}
      role="status" aria-live="polite" aria-label={isLive ? t('live', lang) : t('offline', lang)}
    >
      <span className={`block w-[7px] h-[7px] rounded-full ${isLive ? 'bg-live animate-live-pulse' : 'bg-text-muted/25'}`} />
      <span>{isLive ? t('live', lang) : t('offline', lang)}</span>
    </div>
  )
}
