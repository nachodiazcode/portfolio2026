import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Shell de la aplicación: cada ruta monta su propia página. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {}
