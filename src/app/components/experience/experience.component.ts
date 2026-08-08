import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';
import { AudioService } from '../../services/audio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  @Input() jobs: Job[] = [];
  @Input() eyebrow = 'Trayectoria';
  @Input() title = 'Experiencia Profesional';
  @Input() description = '';
  @Input() showTechStack = true;
  @Output() jobSelected = new EventEmitter<Job>();

  /** Con 15 cargos la sección ocupaba un tercio de la página (6,4 pantallas
   *  seguidas). Se muestran los más recientes y el resto queda a un clic. */
  @Input() initialCount = 4;
  expanded = false;

  constructor(private audioService: AudioService) {}

  get visibleJobs(): Job[] {
    return this.expanded ? this.jobs : this.jobs.slice(0, this.initialCount);
  }

  get hiddenCount(): number {
    return Math.max(0, this.jobs.length - this.initialCount);
  }

  toggleExpanded(): void {
    this.audioService.play('click');
    const collapsing = this.expanded;
    this.expanded = !this.expanded;

    // Al plegar, el contenido de arriba desaparece bajo el scroll actual y el
    // usuario queda flotando en la sección siguiente: se vuelve al encabezado.
    if (collapsing) {
      document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  playHover(): void {
    this.audioService.play('hover');
  }

  onJobClick(job: Job): void {
    this.audioService.play('click');
    this.jobSelected.emit(job);
  }
}
