import { Profile } from '../../models/profile.model';
import { CONTACT } from '../contact.data';
import { JOBS } from '../jobs.data';
import { PROJECTS } from '../projects.data';
import { TRACKS_FRONTEND } from '../tech-tracks.data';

/**
 * Tercer portafolio: UX/UI. Ruta "/uxui".
 *
 * Misma trayectoria que los otros dos, contada desde el ángulo del diseño:
 * aquí el hilo no es el framework sino el oficio de entender al usuario y
 * dibujar antes de construir. El tema "cuaderno" acompaña esa idea — el sitio
 * se presenta como el boceto previo a la interfaz, no como el producto final.
 */
export const UXUI_PROFILE: Profile = {
  id: 'uxui',
  themeClass: 'theme-sketch',

  // Manuscritas del tema, cargadas solo al visitar este perfil.
  fontsHref: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Architects+Daughter&display=swap',

  meta: {
    title: 'Ignacio Díaz · Diseñador UX/UI',
    description: 'Portafolio UX/UI de Ignacio Díaz: investigación, prototipado y sistemas de diseño. Doce años diseñando interfaces para banca, retail y SaaS desde Santiago de Chile.'
  },

  contact: CONTACT,

  nav: {
    brandName: 'Ignacio Díaz',
    role: 'Diseñador UX/UI',
    cvHref: 'cv-ignacio-diaz.pdf',
    cvLabel: 'Descargar CV',
    cvDownload: true
  },

  hero: {
    badge: 'Disponible para nuevos proyectos',
    firstName: 'Ignacio',
    lastName: 'Díaz',
    subtitleLead: 'Diseñador que aprendió a programar',
    flipWords: ['UX / UI', 'Research', 'Design Systems', 'Prototipado', 'UX / UI'],
    bio: 'Empecé dibujando interfaces y terminé programándolas. Esa vuelta me dejó una manía útil: no propongo una pantalla sin saber cómo se va a construir, ni escribo un componente sin preguntarme a quién le va a tocar usarlo. Todo esto empieza en un cuaderno.',
    photo: 'ignacio.jpg',
    ctaPrimary: { label: 'Ver trayectoria', fragment: 'experiencia' },
    ctaSecondary: { label: 'Hablemos', fragment: 'contacto' },
    floatingTitle: 'Research → UI',
    floatingSubtitle: 'Del boceto al producto'
  },

  marquee: ['UX Research', 'Figma', 'Design Systems', 'Prototipado', 'Wireframes', 'Accesibilidad', 'Usabilidad', 'Diseño de interacción'],

  manifesto: {
    watermark: 'Boceto',
    eyebrow: 'Cómo trabajo',
    quoteLead: 'Un buen diseño no se nota. ',
    quoteAccent: 'Se usa sin pensar',
    quoteTail: ', y eso cuesta.',
    narrative: 'Antes de abrir Figma dibujo. Cajas feas, flechas torcidas, notas al margen. Sirve para descubrir temprano que una idea no se sostiene, cuando corregirla todavía cuesta una hoja y no dos semanas de desarrollo. Después viene el prototipo, y recién al final el pixel.',
    principles: [
      { title: 'Primero el problema', desc: 'Antes de dibujar una pantalla quiero entender qué necesita resolver la persona que la va a usar.' },
      { title: 'Dibujar es pensar barato', desc: 'Un boceto malo cuesta una hoja. Un desarrollo mal enfocado cuesta semanas.' },
      { title: 'Diseñar para quien lo construye', desc: 'Como también programo, entrego diseños que se pueden armar de verdad: estados, bordes y casos raros incluidos.' }
    ],
    timeline: {
      titlebar: 'proceso — de la idea a la interfaz',
      icon: 'angular',
      label: 'Mi proceso',
      subtitle: 'Cinco etapas · del cuaderno al producto en producción',
      chips: [{ label: 'Figma', badge: 'UI' }, { label: 'Research' }, { label: 'Prototipos' }],
      versions: [
        { year: '01', version: 'Entender', detail: 'Conversar, observar y anotar. Qué problema hay y a quién le duele.' },
        { year: '02', version: 'Bocetar', detail: 'Papel y lápiz. Muchas ideas malas rápido para llegar antes a una buena.' },
        { year: '03', version: 'Prototipar', detail: 'Wireframes y flujos navegables en Figma para probar sin construir.' },
        { year: '04', version: 'Validar', detail: 'Ponerlo frente a usuarios reales y aceptar que uno se equivocó.' },
        { year: '05', version: 'Construir', detail: 'Diseño entregado con sus estados y su sistema, listo para código.' }
      ]
    }
  },

  about: {
    eyebrow: 'Conóceme',
    title: 'Sobre mí',
    bioHtml: 'Mi carrera empezó en el <strong>diseño web</strong> y ahí estuvo su primera década. En <strong>BC Tecnología</strong> trabajé como <strong>Diseñador UI/UX</strong> y en <strong>BanChile Inversiones</strong> me tocó el otro lado: llevar diseño a producción en un proyecto grande. Ese cruce es lo que ofrezco — diseño que entiende sus propias restricciones técnicas.',
    photo: 'sobre-mi.jpg',
    photoAlt: 'Ignacio trabajando en una reunión remota',
    hudTag: '✎ boceto · hoja 01',
    photoBadge: 'En una reunión, como casi siempre',
    stats: [
      { value: 15, suffix: '+', label: 'años en la web' },
      { value: 12, suffix: '+', label: 'años diseñando interfaces' }
    ],
    dualLeft: 'Diseño',
    dualRight: 'Código',
    dualLabel: 'Pienso las dos cosas al mismo tiempo',
    statusTitle: 'Disponible',
    statusSub: 'para nuevos proyectos'
  },

  stack: {
    eyebrow: 'Herramientas',
    title: 'Caja de herramientas',
    description: 'Con qué trabajo en cada etapa, desde la primera conversación hasta la entrega a desarrollo.',
    cards: [
      {
        icon: 'design', title: 'Diseño & UI', tone: ['var(--accent-1)', 'var(--accent-soft)'],
        items: [
          { label: 'Figma', primary: true }, { label: 'Design Systems' }, { label: 'Prototipado' },
          { label: 'Wireframing' }, { label: 'Diseño de interacción' }, { label: 'Accesibilidad' }
        ]
      },
      {
        icon: 'code', title: 'Research', tone: ['var(--accent-2)', 'var(--accent-mid)'],
        items: [
          { label: 'Entrevistas', primary: true }, { label: 'Tests de usabilidad' }, { label: 'Arquitectura de información' },
          { label: 'Flujos de usuario' }, { label: 'Benchmarking' }
        ]
      },
      {
        icon: 'server', title: 'Puente con desarrollo', tone: ['var(--accent-mid)', 'var(--accent-1)'],
        items: [
          { label: 'Angular', primary: true }, { label: 'HTML5 / CSS' }, { label: 'TypeScript' },
          { label: 'Tokens de diseño' }, { label: 'Handoff' }
        ]
      }
    ]
  },

  projects: {
    eyebrow: 'Proyectos personales',
    title: 'Proyectos',
    description: 'Productos que diseñé y construí de punta a punta: aquí las decisiones de interfaz y las de código las tomé yo, sin nadie a quien echarle la culpa.',
    items: PROJECTS
  },

  experience: {
    eyebrow: 'Trayectoria',
    title: 'Experiencia Profesional',
    description: 'Quince roles ordenados del más reciente al más antiguo. Haz clic en una tarjeta para ver el detalle completo.',
    jobs: JOBS
  },

  techEvolution: { tracks: TRACKS_FRONTEND },

  footer: {
    headingLead: '¿Tienen un producto',
    headingAccent: 'que necesita cariño?',
    description: 'Cuéntame qué están construyendo y en qué etapa va. Si puedo aportar te lo digo, y si creo que necesitan otro perfil también — prefiero ser honesto antes que sumarme a algo donde no voy a mover la aguja.',
    note: 'Diseñado en papel antes que en pantalla.'
  },

  crossLinks: [
    { label: 'Ver mi universo Frontend & UX', route: '/' },
    { label: 'Ver mi universo Full-Stack', route: '/fullstack' }
  ]
};
