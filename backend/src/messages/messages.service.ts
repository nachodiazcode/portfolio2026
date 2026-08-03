import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RequestUser } from '../auth/strategies/jwt.strategy';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Publica un mensaje.
   * · Visitante: siempre escribe en su propia conversación.
   * · Dueño (ADMIN): responde en la conversación que indique `conversationId`.
   */
  async create(user: RequestUser, dto: CreateMessageDto) {
    const isOwner = user.role === Role.ADMIN;

    if (isOwner && !dto.conversationId) {
      throw new ForbiddenException('Indica la conversación a la que respondes.');
    }
    const authorId = isOwner ? dto.conversationId! : user.id;

    if (isOwner) {
      const exists = await this.prisma.user.findUnique({ where: { id: authorId } });
      if (!exists) throw new NotFoundException('La conversación no existe.');
    }

    return this.prisma.message.create({
      data: { body: dto.body.trim(), fromOwner: isOwner, authorId },
      select: { id: true, body: true, fromOwner: true, createdAt: true },
    });
  }

  /** Hilo de una conversación. Un visitante solo alcanza la suya. */
  async thread(user: RequestUser, conversationId?: string) {
    const isOwner = user.role === Role.ADMIN;
    const targetId = isOwner && conversationId ? conversationId : user.id;

    if (!isOwner && conversationId && conversationId !== user.id) {
      throw new ForbiddenException('No puedes ver conversaciones de otras personas.');
    }

    const messages = await this.prisma.message.findMany({
      where: { authorId: targetId },
      orderBy: { createdAt: 'asc' },
      select: { id: true, body: true, fromOwner: true, createdAt: true, readAt: true },
    });

    // Al abrir el hilo, el dueño marca como leídos los mensajes del visitante.
    if (isOwner) {
      await this.prisma.message.updateMany({
        where: { authorId: targetId, fromOwner: false, readAt: null },
        data: { readAt: new Date() },
      });
    }

    return messages;
  }

  /** Bandeja del dueño: una entrada por visitante, con su último mensaje. */
  async inbox() {
    const conversations = await this.prisma.user.findMany({
      where: { role: Role.USER, messages: { some: {} } },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { body: true, createdAt: true, fromOwner: true },
        },
        _count: {
          select: { messages: { where: { fromOwner: false, readAt: null } } },
        },
      },
    });

    return conversations
      .map((c) => ({
        conversationId: c.id,
        name: c.name,
        email: c.email,
        lastMessage: c.messages[0]?.body ?? '',
        lastAt: c.messages[0]?.createdAt ?? c.createdAt,
        unread: c._count.messages,
      }))
      .sort((a, b) => b.lastAt.getTime() - a.lastAt.getTime());
  }
}
