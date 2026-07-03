import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-framework-versions',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './framework-versions.component.html',
  styleUrls: ['./framework-versions.component.css']
})
export class FrameworkVersionsComponent {
  frameworks = [
    {
      name: 'Angular',
      color: '#DD0031',
      versions: [
        { year: '2010', version: 'AngularJS', detail: 'El comienzo de todo. MVC en el cliente.' },
        { year: '2016', version: 'Angular 2+', detail: 'Reescritura total. TypeScript, componentes y RxJS.' },
        { year: '2020', version: 'Ivy Engine (v9)', detail: 'Compilador más rápido, bundle más pequeño y mejor debugging.' },
        { year: '2023', version: 'Standalone (v15+)', detail: 'Adiós NgModules. Arquitectura más simple y signals.' },
        { year: '2026', version: 'Angular 18+', detail: 'Control flow nativo, deferrable views, zoneless apps.' }
      ]
    },
    {
      name: 'React',
      color: '#61DAFB',
      versions: [
        { year: '2013', version: 'React 15-', detail: 'Class components y ciclo de vida.' },
        { year: '2019', version: 'Hooks (v16.8)', detail: 'Revolución funcional. useState, useEffect.' },
        { year: '2022', version: 'Concurrent Mode (v18)', detail: 'Suspense, transiciones y renderizado asíncrono.' },
        { year: '2024', version: 'Server Components', detail: 'Next.js App Router, RSC, acciones de servidor.' },
        { year: '2026', version: 'React 19', detail: 'Compiler, use(), optimización de acciones.' }
      ]
    },
    {
      name: 'React Native',
      color: '#02569B',
      versions: [
        { year: '2015', version: 'Bridge Architecture', detail: 'Serialización JSON asíncrona entre JS y Native.' },
        { year: '2021', version: 'Hermes Engine', detail: 'Motor JS optimizado para inicio rápido.' },
        { year: '2022', version: 'JSI & TurboModules', detail: 'Comunicación síncrona sin puente (C++).' },
        { year: '2024', version: 'Fabric Renderer', detail: 'Nuevo renderizador concurrente de UI en C++.' },
        { year: '2026', version: 'New Architecture (v0.76+)', detail: 'Bridgeless por defecto, total integración con React 19.' }
      ]
    }
  ];
}
