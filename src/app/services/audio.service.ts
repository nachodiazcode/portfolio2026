import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private convolver: ConvolverNode | null = null;
  private isSoundEnabled = true;

  constructor() {
    try {
      this.isSoundEnabled = localStorage.getItem('sound_enabled') !== 'false';
    } catch (e) {
      this.isSoundEnabled = true;
    }
  }

  get enabled(): boolean {
    return this.isSoundEnabled;
  }

  private init(): void {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master volume — soft enough to feel ambient
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create a small reverb tail for spatial depth
      this.convolver = this.ctx.createConvolver();
      const sampleRate = this.ctx.sampleRate;
      const length = sampleRate * 0.4; // 400ms reverb
      const impulse = this.ctx.createBuffer(2, length, sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = impulse.getChannelData(ch);
        for (let i = 0; i < length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.8);
        }
      }
      this.convolver.buffer = impulse;

      // Wet/dry mix: convolver feeds into a low-gain node
      const reverbGain = this.ctx.createGain();
      reverbGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.convolver.connect(reverbGain);
      reverbGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  toggle(): boolean {
    this.isSoundEnabled = !this.isSoundEnabled;
    try {
      localStorage.setItem('sound_enabled', String(this.isSoundEnabled));
    } catch (e) {}
    return this.isSoundEnabled;
  }

  play(type: 'hover' | 'click' | 'slide-open' | 'slide-close' | 'reveal' | 'modal'): void {
    if (!this.isSoundEnabled) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    switch (type) {
      case 'hover':
        this.playHoverSound(now);
        break;
      case 'click':
        this.playClickSound(now);
        break;
      case 'slide-open':
        this.playSlideOpenSound(now);
        break;
      case 'slide-close':
        this.playSlideCloseSound(now);
        break;
      case 'reveal':
        this.playRevealSound(now);
        break;
      case 'modal':
        this.playModalSound(now);
        break;
    }
  }

  // ── Hover: crystalline "ting" with harmonic shimmer ──
  private playHoverSound(now: number): void {
    if (!this.ctx || !this.masterGain) return;

    const frequencies = [2200, 3300]; // fundamental + 5th harmonic
    frequencies.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const vol = i === 0 ? 0.1 : 0.04;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      if (this.convolver) gain.connect(this.convolver);

      osc.start(now);
      osc.stop(now + 0.08);
    });
  }

  // ── Click: warm ascending chord (major triad + octave) ──
  private playClickSound(now: number): void {
    if (!this.ctx || !this.masterGain) return;

    // C5-E5-G5-C6 — bright major chord arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const delay = 0.018;
    const volumes = [0.14, 0.12, 0.10, 0.08];

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * delay);

      // Quick attack, medium decay
      gain.gain.setValueAtTime(0, now + i * delay);
      gain.gain.linearRampToValueAtTime(volumes[i], now + i * delay + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32 + i * delay);

      osc.connect(gain);
      gain.connect(this.masterGain);
      if (this.convolver) gain.connect(this.convolver);

      osc.start(now + i * delay);
      osc.stop(now + 0.4);
    });
  }

  // ── Slide Open: rising whoosh with layered sweeps ──
  private playSlideOpenSound(now: number): void {
    if (!this.ctx || !this.masterGain) return;

    // Low sweep
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(120, now);
    osc1.frequency.exponentialRampToValueAtTime(480, now + 0.2);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(now);
    osc1.stop(now + 0.26);

    // Shimmer layer
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(660, now + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.22);
    gain2.gain.setValueAtTime(0, now + 0.06);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    if (this.convolver) gain2.connect(this.convolver);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.3);
  }

  // ── Slide Close: descending soft thud ──
  private playSlideCloseSound(now: number): void {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(420, now);
    osc1.frequency.exponentialRampToValueAtTime(100, now + 0.18);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.16, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(now);
    osc1.stop(now + 0.22);

    // Soft high tail
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now);
    osc2.frequency.exponentialRampToValueAtTime(220, now + 0.15);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    if (this.convolver) gain2.connect(this.convolver);
    osc2.start(now);
    osc2.stop(now + 0.2);
  }

  // ── Reveal: ethereal chime when elements appear on scroll ──
  private playRevealSound(now: number): void {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, now);
    osc.frequency.exponentialRampToValueAtTime(1480, now + 0.15);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);
    if (this.convolver) gain.connect(this.convolver);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // ── Modal: deep glass resonance when a modal opens ──
  private playModalSound(now: number): void {
    if (!this.ctx || !this.masterGain) return;

    // Deep tone
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(220, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc1.start(now);
    osc1.stop(now + 0.42);

    // Glass harmonic
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.04);
    gain2.gain.setValueAtTime(0, now + 0.04);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);
    if (this.convolver) gain2.connect(this.convolver);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.38);

    // Top shimmer
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(1760, now + 0.06);
    gain3.gain.setValueAtTime(0, now + 0.06);
    gain3.gain.linearRampToValueAtTime(0.03, now + 0.08);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    osc3.connect(gain3);
    gain3.connect(this.masterGain);
    if (this.convolver) gain3.connect(this.convolver);
    osc3.start(now + 0.06);
    osc3.stop(now + 0.32);
  }
}
