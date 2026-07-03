import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-experience-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent implements OnChanges, OnDestroy {
  @Input() job: Job | null = null;
  @Output() closed = new EventEmitter<void>();

  constructor(private audioService: AudioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['job']) {
      this.syncLock();
      this.currentImageIndex = 0;
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  private syncLock(): void {
    if (this.job) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  playHover(): void {
    this.audioService.play('hover');
  }

  onClose(e: Event): void {
    e.preventDefault();
    this.audioService.play('slide-close');
    this.closed.emit();
  }

  stopPropagation(e: Event): void {
    e.stopPropagation();
  }

  currentImageIndex = 0;

  nextImage(e: Event): void {
    e.stopPropagation();
    if (this.job && this.job.projectImages) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.job.projectImages.length;
    }
  }

  prevImage(e: Event): void {
    e.stopPropagation();
    if (this.job && this.job.projectImages) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.job.projectImages.length) % this.job.projectImages.length;
    }
  }

  setCurrentImage(index: number, e: Event): void {
    e.stopPropagation();
    this.currentImageIndex = index;
  }
}
