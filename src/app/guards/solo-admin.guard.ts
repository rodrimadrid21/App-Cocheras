import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { DataAuthService } from '../services/data-auth.service';
import { inject } from '@angular/core';

export const soloAdminGuard: CanActivateFn = (route, state) => {
  
  const dataAuthService = inject(DataAuthService);
  const router = inject(Router)
  if (dataAuthService.usuario?.isAdmin) return true;
  const url = router.parseUrl("/estado-cocheras");
  return new RedirectCommand(url);
  
  
};
