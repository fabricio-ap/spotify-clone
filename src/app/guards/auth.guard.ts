import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');

  const loginRedirect = () => {
    router.navigate(['/login']);
    return false;
  };

  if (!token) return loginRedirect();

  return true;
};
