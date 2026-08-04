export interface CvRole {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
  tech: string[];
}

export interface CvData {
  name: string;
  role: string;
  summary: string;
  skills: { title: string; items: string }[];
  roles: CvRole[];
  earlier: { label: string; detail: string }[];
  projects: { title: string; description: string; tech: string }[];
  education: { title: string; institution: string; dates: string }[];
  languages: { name: string; level: string }[];
}

export const CV_FULLSTACK: CvData = {
  name: 'Ignacio Díaz',
  role: 'Desarrollador Full-Stack · Node.js · Java · Angular',

  summary:
    'Desarrollador full-stack con más de 10 años en la industria digital y experiencia liderando técnicamente un equipo. Diseño y construyo APIs REST en Node.js y Java (Spring Boot), modelo datos en PostgreSQL y MongoDB, y despliego con Docker, AWS y pipelines de CI/CD. Mi background en diseño UX me hace obsesivo con los contratos claros y la documentación: una API que otro equipo puede usar sin preguntarme nada.',

  skills: [
    { title: 'Backend & APIs', items: 'Node.js · Express · NestJS · Java 17 · Spring Boot 3 · REST · JWT · Socket.IO' },
    { title: 'Datos', items: 'PostgreSQL · MongoDB · SQL · Spring Data JPA · Mongoose · Modelado de datos' },
    { title: 'Infra & Calidad', items: 'Docker · AWS · CI/CD · Git · Jest · TDD · Swagger / OpenAPI' },
    { title: 'Frontend', items: 'Angular · TypeScript · RxJS · React · React Native · SCSS' },
    { title: 'Otros', items: 'Metodologías ágiles · Liderazgo técnico · Mentoría · Figma · UX Research' }
  ],

  roles: [
    {
      title: 'Desarrollador Full-Stack',
      company: 'Ideatech',
      dates: 'dic. 2025 – feb. 2026',
      bullets: [
        'Desarrollo de servicios REST para plataformas fintech, con autenticación, validación de entrada y manejo explícito de errores.',
        'Modelado de datos en PostgreSQL y consumo de los mismos servicios desde el front en Angular.',
        'Coordinación de contratos de API con producto y con el equipo cliente en ciclos ágiles.'
      ],
      tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Angular']
    },
    {
      title: 'Líder de Desarrollo Full-Stack',
      company: 'FleetMaster',
      dates: 'feb. 2025 – nov. 2025',
      bullets: [
        'Liderazgo técnico de una plataforma SaaS de gestión de flotas: arquitectura de servicios, contratos de API y estándares de código.',
        'Implementación de pipelines de CI/CD sobre Docker y AWS para que los despliegues dejaran de ser un evento.',
        'Mentoría y revisión de código al equipo, además de interlocución técnica directa con los stakeholders del negocio.'
      ],
      tech: ['NestJS', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD']
    },
    {
      title: 'Desarrollador Front-end',
      company: 'Imagemaker · Banca digital',
      dates: 'sept. 2025 – ene. 2026',
      bullets: [
        'Integración de APIs REST de servicios core bancarios, con control de sesión, tokens y flujos asíncronos en RxJS.',
        'Trabajo directo con el equipo backend para afinar contratos, códigos de error y tiempos de respuesta.'
      ],
      tech: ['Angular', 'RxJS', 'REST APIs', 'Jest']
    },
    {
      title: 'Desarrollador Front-end',
      company: 'Orbis Data',
      dates: 'jun. 2024 – ago. 2024',
      bullets: [
        'Dashboards analíticos alimentados por APIs de datos: normalización de payloads y cacheo en cliente.',
        'Optimización del render de series grandes para mantener fluidos los reportes de negocio.'
      ],
      tech: ['React', 'TypeScript', 'D3.js']
    },
    {
      title: 'Analista de software',
      company: 'Grupo MOK',
      dates: 'abr. 2022 – ago. 2022',
      bullets: [
        'Levantamiento de requerimientos, modelado de procesos y consultas SQL para validar datos y respaldar decisiones.',
        'Puente entre negocio y desarrollo para dejar explícito el alcance de cada entrega.'
      ],
      tech: ['SQL', 'UML', 'Análisis funcional']
    },
    {
      title: 'Desarrollador Full-Stack',
      company: 'BC Tecnología',
      dates: 'may. 2021 – feb. 2022',
      bullets: [
        'Desarrollo de aplicaciones empresariales en Java: servicios REST e integración con sistemas internos y bases relacionales.',
        'Mantenimiento y evolución de sistemas ya en producción para clientes corporativos.'
      ],
      tech: ['Java', 'Spring', 'SQL', 'Angular']
    },
    {
      title: 'Desarrollador Front-end (React Native)',
      company: 'Walmart Chile',
      dates: 'abr. 2019 – jul. 2019',
      bullets: [
        'Apps móviles del ecosistema retail integradas a los servicios backend de Walmart.',
        'Manejo de estado con Redux y control de errores de red en escenarios de tráfico alto y conectividad irregular.'
      ],
      tech: ['React Native', 'Redux', 'REST APIs']
    }
  ],

  earlier: [
    { label: 'Diseñador UI/UX · BC Tecnología', detail: 'nov. 2022 – oct. 2023 · Productos bancarios y financieros: flujos, estados de datos y design system.' },
    { label: 'Desarrollador Angular · Toteat', detail: 'mar. 2015 – jun. 2015 · Vistas conectadas a APIs REST para gestión gastronómica.' },
    { label: 'Desarrollador web · Cursor S.A., BLANCO ESTUDIO, RAYA, TMN, Advante', detail: '2014 – 2016 · Desarrollo en PHP/WordPress con MySQL y front-end con JavaScript.' }
  ],

  projects: [
    {
      title: 'Vibratto · Red social musical',
      description: 'API en Node.js con JWT, modelo de datos en MongoDB, chat y presencia en vivo con Socket.IO, recomendaciones por similitud semántica con OpenAI y cobros vía Mercado Pago.',
      tech: 'Node.js · Express · MongoDB · Socket.IO · OpenAI API'
    },
    {
      title: 'Lúpulos App · API REST documentada',
      description: 'CRUD con validación, subida de imágenes a Cloudinary, chat en tiempo real y rutina automática de "Cerveza del Día". Documentada en Swagger y cubierta con tests en Jest.',
      tech: 'Node.js · Express · MongoDB · Swagger · Jest'
    },
    {
      title: 'FleetMaster API · Optimización logística',
      description: 'API construida desde cero con enfoque TDD para eficiencia de rutas y mantenimientos preventivos, con persistencia sobre PostgreSQL.',
      tech: 'Java 17 · Spring Boot 3 · Spring Data JPA · PostgreSQL'
    }
  ],

  // TODO: completar con tu formación real. Si queda vacío, la sección no se muestra.
  education: [],

  // TODO: completar niveles de idioma. Si queda vacío, la sección no se muestra.
  languages: []
};
