import {Injectable, signal, WritableSignal} from '@angular/core';
import {LfLinkTabRoutes} from '@utils/lf-link-tab-routes.enum';

@Injectable({providedIn: 'root'})
export class SelectedTabService {
  private _selectedTab: WritableSignal<LfLinkTabRoutes> = signal<LfLinkTabRoutes>(LfLinkTabRoutes.LINKS);

  public get selectedTab(): WritableSignal<LfLinkTabRoutes> {
    return this._selectedTab;
  }

  public setSelectedTab(tab: LfLinkTabRoutes): void {
    this._selectedTab.set(tab);
  }
}
