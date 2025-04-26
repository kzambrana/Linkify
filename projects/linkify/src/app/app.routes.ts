import {Routes} from '@angular/router';
import {LfNavigationRoutes} from './utils/lf-navigation-routes.enum';

export const routes: Routes = [
  {
    path: '', redirectTo: `${LfNavigationRoutes.AUTH}/${LfNavigationRoutes.LOGIN}`, pathMatch: 'full'
  },
  {
    path: `${LfNavigationRoutes.AUTH}/${LfNavigationRoutes.LOGIN}`,
    loadComponent: () => import('./features/auth/lf-login-view/lf-login-view.component')
  },
  {
    path: `${LfNavigationRoutes.AUTH}/${LfNavigationRoutes.CREATE_ACCOUNT}`,
    loadComponent: () => import('./features/auth/lf-create-account-view/lf-create-account-view.component')
  },
  {
    path: LfNavigationRoutes.CUSTOMIZE_LINKS,
    loadComponent: () => import('./features/views/lf-main-links-customize/lf-main-links-customize.component')
  },
  {
    path: LfNavigationRoutes.PROFILE_PREVIEW,
    loadComponent: () => import('./features/views/lf-main-profile-preview/lf-main-profile-preview.component')
  }
];
