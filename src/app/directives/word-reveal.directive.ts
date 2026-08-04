import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

/**
 * Divide el texto del elemento en palabras y las revela en cascada
 * (blur + slide up) cuando el elemento entra al viewport.
 * Conserva los spans internos (p. ej. .accent-text) aplicando el
 * gradiente palabra a palabra para no romper el background-clip.
 */
@Directive({
  selector: '[appWordReveal]',
  standalone: true
})
export class WordRevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const root = this.el.nativeElement;
    this.wrapWords(root);

    const words = root.querySelectorAll<HTMLElement>('.wr-word');
    words.forEach((w, i) => (w.style.transitionDelay = `${i * 0.04}s`));

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              root.classList.add('wr-visible');
              this.observer?.disconnect();
            }
          }
        },
        { threshold: 0.35 }
      );
      this.observer.observe(root);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private wrapWords(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text.trim()) return;

      const inAccent = !!node.parentElement?.closest('.accent-text');
      const frag = document.createDocumentFragment();

      for (const part of text.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          continue;
        }
        const span = document.createElement('span');
        span.className = 'wr-word' + (inAccent ? ' wr-accent' : '');
        span.textContent = part;
        frag.appendChild(span);
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(child => this.wrapWords(child));
    }
  }
}
