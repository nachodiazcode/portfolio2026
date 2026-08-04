import { Job } from '../models/job.model';

/**
 * Misma trayectoria real que JOBS (mismos cargos, empresas y fechas),
 * pero con las descripciones reenfocadas hacia backend, datos,
 * arquitectura e infraestructura.
 */
export const JOBS_FULLSTACK: Job[] = [
  { title: "Desarrollador FullStack", company: "Ideatech", dates: "dic. 2025 – feb. 2026", duration: "3 meses", isDesign: false,
    description: "Desarrollo de servicios para plataformas fintech de alto rendimiento: endpoints REST con autenticación y validación de entrada, modelado de datos en PostgreSQL y consumo de esos mismos servicios desde el front. Entregas en ciclos ágiles, coordinando contratos de API con producto y con el equipo cliente.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Angular"], logoUrl: "ideatech-logo.png" },

  { title: "Líder de Desarrollo Full-Stack", company: "FleetMaster", dates: "feb. 2025 – nov. 2025", duration: "10 meses", isDesign: false,
    description: "Liderazgo técnico de una plataforma SaaS de gestión de flotas: definición de la arquitectura de servicios, contratos de API, estándares de código y pipelines de CI/CD sobre Docker y AWS. Mentoría al equipo, revisión de código y decisiones técnicas discutidas directamente con los stakeholders del negocio.",
    tech: ["NestJS", "Node.js", "PostgreSQL", "Docker", "AWS", "CI/CD"] },

  { title: "Desarrollador Front-end", company: "Imagemaker", dates: "sept. 2025 – ene. 2026", duration: "5 meses", isDesign: false,
    description: "Productos de banca digital construidos sobre los servicios core del banco: integración de APIs REST, manejo de flujos asíncronos con RxJS, control de sesión y tokens, y trabajo codo a codo con el equipo backend para afinar contratos, errores y tiempos de respuesta.",
    tech: ["Angular", "RxJS", "REST APIs", "Jest"], logoUrl: "im-cyan.png", projectImageUrl: "santander-apv.png", projectTitle: "Santander APV Móvil" },

  { title: "Desarrollador Front-end", company: "Orbis Data", dates: "jun. 2024 – ago. 2024", duration: "3 meses", isDesign: false,
    description: "Dashboards analíticos alimentados por APIs de datos: normalización de payloads, cacheo en cliente y optimización del render de series grandes para que los reportes de negocio se mantuvieran fluidos con volúmenes altos de información.",
    tech: ["React", "TypeScript", "REST APIs", "D3.js"], logoUrl: "orbisdata.png", projectImageUrl: "orbisdata-project.png", projectTitle: "Bci Confirming" },

  { title: "Diseñador UI/UX", company: "BC Tecnología", dates: "nov. 2022 – oct. 2023", duration: "1 año", isDesign: true,
    description: "Diseño de experiencias para productos bancarios y financieros, definiendo flujos, estados de datos y casos de error junto a los equipos de desarrollo. Una etapa que me dejó el hábito de pensar el sistema desde la persona que lo va a usar.",
    tech: ["Figma", "UX Research", "Design System"], logoUrl: "bctecnologia.png", projectImageUrl: "bctecnologia-consorcio.png", projectTitle: "Consorcio - Proyecto iCambios" },

  { title: "Diseñador UI/UX", company: "BC Tecnología", dates: "jun. 2023 – ago. 2023", duration: "3 meses", isDesign: true,
    description: "Diseño de interfaces y flujos para nuevas funcionalidades, con entrega de prototipos y assets listos para desarrollo.",
    tech: ["Figma", "Prototyping", "UI Design"], logoUrl: "bctecnologia.png" },

  { title: "Analista de software", company: "Grupo MOK", dates: "abr. 2022 – ago. 2022", duration: "5 meses", isDesign: false,
    description: "Análisis funcional y técnico: levantamiento de requerimientos, modelado de procesos y consultas SQL para validar datos y respaldar decisiones. Fui el puente entre negocio y desarrollo para dejar claro el alcance de cada entrega.",
    tech: ["SQL", "UML", "Análisis funcional", "Documentación"], logoUrl: "mok.png", projectImages: ['mok-1.jpg', 'mok-2.png', 'mok-3.png', 'mok-4.png'], projectTitle: "Plataformas Digitales MOK" },

  { title: "Desarrollador Full-Stack", company: "BC Tecnología", dates: "may. 2021 – feb. 2022", duration: "10 meses", isDesign: false,
    description: "Desarrollo full-stack de aplicaciones empresariales en Java: servicios REST, integración con sistemas internos y bases de datos relacionales, y mantenimiento de aplicaciones en producción para clientes corporativos. Aquí aprendí lo que cuesta cambiar un sistema que ya está vivo.",
    tech: ["Java", "Spring", "REST APIs", "SQL", "Angular"], logoUrl: "bctecnologia.png" },

  { title: "Técnico en Programación Computacional", company: "Instituto Profesional San Sebastián", dates: "mar. 2016 – mar. 2020", duration: "4 años 1 mes", isDesign: false,
    description: "Cuatro años donde todo tomó forma: desarrollo de software, bases de datos, testing y metodologías ágiles. Ahí aprendí a modelar datos y a escribir SQL antes de saber qué era una API REST. La práctica profesional la hice en Walmart Chile (2019), mi primer contacto real con un entorno empresarial.",
    tech: ["Java", "SQL", "PHP", "JavaScript", "HTML5", "CSS3", "Angular"],
    logoUrl: "ipss.png", projectImageUrl: "diploma-tecnico.jpg", projectTitle: "Técnico en Programación Computacional — Aprobado con Distinción", projectLabel: "Diploma" },

  { title: "Desarrollador Front-end (React Native)", company: "Walmart Chile", dates: "abr. 2019 – jul. 2019", duration: "4 meses", isDesign: false,
    description: "Aplicaciones móviles para el ecosistema retail de Walmart, integradas a sus servicios backend: consumo de APIs, manejo de estado con Redux y control de errores de red en escenarios de tráfico alto y conectividad irregular.",
    tech: ["React Native", "Redux", "REST APIs", "JavaScript"], logoUrl: "walmart.png", projectImages: ['walmart-1.png', 'walmart-2.png', 'walmart-3.png'], projectTitle: "Proyectos Walmart" },

  { title: "Desarrollador front-end", company: "Cursor S.A.", dates: "dic. 2015 – mar. 2016", duration: "4 meses", isDesign: false,
    description: "Desarrollo de sitios y aplicaciones web con consumo de APIs vía AJAX, trabajo con metodologías ágiles y foco en dejar código mantenible para quien viniera después.",
    tech: ["JavaScript", "AJAX", "HTML", "CSS"], logoUrl: "cursor.png" },

  { title: "Desarrollador de WordPress", company: "BLANCO ESTUDIO", dates: "oct. 2015 – dic. 2015", duration: "3 meses", isDesign: false,
    description: "Desarrollo de temas a medida en PHP sobre WordPress, con consultas a MySQL y optimización de tiempos de carga para clientes corporativos.",
    tech: ["PHP", "WordPress", "MySQL"], logoUrl: "blanco.png" },

  { title: "Desarrollador de WordPress", company: "RAYA", dates: "jul. 2015 – sept. 2015", duration: "3 meses", isDesign: false,
    description: "Construcción de sitios en WordPress: desarrollo en PHP, integración de plugins y ajustes sobre la base de datos del sitio.",
    tech: ["PHP", "WordPress", "MySQL"], logoUrl: "raya.jpg" },

  { title: "Desarrollador Angular", company: "Toteat", dates: "mar. 2015 – jun. 2015", duration: "4 meses", isDesign: false,
    description: "Funcionalidades para una plataforma de gestión gastronómica: vistas conectadas a APIs REST que sostenían la operación diaria de los locales, con foco en que nada se cayera en hora punta.",
    tech: ["Angular", "TypeScript", "REST APIs"], logoUrl: "toteat.jpg" },

  { title: "Diseñador y Desarrollador Web", company: "TMN Consultores", dates: "mar. 2014 – abr. 2014", duration: "2 meses", isDesign: false,
    description: "Sitios corporativos de punta a punta: desde la conceptualización visual hasta la implementación y publicación.",
    tech: ["HTML", "CSS", "WordPress", "PHP"], logoUrl: "tmnconsultores.png" },

  { title: "Práctica profesional", company: "Advante Digital", dates: "ene. 2014 – mar. 2014", duration: "3 meses", isDesign: false,
    description: "Primeros pasos en proyectos reales: apoyo en desarrollo web y maquetación bajo la supervisión del equipo senior.",
    tech: ["HTML", "CSS", "JavaScript"], logoUrl: "advante.png" }
];
