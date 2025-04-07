import { ChangeDetectionStrategy, Component } from '@angular/core';
import {LfButtonComponent} from '../../ui/lf-button/lf-button.component';
import {LfTabComponent} from '../../ui/lf-tab/lf-tab.component';

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
  selectedTab: string = 'Links';

  public onTabPressed(tabName: string): void {
    this.selectedTab = tabName;
  }
}
