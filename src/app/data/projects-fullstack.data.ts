import { Project } from '../models/project.model';

/**
 * Los mismos proyectos personales que PROJECTS, ordenados y descritos
 * desde el lado del servidor: modelo de datos, contratos, tiempo real,
 * integraciones y pruebas.
 */
export const PROJECTS_FULLSTACK: Project[] = [
  {
    title: 'Vibratto',
    tagline: 'Backend de una red social musical en tiempo real',
    description: 'API en Node.js con autenticación JWT, modelo de datos en MongoDB para artistas, eventos y comunidades, chat y presencia en vivo con Socket.IO, recomendaciones por similitud semántica usando la API de OpenAI y membresías cobradas vía Mercado Pago.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'OpenAI API', 'Mercado Pago SDK'],
    year: '2025',
    imageUrl: 'vibratto.jpg'
  },
  {
    title: 'Lúpulos App',
    tagline: 'API REST documentada de punta a punta',
    description: 'API para una comunidad cervecera: CRUD con validación, subida de imágenes a Cloudinary, chat en tiempo real, una rutina que elige automáticamente la "Cerveza del Día" y documentación viva en Swagger. Cubierta con tests en Jest.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'Swagger', 'Jest'],
    year: '2025',
    imageUrl: 'lupulos.jpg'
  },
  {
    title: 'FleetMaster API (BrainTech)',
    tagline: 'Servicio de optimización logística en Java',
    description: 'API construida desde cero con Spring Boot 3 y Java 17 para mejorar la eficiencia de rutas y anticipar mantenimientos preventivos. Persistencia con Spring Data JPA sobre PostgreSQL y enfoque TDD desde el primer commit.',
    tech: ['Java 17', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL', 'Maven', 'TDD'],
    year: '2025',
    imageUrl: 'fleetmaster.jpg'
  },
  {
    title: 'LearningMusicPlus',
    tagline: 'El cliente que consume todo lo anterior',
    description: 'Aplicación de cursos musicales en Angular con componentes standalone y lazy loading, pensada como front de referencia para probar mis propias APIs: manejo de sesión, estados de carga y errores servidos desde el backend.',
    tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'Angular Material'],
    year: '2025',
    imageUrl: 'learningmusicplus.jpg'
  }
];
