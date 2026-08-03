/**
 * URL base de la API de autenticación y mensajes.
 *
 * En local apunta al backend de `backend/` (npm run start:dev).
 * En producción usa la URL pública del servicio desplegado; cámbiala por la
 * tuya cuando publiques el backend (Render, Railway, Fly.io…).
 */
const PROD_API = 'https://portfolio-api-nachodiazcode.onrender.com/api';
const DEV_API = 'http://localhost:3000/api';

export const API_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? DEV_API
    : PROD_API;
