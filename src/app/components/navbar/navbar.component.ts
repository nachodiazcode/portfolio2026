import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() soundEnabled = true;
  @Output() soundToggled = new EventEmitter<void>();
  @Output() menuOpened = new EventEmitter<void>();

  activeId = 'inicio';
  isShrunk = false;
  scrollProgress = '0%';
  private lastTop = 0;
  private scrollInterval: any;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.updateScroll();
    this.scrollInterval = setInterval(() => this.updateScroll(), 500);
  }

  ngOnDestroy(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  onWindowScroll(): void {
    this.updateScroll();
  }

  private updateScroll(): void {
    const se = document.scrollingElement || document.documentElement;
    const top = se.scrollTop || window.scrollY || 0;
    const max = (se.scrollHeight - se.clientHeight) || 1;
    this.scrollProgress = Math.max(0, Math.min(100, (top / max) * 100)).toFixed(2) + '%';

    // Shrinking header
    this.isShrunk = top > 20;

    // Show/hide navbar based on scroll direction
    const nav = document.querySelector('[data-nav]') as HTMLElement;
    if (nav) {
      const down = top > this.lastTop && top > 160;
      nav.style.transform = down ? 'translateY(-105%)' : 'none';
    }
    this.lastTop = top;

    // Scroll-spy active link
    const ids = ['inicio', 'filosofia', 'sobre-mi', 'stack', 'proyectos', 'experiencia', 'contacto'];
    let active = ids[0];
    for (const id of ids) {
      const s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top <= 110) {
        active = id;
      }
    }
    this.activeId = active;
  }

  playHover(): void {
    this.audioService.play('hover');
  }

  playClick(): void {
    this.audioService.play('click');
  }

  onToggleSound(e: Event): void {
    e.preventDefault();
    this.soundToggled.emit();
  }

  onOpenMenu(e: Event): void {
    e.preventDefault();
    this.menuOpened.emit();
  }

  onPrint(e: Event): void {
    e.preventDefault();
    this.playClick();
    window.print();
  }
}
