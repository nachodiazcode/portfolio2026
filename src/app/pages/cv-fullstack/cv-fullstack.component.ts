import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CV_FULLSTACK } from '../../data/cv-fullstack.data';
import { CONTACT } from '../../data/contact.data';

/** CV full-stack en una hoja A4, optimizado para "Imprimir → Guardar como PDF". */
@Component({
  selector: 'app-cv-fullstack',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cv-fullstack.component.html',
  styleUrls: ['./cv-fullstack.component.css']
})
export class CvFullstackComponent implements OnInit, OnDestroy {
  cv = CV_FULLSTACK;
  contact = CONTACT;

  constructor(private titleService: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(`CV · ${this.cv.name} · Desarrollador Full-Stack`);
    this.meta.updateTag({ name: 'description', content: this.cv.summary });
    document.body.classList.add('theme-node');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('theme-node');
  }

  /** Muestra "github.com/usuario" en vez de la URL completa. */
  shortUrl(url: string): string {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  print(): void {
    window.print();
  }
}
