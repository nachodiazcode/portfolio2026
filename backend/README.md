# Portfolio API

API de autenticación y mensajería del portafolio de Ignacio Díaz.
Construida con **NestJS 10 · Prisma · PostgreSQL · JWT**.

## Qué hace

- Registro e inicio de sesión con contraseñas cifradas (**bcrypt**, 12 rondas).
- **JWT** de acceso (15 min) y de refresco (7 días) con **rotación**: cada refresco
  invalida el anterior, y si se detecta la reutilización de uno ya consumido se
  cierra la sesión completa.
- Chat de contacto: los visitantes escriben y el dueño responde desde su bandeja.
- Rol `ADMIN` automático para el correo definido en `OWNER_EMAIL`.
- Límite de peticiones (`@nestjs/throttler`) y cabeceras de seguridad (`helmet`).

## Endpoints

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/api/auth/register` | público | Crea cuenta y devuelve tokens |
| POST | `/api/auth/login` | público | Inicia sesión |
| POST | `/api/auth/refresh` | público | Rota el par de tokens |
| POST | `/api/auth/logout` | JWT | Cierra la sesión |
| GET | `/api/auth/me` | JWT | Perfil en sesión |
| POST | `/api/messages` | JWT | Envía un mensaje |
| GET | `/api/messages` | JWT | Hilo de la conversación |
| GET | `/api/messages/inbox` | ADMIN | Bandeja de entrada |

## Desarrollo local

```bash
cp .env.example .env      # completa DATABASE_URL y los secretos
npm install
npx prisma db push        # crea las tablas
npm run start:dev         # http://localhost:3000/api
```

Genera secretos únicos con:

```bash
openssl rand -base64 48
```

## Despliegue (Render)

1. Crea un **PostgreSQL** en Render y copia su *Internal Database URL*.
2. Crea un **Web Service** apuntando a este repositorio, con `backend` como
   *Root Directory*.
   - Build: `npm install && npm run build && npx prisma migrate deploy`
   - Start: `npm run start:prod`
3. Variables de entorno: `DATABASE_URL`, `JWT_ACCESS_SECRET`,
   `JWT_REFRESH_SECRET`, `OWNER_EMAIL`, y `CORS_ORIGINS` con la URL del sitio.
4. Copia la URL pública del servicio en `src/app/core/api.config.ts` del frontend.

> El primer usuario que se registre con el correo de `OWNER_EMAIL` recibe el rol
> `ADMIN` y ve la bandeja con todas las conversaciones.
