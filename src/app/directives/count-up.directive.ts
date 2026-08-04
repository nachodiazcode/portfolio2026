import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';

/**
 * Anima un número de 0 al valor objetivo cuando el elemento entra al viewport.
 * Uso: <span appCountUp [countTo]="15" countSuffix="+">15+</span>
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input() countTo = 0;
  @Input() countSuffix = '';
  @Input() countDuration = 1400;

  private observer?: IntersectionObserver;
  private done = false;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.done) {
            this.done = true;
            this.animate();
            this.observer?.disconnect();
          }
        }
      }, { threshold: 0.6 });
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animate(): void {
    const node = this.el.nativeElement;
    const start = performance.now();
    const tick = (t: number): void => {
      const p = Math.min((t - start) / this.countDuration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(eased * this.countTo);
      node.textContent = `${value}${this.countSuffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
