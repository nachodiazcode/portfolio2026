import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TRACKS_FRONTEND } from '../../data/tech-tracks.data';

interface FwVersion { year: string; version: string; detail: string; }
interface Framework { name: string; color: string; versions: FwVersion[]; }

@Component({
  selector: 'app-framework-versions',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './framework-versions.component.html',
  styleUrls: ['./framework-versions.component.css']
})
export class FrameworkVersionsComponent {
  activeIndex = 0;
  fading = false;

  @Input() frameworks: Framework[] = TRACKS_FRONTEND;

  get active(): Framework {
    return this.frameworks[this.activeIndex];
  }

  selectFramework(i: number): void {
    if (i === this.activeIndex) return;
    this.fading = true;
    setTimeout(() => {
      this.activeIndex = i;
      this.fading = false;
    }, 160);
  }
}
