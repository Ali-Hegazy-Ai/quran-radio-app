'use client'
import { useCallback, useRef, useEffect } from 'react'
import type { EngineSnapshot } from '@/lib/audioEngine'
import { getEngine } from '@/lib/audioEngine'
import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

function PlayIcon() { return <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg> }
function PauseIcon() { return <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg> }
function VolOn() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg> }
function VolOff() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg> }
function Spin() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.2" /><path d="M12 2a10 10 0 018.66 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg> }

export default function AudioController({ snapshot, lang }: { snapshot: EngineSnapshot; lang: Lang }) {
    const { state, volume, muted } = snapshot
    const mgr = getEngine()
    const playing = state === 'PLAYING', buffering = state === 'BUFFERING', active = playing || buffering
    const trackRef = useRef<HTMLDivElement>(null)
    const dragging = useRef(false)

    const toggle = useCallback(() => { active ? mgr.pause() : mgr.play() }, [active, mgr])
    const onMute = useCallback(() => { mgr.toggleMute() }, [mgr])

    const displayVol = muted ? 0 : volume
    const pct = Math.round(displayVol * 100)

    const updateVolFromEvent = useCallback((clientX: number) => {
        if (!trackRef.current) return
        const rect = trackRef.current.getBoundingClientRect()
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        mgr.setVolume(ratio)
    }, [mgr])

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        dragging.current = true
            ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
        updateVolFromEvent(e.clientX)
    }, [updateVolFromEvent])

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!dragging.current) return
        updateVolFromEvent(e.clientX)
    }, [updateVolFromEvent])

    const onPointerUp = useCallback(() => { dragging.current = false }, [])

    return (
        <div className="flex flex-col items-center w-full gap-7">
            <button
                type="button" onClick={toggle} disabled={buffering}
                className={`relative flex items-center justify-center w-[68px] h-[68px] rounded-full text-white transition-all duration-300 disabled:cursor-wait ${playing ? 'bg-emerald animate-glow shadow-[0_0_24px_rgba(45,139,111,0.15)]' : 'bg-accent hover:brightness-110 active:scale-95 shadow-[0_4px_24px_rgba(212,168,83,0.15)]'
                    }`}
                aria-label={active ? t('pause', lang) : t('play', lang)}
            >
                {buffering ? <Spin /> : playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Volume control — always LTR */}
            <div className="flex items-center w-full gap-3" dir="ltr">
                <button type="button" onClick={onMute}
                    className="text-text-secondary hover:text-accent transition-colors p-1.5 rounded-lg flex-shrink-0"
                    aria-label={muted ? t('unmute', lang) : t('mute', lang)} style={{ minWidth: 44, minHeight: 44 }}>
                    {muted || volume === 0 ? <VolOff /> : <VolOn />}
                </button>

                {/* Custom volume bar with visual fill */}
                <div className="flex-1 flex items-center gap-3">
                    <div
                        ref={trackRef}
                        className="relative flex-1 h-[6px] rounded-full bg-border cursor-pointer select-none touch-none group"
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        role="slider"
                        aria-label={t('volume', lang)}
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); mgr.setVolume(Math.min(1, volume + 0.05)); }
                            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); mgr.setVolume(Math.max(0, volume - 0.05)); }
                        }}
                    >
                        {/* Fill */}
                        <div
                            className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-75 ease-out"
                            style={{
                                width: `${pct}%`,
                                background: pct > 0
                                    ? 'linear-gradient(90deg, #2D8B6F 0%, #D4A853 100%)'
                                    : 'transparent',
                            }}
                        />
                        {/* Thumb */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-accent shadow-[0_0_8px_rgba(212,168,83,0.3)] transition-[left] duration-75 ease-out group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(212,168,83,0.4)]"
                            style={{ left: `calc(${pct}% - 8px)` }}
                        />
                    </div>

                    {/* Volume percentage */}
                    <span className="text-text-muted text-[11px] font-mono w-[32px] text-center flex-shrink-0 tabular-nums">
                        {pct}%
                    </span>
                </div>
            </div>
        </div>
    )
}
