import {Routes} from '@angular/router';
import {LfNavigationRoutes} from '@utils/lf-navigation-routes.enum';

export const routes: Routes = [
  {
    path: '', redirectTo: `${LfNavigationRoutes.AUTH}/${LfNavigationRoutes.LOGIN}`, pathMatch: 'full'
  },
  {
    path: `${LfNavigationRoutes.AUTH}/${LfNavigationRoutes.LOGIN}`,
    loadComponent: () => import('./features/users/auth/lf-login-view/lf-login-view.component')
  },
  {
    path: `${LfNavigationRoutes.AUTH}/${LfNavigationRoutes.CREATE_ACCOUNT}`,
    loadComponent: () => import('./features/users/auth/lf-create-account-view/lf-create-account-view.component')
  },
  {
    path: LfNavigationRoutes.CUSTOMIZE_LINKS,
    loadComponent: () => import('./features/home/links/links-dashboard/links-edition-page/lf-links-edition-page.component')
  },
  {
    path: LfNavigationRoutes.PROFILE_PREVIEW,
    loadComponent: () => import('./features/home/links/preview/profile-preview/profile-preview.component')
  }
];
