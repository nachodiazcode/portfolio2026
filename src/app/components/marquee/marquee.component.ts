import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css']
})
export class MarqueeComponent {
  @Input() items: string[] = [
    'Angular', 'UX / UI', 'TypeScript', 'Diseño',
    'Código limpio', 'Frontend', 'Figma', 'Trabajo en equipo'
  ];

  // duplicado para el loop infinito sin corte
  get loop(): string[] {
    return [...this.items, ...this.items];
  }
}
