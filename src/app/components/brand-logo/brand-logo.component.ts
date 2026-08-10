import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Marcas que sabemos dibujar. */
export type BrandSlug =
  | 'html5' | 'css3' | 'javascript' | 'typescript'
  | 'angular' | 'react' | 'nodejs' | 'figma';

/**
 * Logos de tecnología en su color de marca.
 *
 * Están dibujados a mano con formas geométricas simples en vez de usar los
 * SVG oficiales, por dos razones: no añade descargas ni dependencias, y en un
 * tema de cuaderno una versión simplificada encaja mejor que el trazado
 * exacto — es como los dibujaría alguien de memoria en una hoja.
 *
 * No son los logos oficiales ni pretenden serlo: son referencias reconocibles
 * a la tecnología, del mismo modo que un roadmap dibujado a mano.
 */
@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 48 48" role="img"
         [attr.aria-label]="label" [ngSwitch]="slug">

      <!-- HTML5 / CSS3: el escudo, con el número dentro -->
      <ng-container *ngSwitchCase="'html5'">
        <path d="M6 4h36l-3.3 34L24 44l-14.7-6L6 4z" fill="#E34F26"/>
        <path d="M24 8v32.5l11.9-4.9L38.6 8H24z" fill="#EF652A"/>
        <path d="M24 18.5h-6l-.4-4H24v-4H13.2l1.5 16H24v-4zm0 12.4-5.1-1.4-.3-3.7h-4l.6 7 8.8 2.5v-4.4z" fill="#fff"/>
        <path d="M24 18.5v4h5.6l-.6 6-5 1.4v4.4l8.8-2.5 1.7-19H24v4h-.1z" fill="#EBEBEB"/>
      </ng-container>

      <ng-container *ngSwitchCase="'css3'">
        <path d="M6 4h36l-3.3 34L24 44l-14.7-6L6 4z" fill="#1572B6"/>
        <path d="M24 8v32.5l11.9-4.9L38.6 8H24z" fill="#33A9DC"/>
        <path d="M24 18.5h6l-.4 4H24v-4zm0-8h10.8l-.4 4H24v-4z" fill="#fff"/>
        <path d="M24 30.9v4.4l-8.8-2.5-.6-7h4l.3 3.7 5.1 1.4z" fill="#EBEBEB"/>
        <path d="M29.2 26.5H24v-4h9.6l-1 11.4-8.6 2.4v-4.4l5-1.4.2-4z" fill="#fff"/>
        <path d="M24 10.5v4H13.2l-.3-4H24z" fill="#EBEBEB"/>
      </ng-container>

      <!-- JavaScript / TypeScript: el cuadrado con las siglas -->
      <ng-container *ngSwitchCase="'javascript'">
        <rect x="4" y="4" width="40" height="40" rx="3" fill="#F7DF1E"/>
        <text x="40" y="38" text-anchor="end" font-family="Inter, system-ui, sans-serif"
              font-size="20" font-weight="800" fill="#111">JS</text>
      </ng-container>

      <ng-container *ngSwitchCase="'typescript'">
        <rect x="4" y="4" width="40" height="40" rx="3" fill="#3178C6"/>
        <text x="40" y="38" text-anchor="end" font-family="Inter, system-ui, sans-serif"
              font-size="20" font-weight="800" fill="#fff">TS</text>
      </ng-container>

      <!-- Angular: el escudo -->
      <ng-container *ngSwitchCase="'angular'">
        <path d="M24 3 4 10l3 26 17 9 17-9 3-26L24 3z" fill="#DD0031"/>
        <path d="M24 3v42l17-9 3-26L24 3z" fill="#C3002F"/>
        <path d="M24 10 12.5 35h4.3l2.3-5.8h9.8l2.3 5.8h4.3L24 10zm3.4 15.6h-6.8L24 17.4l3.4 8.2z" fill="#fff"/>
      </ng-container>

      <!-- React: el átomo -->
      <ng-container *ngSwitchCase="'react'">
        <circle cx="24" cy="24" r="4" fill="#61DAFB"/>
        <g fill="none" stroke="#61DAFB" stroke-width="2">
          <ellipse cx="24" cy="24" rx="19" ry="7.5"/>
          <ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(60 24 24)"/>
          <ellipse cx="24" cy="24" rx="19" ry="7.5" transform="rotate(120 24 24)"/>
        </g>
      </ng-container>

      <!-- Node: el hexágono -->
      <ng-container *ngSwitchCase="'nodejs'">
        <path d="M24 3 5 14v20l19 11 19-11V14L24 3z" fill="#5FA04E"/>
        <path d="M24 3v42l19-11V14L24 3z" fill="#417E38"/>
        <text x="24" y="30" text-anchor="middle" font-family="Inter, system-ui, sans-serif"
              font-size="13" font-weight="800" fill="#fff">JS</text>
      </ng-container>

      <!-- Figma: las cinco piezas -->
      <ng-container *ngSwitchCase="'figma'">
        <path d="M17 4h7v10h-7a5 5 0 0 1 0-10z" fill="#F24E1E"/>
        <path d="M24 4h7a5 5 0 0 1 0 10h-7V4z" fill="#FF7262"/>
        <path d="M24 14h7a5 5 0 0 1 0 10h-7V14z" fill="#1ABCFE"/>
        <path d="M17 14h7v10h-7a5 5 0 0 1 0-10z" fill="#A259FF"/>
        <path d="M17 24h7v5a5 5 0 1 1-7-5z" fill="#0ACF83"/>
      </ng-container>
    </svg>
  `,
  styles: [`
    :host { display: inline-flex; line-height: 0; }
    svg { display: block; }
  `]
})
export class BrandLogoComponent {
  @Input() slug!: BrandSlug;
  @Input() size = 40;
  /** Texto alternativo; si no se pasa, se usa el propio slug. */
  @Input() label?: string;
}
