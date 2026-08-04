import { Injectable } from '@angular/core';

/**
 * Desplazamiento a secciones de la página.
 *
 * Los enlaces de navegación usan `[routerLink]="[]" [fragment]="..."` en vez de
 * `href="#id"`: con un `<base href>` presente, un href de solo fragmento se
 * resuelve contra el base y no contra la URL actual, así que desde /fullstack
 * "#inicio" saltaba a "/" y te sacaba del portafolio full-stack.
 *
 * El routerLink deja el href correcto (compartible, clic con rueda), pero
 * cancela el salto nativo del navegador. El scroll lo hacemos aquí de forma
 * explícita en vez de depender de que el anchor scrolling del router se dispare.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  scrollToFragment(fragment: string): void {
    const target = document.getElementById(fragment);
    if (!target) return;
    // El `scroll-margin-top` de styles.css deja aire para el navbar flotante.
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
