import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'links',
    loadChildren: () =>
      import('./features/links/links.module').then((m) => m.LinksModule),
  },
  {
    path: 'preview',
    loadChildren: () =>
      import('./features/preview/preview.module').then((m) => m.PreviewModule),
  },
];
