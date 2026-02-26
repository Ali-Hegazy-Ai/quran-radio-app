import type { AudioState } from '@/lib/audioEngine'
import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

const keys: Record<AudioState, 'statusIdle' | 'statusBuffering' | 'statusPlaying' | 'statusPaused' | 'statusError'> = {
    IDLE: 'statusIdle', BUFFERING: 'statusBuffering', PLAYING: 'statusPlaying', PAUSED: 'statusPaused', ERROR: 'statusError',
}

export default function StatusIndicator({ state, lang }: { state: AudioState; lang: Lang }) {
    return (
        <p className={`text-xs text-center transition-all duration-500 ${state === 'PLAYING' ? 'text-emerald' : 'text-text-muted'}`}
            role="status" aria-live="polite">
            {t(keys[state], lang)}
        </p>
    )
}
