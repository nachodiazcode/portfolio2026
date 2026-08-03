import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createHash, randomUUID, timingSafeEqual } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult extends TokenPair {
  user: { id: string; name: string; email: string; role: Role };
}

const SALT_ROUNDS = 12;
const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResult> {
    const email = dto.email.trim().toLowerCase();

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      // Mensaje genérico: no revelamos qué correos están registrados.
      throw new ForbiddenException('No se pudo completar el registro con esos datos.');
    }

    const owner = (this.config.get<string>('OWNER_EMAIL') ?? '').trim().toLowerCase();
    const user = await this.prisma.user.create({
      data: {
        email,
        name: dto.name.trim(),
        passwordHash: await bcrypt.hash(dto.password, SALT_ROUNDS),
        role: owner && email === owner ? Role.ADMIN : Role.USER,
      },
    });

    return this.issue(user);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Comparamos siempre contra un hash para que el tiempo de respuesta no
    // delate si el correo existe o no.
    const hash = user?.passwordHash ?? '$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidiu';
    const ok = await bcrypt.compare(dto.password, hash);

    if (!user || !ok) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }
    return this.issue(user);
  }

  /** Rota el par de tokens: un refresh usado queda invalidado. */
  async refresh(refreshToken: string): Promise<TokenPair> {
    let payload: { sub: string };
    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Sesión expirada. Inicia sesión de nuevo.');
    }

    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user?.refreshHash) {
      throw new UnauthorizedException('Sesión expirada. Inicia sesión de nuevo.');
    }

    if (!this.refreshMatches(refreshToken, user.refreshHash)) {
      // El token no es el vigente: puede ser uno robado o reutilizado.
      // Cerramos la sesión por completo.
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshHash: null },
      });
      throw new UnauthorizedException('Sesión inválida. Inicia sesión de nuevo.');
    }

    const { accessToken, refreshToken: next } = await this.sign(user);
    await this.storeRefresh(user.id, next);
    return { accessToken, refreshToken: next };
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshHash: null },
    });
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  // ---------- internos ----------

  private async issue(user: User): Promise<AuthResult> {
    const tokens = await this.sign(user);
    await this.storeRefresh(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  private async sign(user: User): Promise<TokenPair> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: ACCESS_TTL,
      }),
      // El `jti` es imprescindible: `iat` solo tiene precisión de segundos, así
      // que dos refresh dentro del mismo segundo producirían un token idéntico
      // y la rotación dejaría de invalidar el anterior.
      this.jwt.signAsync({ sub: user.id, jti: randomUUID() }, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: REFRESH_TTL,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  /**
   * Guardamos solo el hash del refresh: si se filtra la base, no sirve.
   *
   * Usamos SHA-256 y no bcrypt a propósito: bcrypt ignora todo lo que pase de
   * 72 bytes, y dos JWT del mismo usuario comparten ese prefijo (cabecera +
   * inicio del payload), así que cualquier token suyo pasaría la comparación.
   * El token ya tiene entropía criptográfica, no necesita un hash lento.
   */
  private hashRefresh(refreshToken: string): string {
    return createHash('sha256').update(refreshToken).digest('hex');
  }

  private refreshMatches(refreshToken: string, stored: string): boolean {
    const a = Buffer.from(this.hashRefresh(refreshToken), 'hex');
    const b = Buffer.from(stored, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  }

  private async storeRefresh(userId: string, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshHash: this.hashRefresh(refreshToken) },
    });
  }
}
