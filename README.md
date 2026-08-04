# Portfolio

Una sola plantilla Angular que sirve **dos portafolios** y un CV:

| Ruta | Qué es | Tema |
|---|---|---|
| `/` | Portafolio Frontend & UX | magenta / violeta |
| `/fullstack` | Portafolio Full-Stack | verde Node + Spring (`body.theme-node`) |
| `/cv-fullstack` | CV full-stack en A4, listo para imprimir a PDF | verde Node |

Las tres rutas comparten **una sola plantilla**: `src/app/pages/portfolio/`. Lo que cambia
es el objeto `Profile` que cada ruta declara en `src/app/app.routes.ts`.

### Dónde se edita el contenido

Todo el texto vive en `src/app/data/`, no en las plantillas:

- `profiles/frontend.profile.ts` y `profiles/fullstack.profile.ts` — hero, marquee, manifiesto,
  sobre mí, stack, headers de sección y footer de cada universo.
- `jobs.data.ts` / `jobs-fullstack.data.ts` — la misma trayectoria contada desde el frontend
  o desde el servidor (mismos cargos, empresas y fechas).
- `projects.data.ts` / `projects-fullstack.data.ts` — proyectos personales.
- `tech-tracks.data.ts` — líneas de tiempo de "Evolución Tecnológica".
- `cv-fullstack.data.ts` — contenido del CV.
- `contact.data.ts` — email, ubicación y redes, compartido por todo.

Educación, certificaciones y testimonios **no** están en los perfiles: son hechos de vida,
idénticos en ambos universos, y viven en sus propios componentes.

### Colores

Son tokens CSS en `src/styles.css`: `:root` define el tema por defecto y `body.theme-node`
lo reemplaza entero. Ningún componente tiene colores de marca hardcodeados.

Los fondos en canvas (`hero-background`, `stack-background`) no pueden usar `var(--token)`,
así que leen los acentos del `<body>` con `getComputedStyle` al iniciar.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
