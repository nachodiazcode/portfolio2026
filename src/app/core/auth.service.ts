import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from './api.config';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

const ACCESS_KEY = 'pf_access';
const REFRESH_KEY = 'pf_refresh';
const USER_KEY = 'pf_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Usuario en sesión; null si no ha iniciado sesión. */
  readonly user = signal<AuthUser | null>(this.restoreUser());

  constructor(private readonly http: HttpClient) {}

  get accessToken(): string | null {
    return this.read(ACCESS_KEY);
  }

  get refreshToken(): string | null {
    return this.read(REFRESH_KEY);
  }

  get isOwner(): boolean {
    return this.user()?.role === 'ADMIN';
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/auth/register`, { name, email, password })
      .pipe(tap((res) => this.persist(res)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/auth/login`, { email, password })
      .pipe(tap((res) => this.persist(res)));
  }

  /** Renueva el par de tokens. El backend invalida el refresh anterior. */
  refresh(): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(`${API_URL}/auth/refresh`, {
        refreshToken: this.refreshToken,
      })
      .pipe(
        tap(({ accessToken, refreshToken }) => {
          this.write(ACCESS_KEY, accessToken);
          this.write(REFRESH_KEY, refreshToken);
        }),
      );
  }

  logout(): void {
    const token = this.accessToken;
    if (token) {
      // Best-effort: si falla, igual limpiamos la sesión local.
      this.http
        .post(`${API_URL}/auth/logout`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .subscribe({ error: () => undefined });
    }
    this.clear();
  }

  clear(): void {
    [ACCESS_KEY, REFRESH_KEY, USER_KEY].forEach((k) => {
      try { localStorage.removeItem(k); } catch { /* almacenamiento no disponible */ }
    });
    this.user.set(null);
  }

  // ---------- privados ----------

  private persist(res: AuthResponse): void {
    this.write(ACCESS_KEY, res.accessToken);
    this.write(REFRESH_KEY, res.refreshToken);
    this.write(USER_KEY, JSON.stringify(res.user));
    this.user.set(res.user);
  }

  private restoreUser(): AuthUser | null {
    const raw = this.read(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as AuthUser; } catch { return null; }
  }

  private read(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  private write(key: string, value: string): void {
    try { localStorage.setItem(key, value); } catch { /* modo privado */ }
  }
}
