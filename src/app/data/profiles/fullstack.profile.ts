import { Profile } from '../../models/profile.model';
import { CONTACT } from '../contact.data';
import { JOBS_FULLSTACK } from '../jobs-fullstack.data';
import { PROJECTS_FULLSTACK } from '../projects-fullstack.data';
import { TRACKS_FULLSTACK } from '../tech-tracks.data';

/** Segundo universo: Full-Stack. Verde ácido Node + verde hoja Spring. Ruta "/fullstack". */
export const FULLSTACK_PROFILE: Profile = {
  id: 'fullstack',
  themeClass: 'theme-node',

  meta: {
    title: 'Ignacio Díaz · Desarrollador Full-Stack',
    description: 'Portafolio full-stack de Ignacio Díaz: APIs en Node.js y Java con Spring Boot, PostgreSQL y MongoDB, Docker y AWS, con frontend en Angular. Santiago de Chile.'
  },

  contact: CONTACT,

  nav: {
    brandName: 'Ignacio Díaz',
    role: 'Full-Stack Developer',
    cvHref: '/cv-fullstack',
    cvLabel: 'Ver CV',
    cvDownload: false
  },

  hero: {
    badge: 'Disponible para nuevos proyectos',
    firstName: 'Ignacio',
    lastName: 'Díaz',
    subtitleLead: 'Del modelo de datos al deploy',
    flipWords: ['Node.js & Spring Boot', 'APIs que se entienden', 'PostgreSQL · MongoDB', 'Docker · AWS · CI/CD', 'Node.js & Spring Boot'],
    bio: 'Construyo el producto completo: diseño el modelo de datos, levanto la API, la documento para que otro la pueda usar sin llamarme, y después me siento en el front a consumirla. Me gusta el backend porque no perdona: o el contrato está claro y el sistema aguanta, o no. Nada de humo.',
    photo: 'ignacio.jpg',
    ctaPrimary: { label: 'Ver trayectoria', fragment: 'experiencia' },
    ctaSecondary: { label: 'Hablemos', fragment: 'contacto' },
    floatingTitle: 'Full-Stack',
    floatingSubtitle: 'API, datos y producto'
  },

  marquee: ['Node.js', 'Spring Boot', 'PostgreSQL', 'REST APIs', 'Docker', 'MongoDB', 'TDD', 'CI/CD'],

  manifesto: {
    watermark: 'Backend',
    eyebrow: 'Cómo trabajo',
    quoteLead: 'Una API está bien hecha cuando el equipo puede usarla ',
    quoteAccent: 'sin preguntarme nada',
    quoteTail: '.',
    narrative: 'Vengo del diseño, y esa deformación resultó ser mi mejor herramienta del lado del servidor: un endpoint también tiene usuarios. Si los nombres confunden o los errores no dicen nada útil, la API está mal diseñada aunque los tests pasen en verde.',
    principles: [
      { title: 'Los datos primero', desc: 'Modelo bien las tablas antes de escribir el primer endpoint. Después es carísimo.' },
      { title: 'Errores explícitos', desc: 'Un 500 genérico es una deuda. Prefiero que el sistema diga exactamente qué se rompió.' },
      { title: 'Deploys aburridos', desc: 'Si subir a producción da miedo un viernes, el problema no es el viernes.' }
    ],
    timeline: {
      titlebar: 'node — timeline',
      icon: 'node',
      label: 'Node.js',
      subtitle: '2009 → hoy · el runtime donde vive casi todo lo que escribo',
      chips: [{ label: 'Node', badge: 'JS' }, { label: 'Express' }, { label: 'NestJS' }],
      versions: [
        { year: '2009', version: 'Node.js 0.x', detail: 'JavaScript fuera del navegador. I/O no bloqueante sobre V8.' },
        { year: '2015', version: 'Node.js 4 (io.js)', detail: 'Se cierra el fork: releases unificadas y ciclo LTS.' },
        { year: '2017', version: 'Node.js 8 LTS', detail: 'async/await estable. Se acaba el callback hell.' },
        { year: '2022', version: 'Node.js 18', detail: 'fetch nativo, test runner integrado y ESM maduro.' },
        { year: '2024', version: 'Node.js 22+', detail: 'require(ESM), watch mode y node:test de fábrica.' }
      ]
    }
  },

  about: {
    eyebrow: 'Conóceme',
    title: 'Sobre mí',
    bioHtml: 'Antes del 2022 mi mundo era el <strong>diseño web</strong>. El salto al código no fue fácil, pero el camino me llevó más lejos de lo que pensaba: del frontend a los servicios que había detrás. Hoy escribo APIs en <strong>Node.js y Spring Boot</strong>, modelo datos en <strong>PostgreSQL y MongoDB</strong> y despliego con Docker y AWS.',
    photo: 'sobre-mi.jpg',
    photoAlt: 'Ignacio trabajando en una reunión remota',
    hudTag: '● LIVE · api/health 200',
    photoBadge: 'Revisando un contrato de API, como casi siempre',
    stats: [
      { value: 15, suffix: '+', label: 'años en la web' },
      { value: 4, label: 'APIs propias en producción' }
    ],
    dualLeft: 'Datos',
    dualRight: 'Producto',
    dualLabel: 'Pienso el sistema y a quien lo va a usar',
    statusTitle: 'Disponible',
    statusSub: 'para nuevos proyectos'
  },

  stack: {
    eyebrow: 'Arsenal',
    title: 'Stack técnico',
    description: 'Con lo que llevo una idea del modelo de datos a un servicio corriendo en producción.',
    cards: [
      {
        icon: 'server', title: 'Backend & APIs', tone: ['var(--accent-1)', 'var(--accent-soft)'],
        items: [
          { label: 'Node.js', primary: true }, { label: 'Express' }, { label: 'NestJS' },
          { label: 'Java 17' }, { label: 'Spring Boot 3' }, { label: 'REST APIs' },
          { label: 'JWT' }, { label: 'Socket.IO' }
        ]
      },
      {
        icon: 'database', title: 'Datos & Persistencia', tone: ['var(--accent-2)', 'var(--accent-mid)'],
        items: [
          { label: 'PostgreSQL', primary: true }, { label: 'MongoDB' }, { label: 'SQL' },
          { label: 'Spring Data JPA' }, { label: 'Mongoose' }, { label: 'Modelado de datos' }
        ]
      },
      {
        icon: 'cloud', title: 'Infra & Calidad', tone: ['var(--accent-mid)', 'var(--accent-1)'],
        items: [
          { label: 'Docker', primary: true }, { label: 'AWS' }, { label: 'CI/CD' },
          { label: 'Git' }, { label: 'Jest' }, { label: 'TDD' }, { label: 'Swagger / OpenAPI' }
        ]
      },
      {
        icon: 'code', title: 'Frontend', tone: ['var(--accent-soft)', 'var(--accent-2)'],
        items: [
          { label: 'Angular', primary: true }, { label: 'TypeScript' }, { label: 'RxJS' },
          { label: 'React' }, { label: 'React Native' }, { label: 'SCSS / CSS' }
        ]
      }
    ]
  },

  projects: {
    eyebrow: 'Proyectos personales',
    title: 'Proyectos',
    description: 'APIs que construí fuera del horario laboral: tiempo real, integraciones con terceros y tests, por el gusto de aprender y de terminar lo que empiezo.',
    items: PROJECTS_FULLSTACK
  },

  experience: {
    eyebrow: 'Trayectoria',
    title: 'Experiencia Profesional',
    description: 'Dieciséis hitos — roles y formación — contados desde el lado del servidor. Haz clic en una tarjeta para ver el detalle completo.',
    jobs: JOBS_FULLSTACK
  },

  techEvolution: { tracks: TRACKS_FULLSTACK },

  footer: {
    headingLead: '¿Necesitas a alguien que se haga cargo',
    headingAccent: 'de punta a punta?',
    description: 'Tomémonos un café o armemos una videollamada. Cuéntame qué están construyendo —y qué se está cayendo— y vemos de forma súper transparente si mi perfil hace match.',
    note: 'Hecho con Angular, Node y bastante café.'
  },

  crossLink: { label: 'Ver mi universo Frontend & UX', route: '/' }
};
