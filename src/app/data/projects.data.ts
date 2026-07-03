import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    title: 'Vibratto',
    tagline: 'Red social musical en tiempo real',
    description: 'Red social que conecta artistas, eventos y comunidades. Backend con recomendaciones musicales por similitud semántica vía OpenAI, chat en vivo con Socket.IO y gestión de membresías automatizada con Mercado Pago.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'OpenAI API', 'Mercado Pago SDK', 'JWT'],
    year: '2025'
  },
  {
    title: 'Lúpulos App',
    tagline: 'API para amantes de la cerveza artesanal',
    description: 'API RESTful para una comunidad que descubre cervezas, comparte opiniones, sube imágenes y chatea en tiempo real. Incluye lógica automática para elegir la "Cerveza del Día" y documentación completa con Swagger.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'Swagger', 'Jest'],
    year: '2025'
  },
  {
    title: 'LearningMusicPlus',
    tagline: 'Aprende piano, guitarra y bajo a tu ritmo',
    description: 'Aplicación de cursos musicales con componentes standalone y lazy loading. Modo claro/oscuro, seguimiento de progreso y un theme adaptable construido con variables CSS.',
    tech: ['Angular', 'Tailwind CSS', 'Angular Material', 'SCSS'],
    year: '2025'
  },
  {
    title: 'FleetMaster API (BrainTech)',
    tagline: 'Optimización logística de flotas',
    description: 'API construida desde cero para mejorar la eficiencia de rutas, facilitar mantenimientos preventivos e identificar oportunidades de optimización operativa, con enfoque TDD desde el primer commit.',
    tech: ['Java 17', 'Spring Boot 3', 'Maven', 'PostgreSQL', 'Spring Data JPA'],
    year: '2025'
  }
];
