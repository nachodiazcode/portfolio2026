import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { ScrollService } from '../../services/scroll.service';
import { ContactInfo } from '../../models/profile.model';
import { CONTACT } from '../../data/contact.data';

@Component({
  selector: 'app-menu-overlay',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-overlay.component.html',
  styleUrls: ['./menu-overlay.component.css']
})
export class MenuOverlayComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() brandName = 'Ignacio Díaz';
  @Input() photo = 'ignacio.png';
  @Input() contact: ContactInfo = CONTACT;
  @Input() badge = 'Disponible para nuevos proyectos';
  @Output() closed = new EventEmitter<void>();

  /** `fragment` en vez de href: con <base href> un "#id" suelto se resuelve
   *  contra el base y perdería la ruta actual (/fullstack). */
  menuLinks = [
    { num: '01', label: 'Inicio', fragment: 'inicio' },
    { num: '02', label: 'Filosofía', fragment: 'filosofia' },
    { num: '03', label: 'Sobre mí', fragment: 'sobre-mi' },
    { num: '04', label: 'Stack', fragment: 'stack' },
    { num: '05', label: 'Proyectos', fragment: 'proyectos' },
    { num: '06', label: 'Experiencia', fragment: 'experiencia' },
    { num: '07', label: 'Educación', fragment: 'educacion' },
    { num: '08', label: 'Contacto', fragment: 'contacto' }
  ];

  constructor(private audioService: AudioService, private scroller: ScrollService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      this.syncLock();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  private syncLock(): void {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  playHover(): void {
    this.audioService.play('hover');
  }

  playClick(): void {
    this.audioService.play('click');
  }

  onClose(e: Event): void {
    e.preventDefault();
    this.audioService.play('slide-close');
    this.closed.emit();
  }

  onLinkClick(fragment: string): void {
    this.audioService.play('slide-close');
    this.closed.emit();
    // El overlay se cierra con animación; espera a que libere el scroll del body.
    setTimeout(() => this.scroller.scrollToFragment(fragment), 380);
  }
}
