import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface Education {
  degree: string;
  institution: string;
  modality: string;
  dates: string;
  duration: string;
  location: string;
  distinction?: string;
  description: string;
  tech: string[];
  diplomaUrl?: string;
  logoUrl?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills?: string[];
  imageUrl?: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  education: Education[] = [
    {
      degree: 'Técnico en Programación Computacional',
      institution: 'Instituto Profesional San Sebastián',
      modality: 'Jornada completa',
      dates: 'mar. 2016 – mar. 2020',
      duration: '4 años',
      location: 'Santiago, Chile',
      distinction: 'Aprobado con Distinción',
      description: 'Mi formación técnica fue donde todo tomó forma — 4 años aprendiendo desarrollo de software, programación web, bases de datos, testing y metodologías ágiles. La práctica profesional la realicé en Walmart Chile (2019), mi primer contacto real con Angular en un entorno empresarial. Fue ahí donde confirmé que esto era lo mío.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Java', 'SQL', 'Angular'],
      diplomaUrl: 'diploma-tecnico.jpg',
      logoUrl: 'ipss.png'
    },
    {
      degree: 'Técnico Nivel Superior en Desarrollo & Diseño Web',
      institution: 'Universidad de Las Américas',
      modality: 'Jornada completa',
      dates: 'mar. 2011 – mar. 2015',
      duration: '4 años',
      location: 'Santiago, Chile',
      description: 'Estudié Diseño Digital Web y obtuve el título de Técnico en Diseño y Desarrollo Web. Acá nació mi lado visual: composición, tipografía y maquetación, la base de diseño que hoy aplico en cada interfaz que construyo.',
      tech: ['HTML', 'CSS', 'Diseño Web', 'Photoshop', 'Illustrator'],
      logoUrl: 'udla.png'
    }
  ];

  certifications: Certification[] = [
    {
      name: 'Programación Orientada a Objetos con Python',
      issuer: 'EDteam',
      date: 'dic. 2023',
      credentialId: '187706',
      skills: ['Python', 'POO'],
      imageUrl: 'cert-poo-python.jpg'
    },
    {
      name: 'JavaScript Desde Cero',
      issuer: 'EDteam',
      date: 'abr. 2023',
      credentialId: '64119377-ef45b846-d346-470e',
      skills: ['JavaScript'],
      imageUrl: 'cert-js-desde-cero.jpg'
    },
    {
      name: 'Programación desde cero 2023',
      issuer: 'EDteam',
      date: 'oct. 2023',
      credentialId: '641194231-88796258-7696-4537',
      skills: ['Programación', 'JavaScript'],
      imageUrl: 'cert-programacion-2023.jpg'
    },
    {
      name: '¿Cómo cotizar un proyecto?',
      issuer: 'EDteam',
      date: 'jul. 2019',
      credentialId: '6411993-75ddfa4a-00af-45ae',
      skills: ['Freelance', 'Negocios'],
      imageUrl: 'cert-cotizar-proyecto.jpg'
    },
    {
      name: 'Aprende Java',
      issuer: 'LinkedIn Learning',
      date: 'may. 2018',
      skills: ['Java']
    },
    {
      name: 'Angular 2 avanzado: Trabajo con APIs',
      issuer: 'LinkedIn Learning',
      date: 'abr. 2018',
      skills: ['Angular', 'REST APIs'],
      imageUrl: 'cert-angular-avanzado.jpg'
    },
    {
      name: 'Angular 2 práctico: Sitio de consumo de videos',
      issuer: 'LinkedIn Learning',
      date: 'mar. 2018',
      skills: ['Angular'],
      imageUrl: 'cert-angular-practico.jpg'
    },
    {
      name: 'Angular esencial',
      issuer: 'LinkedIn Learning',
      date: 'mar. 2018',
      skills: ['Angular'],
      imageUrl: 'cert-angular-esencial.jpg'
    },
    {
      name: 'React esencial',
      issuer: 'LinkedIn Learning',
      date: 'feb. 2018',
      skills: ['React'],
      imageUrl: 'cert-react-esencial.jpg'
    }
  ];

  constructor(private audioService: AudioService) {}

  playHover(): void {
    this.audioService.play('hover');
  }
}
