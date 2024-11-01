import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';

export const soloPublicoGuard: CanActivateFn = (route, state) => {
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router);

  //Si no hay usuario autenticado, solo acceden a ciertas rutas públicas(login/register)
  if (!dataAuthService.usuario) return true;

  //Si el usuario está autenticado, se crea una URL para redirigir a la ruta /estado-cocheras.
  const url = router.parseUrl('/estado-cocheras');
  return new RedirectCommand(url);

};
