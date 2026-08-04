import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Paquete de datos que sube por un pilar entre capas. */
interface Packet {
  corner: number;   // 0..3 — qué pilar recorre
  layer: number;    // capa de origen
  p: number;        // progreso 0..1
  speed: number;
  hue: number;      // 0..1 → rosa..violeta
}

/** Glifo de código que flota hacia arriba (textura dev sutil). */
interface Glyph {
  x: number;
  y: number;
  vy: number;
  char: string;
  size: number;
  alpha: number;
  phase: number;
}

/** Fallbacks: los valores reales se leen de los tokens del <body> al iniciar. */
const PINK = [251, 37, 118];
const VIOLET = [123, 47, 247];

const ISO_X = 0.866; // cos(30°)
const ISO_Y = 0.5;   // sin(30°)

const LAYERS = 5;
const DIVISIONS = 4;
const GLYPH_CHARS = ['{', '}', '</>', '()', '=>', '[]', ';', '#', '$', '~', '||', '&&'];

@Component({
  selector: 'app-stack-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack-background.component.html',
  styleUrls: ['./stack-background.component.css']
})
export class StackBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private packets: Packet[] = [];
  private glyphs: Glyph[] = [];
  private rafId = 0;
  private running = false;
  private reduced = false;
  private mx = 0.5;
  private my = 0.5;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resize();
    this.spawn();

    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.resize, { passive: true });
      window.addEventListener('mousemove', this.onMouse, { passive: true });

      // solo anima cuando la sección está en pantalla
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) this.start();
        else this.stop();
      });
      this.observer.observe(this.host.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.stop();
    this.observer?.disconnect();
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.onMouse);
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    this.rafId = requestAnimationFrame(this.loop);
  }

  private stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private resize = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const rect = this.host.nativeElement.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = rect.width;
    this.h = rect.height;
    canvas.width = this.w * this.dpr;
    canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };

  private onMouse = (e: MouseEvent): void => {
    this.mx = e.clientX / window.innerWidth;
    this.my = e.clientY / window.innerHeight;
  };

  private spawn(): void {
    this.packets = Array.from({ length: 14 }, () => this.newPacket());
    const count = Math.min(18, Math.round(this.w / 90));
    this.glyphs = Array.from({ length: count }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vy: -(0.12 + Math.random() * 0.25),
      char: GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)],
      size: 10 + Math.random() * 9,
      alpha: 0.05 + Math.random() * 0.09,
      phase: Math.random() * Math.PI * 2
    }));
  }

  private newPacket(): Packet {
    return {
      corner: Math.floor(Math.random() * 4),
      layer: Math.floor(Math.random() * (LAYERS - 1)),
      p: Math.random(),
      speed: 0.0035 + Math.random() * 0.006,
      hue: Math.random()
    };
  }

  /** Proyección isométrica de (u,v) en una capa a altura `lift`. */
  private project(u: number, v: number, lift: number, cx: number, cy: number, s: number): [number, number] {
    return [cx + (u - v) * ISO_X * s, cy + (u + v) * ISO_Y * s - lift];
  }

  /** Extremos del degradado, tomados del tema activo. */
  private c1 = [...PINK];
  private c2 = [...VIOLET];

  /** Lee los acentos del tema activo (tokens CSS del <body>). */
  private readThemeColors(): void {
    if (typeof getComputedStyle !== 'function') return;
    const cs = getComputedStyle(document.body);
    const parse = (name: string, fallback: number[]) => {
      const raw = cs.getPropertyValue(name).trim();
      const parts = raw.split(',').map(n => parseInt(n.trim(), 10));
      return parts.length === 3 && parts.every(n => !isNaN(n)) ? parts : fallback;
    };
    this.c1 = parse('--accent-1-rgb', PINK);
    this.c2 = parse('--accent-2-rgb', VIOLET);
  }

  private mix(t: number): string {
    const r = Math.round(this.c1[0] + (this.c2[0] - this.c1[0]) * t);
    const g = Math.round(this.c1[1] + (this.c2[1] - this.c1[1]) * t);
    const b = Math.round(this.c1[2] + (this.c2[2] - this.c1[2]) * t);
    return `${r}, ${g}, ${b}`;
  }

  private loop = (t: number): void => {
    if (!this.running) return;
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    // Encaje de la pila en la sección
    const s = Math.min(w, h * 1.9) * 0.165;
    const gap = Math.max(26, h * 0.075);
    const px = (this.mx - 0.5) * 26;
    const py = (this.my - 0.5) * 14;
    const cx = w * 0.5 + px;
    const cy = h * 0.5 + py + (LAYERS * gap) * 0.32;
    const S = 1;

    // ---- Glifos de código flotando (textura de fondo) ----
    ctx.font = '500 12px "SF Mono", ui-monospace, Menlo, monospace';
    for (const g of this.glyphs) {
      if (!this.reduced) {
        g.y += g.vy;
        if (g.y < -20) { g.y = h + 20; g.x = Math.random() * w; }
      }
      const tw = 0.6 + 0.4 * Math.sin(t / 1400 + g.phase);
      ctx.font = `500 ${g.size}px "SF Mono", ui-monospace, Menlo, monospace`;
      ctx.fillStyle = `rgba(${this.mix(0.5)}, ${g.alpha * tw})`;
      ctx.fillText(g.char, g.x, g.y);
    }

    // ---- Capas isométricas (de abajo hacia arriba) ----
    const lifts: number[] = [];
    for (let i = 0; i < LAYERS; i++) {
      const bob = this.reduced ? 0 : Math.sin(t / 1300 + i * 0.75) * 4;
      lifts.push(i * gap + bob);
    }

    for (let i = 0; i < LAYERS; i++) {
      const lift = lifts[i];
      const tint = i / (LAYERS - 1);
      const rgb = this.mix(tint);
      const corners = [
        this.project(-S, -S, lift, cx, cy, s),
        this.project(S, -S, lift, cx, cy, s),
        this.project(S, S, lift, cx, cy, s),
        this.project(-S, S, lift, cx, cy, s)
      ];

      // relleno tenue
      ctx.beginPath();
      ctx.moveTo(corners[0][0], corners[0][1]);
      for (let k = 1; k < 4; k++) ctx.lineTo(corners[k][0], corners[k][1]);
      ctx.closePath();
      ctx.fillStyle = `rgba(${rgb}, 0.016)`;
      ctx.fill();

      // grilla interna de la capa
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${rgb}, 0.042)`;
      for (let d = 1; d < DIVISIONS; d++) {
        const q = -S + (2 * S * d) / DIVISIONS;
        const a1 = this.project(q, -S, lift, cx, cy, s);
        const a2 = this.project(q, S, lift, cx, cy, s);
        const b1 = this.project(-S, q, lift, cx, cy, s);
        const b2 = this.project(S, q, lift, cx, cy, s);
        ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(b1[0], b1[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke();
      }

      // borde neón de la capa
      ctx.beginPath();
      ctx.moveTo(corners[0][0], corners[0][1]);
      for (let k = 1; k < 4; k++) ctx.lineTo(corners[k][0], corners[k][1]);
      ctx.closePath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(${rgb}, 0.19)`;
      ctx.shadowColor = `rgba(${rgb}, 0.28)`;
      ctx.shadowBlur = 9;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // pilares hacia la capa siguiente
      if (i < LAYERS - 1) {
        const next = lifts[i + 1];
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${rgb}, 0.075)`;
        for (let k = 0; k < 4; k++) {
          const u = k === 0 || k === 3 ? -S : S;
          const v = k < 2 ? -S : S;
          const top = this.project(u, v, next, cx, cy, s);
          ctx.beginPath();
          ctx.moveTo(corners[k][0], corners[k][1]);
          ctx.lineTo(top[0], top[1]);
          ctx.stroke();
        }
      }
    }

    // ---- Paquetes de datos subiendo por los pilares ----
    for (const pk of this.packets) {
      if (!this.reduced) {
        pk.p += pk.speed;
        if (pk.p > 1) Object.assign(pk, this.newPacket(), { p: 0 });
      }
      const k = pk.corner;
      const u = k === 0 || k === 3 ? -S : S;
      const v = k < 2 ? -S : S;
      const from = this.project(u, v, lifts[pk.layer], cx, cy, s);
      const to = this.project(u, v, lifts[Math.min(pk.layer + 1, LAYERS - 1)], cx, cy, s);
      const x = from[0] + (to[0] - from[0]) * pk.p;
      const y = from[1] + (to[1] - from[1]) * pk.p;
      const rgb = this.mix(pk.hue);
      const fade = Math.sin(pk.p * Math.PI); // aparece y se desvanece

      // estela
      const grad = ctx.createLinearGradient(x, y, x, y + 22);
      grad.addColorStop(0, `rgba(${rgb}, ${0.34 * fade})`);
      grad.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 22);
      ctx.stroke();

      // punto brillante
      ctx.fillStyle = `rgba(${rgb}, ${0.62 * fade})`;
      ctx.shadowColor = `rgba(${rgb}, 0.6)`;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, 1.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    this.rafId = requestAnimationFrame(this.loop);
  };
}
