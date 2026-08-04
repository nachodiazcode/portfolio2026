import { TechTrack } from '../models/profile.model';

/** Línea de tiempo de frameworks de UI (portafolio Frontend). */
export const TRACKS_FRONTEND: TechTrack[] = [
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

/** Línea de tiempo de plataformas de servidor y datos (portafolio Full-Stack). */
export const TRACKS_FULLSTACK: TechTrack[] = [
  {
    name: 'Node.js',
    color: '#83CD29',
    versions: [
      { year: '2009', version: 'Node.js 0.x', detail: 'JavaScript fuera del navegador. I/O no bloqueante sobre V8.' },
      { year: '2015', version: 'Node.js 4 (io.js)', detail: 'Se cierra el fork: releases unificadas y ciclo LTS predecible.' },
      { year: '2017', version: 'Node.js 8 LTS', detail: 'async/await estable. Se acaba el callback hell.' },
      { year: '2022', version: 'Node.js 18', detail: 'fetch nativo, test runner integrado y ESM maduro.' },
      { year: '2024', version: 'Node.js 22+', detail: 'require(ESM), watch mode y node:test estables de fábrica.' }
    ]
  },
  {
    name: 'Java & Spring',
    color: '#F89820',
    versions: [
      { year: '2004', version: 'Spring Framework 1.0', detail: 'Inyección de dependencias frente al peso de J2EE.' },
      { year: '2014', version: 'Spring Boot 1.0', detail: 'Autoconfiguración y servidor embebido: del XML al main().' },
      { year: '2018', version: 'Spring Boot 2 / WebFlux', detail: 'Stack reactivo con Project Reactor y backpressure.' },
      { year: '2022', version: 'Spring Boot 3', detail: 'Jakarta EE, baseline Java 17 e imágenes nativas con GraalVM.' },
      { year: '2023', version: 'Java 21 LTS', detail: 'Virtual threads: concurrencia masiva sin reescribir el código.' }
    ]
  },
  {
    name: 'PostgreSQL',
    color: '#62A0DD',
    versions: [
      { year: '1996', version: 'PostgreSQL 6.0', detail: 'Nace del POSTGRES de Berkeley y adopta SQL.' },
      { year: '2010', version: 'v9.0', detail: 'Replicación en streaming y hot standby de serie.' },
      { year: '2014', version: 'v9.4 · JSONB', detail: 'Lo relacional y lo documental conviviendo en la misma tabla.' },
      { year: '2017', version: 'v10', detail: 'Particionado declarativo y replicación lógica.' },
      { year: '2024', version: 'v17', detail: 'JSON_TABLE del estándar SQL/JSON y un VACUUM mucho más eficiente.' }
    ]
  }
];
