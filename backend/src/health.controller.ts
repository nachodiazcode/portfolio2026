import { Controller, Get } from '@nestjs/common';

/** Endpoint público que Render consulta para saber si el servicio está vivo. */
@Controller('health')
export class HealthController {
  @Get()
  check(): { status: string; uptime: number } {
    return { status: 'ok', uptime: Math.round(process.uptime()) };
  }
}
