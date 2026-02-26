'use client'
import { useEffect, useRef, useState } from 'react'
import { getEngine } from '@/lib/audioEngine'
import type { AudioState } from '@/lib/audioEngine'
import type { Lang } from '@/lib/i18n'
import { t } from '@/lib/i18n'

const BAR_COUNT = 32;
const COLORS = ['#2D8B6F', '#3A9D7E', '#58B896', '#7CCAAF', '#A0DBBE', '#C4ECD0', '#D4A853'];

export default function AudioSpectrum({ state, lang }: { state: AudioState; lang: Lang }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef<number>(0)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (state !== 'PLAYING') { setActive(false); return; }
        const analyser = getEngine().getAnalyser();
        if (!analyser) { setActive(false); return; }
        setActive(true);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const data = new Uint8Array(analyser.frequencyBinCount);
        const step = Math.floor(data.length / BAR_COUNT);
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();

        const draw = () => {
            analyser.getByteFrequencyData(data);
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            ctx.clearRect(0, 0, w, h);

            const barW = (w - (BAR_COUNT - 1) * 2) / BAR_COUNT;

            for (let i = 0; i < BAR_COUNT; i++) {
                let sum = 0;
                for (let j = 0; j < step; j++) sum += data[i * step + j] || 0;
                const avg = sum / step;
                const barH = Math.max(2, (avg / 255) * h * 0.9);
                const x = i * (barW + 2);
                const y = h - barH;
                const colorIdx = Math.min(Math.floor((avg / 255) * COLORS.length), COLORS.length - 1);
                ctx.fillStyle = COLORS[colorIdx];
                ctx.beginPath();
                ctx.roundRect(x, y, barW, barH, 2);
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);

        return () => { cancelAnimationFrame(rafRef.current); };
    }, [state]);

    if (!active && state !== 'PLAYING') return null;

    return (
        <div className="w-full">
            <p className="text-text-muted text-[10px] uppercase tracking-widest text-center mb-2 font-semibold">
                {lang === 'ar' ? 'تحليل الطيف الصوتي' : 'Frequency Spectrum'}
            </p>
            <canvas
                ref={canvasRef}
                className="w-full h-[48px] rounded-lg"
                aria-label={lang === 'ar' ? 'تصور الطيف الترددي' : 'Frequency spectrum visualization'}
                role="img"
            />
        </div>
    )
}
