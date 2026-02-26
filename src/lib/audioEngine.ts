'use strict';

export type AudioState = 'IDLE' | 'BUFFERING' | 'PLAYING' | 'PAUSED' | 'ERROR';
export type QualityMode = 'low' | 'medium' | 'high' | 'studio';

export interface EngineSnapshot {
    state: AudioState;
    volume: number;
    muted: boolean;
    mode: QualityMode;
    errorCount: number;
    dspActive: boolean;
}

type Listener = (s: EngineSnapshot) => void;

const VOL_KEY = 'qr_vol';
const MUTE_KEY = 'qr_mute';
const MODE_KEY = 'qr_mode';
const BACKOFFS = [1000, 2000, 4000, 8000, 16000];
const MAX_RETRIES = 5;
const MODES: QualityMode[] = ['low', 'medium', 'high', 'studio'];

function ld(k: string, fb: string) { try { return localStorage.getItem(k) ?? fb; } catch { return fb; } }
function sv(k: string, v: string) { try { localStorage.setItem(k, v); } catch { } }

// ─── DSP Chain builders ─────────────────────────────────────────────

interface Chain { nodes: AudioNode[]; input: AudioNode; output: AudioNode }

function lowChain(c: AudioContext): Chain {
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 8000; lp.Q.value = 0.7;
    const ws = c.createWaveShaper();
    const steps = Math.pow(2, 12), curve = new Float32Array(65536);
    for (let i = 0; i < 65536; i++) { const x = i / 32768 - 1; curve[i] = Math.round(x * steps) / steps; }
    ws.curve = curve; ws.oversample = '2x';
    const cp = c.createDynamicsCompressor();
    cp.threshold.value = -24; cp.ratio.value = 6; cp.attack.value = 0.003; cp.release.value = 0.25; cp.knee.value = 10;
    const g = c.createGain(); g.gain.value = 0.9;
    lp.connect(ws); ws.connect(cp); cp.connect(g);
    return { input: lp, output: g, nodes: [lp, ws, cp, g] };
}

function mediumChain(c: AudioContext): Chain {
    const e1 = c.createBiquadFilter(); e1.type = 'peaking'; e1.frequency.value = 200; e1.gain.value = -1; e1.Q.value = 1;
    const e2 = c.createBiquadFilter(); e2.type = 'peaking'; e2.frequency.value = 2500; e2.gain.value = 1.5; e2.Q.value = 1.2;
    const cp = c.createDynamicsCompressor();
    cp.threshold.value = -18; cp.ratio.value = 2; cp.attack.value = 0.05; cp.release.value = 0.2; cp.knee.value = 15;
    e1.connect(e2); e2.connect(cp);
    return { input: e1, output: cp, nodes: [e1, e2, cp] };
}

function highChain(c: AudioContext): Chain {
    const ls = c.createBiquadFilter(); ls.type = 'lowshelf'; ls.frequency.value = 150; ls.gain.value = -2;
    const pk = c.createBiquadFilter(); pk.type = 'peaking'; pk.frequency.value = 3000; pk.gain.value = 2; pk.Q.value = 1.5;
    const hs = c.createBiquadFilter(); hs.type = 'highshelf'; hs.frequency.value = 6000; hs.gain.value = 3;
    const cp = c.createDynamicsCompressor();
    cp.threshold.value = -15; cp.ratio.value = 3; cp.attack.value = 0.01; cp.release.value = 0.15; cp.knee.value = 12;
    const mk = c.createGain(); mk.gain.value = 1.12;
    ls.connect(pk); pk.connect(hs); hs.connect(cp); cp.connect(mk);
    return { input: ls, output: mk, nodes: [ls, pk, hs, cp, mk] };
}

