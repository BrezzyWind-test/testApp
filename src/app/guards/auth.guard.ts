import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  if (!inject(AuthService).isLoggedIn()) {
    inject(Router).navigate(['login']);
    return false;
  } else return true;
};
