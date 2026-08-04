import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

/**
 * Efecto magnético: el elemento se desliza suavemente hacia el cursor
 * mientras está encima y vuelve con rebote al salir.
 */
@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit, OnDestroy {
  @Input() magneticStrength = 0.35;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit(): void {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const node = this.el.nativeElement;
    node.style.transition = 'transform .25s cubic-bezier(.34, 1.56, .64, 1)';
    node.style.willChange = 'transform';

    this.zone.runOutsideAngular(() => {
      node.addEventListener('mousemove', this.onMove, { passive: true });
      node.addEventListener('mouseleave', this.onLeave, { passive: true });
    });
  }

  ngOnDestroy(): void {
    const node = this.el.nativeElement;
    node.removeEventListener('mousemove', this.onMove);
    node.removeEventListener('mouseleave', this.onLeave);
  }

  private onMove = (e: MouseEvent): void => {
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * this.magneticStrength;
    const dy = (e.clientY - rect.top - rect.height / 2) * this.magneticStrength;
    node.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  private onLeave = (): void => {
    this.el.nativeElement.style.transform = 'translate(0, 0)';
  };
}
