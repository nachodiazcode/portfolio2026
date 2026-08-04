import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  context: string;
  initial: string;
  avatarUrl?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      quote: 'Trabajar con Ignacio ha sido una de las experiencias más divertidas que he tenido en mi carrera. Además de ser un excelente desarrollador, con habilidades sólidas en interfaces y tecnología, su verdadero superpoder es la empatía y la buena energía que aporta al grupo de trabajo. No solo entiende los aspectos técnicos de su rol: sabe conectarse con las personas, escuchar y encontrar soluciones colaborativas que hacen que todo el equipo se sienta ayudado.',
      name: 'Raul Fernando Lamadrid Gavilan',
      role: 'Scrum Master de la célula · BanChile Inversiones',
      context: 'Trabajó con Ignacio en el mismo equipo · ene. 2025',
      initial: 'R',
      avatarUrl: 'testimonial-raul.jpg'
    },
    {
      quote: 'Ignacio es un diseñador muy entusiasta, con ganas de aportar y aprender cosas nuevas. Tiene un buen manejo de código y conocimientos de UX/UI. Como todas las mentes creativas a veces es disperso, pero es un gran aporte al equipo.',
      name: 'Viviana Droguett Sierra',
      role: 'Líder de Diseño UX · Sitio público y privado, BanChile Inversiones',
      context: 'Trabajó con Ignacio en distintas empresas · sept. 2022',
      initial: 'V',
      avatarUrl: 'testimonial-viviana.jpg'
    },
    {
      quote: 'Excelente profesional; disperso, pero es parte de su talento creativo y su proactividad — aporta harto valor. Buen manejo de herramientas y talleres de diseño y, por otro lado, en desarrollo front-end, APIs y bases de datos aporta más aún.',
      name: 'Pablo Andrés Otayza',
      role: 'Gerente de Plataformas Digitales en GrupoMOK',
      context: 'Supervisaba directamente a Ignacio · ago. 2022',
      initial: 'P',
      avatarUrl: 'testimonial-pablo.jpg'
    }
  ];

  constructor(private audioService: AudioService) {}

  playHover(): void {
    this.audioService.play('hover');
  }
}
