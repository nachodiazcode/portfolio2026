import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, .job-card, .edu-card, .cert-row, .stack-card, .dock-link, .tech-pill, .social-icon, .dock-icon, .glass-card';

@Component({
  selector: 'app-cursor',
  standalone: true,
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css']
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('dot', { static: true }) dot!: ElementRef<HTMLElement>;
  @ViewChild('ring', { static: true }) ring!: ElementRef<HTMLElement>;

  private mx = -100;
  private my = -100;
  private rx = -100;
  private ry = -100;
  private rafId = 0;
  private enabled = false;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    // Solo con puntero fino (mouse/trackpad); en táctil no tiene sentido
    this.enabled = window.matchMedia('(pointer: fine)').matches;
    if (!this.enabled) return;

    document.body.classList.add('custom-cursor-active');

    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMove, { passive: true });
      document.addEventListener('mouseover', this.onOver, { passive: true });
      document.addEventListener('mousedown', this.onDown, { passive: true });
      document.addEventListener('mouseup', this.onUp, { passive: true });
      document.documentElement.addEventListener('mouseleave', this.onLeave);
      document.documentElement.addEventListener('mouseenter', this.onEnter);
      this.rafId = requestAnimationFrame(this.loop);
    });
  }

  ngOnDestroy(): void {
    if (!this.enabled) return;
    document.body.classList.remove('custom-cursor-active');
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseover', this.onOver);
    document.removeEventListener('mousedown', this.onDown);
    document.removeEventListener('mouseup', this.onUp);
    document.documentElement.removeEventListener('mouseleave', this.onLeave);
    document.documentElement.removeEventListener('mouseenter', this.onEnter);
    cancelAnimationFrame(this.rafId);
  }

  private onMove = (e: MouseEvent): void => {
    this.mx = e.clientX;
    this.my = e.clientY;
    this.dot.nativeElement.style.transform = `translate3d(${this.mx}px, ${this.my}px, 0)`;
    this.setHidden(false);
  };

  private onOver = (e: MouseEvent): void => {
    const target = e.target as Element | null;
    const interactive = !!target?.closest?.(INTERACTIVE);
    this.dot.nativeElement.classList.toggle('is-hover', interactive);
    this.ring.nativeElement.classList.toggle('is-hover', interactive);
  };

  private onDown = (): void => {
    this.dot.nativeElement.classList.add('is-down');
    this.ring.nativeElement.classList.add('is-down');
  };

  private onUp = (): void => {
    this.dot.nativeElement.classList.remove('is-down');
    this.ring.nativeElement.classList.remove('is-down');
  };

  private onLeave = (): void => this.setHidden(true);
  private onEnter = (): void => this.setHidden(false);

  private setHidden(hidden: boolean): void {
    this.dot.nativeElement.classList.toggle('is-hidden', hidden);
    this.ring.nativeElement.classList.toggle('is-hidden', hidden);
  }

  private loop = (): void => {
    // el anillo persigue al punto con inercia
    this.rx += (this.mx - this.rx) * 0.16;
    this.ry += (this.my - this.ry) * 0.16;
    this.ring.nativeElement.style.transform = `translate3d(${this.rx}px, ${this.ry}px, 0)`;
    this.rafId = requestAnimationFrame(this.loop);
  };
}
