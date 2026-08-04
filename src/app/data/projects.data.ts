import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    title: 'Vibratto',
    tagline: 'Red social musical en tiempo real',
    description: '🎸 Conecta artistas, bandas y fans en un mismo lugar: 💬 chat en vivo, 📅 eventos y comunidades que vibran en tiempo real. 🤖 La IA recomienda música afín a tu estilo y 💳 las membresías se cobran solas con Mercado Pago.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'OpenAI API', 'Mercado Pago SDK', 'JWT'],
    year: '2025',
    imageUrl: 'vibratto.jpg'
  },
  {
    title: 'Lúpulos App',
    tagline: 'API para amantes de la cerveza artesanal',
    description: '🍺 Comunidad para descubrir cervezas artesanales, ⭐ compartir opiniones con fotos y 💬 chatear en tiempo real. Con lógica automática para elegir la "Cerveza del Día" 🏆 y documentación completa con Swagger.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT', 'Cloudinary', 'Swagger', 'Jest'],
    year: '2025',
    imageUrl: 'lupulos.jpg'
  },
  {
    title: 'LearningMusicPlus',
    tagline: 'Aprende piano, guitarra y bajo a tu ritmo',
    description: '🎵 Cursos de alta calidad para dominar tu instrumento a tu propio ritmo, 📚 con seguimiento de progreso para no perder el hilo. ✨ Modo claro y oscuro 🌙☀️ y un theme adaptable construido con variables CSS.',
    tech: ['Angular', 'Tailwind CSS', 'Angular Material', 'SCSS'],
    year: '2025',
    imageUrl: 'learningmusicplus.jpg'
  },
  {
    title: 'FleetMaster API (BrainTech)',
    tagline: 'Optimización logística de flotas',
    description: '🚚 Controla tu flota desde cualquier lugar: ✅ rutas más eficientes, 🔧 mantenimientos preventivos a tiempo y 📈 oportunidades de optimización operativa. Construida desde cero con 🧪 TDD desde el primer commit.',
    tech: ['Java 17', 'Spring Boot 3', 'Maven', 'PostgreSQL', 'Spring Data JPA'],
    year: '2025',
    imageUrl: 'fleetmaster.jpg'
  }
];
