import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { ContactInfo } from '../../models/profile.model';
import { CONTACT } from '../../data/contact.data';

@Component({
  selector: 'app-menu-overlay',
  standalone: true,
  imports: [CommonModule],
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

  menuLinks = [
    { num: '01', label: 'Inicio', href: '#inicio' },
    { num: '02', label: 'Filosofía', href: '#filosofia' },
    { num: '03', label: 'Sobre mí', href: '#sobre-mi' },
    { num: '04', label: 'Stack', href: '#stack' },
    { num: '05', label: 'Proyectos', href: '#proyectos' },
    { num: '06', label: 'Experiencia', href: '#experiencia' },
    { num: '07', label: 'Educación', href: '#educacion' },
    { num: '08', label: 'Testimonios', href: '#testimonios' },
    { num: '09', label: 'Contacto', href: '#contacto' }
  ];

  constructor(private audioService: AudioService) {}

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

  onLinkClick(e: Event): void {
    this.audioService.play('slide-close');
    this.closed.emit();
  }
}
