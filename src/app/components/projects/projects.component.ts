import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { AudioService } from '../../services/audio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @Input() projects: Project[] = [];
  @Input() eyebrow = 'Proyectos personales';
  @Input() title = 'Proyectos';
  @Input() description = '';

  /** Proyecto abierto en el modal de detalle (null = cerrado). */
  selected: Project | null = null;
  selAccent = 'var(--accent-1)';
  selAccent2 = 'var(--accent-mid)';

  /** Acento + aspecto de imagen por tarjeta (estilo Pinterest, alturas variadas). */
  palette = [
    { a: 'var(--accent-1)', b: 'var(--accent-soft)', ar: '3 / 4' },
    { a: 'var(--accent-2)', b: 'var(--accent-mid)', ar: '16 / 10' },
    { a: '#00C2FF', b: '#4B9BFF', ar: '4 / 3' },
    { a: '#FFB347', b: '#FF6F91', ar: '1 / 1' }
  ];

  constructor(private audioService: AudioService) {}

  playHover(): void {
    this.audioService.play('hover');
  }

  openDetail(p: Project): void {
    const i = this.projects.indexOf(p);
    const c = this.palette[i % this.palette.length];
    this.selAccent = c.a;
    this.selAccent2 = c.b;
    this.selected = p;
    this.audioService.play('click');
  }

  closeDetail(): void {
    this.selected = null;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.selected) this.closeDetail();
  }
}
