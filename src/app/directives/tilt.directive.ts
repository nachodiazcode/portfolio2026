import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

/**
 * Tilt 3D sutil que sigue el mouse (perspective + rotateX/rotateY).
 * Corre fuera de la zona de Angular para no gatillar change detection.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective implements OnInit, OnDestroy {
  @Input() tiltMax = 7;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit(): void {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const node = this.el.nativeElement;
    node.style.transition = 'transform .35s cubic-bezier(.16, 1, .3, 1)';
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
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-py * this.tiltMax).toFixed(2);
    const ry = (px * this.tiltMax).toFixed(2);
    node.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
  };

  private onLeave = (): void => {
    this.el.nativeElement.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
  };
}
