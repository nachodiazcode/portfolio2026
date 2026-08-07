import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements AfterViewInit {
  done = false;
  hidden = false;

  @ViewChild('count') countRef!: ElementRef<HTMLElement>;
  @ViewChild('bar') barRef!: ElementRef<HTMLElement>;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    document.body.style.overflow = 'hidden';
    // La app queda lista en ~200ms; la intro solo debe dar un respiro de marca,
    // no ser la espera. 1400ms + 950ms de fade hacían que el sitio se sintiera
    // lento cuando en realidad ya había cargado.
    const duration = 350;
    const start = performance.now();

    this.zone.runOutsideAngular(() => {
      const tick = (t: number): void => {
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(eased * 100);
        this.countRef.nativeElement.textContent = String(value);
        this.barRef.nativeElement.style.width = `${eased * 100}%`;

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          this.zone.run(() => {
            this.done = true;
            setTimeout(() => {
              this.hidden = true;
              document.body.style.overflow = '';
            // Debe coincidir con la transición del telón en el CSS: si se oculta
            // antes, el *ngIf lo arranca a media animación.
            }, 300);
          });
        }
      };
      requestAnimationFrame(tick);
    });
  }
}
