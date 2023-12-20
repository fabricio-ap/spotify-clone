import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

// loadChildren: semelhante ao lazy import do React, ele importa sob demanda do usuário

// Primeiro item do array faz um redirect inicial
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./pages/player/player.module').then((m) => m.PlayerModule),
    canActivate: [authGuard],
  },
];
