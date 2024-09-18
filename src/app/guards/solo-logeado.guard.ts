import { CanActivateFn } from '@angular/router';

export const soloLogeadoGuard: CanActivateFn = (route, state) => {
  return true;
};
