import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AngularVersion {
  year: string;
  version: string;
  detail: string;
}

@Component({
  selector: 'app-angular-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-timeline.component.html',
  styleUrls: ['./angular-timeline.component.css']
})
export class AngularTimelineComponent implements OnInit, OnDestroy {
  /** Identidad de la pista (Angular en frontend, Node.js en full-stack). */
  @Input() titlebar = 'angular — timeline';
  @Input() icon: 'angular' | 'node' = 'angular';
  @Input() label = 'Angular';
  @Input() subtitle = '2010 → hoy · el framework que me ordenó la vida';
  @Input() chips: { label: string; badge?: string }[] =
    [{ label: 'TypeScript', badge: 'TS' }, { label: 'RxJS' }, { label: 'Signals' }];
  @Input() versions: AngularVersion[] = [
    { year: '2010', version: 'AngularJS', detail: 'El comienzo de todo. MVC en el cliente.' },
    { year: '2016', version: 'Angular 2+', detail: 'Reescritura total. TypeScript, componentes y RxJS.' },
    { year: '2020', version: 'Ivy Engine (v9)', detail: 'Compilador más rápido y bundles más pequeños.' },
    { year: '2023', version: 'Standalone (v15+)', detail: 'Adiós NgModules. Signals y arquitectura simple.' },
    { year: '2026', version: 'Angular 18+', detail: 'Control flow nativo, deferrable views, zoneless.' }
  ];

  activeIndex = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startLoop();
  }

  ngOnDestroy(): void {
    this.stopLoop();
  }

  get fillPercent(): number {
    return (this.activeIndex / (this.versions.length - 1)) * 100;
  }

  setActive(i: number): void {
    this.activeIndex = i;
    this.stopLoop();
  }

  resume(): void {
    this.startLoop();
  }

  private startLoop(): void {
    this.stopLoop();
    this.timer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.versions.length;
    }, 2600);
  }

  private stopLoop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
