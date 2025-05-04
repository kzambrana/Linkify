import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from '@ui/button/button.component';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@utils/navigation-routes.enum';
import {ProfileCardComponent} from '../../components/profile-card/profile-card.component';

@Component({
  selector: 'lf-profile-preview',
  imports: [
    ButtonComponent,
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
    this._router.navigate([NavigationRoutes.CUSTOMIZE_LINKS]);
  }

  public shareLink(): void {
    console.log('shareLink');
  }
}
