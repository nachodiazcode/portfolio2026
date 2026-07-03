import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuOverlayComponent } from './components/menu-overlay/menu-overlay.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ExperienceModalComponent } from './components/experience-modal/experience-modal.component';
import { FrameworkVersionsComponent } from './components/framework-versions/framework-versions.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';
import { AudioService } from './services/audio.service';
import { JOBS } from './data/jobs.data';
import { PROJECTS } from './data/projects.data';
import { Job } from './models/job.model';
import { Project } from './models/project.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MenuOverlayComponent,
    ExperienceComponent,
    ExperienceModalComponent,
    FrameworkVersionsComponent,
    ProjectsComponent,
    ScrollRevealDirective
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jobs: Job[] = [];
  projects: Project[] = PROJECTS;
  selectedJob: Job | null = null;
  menuOpen = false;
  year = new Date().getFullYear();

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    // Process jobs to add indices and initials
    this.jobs = JOBS.map((job, i) => ({
      ...job,
      num: String(i + 1).padStart(2, '0'),
      initial: job.company.charAt(0)
    }));
  }

  get soundEnabled(): boolean {
    return this.audioService.enabled;
  }

  toggleSound(): void {
    this.audioService.toggle();
    if (this.audioService.enabled) {
      this.audioService.play('click');
    }
  }

  openMenu(): void {
    this.menuOpen = true;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  selectJob(job: Job): void {
    this.selectedJob = job;
    this.audioService.play('modal');
  }

  closeModal(): void {
    this.selectedJob = null;
  }

  playHover(): void {
    this.audioService.play('hover');
  }

  playClick(): void {
    this.audioService.play('click');
  }
}
