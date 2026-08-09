import { Job } from './job.model';
import { Project } from './project.model';

/** Iconos disponibles para las tarjetas de la sección Stack. */
export type StackIcon = 'code' | 'server' | 'database' | 'cloud' | 'design';

export interface StackCard {
  icon: StackIcon;
  title: string;
  /** Par de colores de la tarjeta; se inyectan como --card-1 / --card-2. */
  tone: [string, string];
  /** El primero puede marcarse como destacado. */
  items: { label: string; primary?: boolean }[];
}

export interface TechVersion {
  year: string;
  version: string;
  detail: string;
}

export interface TechTrack {
  name: string;
  color: string;
  versions: TechVersion[];
}

export interface SectionHeader {
  eyebrow: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  location: string;
  linkedin: string;
  github: string;
}

/**
 * Todo el contenido de una versión del portafolio.
 * La plantilla es única: cambiar de perfil cambia el contenido y el tema.
 * Lo que es un hecho de vida (educación, certificados, testimonios) no vive
 * aquí: es idéntico en ambos universos y se queda en su componente.
 */
export interface Profile {
  id: 'frontend' | 'fullstack' | 'uxui';

  /** Clase de tema aplicada al <body>. Vacío = paleta por defecto. */
  themeClass: string;

  /**
   * Hoja de fuentes propia del perfil, cargada solo al visitarlo. El tema
   * cuaderno usa manuscritas que no aparecen en los otros dos; declararlas
   * aquí evita cobrarle esa descarga a todo el mundo.
   */
  fontsHref?: string;

  meta: { title: string; description: string };

  contact: ContactInfo;

  nav: {
    brandName: string;
    role: string;
    cvHref: string;
    cvLabel: string;
    /** true = descarga un archivo; false = navega a una ruta interna. */
    cvDownload: boolean;
  };

  hero: {
    badge: string;
    firstName: string;
    lastName: string;
    subtitleLead: string;
    /** Palabras que rotan en el hero. La primera se repite al final para cerrar el loop. */
    flipWords: string[];
    bio: string;
    photo: string;
    /** `fragment` y no href: con <base href> un "#id" suelto se resuelve contra
     *  el base y perdería la ruta actual (/fullstack → /). */
    ctaPrimary: { label: string; fragment: string };
    ctaSecondary: { label: string; fragment: string };
    floatingTitle: string;
    floatingSubtitle: string;
  };

  /** Cinta infinita bajo el hero. */
  marquee: string[];

  manifesto: {
    /** Palabra gigante de fondo. */
    watermark: string;
    eyebrow: string;
    quoteLead: string;
    quoteAccent: string;
    quoteTail: string;
    narrative: string;
    principles: { title: string; desc: string }[];
    /** Tarjeta de línea de tiempo destacada del lado izquierdo. */
    timeline: {
      /** Texto de la barra de título estilo macOS. */
      titlebar: string;
      icon: 'angular' | 'node';
      label: string;
      subtitle: string;
      /** Chips del pie de la tarjeta; `badge` dibuja el cuadradito de color. */
      chips: { label: string; badge?: string }[];
      versions: TechVersion[];
    };
  };

  about: {
    eyebrow: string;
    title: string;
    /** Admite HTML simple (<strong>). */
    bioHtml: string;
    photo: string;
    photoAlt: string;
    hudTag: string;
    photoBadge: string;
    stats: { value: number; suffix?: string; label: string }[];
    dualLeft: string;
    dualRight: string;
    dualLabel: string;
    statusTitle: string;
    statusSub: string;
  };

  stack: SectionHeader & { cards: StackCard[] };

  projects: SectionHeader & { items: Project[] };

  experience: SectionHeader & { jobs: Job[] };

  techEvolution: { tracks: TechTrack[] };

  footer: {
    headingLead: string;
    headingAccent: string;
    description: string;
    note: string;
  };

  /** Enlaces a los otros perfiles. Con tres universos, uno solo dejaba
   *  siempre a un tercero inalcanzable desde el pie de página. */
  crossLinks: { label: string; route: string }[];
}
