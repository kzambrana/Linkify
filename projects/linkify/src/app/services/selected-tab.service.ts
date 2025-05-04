import {Injectable, signal, WritableSignal} from '@angular/core';
import {LinkTabRoutes} from '@utils/link-tab-routes.enum';

@Injectable({providedIn: 'root'})
export class SelectedTabService {
  private _selectedTab: WritableSignal<LinkTabRoutes> = signal<LinkTabRoutes>(LinkTabRoutes.LINKS);

  public get selectedTab(): WritableSignal<LinkTabRoutes> {
    return this._selectedTab;
  }

  public setSelectedTab(tab: LinkTabRoutes): void {
    this._selectedTab.set(tab);
  }
}
