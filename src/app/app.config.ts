import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Sin withInMemoryScrolling: el Router no toca el scroll, ni al navegar
    // ni al aterrizar en un fragmento. Antes tenía scrollPositionRestoration
    // 'top' + anchorScrolling, y con RouterLink+fragment en cada enlace del
    // navbar cada clic disparaba DOS scrolls a la vez — el nuestro
    // (ScrollService, respeta scroll-margin-top) y el del Router — y ganaba
    // el que llegara último, así que el resultado no era el mismo dos veces.
    // Apagar solo anchorScrolling y dejar 'top' fue peor: sin anchor, todo
    // fragmento cuenta como navegación normal y el Router fuerza scroll a
    // 0 después de cada clic, pisando el nuestro siempre. Apagando los dos,
    // el Router no participa: ScrollService hace los clics (navbar, overlay
    // de menú, CTAs) y PortfolioComponent.ngAfterViewInit hace el aterrizaje
    // inicial en un deep-link (/uxui#educacion).
    provideRouter(routes)
  ]
};
