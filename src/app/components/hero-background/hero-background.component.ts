import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  z: number; // profundidad 0..1 (parallax y tamaño)
  vx: number;
  vy: number;
  r: number;
  hue: 'pink' | 'violet' | 'white';
  tw: number; // fase de titileo
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
}

/**
 * El canvas no entiende var(--token), así que los acentos se leen del
 * <body> en tiempo de ejecución: al cambiar de universo (theme-node),
 * las partículas cambian de color solas.
 */
const FALLBACK_COLORS = {
  accent1: '251, 37, 118',
  accent2: '162, 89, 255',
  white: '244, 241, 248'
};

@Component({
  selector: 'app-hero-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-background.component.html',
  styleUrls: ['./hero-background.component.css']
})
export class HeroBackgroundComponent implements AfterViewInit, OnDestroy {
  @Input() showGrid = true;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private colors = { ...FALLBACK_COLORS };
  private star: ShootingStar | null = null;
  private nextStarAt = 0;
  private rafId = 0;
  private running = false;
  private mx = 0.5;
  private my = 0.5;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.readThemeColors();
    this.resize();
    this.spawnParticles();

    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.resize, { passive: true });
      window.addEventListener('mousemove', this.onMouse, { passive: true });

      // dibuja solo cuando el hero está en pantalla
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

  private spawnParticles(): void {
    const count = Math.min(110, Math.round((this.w * this.h) / 16000));
    const hues: Particle['hue'][] = ['pink', 'violet', 'white', 'white'];
    this.particles = Array.from({ length: count }, () => {
      const z = Math.random();
      return {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        z,
        vx: (Math.random() - 0.5) * 0.22 * (0.4 + z),
        vy: (Math.random() - 0.5) * 0.22 * (0.4 + z),
        r: 0.8 + z * 1.8,
        hue: hues[Math.floor(Math.random() * hues.length)],
        tw: Math.random() * Math.PI * 2
      };
    });
  }

  private loop = (t: number): void => {
    if (!this.running) return;
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    const px = (this.mx - 0.5) * 36;
    const py = (this.my - 0.5) * 24;

    // enlaces tipo constelación
    ctx.lineWidth = 1;
    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 115 * 115) {
          const alpha = (1 - Math.sqrt(d2) / 115) * 0.14;
          ctx.strokeStyle = `rgba(${this.colors.accent2}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x + px * a.z, a.y + py * a.z);
          ctx.lineTo(b.x + px * b.z, b.y + py * b.z);
          ctx.stroke();
        }
      }
    }

    // partículas
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;

      const twinkle = 0.45 + 0.55 * (0.5 + Math.sin(t / 900 + p.tw) / 2);
      ctx.fillStyle = `rgba(${this.hueColor(p.hue)}, ${(0.25 + p.z * 0.6) * twinkle})`;
      ctx.beginPath();
      ctx.arc(p.x + px * p.z, p.y + py * p.z, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // estrella fugaz ocasional
    if (!this.star && t > this.nextStarAt) {
      this.star = {
        x: Math.random() * w * 0.7 + w * 0.2,
        y: Math.random() * h * 0.25,
        vx: -(5 + Math.random() * 4),
        vy: 2.4 + Math.random() * 1.6,
        life: 1
      };
    }
    if (this.star) {
      const s = this.star;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
      grad.addColorStop(0, `rgba(${this.colors.white}, ${0.85 * s.life})`);
      grad.addColorStop(1, `rgba(${this.colors.white}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
      ctx.stroke();

      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.016;
      if (s.life <= 0) {
        this.star = null;
        this.nextStarAt = t + 4000 + Math.random() * 6000;
      }
    }

    this.rafId = requestAnimationFrame(this.loop);
  };

  /** Lee los acentos del tema activo (tokens CSS del <body>). */
  private readThemeColors(): void {
    if (typeof getComputedStyle !== 'function') return;
    const cs = getComputedStyle(document.body);
    const read = (name: string, fallback: string) =>
      cs.getPropertyValue(name).trim() || fallback;
    this.colors = {
      accent1: read('--accent-1-rgb', FALLBACK_COLORS.accent1),
      accent2: read('--accent-2-rgb', FALLBACK_COLORS.accent2),
      white: FALLBACK_COLORS.white
    };
  }

  private hueColor(hue: Particle['hue']): string {
    if (hue === 'pink') return this.colors.accent1;
    if (hue === 'violet') return this.colors.accent2;
    return this.colors.white;
  }
}