function studioChain(c: AudioContext): Chain {
    const inp = c.createGain(); inp.gain.value = 1;
    const eq: BiquadFilterNode[] = [];
    const bands: [number, number, number][] = [[80, -1.5, 0.8], [250, -1, 1], [1000, 1, 1.2], [3500, 2, 1.5], [10000, 1.5, 0.7]];
    bands.forEach(([f, g, q]) => {
        const n = c.createBiquadFilter(); n.type = 'peaking'; n.frequency.value = f; n.gain.value = g; n.Q.value = q; eq.push(n);
    });
    inp.connect(eq[0]); for (let i = 0; i < eq.length - 1; i++) eq[i].connect(eq[i + 1]);
    const dry = c.createGain(); dry.gain.value = 0.6;
    const wet = c.createDynamicsCompressor();
    wet.threshold.value = -30; wet.ratio.value = 8; wet.attack.value = 0.002; wet.release.value = 0.08; wet.knee.value = 5;
    const wg = c.createGain(); wg.gain.value = 0.4;
    const sum = c.createGain(); sum.gain.value = 1;
    eq[eq.length - 1].connect(dry); eq[eq.length - 1].connect(wet); wet.connect(wg);
    dry.connect(sum); wg.connect(sum);
    const lim = c.createWaveShaper();
    const lc = new Float32Array(65536);
    for (let i = 0; i < 65536; i++) { const x = i / 32768 - 1; lc[i] = Math.tanh(x * 1.5) / Math.tanh(1.5); }
    lim.curve = lc; lim.oversample = '4x';
    const norm = c.createGain(); norm.gain.value = 0.85;
    sum.connect(lim); lim.connect(norm);
    return { input: inp, output: norm, nodes: [inp, ...eq, dry, wet, wg, sum, lim, norm] };
}

function buildChain(c: AudioContext, m: QualityMode): Chain {
    switch (m) { case 'low': return lowChain(c); case 'medium': return mediumChain(c); case 'high': return highChain(c); case 'studio': return studioChain(c); }
}

// ─── Engine ─────────────────────────────────────────────────────────

class AudioEngine {
    private ctx: AudioContext | null = null;
    private audio: HTMLAudioElement | null = null;
    private source: MediaElementAudioSourceNode | null = null;
    private masterGain: GainNode | null = null;
    private analyser: AnalyserNode | null = null;
    private chain: Chain | null = null;
    private url = '';
    private _st: AudioState = 'IDLE';
    private _vol: number;
    private _mut: boolean;
    private _mode: QualityMode;
    private _err = 0;
    private _dsp = false;
    private _dspAttempted = false;
    private rtimer: ReturnType<typeof setTimeout> | null = null;
    private ls = new Set<Listener>();

    constructor() {
        this._vol = Number(ld(VOL_KEY, '0.8')) || 0.8;
        this._mut = ld(MUTE_KEY, 'false') === 'true';
        const m = ld(MODE_KEY, 'medium');
        this._mode = MODES.includes(m as QualityMode) ? m as QualityMode : 'medium';
    }

    init(u: string) { this.url = u; }

    play() {
        if (!this.url) return;
        this.ensure();
        this._err = 0;
        this.trans('BUFFERING');
        if (!this.audio!.src || this.audio!.src !== this.url) this.audio!.src = this.url;
        if (this.ctx?.state === 'suspended') this.ctx.resume();
        this.audio!.play().catch(() => this.onErr());
    }

    pause() { this.audio?.pause(); this.trans('PAUSED'); }

    setVolume(v: number) {
        this._vol = Math.max(0, Math.min(1, v));
        this.applyVol();
        if (this._vol > 0 && this._mut) { this._mut = false; sv(MUTE_KEY, 'false'); }
        sv(VOL_KEY, String(this._vol));
        this.emit();
    }

    toggleMute() {
        this._mut = !this._mut;
        this.applyVol();
        sv(MUTE_KEY, String(this._mut));
        this.emit();
    }

    setMode(m: QualityMode) {
        if (this._mode === m) return;
        this._mode = m; sv(MODE_KEY, m);
        if (this._dsp && this.ctx && this.source) this.rebuildDSP();
        this.emit();
    }

    retry() { this._err = 0; this.clrTimer(); this.destroyAudio(); this.play(); }

