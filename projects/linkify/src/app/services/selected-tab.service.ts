import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SelectedTabService {
  private _selectedTab: WritableSignal<string> = signal<string>('');

  public get selectedTab(): WritableSignal<string> {
    return this._selectedTab;
  }

  public setSelectedTab(tab: string): void {
    this._selectedTab.set(tab);
  }
}
