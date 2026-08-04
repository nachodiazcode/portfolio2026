import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { ContactInfo } from '../../models/profile.model';
import { CONTACT } from '../../data/contact.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() soundEnabled = true;
  @Input() brandName = 'Ignacio Díaz';
  @Input() role = '';
  @Input() photo = 'ignacio.png';
  @Input() contact: ContactInfo = CONTACT;
  @Input() cvHref = '/cv-ignacio-diaz.pdf';
  @Input() cvLabel = 'CV';
  /** true = descarga un archivo; false = navega a una ruta interna. */
  @Input() cvDownload = true;
  @Output() soundToggled = new EventEmitter<void>();
  @Output() menuOpened = new EventEmitter<void>();

  activeId = 'inicio';
  isShrunk = false;
  scrollProgress = '0%';
  private scrollInterval: any;

  constructor(private audioService: AudioService, private elRef: ElementRef<HTMLElement>) {}

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

    // Scroll-spy active link
    const ids = ['inicio', 'filosofia', 'sobre-mi', 'stack', 'proyectos', 'experiencia', 'educacion', 'contacto'];
    let active = ids[0];
    for (const id of ids) {
      const s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top <= 110) {
        active = id;
      }
    }
    this.activeId = active;

    // reposiciona el indicador deslizante después del change detection
    requestAnimationFrame(() => this.updateIndicator());
  }

  private updateIndicator(): void {
    const host = this.elRef.nativeElement;
    const indicator = host.querySelector<HTMLElement>('.dock-indicator');
    const active = host.querySelector<HTMLElement>('.dock-link.active');
    if (!indicator) return;
    if (!active) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.transform = `translateX(${active.offsetLeft}px)`;
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
