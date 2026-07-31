import { Directive, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

/**
 * Campo de partículas espaciales con conexiones cercanas, sobre <canvas>.
 * Port fiel del _bindSpace del diseño original.
 */
@Directive({
  selector: '[data-space-particles]',
  standalone: true
})
export class SpaceParticlesDirective implements AfterViewInit, OnDestroy {
  private raf = 0;
  private resizeHandler = () => this.resize();
  private ctx!: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;
  private t = 0;
  private particles: any[] = [];
  private readonly DPR = Math.min(window.devicePixelRatio || 1, 2);
  private readonly palette = [
    'rgba(255,255,255,',
    'rgba(240,166,200,',
    'rgba(169,182,255,',
    'rgba(179,131,255,',
    'rgba(120,220,230,'
  ];

  constructor(private el: ElementRef<HTMLCanvasElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const canvas = this.el.nativeElement;
    const c = canvas.getContext('2d');
    if (!c) return;
    this.ctx = c;
    this.resize();
    window.addEventListener('resize', this.resizeHandler);
    this.zone.runOutsideAngular(() => this.draw());
  }

  private resize(): void {
    const canvas = this.el.nativeElement;
    const r = canvas.getBoundingClientRect();
    this.W = r.width;
    this.H = r.height;
    canvas.width = this.W * this.DPR;
    canvas.height = this.H * this.DPR;
    this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);
    const target = Math.min(120, Math.round((this.W * this.H) / 14000));
    this.particles = new Array(target).fill(0).map(() => ({
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.02,
      color: this.palette[(Math.random() * this.palette.length) | 0],
      glow: Math.random() > 0.85
    }));
  }

  private draw = (): void => {
    const ctx = this.ctx;
    this.t += 1;
    ctx.clearRect(0, 0, this.W, this.H);
    const ps = this.particles;
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const a = ps[i], b = ps[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const alpha = (1 - d2 / 9000) * 0.16;
          ctx.strokeStyle = 'rgba(180,150,240,' + alpha.toFixed(3) + ')';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const p of ps) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -5) p.x = this.W + 5; if (p.x > this.W + 5) p.x = -5;
      if (p.y < -5) p.y = this.H + 5; if (p.y > this.H + 5) p.y = -5;
      const tw = 0.55 + Math.sin(this.t * p.speed + p.phase) * 0.45;
      if (p.glow) {
        const rg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        rg.addColorStop(0, p.color + (0.55 * tw).toFixed(3) + ')');
        rg.addColorStop(1, p.color + '0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = p.color + (0.85 * tw).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    this.raf = requestAnimationFrame(this.draw);
  };

  ngOnDestroy(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resizeHandler);
  }
}
