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

  constructor(private audioService: AudioService) {}

  playHover(): void {
    this.audioService.play('hover');
  }

  onJobClick(job: Job): void {
    this.audioService.play('click');
    this.jobSelected.emit(job);
  }
}
