import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const spotifyService = inject(SpotifyService);

  const token = localStorage.getItem('access_token');

  const unAuth = () => {
    localStorage.clear();
    router.navigate(['/login']);
    return false;
  };

  if (!token) return unAuth();

  const user = await spotifyService.initUser();
  if (!user) return unAuth();

  return true;
};
