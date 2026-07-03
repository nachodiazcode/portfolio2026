import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AudioService } from '../services/audio.service';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef, private audioService: AudioService) {}

  ngAfterViewInit(): void {
    // Inicializar observador para animar cuando entre al viewport
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('revealed');
            this.audioService.play('reveal');
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.02, rootMargin: '0px 0px -5% 0px' }
    );

    // Añadir la clase inicial para que el CSS actúe antes de aparecer
    this.el.nativeElement.classList.add('reveal-item');
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
