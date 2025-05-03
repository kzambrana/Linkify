import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {LfButtonComponent} from '@ui/lf-button/lf-button.component';
import {LfTabComponent} from '@ui/lf-tab/lf-tab.component';
import {SelectedTabService} from '@services/selected-tab.service';
import {Router} from '@angular/router';
import {LfNavigationRoutes} from '@utils/lf-navigation-routes.enum';
import {LfLinkTabRoutes} from '@utils/lf-link-tab-routes.enum';

@Component({
  selector: 'lf-header',
  templateUrl: './lf-header.component.html',
  styleUrl: './lf-header.component.scss',
  imports: [
    LfButtonComponent,
    LfTabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfHeaderComponent {
  public selectedTab: WritableSignal<string>;
  public readonly LfLinkTabRoutes = LfLinkTabRoutes;

  constructor(private _selectedTabService: SelectedTabService,
              private _router: Router) {
    this.selectedTab = this._selectedTabService.selectedTab;
  }

  public onTabPressed(tabName: LfLinkTabRoutes): void {
    this._selectedTabService.setSelectedTab(tabName);
  }

  public navigateToPreview(): void {
    this._router.navigate([LfNavigationRoutes.PROFILE_PREVIEW]);
  }
}
