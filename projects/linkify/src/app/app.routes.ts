import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/lf-login-view/lf-login-view.component')
  },
  {
    path: 'auth/create-account',
    loadComponent: () => import('./features/auth/lf-create-account-view/lf-create-account-view.component')
  }
];
