import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LfHeaderComponent} from '../../../layout/lf-header/lf-header.component';
import LfCustomizeLinksComponent from '../../links/lf-customize-links/lf-customize-links.component';
import {LfMobilePreviewComponent} from '../../preview/lf-mobile-preview/lf-mobile-preview.component';
import {SelectedTabService} from '../../../services/selected-tab.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LfProfileEditionComponent} from '../../profile/lf-profile-edition/lf-profile-edition.component';

@Component({
  selector: 'lf-main-links-customize',
  imports: [
    LfHeaderComponent,
    LfCustomizeLinksComponent,
    LfMobilePreviewComponent,
    LfCustomizeLinksComponent,
    LfProfileEditionComponent
  ],
  templateUrl: './lf-main-links-customize.component.html',
  styleUrl: './lf-main-links-customize.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfMainLinksCustomizeComponent {
  selectedTab: string = '';

  constructor(private _selectedTabService: SelectedTabService) {
    this._selectedTabService.setSelectedTab('profile');
    this._listenToSelectedTab();
  }

  private _listenToSelectedTab(): void {
    this._selectedTabService.getSelectedTab()
      .pipe(takeUntilDestroyed())
      .subscribe(selectedTab => this.selectedTab = selectedTab);
  }
}
