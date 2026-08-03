import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/guards/roles.guard';
import { RequestUser } from '../auth/strategies/jwt.strategy';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  /** 20 mensajes por minuto: evita que inunden el chat. */
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Post()
  create(@CurrentUser() user: RequestUser, @Body() dto: CreateMessageDto) {
    return this.messages.create(user, dto);
  }

  @Get()
  thread(@CurrentUser() user: RequestUser, @Query('conversationId') id?: string) {
    return this.messages.thread(user, id);
  }

  /** Bandeja de entrada: solo el dueño del portafolio. */
  @Roles(Role.ADMIN)
  @Get('inbox')
  inbox() {
    return this.messages.inbox();
  }
}