    on(fn: Listener): () => void { this.ls.add(fn); fn(this.snap()); return () => this.ls.delete(fn); }

    snap(): EngineSnapshot {
        return { state: this._st, volume: this._vol, muted: this._mut, mode: this._mode, errorCount: this._err, dspActive: this._dsp };
    }

    /** Returns the AnalyserNode for spectrum visualization (null if DSP inactive) */
    getAnalyser(): AnalyserNode | null { return this.analyser; }

    // ── Internal ──────────────────────────────────────────

    private ensure() {
        if (this.audio) return;
        this.audio = new Audio();
        this.audio.preload = 'none';

        if (!this._dspAttempted) {
            this._dspAttempted = true;
            try {
                this.audio.crossOrigin = 'anonymous';
                this.ctx = new AudioContext();
                this.source = this.ctx.createMediaElementSource(this.audio);
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = this._mut ? 0 : this._vol;
                // AnalyserNode — tapped after DSP, before master gain → destination
                this.analyser = this.ctx.createAnalyser();
                this.analyser.fftSize = 256;
                this.analyser.smoothingTimeConstant = 0.8;
                this.masterGain.connect(this.analyser);
                this.analyser.connect(this.ctx.destination);
                this.rebuildDSP();
                this._dsp = true;
            } catch {
                this._dsp = false;
            }
        }

        if (!this._dsp) {
            this.audio.volume = this._mut ? 0 : this._vol;
        }

        this.audio.addEventListener('playing', () => this.trans('PLAYING'));
        this.audio.addEventListener('pause', () => { if (this._st !== 'ERROR' && this._st !== 'IDLE') this.trans('PAUSED'); });
        this.audio.addEventListener('waiting', () => { if (this._st === 'PLAYING') this.trans('BUFFERING'); });
        this.audio.addEventListener('stalled', () => { if (this._st === 'PLAYING' || this._st === 'BUFFERING') this.trans('BUFFERING'); });
        this.audio.addEventListener('error', () => this.onErr());
        this.audio.addEventListener('ended', () => this.trans('IDLE'));
    }

    private rebuildDSP() {
        if (!this.ctx || !this.source) return;
        if (this.chain) { this.source.disconnect(); this.chain.nodes.forEach(n => { try { n.disconnect(); } catch { } }); }
        this.chain = buildChain(this.ctx, this._mode);
        this.source.connect(this.chain.input);
        this.chain.output.connect(this.masterGain!);
    }

    private applyVol() {
        const v = this._mut ? 0 : this._vol;
        if (this.masterGain && this._dsp) this.masterGain.gain.value = v;
        if (this.audio && !this._dsp) this.audio.volume = v;
    }

    private trans(s: AudioState) { if (this._st !== s) { this._st = s; this.emit(); } }
    private emit() { const s = this.snap(); this.ls.forEach(fn => fn(s)); }

    private onErr() {
        if (this._dsp && this._err === 0) {
            this._dsp = false;
            this.destroyAudio();
            this.play();
            return;
        }
        this._err++;
        this.trans('ERROR');
        if (this._err < MAX_RETRIES) {
            const d = BACKOFFS[Math.min(this._err - 1, BACKOFFS.length - 1)];
            this.clrTimer();
            this.rtimer = setTimeout(() => { this.destroyAudio(); this.play(); }, d);
        }
    }

    private destroyAudio() {
        if (this.audio) { this.audio.pause(); this.audio.removeAttribute('src'); this.audio.load(); }
        if (this.ctx?.state !== 'closed') try { this.ctx?.close(); } catch { }
        this.audio = null; this.source = null; this.masterGain = null; this.analyser = null; this.chain = null; this.ctx = null;
    }

    private clrTimer() { if (this.rtimer) { clearTimeout(this.rtimer); this.rtimer = null; } }
}

let inst: AudioEngine | null = null;
export function getEngine(): AudioEngine { if (!inst) inst = new AudioEngine(); return inst; }
