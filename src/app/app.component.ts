import { Component, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverStyleDirective } from './directives/hover-style.directive';
import { SpaceParticlesDirective } from './directives/space-particles.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HoverStyleDirective, SpaceParticlesDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  // ---------- estado ----------
  selected: any = null;
  cert: any = null;
  menuOpen = false;
  year = new Date().getFullYear();
  showTechStack = true;

  // ---------- imágenes (public/) ----------
  private logos: Record<string, string> = {
    'Ideatech': 'ideatech.png',
    'Imagemaker': 'imagemaker.png',
    'Orbis Data': 'orbisdata.png',
    'BC Tecnología': 'bctecnologia.png',
    'Grupo MOK': 'mok.png',
    'Walmart Chile': 'walmart.png',
    'Cursor S.A.': 'cursor.png',
    'BLANCO ESTUDIO': 'blanco.png',
    'RAYA': 'raya.jpg',
    'Toteat': 'toteat.jpg',
    'TMN Consultores': 'tmnconsultores.png',
    'Advante Digital': 'advante.png'
  };
  private logosContain = ['Orbis Data', 'BC Tecnología', 'Grupo MOK', 'BLANCO ESTUDIO', 'TMN Consultores'];

  private logoStyle(company: string): string {
    const src = this.logos[company];
    if (!src) return 'display:none;';
    const contain = this.logosContain.indexOf(company) !== -1;
    return "position:absolute;inset:0;background-image:url('" + src + "');background-repeat:no-repeat;background-position:center;" +
      (contain ? 'background-size:78%;background-color:#fff;' : 'background-size:cover;');
  }

  // ---------- datos ----------
  jobs = [
    { title: 'Desarrollador FullStack', company: 'Ideatech', dates: 'dic. 2025 – feb. 2026', duration: '3 meses', isDesign: false,
      description: 'Proyecto SID (Sistema Integrado Digital) para Elaboradora de Alimentos Doñihue (Agrosuper): construí 4 módulos core y más de 10 submódulos de dashboards para gestión de producción alimentaria. Arquitectura de componentes en Next.js 16, APIs REST en Node.js, visualización en tiempo real con ECharts y modelado de datos con Prisma + PostgreSQL. Sin diseñador UI/UX: definí e implementé la interfaz completa desde cero.',
      tech: ['React', 'Next.js 16', 'TypeScript', 'MUI', 'ECharts', 'Prisma', 'PostgreSQL'] },
    { title: 'Líder de Desarrollo Full-Stack', company: 'FleetMaster', dates: 'feb. 2025 – nov. 2025', duration: '10 meses', isDesign: false,
      description: 'Plataforma SaaS para la gestión integral de flotas: módulos de administración de vehículos, solicitudes de servicio, planificación operativa y dashboards de análisis. Arquitectura frontend con Next.js y TypeScript, APIs REST en Node.js para datos en tiempo real (facturación, operaciones, métricas) y visualizaciones interactivas de BI y KPIs.',
      tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'] },
    { title: 'Desarrollador Front-end', company: 'Imagemaker', dates: 'sept. 2024 – ene. 2025', duration: '5 meses', isDesign: false,
      description: 'Asignado al proyecto de Banco Santander Chile: desarrollo del frontend del Home de APV (Ahorro Previsional Voluntario) y vistas complementarias de otros módulos. Integración de APIs REST con Spring Boot y tests unitarios con Jest alcanzando 85% de cobertura, en célula multidisciplinaria bajo Scrum.',
      tech: ['Angular 15', 'TypeScript', 'SCSS', 'Jest', 'Spring Boot'] },
    { title: 'Desarrollador Front-end', company: 'Orbis Data', dates: 'jun. 2024 – ago. 2024', duration: '3 meses', isDesign: false,
      description: 'Frontend del proyecto Confirming para Banco BCI: lógica de perfilamiento con cálculo y comparación en tiempo real de montos de anticipo, integrando servicios backend. Despliegue a producción con Jenkins en célula ágil bajo Scrum.',
      tech: ['Angular 14', 'TypeScript', 'Figma', 'Jenkins'] },
    { title: 'Diseñador UI/UX', company: 'BC Tecnología', dates: 'nov. 2022 – oct. 2023', duration: '1 año', isDesign: true,
      description: 'Asignado al cliente Banco Consorcio como diseñador UI/UX de la célula Dune, en el proyecto iCambios. Definí criterios de diseño, sistema de componentes y guías de interacción para el equipo de desarrollo, en célula ágil bajo Scrum.',
      tech: ['Figma', 'Design System', 'Scrum'] },
    { title: 'Diseñador UI/UX', company: 'Agilesoft', dates: 'jun. 2023 – ago. 2023', duration: '3 meses', isDesign: true,
      description: 'Proyecto de transformación digital de ESVAL: diseño de interfaces, wireframes y flujos de usuario en Figma con componentes reutilizables y patrones de interacción. Colaboración directa con desarrollo para asegurar viabilidad técnica, iterando con feedback del equipo y stakeholders.',
      tech: ['Figma', 'Prototyping', 'Scrum'] },
    { title: 'Analista de software', company: 'Grupo MOK', dates: 'abr. 2022 – ago. 2022', duration: '5 meses', isDesign: false,
      description: 'Proyectos para clientes de escala regional: componentes frontend en Angular 12 y React, y diseño de interfaces en Figma y Adobe XD para HDI Seguros, Entel, Cardiff, Magalu y Scotia Seguros. Participación en talleres internos de UI/UX.',
      tech: ['Angular 12', 'React', 'Figma', 'Adobe XD'] },
    { title: 'Desarrollador Full-Stack', company: 'BC Tecnología', dates: 'may. 2021 – feb. 2022', duration: '10 meses', isDesign: false,
      description: 'Para BanChile Inversiones (filial del Banco de Chile) desarrollé el sitio público banchileinversiones.cl y el proyecto BCASH de transformación digital. Integré la API de YouTube con Modyo como CMS conectado al frontend en Angular, y colaboré en el proyecto Promesas para ejecutivos.',
      tech: ['Angular 11', 'Angular Material', 'Modyo', 'Figma'] },
    { title: 'Desarrollador Front-end (React Native)', company: 'Walmart Chile', dates: 'abr. 2019 – jul. 2019', duration: '4 meses', isDesign: false,
      description: 'Como externo de SR Consultores desarrollé interfaces para aplicaciones móviles internas: componentes reutilizables en React Native siguiendo las guías de estilo corporativas de Walmart, optimizando la experiencia de usuario junto a diseñadores y desarrolladores backend.',
      tech: ['React Native', 'CSS3', 'Git'] },
    { title: 'Desarrollador front-end', company: 'Cursor S.A.', dates: 'dic. 2015 – feb. 2016', duration: '3 meses', isDesign: false,
      description: 'En esta agencia digital de Providencia trabajé en el frontend del sitio corporativo y proyectos para clientes, traduciendo wireframes y mockups a interfaces funcionales con diseños responsive.',
      tech: ['HTML5', 'CSS3', 'Bootstrap 3', 'jQuery'] },
    { title: 'Desarrollador de WordPress', company: 'BLANCO ESTUDIO', dates: 'oct. 2015 – dic. 2015', duration: '3 meses', isDesign: false,
      description: 'Sitios web corporativos y landing pages con WordPress como CMS principal: personalización de temas y plugins e implementación de diseños responsive adaptando mockups a código funcional.',
      tech: ['WordPress', 'PHP', 'jQuery'] },
    { title: 'Desarrollador de WordPress', company: 'RAYA', dates: 'jul. 2015 – sept. 2015', duration: '3 meses', isDesign: false,
      description: 'Desarrollo de sitios web y landing pages con WordPress, personalizando temas y maquetando diseños responsive, con foco en entregas rápidas para clientes.',
      tech: ['WordPress', 'PHP', 'HTML5'] },
    { title: 'Desarrollador Angular', company: 'Toteat', dates: 'mar. 2015 – jun. 2015', duration: '4 meses', isDesign: false,
      description: 'En esta startup chilena de tecnología gastronómica participé en la aplicación web con AngularJS: interfaz de usuario, componentes interactivos e integración de reservas y pedidos en línea, colaborando con producto en flujos de usuario y mejoras de UX.',
      tech: ['AngularJS', 'HTML5', 'JavaScript'] },
    { title: 'Diseñador y Desarrollador Web WordPress', company: 'TMN Consultores', dates: 'mar. 2014', duration: '1 mes', isDesign: false,
      description: 'Mi primer proyecto freelance profesional: diseñé y desarrollé el sitio completo de TMN Consultores, desde wireframes y bocetos en papel, iterando con el cliente hasta mockups de alta fidelidad y la implementación final en WordPress.',
      tech: ['WordPress', 'HTML5', 'Photoshop'] },
    { title: 'Práctica profesional (UDLA)', company: 'Advante Digital', dates: 'ene. 2014 – mar. 2014', duration: '3 meses', isDesign: false,
      description: 'Práctica en agencia digital con clientes corporativos de alto perfil: proyectos para Heineken (junto a la agencia TBWA), Entel, Instituto Pedro de Valdivia, Liberty Seguros y Falabella Colombia. Diseño de interfaces web y móviles, contenido digital y reuniones estratégicas con equipos multidisciplinarios.',
      tech: ['HTML5', 'CSS3', 'PHP5', 'Photoshop', 'Illustrator'] }
  ];

  private principlesData = [
    { title: 'Diseño con intención', desc: 'Cada decisión visual responde a un problema real de usuario, no a una moda.', from: '#FB2576', to: '#B14BF0' },
    { title: 'Código que dura', desc: 'Arquitecturas simples, mantenibles y testeadas antes que trucos ingeniosos.', from: '#B14BF0', to: '#7B2FF7' },
    { title: 'Equipo antes que ego', desc: 'No creo en el "rockstar": creo en hacer la pega bien hecha, en conjunto.', from: '#7B2FF7', to: '#4C6FFF' },
    { title: 'Iterar, medir, mejorar', desc: 'Shippear rápido, observar el uso real y ajustar con datos, no con supuestos.', from: '#4C6FFF', to: '#3FB9C9' }
  ];

  aboutStats = [
    { num: '30+', label: 'Productos entregados', grad: 'linear-gradient(120deg,#FB2576,#B14BF0)' },
    { num: '9', label: 'Clientes de banca y retail', grad: 'linear-gradient(120deg,#B14BF0,#4C6FFF)' },
    { num: '2', label: 'Ecosistemas: web y móvil', grad: 'linear-gradient(120deg,#4C6FFF,#3FB9C9)' }
  ];

  aboutFocus = [
    { idx: '01', title: 'UI de alto detalle', desc: 'Componentes pulidos y accesibles.' },
    { idx: '02', title: 'Rendimiento real', desc: 'Fluidez en dispositivos reales.' },
    { idx: '03', title: 'Cerca del diseño', desc: 'De Figma a código, sin perder intención.' }
  ];

  stackGroups = [
    { title: 'Frontend Web', glyph: '▲', blurb: 'El core: apps Angular escalables y tipadas.', from: '#FB2576', to: '#7B2FF7', items: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'HTML/CSS'] },
    { title: 'Móvil', glyph: '◆', blurb: 'Una base de código, iOS y Android nativos.', from: '#7B2FF7', to: '#4C6FFF', items: ['Ionic', 'React Native', 'Capacitor'] },
    { title: 'Diseño', glyph: '✦', blurb: 'Del wireframe al sistema de componentes.', from: '#FF6F9C', to: '#FB2576', items: ['Figma', 'Design Systems', 'Prototyping', 'UX Research'] },
    { title: 'Calidad', glyph: '●', blurb: 'Que se vea bien y funcione impecable.', from: '#3FB9C9', to: '#4C6FFF', items: ['Jest', 'Testing', 'Accesibilidad', 'Performance'] },
    { title: 'Integración', glyph: '❯', blurb: 'Datos y despliegue conectados sin fricción.', from: '#B14BF0', to: '#FB2576', items: ['REST APIs', 'Git', 'CI/CD'] },
    { title: 'IA & Automatización', glyph: '✺', blurb: 'LLMs y agentes integrados al flujo real de producto.', from: '#4C6FFF', to: '#3FB9C9', items: ['Anthropic Claude', 'Cursor', 'antigravity', 'LLM APIs'] }
  ];

  frameworkTimelines = [
    { name: 'Angular', glyph: 'A', span: '2010 → hoy', from: '#FB2576', to: '#7B2FF7', milestones: [
      { year: '2010', title: 'AngularJS', desc: 'El comienzo de todo. MVC en el cliente.', color: '#FB2576' },
      { year: '2016', title: 'Angular 2+', desc: 'Reescritura total. TypeScript y RxJS.', color: '#FB2576' },
      { year: '2020', title: 'Ivy Engine (v9)', desc: 'Compilador más rápido y mejor debugging.', color: '#B14BF0' },
      { year: '2026', title: 'Angular 18+', desc: 'Control flow nativo y zoneless apps.', color: '#7B2FF7' }
    ] },
    { name: 'React', glyph: 'R', span: '2013 → hoy', from: '#3FB9C9', to: '#4C6FFF', milestones: [
      { year: '2013', title: 'React 15-', desc: 'Class components y ciclo de vida.', color: '#3FB9C9' },
      { year: '2019', title: 'Hooks (v16.8)', desc: 'useState, useEffect: revolución funcional.', color: '#3FB9C9' },
      { year: '2022', title: 'Concurrent Mode (v18)', desc: 'Suspense y renderizado asíncrono.', color: '#4C97DF' },
      { year: '2026', title: 'React 19', desc: 'Compiler y use(), acciones optimizadas.', color: '#4C6FFF' }
    ] },
    { name: 'React Native', glyph: 'RN', span: '2015 → hoy', from: '#4C6FFF', to: '#7B2FF7', milestones: [
      { year: '2015', title: 'Bridge Architecture', desc: 'Serialización JSON entre JS y Native.', color: '#4C6FFF' },
      { year: '2021', title: 'Hermes Engine', desc: 'Motor JS optimizado para inicio rápido.', color: '#4C6FFF' },
      { year: '2024', title: 'Fabric Renderer', desc: 'Renderizador concurrente de UI en C++.', color: '#6252F5' },
      { year: '2026', title: 'New Architecture', desc: 'Bridgeless por defecto, con React 19.', color: '#7B2FF7' }
    ] }
  ];

  rankingGroups = [
    { label: 'Web · Más usados', rows: [
      { name: 'Node.js', pct: '48.7', w: 100, nameColor: '#D6CFE0', from: '#8B8398', to: '#5A5366' },
      { name: 'React', pct: '44.7', w: 92, nameColor: '#fff', from: '#3FB9C9', to: '#4C6FFF' },
      { name: 'Next.js', pct: '21.5', w: 44, nameColor: '#fff', from: '#3FB9C9', to: '#4C6FFF' },
      { name: 'Angular', pct: '18.2', w: 37, nameColor: '#fff', from: '#FB2576', to: '#7B2FF7' },
      { name: 'Vue.js', pct: '17.6', w: 36, nameColor: '#D6CFE0', from: '#8B8398', to: '#5A5366' }
    ] },
    { label: 'Web · Más admirados', rows: [
      { name: 'Svelte', pct: '62.4', w: 100, nameColor: '#D6CFE0', from: '#8B8398', to: '#5A5366' },
      { name: 'React', pct: '52.1', w: 83, nameColor: '#fff', from: '#3FB9C9', to: '#4C6FFF' },
      { name: 'Vue.js', pct: '50.9', w: 82, nameColor: '#D6CFE0', from: '#8B8398', to: '#5A5366' },
      { name: 'Angular', pct: '44.7', w: 72, nameColor: '#fff', from: '#FB2576', to: '#7B2FF7' }
    ] },
    { label: 'Mobile · Más usados', rows: [
      { name: 'React Native', pct: '14.5', w: 100, nameColor: '#fff', from: '#4C6FFF', to: '#7B2FF7' },
      { name: 'Flutter', pct: '13.6', w: 94, nameColor: '#D6CFE0', from: '#8B8398', to: '#5A5366' }
    ] }
  ];

  private projectsRaw = [
    { tag: 'SaaS · Gestión de flotas', title: 'FleetMaster', h: 224, img: '', desc: 'Plataforma SaaS de gestión integral de flotas: vehículos, planificación operativa y dashboards de BI.', tech: ['Next.js', 'TypeScript', 'Node.js'] },
    { tag: 'Banca · Banco Santander', title: 'Home APV', h: 360, img: 'santander-apv.png', desc: 'Frontend del Home de Ahorro Previsional Voluntario, con 85% de cobertura de tests unitarios.', tech: ['Angular 15', 'Jest', 'SCSS'] },
    { tag: 'Fintech · Banco BCI', title: 'Confirming BCI', h: 260, img: '', desc: 'Perfilamiento con cálculo y comparación en tiempo real de montos de anticipo.', tech: ['Angular 14', 'TypeScript', 'Jenkins'] },
    { tag: 'Proyecto propio · EdTech', title: 'LearningMusicPlus', h: 240, img: 'learningmusicplus.jpeg', desc: 'App Angular para aprender piano, guitarra y bajo: modo claro/oscuro, lazy loading y seguimiento de progreso.', tech: ['Angular', 'Tailwind', 'Angular Material'] },
    { tag: 'Banca · Banco Consorcio', title: 'iCambios', h: 260, img: 'bctecnologia-consorcio.png', desc: 'Diseño UI/UX de la célula Dune: compra venta de divisas y órdenes de pago internacional.', tech: ['Figma', 'Design System', 'Scrum'] },
    { tag: 'Intranet · Grupo MOK', title: 'Intranet de casos', h: 300, img: 'mok-1.jpg', desc: 'Interfaz de creación y seguimiento de casos para ejecutivos, con flujo guiado por pasos.', tech: ['Angular 12', 'Figma', 'Adobe XD'] }
  ];

  private educationRaw = [
    { title: 'Técnico en Programación Computacional', institution: 'CIISA · Titulado con Distinción · Práctica en Walmart Chile', dates: '2016 – 2020', logo: '' },
    { title: 'Técnico Nivel Superior en Desarrollo & Diseño Web', institution: 'Universidad de Las Américas', dates: '2011 – 2015', logo: '' }
  ];

  private certificatesRaw = [
    { title: 'Programación Orientada a Objetos con Python', issuer: 'EDteam · ID 187706', year: 'dic. 2023', img: '' },
    { title: 'JavaScript desde cero', issuer: 'EDteam', year: 'abr. 2023', img: '' },
    { title: 'Programación desde cero 2023', issuer: 'EDteam', year: 'oct. 2023', img: 'programación desde cero 2023.jpeg' },
    { title: '¿Cómo cotizar un proyecto?', issuer: 'EDteam', year: 'jul. 2023', img: '' },
    { title: 'Angular esencial', issuer: 'LinkedIn Learning', year: 'mar. 2018', img: 'angular-escencial.jpeg' },
    { title: 'Angular 2 avanzado: Trabajo con APIs', issuer: 'LinkedIn Learning', year: 'abr. 2018', img: '' },
    { title: 'Angular 2 práctico: Sitio de consumo de videos', issuer: 'LinkedIn Learning', year: 'mar. 2018', img: '' },
    { title: 'React esencial', issuer: 'LinkedIn Learning', year: 'feb. 2018', img: '' }
  ];

  testimonials = [
    { name: 'Raúl Fernando Lamadrid Gavilán', role: 'Scrum Master · Gestión de Proyectos Ágiles', initial: 'R', stars: [0, 0, 0, 0, 0],
      quote: 'Trabajar con Ignacio ha sido una de las experiencias más divertidas que he tenido en mi carrera. Además de ser un excelente desarrollador, con habilidades sólidas en interfaces y tecnología, su verdadero superpoder es la empatía y la buena energía que aporta al grupo. Es esa chispa especial la que transforma un grupo de trabajo en un equipo.' },
    { name: 'Viviana Droguett Sierra', role: 'Liderazgo en Diseño de Experiencia · Service Design', initial: 'V', stars: [0, 0, 0, 0, 0],
      quote: 'Ignacio es un diseñador muy entusiasta, con ganas de aportar y aprender cosas nuevas. Tiene un buen manejo de código y conocimientos de UX/UI — una mente creativa que es un gran aporte al equipo.' }
  ];

  // ---------- vistas derivadas ----------
  orbitChips: any[] = [];
  experiences: any[] = [];
  principles: any[] = [];
  projects: any[] = [];
  education: any[] = [];
  certificates: any[] = [];
  testimonialsView: any[] = [];

  constructor(private zone: NgZone) {
    const mk = (label: string, ring: number, angle: number, speed: number, rgb: string) =>
      ({ label, ring, angle, speed, bg: 'rgba(' + rgb + ',.16)', bd: 'rgba(' + rgb + ',.45)' });
    this.orbitChips = [
      mk('RxJS', 2, 0, 26, '177,75,240'),
      mk('SCSS', 2, 120, 26, '251,37,118'),
      mk('Jest', 2, 240, 26, '63,185,201'),
      mk('Angular', 1, 0, -38, '251,37,118'),
      mk('TypeScript', 1, 90, -38, '76,111,255'),
      mk('Figma', 1, 180, -38, '177,75,240'),
      mk('Node.js', 1, 270, -38, '63,185,201'),
      mk('React Native', 0, 0, 52, '76,111,255'),
      mk('Ionic', 0, 72, 52, '63,185,201'),
      mk('CI/CD', 0, 144, 52, '123,47,247'),
      mk('Claude', 0, 216, 52, '240,166,200'),
      mk('Cursor', 0, 288, 52, '76,111,255')
    ];

    this.principles = this.principlesData.map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0'), delay: `${-i * 1.25}s` }));

    this.experiences = this.jobs.map((job, i) => ({
      ...job,
      logo: this.logos[job.company] || '',
      logoStyle: this.logoStyle(job.company),
      noLogo: !this.logos[job.company],
      num: String(i + 1).padStart(2, '0'),
      initial: job.company.charAt(0),
      slotId: 'logo-' + i
    }));

    this.projects = this.projectsRaw.map((pr, i) => ({
      ...pr,
      slotId: 'project-' + i,
      hasImg: !!pr.img,
      noImg: !pr.img,
      imgStyle: pr.img
        ? "display:block;width:100%;height:" + pr.h + "px;background:#1B1526 url('" + pr.img + "') center/cover no-repeat;"
        : 'display:none;'
    }));

    this.education = this.educationRaw.map((ed) => ({
      ...ed,
      logoStyle: ed.logo
        ? "width:100%;height:100%;background:#fff url('" + ed.logo + "') center/76% no-repeat;"
        : 'width:100%;height:100%;background:linear-gradient(135deg,#FB2576,#7B2FF7);'
    }));

    const pal = [['#FB2576', '#B14BF0', '251,37,118'], ['#B14BF0', '#7B2FF7', '177,75,240'], ['#4C6FFF', '#7B2FF7', '76,111,255'], ['#3FB9C9', '#4C6FFF', '63,185,201']];
    this.certificates = this.certificatesRaw.map((c, i) => {
      const [pa, pb, prgb] = pal[i % pal.length];
      return {
        ...c,
        numGrad: 'linear-gradient(120deg,' + pa + ',' + pb + ')',
        lineGrad: 'linear-gradient(90deg, rgba(' + prgb + ',.5), transparent)',
        pillStyle: 'font-size:13px;font-weight:700;color:#F1EDF7;padding:4px 12px;border-radius:999px;border:1px solid rgba(' + prgb + ',.35);background:rgba(' + prgb + ',.12);',
        slotId: 'cert-' + i,
        hasImg: !!c.img,
        noImg: !c.img,
        imgStyle: c.img
          ? "display:block;width:100%;aspect-ratio:16 / 11;background:#1B1526 url('" + c.img + "') center/cover no-repeat;"
          : 'display:none;',
        imgContainStyle: c.img
          ? "display:block;width:100%;aspect-ratio:16 / 11;border-radius:18px 18px 0 0;background:#1B1526 url('" + c.img + "') center/contain no-repeat;"
          : 'display:none;',
        n: String(i + 1).padStart(2, '0'),
        rowStyle: 'display:flex;flex-wrap:wrap;align-items:center;gap:34px;flex-direction:' + (i % 2 ? 'row-reverse' : 'row') + ';'
      };
    });

    this.testimonialsView = this.testimonials.map((t, i) => ({ ...t, slotId: 'tm-' + i }));
  }

  // ---------- menú ----------
  get menuLinks(): any[] {
    const mOpen = this.menuOpen;
    return [
      { num: '01', label: 'Inicio', href: '#inicio' },
      { num: '02', label: 'Filosofía', href: '#filosofia' },
      { num: '03', label: 'Sobre mí', href: '#sobre-mi' },
      { num: '04', label: 'Stack', href: '#stack' },
      { num: '05', label: 'Evolución', href: '#evolucion' },
      { num: '06', label: 'Proyectos', href: '#proyectos' },
      { num: '07', label: 'Experiencia', href: '#experiencia' },
      { num: '08', label: 'Educación', href: '#educacion' },
      { num: '09', label: 'Contacto', href: '#contacto' }
    ].map((l, i) => ({
      ...l,
      style: 'display:inline-flex;align-items:baseline;gap:16px;text-decoration:none;font-weight:800;letter-spacing:-2px;line-height:1.16;font-size:clamp(38px,7vw,78px);color:#7C7488;transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1),color .25s;'
        + (mOpen ? ('opacity:1;transform:none;transition-delay:' + (0.14 + i * 0.07).toFixed(2) + 's;') : 'opacity:0;transform:translateY(38px);transition-delay:0s;')
    }));
  }

  get menuStyle(): string {
    return 'position:fixed;inset:0;z-index:200;background:#08050D;overflow:hidden;transition:opacity .5s ease,visibility .5s ease;'
      + (this.menuOpen ? 'visibility:visible;opacity:1;pointer-events:auto;' : 'visibility:hidden;opacity:0;pointer-events:none;');
  }

  get menuPanelStyle(): string {
    return 'display:flex;flex-direction:column;gap:28px;max-width:300px;transition:opacity .6s cubic-bezier(.16,1,.3,1) .34s,transform .6s cubic-bezier(.16,1,.3,1) .34s;'
      + (this.menuOpen ? 'opacity:1;transform:none;' : 'opacity:0;transform:translateY(20px);');
  }

  // ---------- acciones ----------
  openMenu(): void { this.menuOpen = true; this.syncLock(); }
  closeMenu(): void { this.menuOpen = false; this.syncLock(); }
  openJob(job: any): void { this.selected = job; this.syncLock(); }
  closeModal(): void { this.selected = null; this.syncLock(); }
  openCert(c: any): void { this.cert = { ...c, imgStyle: c.imgContainStyle }; this.syncLock(); }
  closeCert(): void { this.cert = null; this.syncLock(); }
  stop(e: Event): void { e.stopPropagation(); }
  toTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  private lock = false;
  private syncLock(): void {
    const open = !!this.selected || !!this.menuOpen || !!this.cert;
    if (open !== this.lock) {
      this.lock = open;
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  // ---------- lógica de animación / scroll ----------
  private orbitRaf = 0;
  private orbitPaused = false;
  private orbitT = 0;
  private orbitLast = 0;
  private onScroll = () => { if (this.rafScroll) return; this.rafScroll = requestAnimationFrame(() => { this.rafScroll = 0; this.updateScroll(); }); };
  private rafScroll = 0;
  private interval: any;
  private activeId = '';
  private onPointerMove = (e: PointerEvent) => { this.spotX = e.clientX; this.spotY = e.clientY; if (!this.spotRaf) this.spotRaf = requestAnimationFrame(this.paintSpot); };
  private onParallax = () => {
    const nb = document.querySelector<HTMLElement>('[data-parallax]');
    if (nb) nb.style.transform = 'translate3d(0,' + (-(window.scrollY || 0) * 0.05).toFixed(1) + 'px,0)';
  };
  private spotX = 0; private spotY = 0; private spotRaf = 0;
  private paintSpot = () => {
    this.spotRaf = 0;
    const spot = document.querySelector<HTMLElement>('[data-spot]');
    if (!spot) return;
    spot.style.transform = 'translate3d(' + this.spotX + 'px,' + this.spotY + 'px,0)';
    spot.style.opacity = '1';
  };

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      // Órbita del stack
      this.orbitLast = performance.now();
      const box = document.querySelector('[data-orbit-box]');
      if (box) {
        box.addEventListener('pointerenter', () => { this.orbitPaused = true; });
        box.addEventListener('pointerleave', () => { this.orbitPaused = false; });
      }
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const radii = [0.40, 0.29, 0.195];
      const tick = (now: number) => {
        this.orbitRaf = requestAnimationFrame(tick);
        const dt = Math.min(50, now - this.orbitLast);
        this.orbitLast = now;
        if (!this.orbitPaused && !reduced) this.orbitT += dt / 1000;
        const b = document.querySelector<HTMLElement>('[data-orbit-box]');
        if (!b) return;
        const size = b.offsetWidth;
        b.querySelectorAll<HTMLElement>('[data-orbit-chip]').forEach((chip) => {
          const a0 = parseFloat(chip.dataset['angle'] || '0') || 0;
          const ring = parseInt(chip.dataset['ring'] || '0') || 0;
          const speed = parseFloat(chip.dataset['speed'] || '10') || 10;
          const a = (a0 + this.orbitT * (360 / speed)) * Math.PI / 180;
          const r = radii[ring] * size;
          chip.style.transform = 'translate(-50%, -50%) translate(' + (Math.cos(a) * r).toFixed(1) + 'px,' + (Math.sin(a) * r).toFixed(1) + 'px)';
        });
      };
      this.orbitRaf = requestAnimationFrame(tick);

      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('scroll', this.onParallax, { passive: true });
      this.interval = setInterval(() => { this.updateScroll(); this.initTilt(); this.initRevealFX(); this.revealPass(); }, 500);
      this.updateScroll();
      this.initTilt();
      this.initRevealFX();
      this.revealPass();
    });
  }

  private revealPass(): void {
    const h = window.innerHeight || 800;
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < h * 0.92 && r.bottom > 0) el.style.transform = 'none';
    });
  }

  private initTilt(): void {
    const MAX = 5;
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      if ((el as any)._tiltBound) return;
      (el as any)._tiltBound = true;
      const base = 'perspective(900px)';
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = base + ' rotateY(' + (px * MAX * 2) + 'deg) rotateX(' + (-py * MAX * 2) + 'deg) translateY(-4px)';
        el.style.boxShadow = '0 22px 48px rgba(0,0,0,.45), 0 0 0 1px rgba(251,37,118,.12)';
        el.style.borderColor = 'rgba(251,37,118,.35)';
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
        el.style.boxShadow = '';
        el.style.borderColor = '';
      });
    });
  }

  private initRevealFX(): void {
    const wrap = document.querySelector<HTMLElement>('[data-countwrap]');
    if (!wrap || (wrap as any)._fxDone) return;
    const r = wrap.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    if (!(r.top < vh * 0.82 && r.bottom > 40)) return;
    (wrap as any)._fxDone = true;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    wrap.querySelectorAll<HTMLElement>('[data-countup]').forEach((el, i) => {
      const raw = el.getAttribute('data-countup') || el.textContent || '';
      const m = raw.match(/^(\D*)(\d+)(\D*)$/);
      if (!m) return;
      const pre = m[1], target = parseInt(m[2], 10), suf = m[3];
      const dur = 1350, start = performance.now() + i * 150;
      el.textContent = pre + '0' + suf;
      const tick = (now: number) => {
        const t = Math.max(0, Math.min(1, (now - start) / dur));
        el.textContent = pre + Math.round(ease(t) * target) + suf;
        if (t < 1) { requestAnimationFrame(tick); return; }
        el.textContent = raw;
        el.style.transition = 'none';
        el.style.transform = 'scale(1.16)';
        el.style.filter = 'drop-shadow(0 0 16px rgba(251,37,118,.5))';
        requestAnimationFrame(() => {
          el.style.transition = 'transform .55s cubic-bezier(.16,1,.3,1), filter .7s ease';
          el.style.transform = 'scale(1)';
          el.style.filter = 'none';
        });
      };
      requestAnimationFrame(tick);
    });
    const shine = document.querySelector<HTMLElement>('[data-bioshine]');
    if (shine) { shine.style.animation = 'none'; void shine.offsetWidth; shine.style.animation = 'bioShine 1.6s cubic-bezier(.3,0,.2,1) .15s both'; }
  }

  private updateScroll(): void {
    const navlinks = document.querySelector<HTMLElement>('[data-navlinks]');
    if (navlinks) navlinks.style.display = window.innerWidth < 1180 ? 'none' : 'flex';
    const vw = window.innerWidth;
    const soc = document.querySelector<HTMLElement>('[data-navsocial]');
    if (soc) soc.style.display = vw < 700 ? 'none' : 'flex';
    const cv = document.querySelector<HTMLElement>('[data-navcv]');
    if (cv) cv.style.display = vw < 560 ? 'none' : 'inline-flex';

    const se = document.scrollingElement || document.documentElement;
    const top = se.scrollTop || window.scrollY || 0;
    const max = (se.scrollHeight - se.clientHeight) || 1;
    const pb = document.querySelector<HTMLElement>('[data-progress]');
    if (pb) pb.style.width = Math.max(0, Math.min(100, (top / max) * 100)).toFixed(2) + '%';

    const cue = document.querySelector<HTMLElement>('[data-cue]');
    if (cue) cue.style.opacity = top > 160 ? '0' : '1';

    const fab = document.querySelector<HTMLElement>('[data-fab]');
    if (fab) {
      const on = top > 700;
      fab.style.opacity = on ? '1' : '0';
      fab.style.visibility = on ? 'visible' : 'hidden';
      fab.style.transform = on ? 'none' : 'translateY(14px)';
    }

    const ids = ['inicio', 'filosofia', 'sobre-mi', 'stack', 'proyectos', 'experiencia', 'educacion', 'contacto'];
    let active = ids[0];
    for (const id of ids) {
      const s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top <= 110) active = id;
    }
    if (active !== this.activeId) { this.activeId = active; this.syncIndicator(active); }
  }

  private syncIndicator(active: string): void {
    const wrap = document.querySelector<HTMLElement>('[data-navlinks]');
    if (!wrap) return;
    const links = wrap.querySelectorAll<HTMLElement>('[data-navlink]');
    let activeEl: HTMLElement | null = null;
    links.forEach((el) => {
      const on = el.getAttribute('href') === '#' + active;
      el.style.color = on ? '#fff' : '#A39BB0';
      if (on) activeEl = el;
    });
    const pill = wrap.querySelector<HTMLElement>('[data-navindicator]');
    if (pill && activeEl) {
      const wr = wrap.getBoundingClientRect();
      const ar = (activeEl as HTMLElement).getBoundingClientRect();
      pill.style.opacity = '1';
      pill.style.width = ar.width + 'px';
      pill.style.transform = 'translateX(' + (ar.left - wr.left) + 'px)';
    }
  }

  ngOnDestroy(): void {
    if (this.orbitRaf) cancelAnimationFrame(this.orbitRaf);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('scroll', this.onParallax);
    clearInterval(this.interval);
    document.body.style.overflow = '';
  }
}
