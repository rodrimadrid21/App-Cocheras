// solo-logeado.guard.ts
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { inject } from '@angular/core';

export const soloLogeadoGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  // Si el usuario está logueado (hay token válido), permitir acceso
  if (dataAuthService.usuario?.token) return true;

  // Si no está logueado, redirigir a login
  const url = router.parseUrl('/login');
  return new RedirectCommand(url);
};


