import { Profile } from '../../models/profile.model';
import { CONTACT } from '../contact.data';
import { JOBS } from '../jobs.data';
import { PROJECTS } from '../projects.data';
import { TRACKS_FRONTEND } from '../tech-tracks.data';

/** Portafolio original: Frontend & UX. Ruta "/". */
export const FRONTEND_PROFILE: Profile = {
  id: 'frontend',
  themeClass: '',

  meta: {
    title: 'Ignacio Díaz · Frontend Developer',
    description: 'Portafolio de Ignacio Díaz, desarrollador frontend con background en diseño UX/UI. Angular, TypeScript y React desde Santiago de Chile.'
  },

  contact: CONTACT,

  nav: {
    brandName: 'Ignacio Díaz',
    role: 'Frontend Developer',
    cvHref: '/cv-ignacio-diaz.pdf',
    cvLabel: 'Descargar CV',
    cvDownload: true
  },

  hero: {
    badge: 'Disponible para nuevos proyectos',
    firstName: 'Ignacio',
    lastName: 'Díaz',
    subtitleLead: 'Diseñador que aprendió a programar',
    flipWords: ['Frontend & UX', 'Angular Lover ❤️', 'Design Systems', 'Código + Diseño', 'Frontend & UX'],
    bio: 'Vengo del mundo visual, pero me enamoré del código (aunque al principio me costó sudor y lágrimas). Hoy construyo interfaces buscando el equilibrio exacto: que se vean increíbles, pero sobre todo, que funcionen impecable. No soy un "rockstar", creo en hacer la pega bien hecha y en equipo.',
    photo: 'ignacio.png',
    ctaPrimary: { label: 'Ver trayectoria', href: '#experiencia' },
    ctaSecondary: { label: 'Hablemos', href: '#contacto' },
    floatingTitle: 'UX & Dev',
    floatingSubtitle: 'Diseño y Código'
  },

  marquee: ['Angular', 'UX / UI', 'TypeScript', 'Diseño', 'Código limpio', 'Frontend', 'Figma', 'Trabajo en equipo'],

  manifesto: {
    watermark: 'Angular',
    eyebrow: 'Por qué Angular',
    quoteLead: 'Escribir código se aprende. ',
    quoteAccent: 'Diseñar para las personas',
    quoteTail: ', se siente.',
    narrative: 'Empecé en el diseño y con los años me metí al código. Me quedé con la costumbre de mirar las dos cosas: cómo se ve y cómo funciona. Angular me sirve para mantener eso ordenado cuando el proyecto crece.',
    principles: [
      { title: 'Orden antes que magia', desc: 'Una estructura clara le gana a la solución ingeniosa que nadie entiende después.' },
      { title: 'Sin humo', desc: 'Digo lo que sé y lo que no, y no prometo lo que no puedo cumplir.' },
      { title: 'En equipo', desc: 'Me importa más que el grupo llegue bien que destacar por mi cuenta.' }
    ],
    timeline: {
      titlebar: 'angular — timeline',
      icon: 'angular',
      label: 'Angular',
      subtitle: '2010 → hoy · el framework que me ordenó la vida',
      chips: [{ label: 'TypeScript', badge: 'TS' }, { label: 'RxJS' }, { label: 'Signals' }],
      versions: [
        { year: '2010', version: 'AngularJS', detail: 'El comienzo de todo. MVC en el cliente.' },
        { year: '2016', version: 'Angular 2+', detail: 'Reescritura total. TypeScript, componentes y RxJS.' },
        { year: '2020', version: 'Ivy Engine (v9)', detail: 'Compilador más rápido y bundles más pequeños.' },
        { year: '2023', version: 'Standalone (v15+)', detail: 'Adiós NgModules. Signals y arquitectura simple.' },
        { year: '2026', version: 'Angular 18+', detail: 'Control flow nativo, deferrable views, zoneless.' }
      ]
    }
  },

  about: {
    eyebrow: 'Conóceme',
    title: 'Sobre mí',
    bioHtml: 'Antes del 2022 mi mundo era el <strong>diseño web</strong>. El salto al código no fue fácil, pero con constancia llegué a <strong>BanChile Inversiones</strong>, donde aprendí Angular en un proyecto grande y de verdad. Hoy programo sin perder la mirada de usuario que traigo del diseño.',
    photo: 'sobre-mi.jpg',
    photoAlt: 'Ignacio trabajando en una reunión remota',
    hudTag: '● REC · CAM_01',
    photoBadge: 'En una reunión, como casi siempre',
    stats: [
      { value: 15, suffix: '+', label: 'años en la web' },
      { value: 16, label: 'hitos en la trayectoria' }
    ],
    dualLeft: 'Diseño',
    dualRight: 'Código',
    dualLabel: 'Pienso las dos cosas al mismo tiempo',
    statusTitle: 'Disponible',
    statusSub: 'para nuevos proyectos'
  },

  stack: {
    eyebrow: 'Arsenal',
    title: 'Stack técnico',
    description: 'Las herramientas con las que llevo una idea del boceto a producción.',
    cards: [
      {
        icon: 'code', title: 'Frontend', tone: ['var(--accent-1)', 'var(--accent-soft)'],
        items: [
          { label: 'Angular', primary: true }, { label: 'TypeScript' }, { label: 'RxJS' },
          { label: 'React 19' }, { label: 'Next.js' }, { label: 'SCSS / CSS' }, { label: 'HTML5' }
        ]
      },
      {
        icon: 'server', title: 'Backend & Infra', tone: ['var(--accent-2)', 'var(--accent-mid)'],
        items: [
          { label: 'Node.js', primary: true }, { label: 'NestJS' }, { label: 'PostgreSQL' },
          { label: 'REST APIs' }, { label: 'Docker' }, { label: 'AWS' }, { label: 'CI/CD' }
        ]
      },
      {
        icon: 'design', title: 'Diseño & UX', tone: ['var(--accent-mid)', 'var(--accent-1)'],
        items: [
          { label: 'Figma', primary: true }, { label: 'UI Design' }, { label: 'UX Research' },
          { label: 'Design Systems' }, { label: 'Prototyping' }
        ]
      }
    ]
  },

  projects: {
    eyebrow: 'Proyectos personales',
    title: 'Proyectos',
    description: 'Cosas que construyo fuera del horario laboral, por el gusto de aprender y de terminar lo que empiezo.',
    items: PROJECTS
  },

  experience: {
    eyebrow: 'Trayectoria',
    title: 'Experiencia Profesional',
    description: 'Dieciséis hitos — roles y formación — ordenados del más reciente al más antiguo. Haz clic en una tarjeta para ver el detalle completo.',
    jobs: JOBS
  },

  techEvolution: { tracks: TRACKS_FRONTEND },

  footer: {
    headingLead: '¿Buscando sumar a alguien',
    headingAccent: 'a tu equipo?',
    description: 'Tomémonos un café o armemos una videollamada. Cuéntame qué están construyendo y vemos de forma súper transparente si mi perfil hace match con lo que necesitan.',
    note: 'Hecho con Angular, café y pocas horas de sueño.'
  },

  crossLink: { label: 'Ver mi universo Full-Stack', route: '/fullstack' }
};
