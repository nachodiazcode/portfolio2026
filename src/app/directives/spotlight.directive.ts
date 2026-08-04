import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';

/**
 * Spotlight: una luz suave sigue al cursor sobre una superficie (grilla bento).
 * Escribe --mx/--my (posición del puntero relativa al host) y --spot-o (opacidad)
 * como custom properties. Corre fuera de la zona de Angular y usa rAF para
 * no gatillar change detection ni saturar el hilo principal.
 */
@Directive({
  selector: '[appSpotlight]',
  standalone: true
})
export class SpotlightDirective implements OnInit, OnDestroy {
  private frame = 0;
  private mx = 0;
  private my = 0;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit(): void {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const node = this.el.nativeElement;

    this.zone.runOutsideAngular(() => {
      node.addEventListener('pointermove', this.onMove, { passive: true });
      node.addEventListener('pointerenter', this.onEnter, { passive: true });
      node.addEventListener('pointerleave', this.onLeave, { passive: true });
    });
  }

  ngOnDestroy(): void {
    const node = this.el.nativeElement;
    node.removeEventListener('pointermove', this.onMove);
    node.removeEventListener('pointerenter', this.onEnter);
    node.removeEventListener('pointerleave', this.onLeave);
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  private onEnter = (): void => {
    this.el.nativeElement.style.setProperty('--spot-o', '1');
  };

  private onMove = (e: PointerEvent): void => {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.mx = e.clientX - rect.left;
    this.my = e.clientY - rect.top;
    if (this.frame) return;
    this.frame = requestAnimationFrame(this.flush);
  };

  private flush = (): void => {
    this.frame = 0;
    const node = this.el.nativeElement;
    node.style.setProperty('--mx', `${this.mx.toFixed(1)}px`);
    node.style.setProperty('--my', `${this.my.toFixed(1)}px`);
  };

  private onLeave = (): void => {
    this.el.nativeElement.style.setProperty('--spot-o', '0');
  };
}
