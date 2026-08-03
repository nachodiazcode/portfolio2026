import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { API_URL } from './api.config';
import { AuthService } from './auth.service';

/** Evita disparar varios refresh a la vez cuando caducan peticiones en paralelo. */
let refreshing = false;
const refreshed$ = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Las rutas de sesión no llevan (ni deben llevar) el access token.
  const isAuthRoute = /\/auth\/(login|register|refresh)$/.test(req.url);
  const token = auth.accessToken;

  const authorized =
    token && !isAuthRoute
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(authorized).pipe(
    catchError((err: HttpErrorResponse) => {
      const recoverable =
        err.status === 401 &&
        !isAuthRoute &&
        req.url.startsWith(API_URL) &&
        !!auth.refreshToken;

      if (!recoverable) return throwError(() => err);

      // Ya hay un refresh en curso: esperamos su resultado y reintentamos.
      if (refreshing) {
        return refreshed$.pipe(
          filter((t): t is string => t !== null),
          take(1),
          switchMap((fresh) =>
            next(req.clone({ setHeaders: { Authorization: `Bearer ${fresh}` } })),
          ),
        );
      }

      refreshing = true;
      refreshed$.next(null);

      return auth.refresh().pipe(
        switchMap(({ accessToken }) => {
          refreshing = false;
          refreshed$.next(accessToken);
          return next(req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }));
        }),
        catchError((refreshErr) => {
          refreshing = false;
          auth.clear(); // el refresh ya no sirve: la sesión terminó
          return throwError(() => refreshErr);
        }),
      );
    }),
  );
};
