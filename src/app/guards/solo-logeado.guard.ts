// solo-logeado.guard.ts
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { inject } from '@angular/core';

export const soloLogeadoGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  // Permitir acceso solo si el usuario está logueado
  if (dataAuthService.usuario?.token) return true;  
  const url = router.parseUrl('/login');  // Redirigir a login si no está logueado
  return new RedirectCommand(url);
};

