import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfButtonComponent} from '@ui/lf-button/lf-button.component';
import {Router} from '@angular/router';
import {LfNavigationRoutes} from '@utils/lf-navigation-routes.enum';
import {ProfileCardComponent} from '../../components/profile-card/profile-card.component';

@Component({
  selector: 'lf-profile-preview',
  imports: [
    LfButtonComponent,
    ProfileCardComponent
  ],
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProfilePreviewComponent {

  constructor(private _router: Router) {
  }

  public navigateToEditor(): void {
    this._router.navigate([LfNavigationRoutes.CUSTOMIZE_LINKS]);
  }

  public shareLink(): void {
    console.log('shareLink');
  }
}
