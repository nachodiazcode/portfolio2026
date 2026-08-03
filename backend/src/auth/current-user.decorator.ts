import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from './strategies/jwt.strategy';

/** Inyecta el usuario autenticado en un parámetro del controlador. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): RequestUser =>
    ctx.switchToHttp().getRequest().user,
);
