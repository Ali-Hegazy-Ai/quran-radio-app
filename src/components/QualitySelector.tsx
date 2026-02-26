'use client'
import { useCallback } from 'react'
import type { QualityMode, EngineSnapshot } from '@/lib/audioEngine'
import { getEngine } from '@/lib/audioEngine'
import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

const modes: { key: QualityMode; descAr: string; descEn: string }[] = [
    { key: 'low', descAr: 'توفير البيانات · ضغط عالٍ مناسب للإنترنت البطيء', descEn: 'Data saver · compressed, ideal for slow connections' },
    { key: 'medium', descAr: 'متوازن · جودة جيدة مع معالجة خفيفة للصوت', descEn: 'Balanced · good quality with light audio correction' },
    { key: 'high', descAr: 'وضوح معزز · رفع الترددات العالية للتلاوة', descEn: 'Enhanced clarity · high-frequency boost for vocals' },
    { key: 'studio', descAr: 'معالجة استوديو كاملة · أفضل تجربة استماع', descEn: 'Full studio processing · best listening experience' },
]

export default function QualitySelector({ snapshot, lang }: { snapshot: EngineSnapshot; lang: Lang }) {
    const select = useCallback((m: QualityMode) => { getEngine().setMode(m); }, [])
    const selected = modes.find(m => m.key === snapshot.mode)

    return (
        <div className="w-full">
            <p className="text-text-muted text-[11px] font-semibold tracking-wider uppercase text-center mb-3">{t('qualityLabel', lang)}</p>
            <div className="flex gap-1.5 w-full">
                {modes.map(({ key }) => (
                    <button
                        key={key}
                        onClick={() => select(key)}
                        className={`flex-1 py-2 rounded-xl text-[11px] font-semibold transition-all duration-300 ${snapshot.mode === key
                            ? 'bg-accent/15 text-accent border border-accent/25 shadow-[0_0_12px_rgba(212,168,83,0.06)]'
                            : 'bg-white/[0.02] text-text-secondary border border-border hover:bg-white/[0.04]'
                            }`}
                        aria-pressed={snapshot.mode === key}
                    >
                        {t(key, lang)}
                    </button>
                ))}
            </div>
            {selected && (
                <p className="text-text-muted/70 text-[10px] text-center mt-2.5 transition-all duration-300">
                    {lang === 'ar' ? selected.descAr : selected.descEn}
                </p>
            )}
            {!snapshot.dspActive && (
                <p className="text-text-muted/50 text-[10px] text-center mt-1">{t('dspUnavailable', lang)}</p>
            )}
        </div>
    )
}
