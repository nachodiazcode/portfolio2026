import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(1, { message: 'El mensaje no puede estar vacío.' })
  @MaxLength(2000, { message: 'El mensaje no puede superar los 2000 caracteres.' })
  body!: string;

  /// Solo lo usa el dueño para responder a la conversación de un visitante.
  @IsOptional()
  @IsUUID()
  conversationId?: string;
}
