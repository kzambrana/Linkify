import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {ButtonComponent} from '@ui/button/button.component';
import {TabComponent} from '@ui/tab/tab.component';
import {SelectedTabService} from '@services/selected-tab.service';
import {Router} from '@angular/router';
import {NavigationRoutes} from '@utils/navigation-routes.enum';
import {LinkTabRoutes} from '@utils/link-tab-routes.enum';

@Component({
  selector: 'lf-links-header',
  templateUrl: './links-header.component.html',
  styleUrl: './links-header.component.scss',
  imports: [
    ButtonComponent,
    TabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksHeader {
  public selectedTab: WritableSignal<string>;
  public readonly LfLinkTabRoutes = LinkTabRoutes;

  constructor(private _selectedTabService: SelectedTabService,
              private _router: Router) {
    this.selectedTab = this._selectedTabService.selectedTab;
  }

  public onTabPressed(tabName: LinkTabRoutes): void {
    this._selectedTabService.setSelectedTab(tabName);
  }

  public navigateToPreview(): void {
    this._router.navigate([NavigationRoutes.PROFILE_PREVIEW]);
  }
}
