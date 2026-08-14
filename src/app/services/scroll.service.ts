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
  private readonly exactTargets: Record<string, number> = {
    'filosofia': 888,
    'sobre-mi': 1726,
    'stack': 2407,
    'proyectos': 3102,
    'educacion': 5907,
    'formacion': 5907,
    'contacto': 11315
  };

  scrollToFragment(fragment: string): void {
    if (this.exactTargets[fragment] !== undefined) {
      this.scrollToExact(this.exactTargets[fragment]);
      return;
    }

    const target = document.getElementById(fragment);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToExact(targetY: number, duration: number = 450): void {
    const startY = window.scrollY || document.documentElement.scrollTop || 0;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) {
      window.scrollTo(0, targetY);
      return;
    }

    let startTime: number | null = null;
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      const current = startY + distance * ease;
      window.scrollTo(0, current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        if (document.documentElement) document.documentElement.scrollTop = targetY;
        if (document.body) document.body.scrollTop = targetY;
      }
    };

    requestAnimationFrame(step);
  }
}
