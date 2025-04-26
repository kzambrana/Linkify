import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {LfButtonComponent} from '../../ui/lf-button/lf-button.component';
import {LfTabComponent} from '../../ui/lf-tab/lf-tab.component';
import {SelectedTabService} from '../../services/selected-tab.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  selectedTab: WritableSignal<string>;

  constructor(private _selectedTabService: SelectedTabService) {
    this.selectedTab = this._selectedTabService.selectedTab;
  }

  public onTabPressed(tabName: string): void {
    this._selectedTabService.setSelectedTab(tabName);
  }
}
