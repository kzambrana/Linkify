import {Routes} from '@angular/router';
import {NavigationRoutes} from '@utils/navigation-routes.enum';

export const routes: Routes = [
  {
    path: '', redirectTo: `${NavigationRoutes.AUTH}/${NavigationRoutes.LOGIN}`, pathMatch: 'full'
  },
  {
    path: `${NavigationRoutes.AUTH}/${NavigationRoutes.LOGIN}`,
    loadComponent: () => import('./features/users/auth/login-view/login-view.component')
  },
  {
    path: `${NavigationRoutes.AUTH}/${NavigationRoutes.CREATE_ACCOUNT}`,
    loadComponent: () => import('./features/users/auth/create-account-view/create-account-view.component')
  },
  {
    path: NavigationRoutes.CUSTOMIZE_LINKS,
    loadComponent: () => import('./features/home/links/links-dashboard/links-edition-page/lf-links-edition-page.component')
  },
  {
    path: NavigationRoutes.PROFILE_PREVIEW,
    loadComponent: () => import('./features/home/links/preview/profile-preview/profile-preview.component')
  }
];
