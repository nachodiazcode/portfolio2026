import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Aplica un bloque de estilos SOLO mientras el puntero está encima,
 * mezclándolo sobre el estilo inline base y restaurándolo al salir.
 * Reemplaza el atributo `style-hover` del diseño original (DC runtime).
 */
@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverStyleDirective {
  @Input('appHover') hoverStyle = '';
  private saved = '';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('pointerenter')
  onEnter(): void {
    const node = this.el.nativeElement;
    this.saved = node.getAttribute('style') || '';
    this.apply(this.hoverStyle);
  }

  @HostListener('pointerleave')
  onLeave(): void {
    const node = this.el.nativeElement;
    if (this.saved) {
      node.setAttribute('style', this.saved);
    } else {
      node.removeAttribute('style');
    }
  }

  private apply(css: string): void {
    const node = this.el.nativeElement;
    css.split(';').forEach((decl) => {
      const i = decl.indexOf(':');
      if (i <= 0) return;
      const prop = decl.slice(0, i).trim();
      const val = decl.slice(i + 1).trim();
      if (prop) node.style.setProperty(prop, val);
    });
  }
}
