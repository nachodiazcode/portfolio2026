import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';

/**
 * Salida cinematográfica: al scrollear, el elemento se desplaza,
 * encoge y desvanece suavemente (pensado para el contenido del hero).
 */
@Directive({
  selector: '[appScrollFade]',
  standalone: true
})
export class ScrollFadeDirective implements OnInit, OnDestroy {
  private rafId = 0;
  private ticking = false;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.rafId);
  }

  private onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;
    this.rafId = requestAnimationFrame(() => {
      this.ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y > vh * 1.3) return; // fuera del hero: no tocar nada

      const progress = Math.min(y / (vh * 0.8), 1);
      const node = this.el.nativeElement;
      node.style.opacity = String(1 - progress * 0.9);
      node.style.transform = `translateY(${(y * 0.22).toFixed(1)}px) scale(${(1 - progress * 0.05).toFixed(4)})`;
    });
  };
}
