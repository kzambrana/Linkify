import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';
import {Router} from '@angular/router';
import {LfProfilePreviewComponent} from '../../preview/lf-profile-preview/lf-profile-preview.component';
import {LfNavigationRoutes} from '../../../utils/lf-navigation-routes.enum';

@Component({
  selector: 'lf-lf-main-profile-preview',
  imports: [
    LfButtonComponent,
    LfProfilePreviewComponent
  ],
  templateUrl: './lf-main-profile-preview.component.html',
  styleUrl: './lf-main-profile-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfMainProfilePreviewComponent {

  constructor(private _router: Router) {
  }

  public navigateToEditor(): void {
    this._router.navigate([LfNavigationRoutes.CUSTOMIZE_LINKS]);
  }

  public shareLink(): void {
    console.log('shareLink');
  }
}
