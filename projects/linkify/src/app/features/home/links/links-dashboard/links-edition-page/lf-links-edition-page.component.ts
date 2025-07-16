import {ChangeDetectionStrategy, Component, WritableSignal} from '@angular/core';
import {SelectedTabService} from '@services/selected-tab.service';
import {LinksHeader} from '../../components/links-header/links-header.component';
import {ProfileCardComponent} from '../../components/profile-card/profile-card.component';
import LinksEditionComponent from '../links-edition/links-edition.component';
import {ProfileEditionComponent} from '../profile-edition/profile-edition.component';

@Component({
  selector: 'lf-links-edition-page',
  imports: [
    LinksHeader,
    ProfileCardComponent,
    LinksEditionComponent,
    ProfileEditionComponent
  ],
  templateUrl: './lf-links-edition-page.component.html',
  styleUrl: './lf-links-edition-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfLinksEditionPageComponent {
  public selectedTab: WritableSignal<string>;

  constructor(private _selectedTabService: SelectedTabService) {
    this.selectedTab = this._selectedTabService.selectedTab;
  }
}
