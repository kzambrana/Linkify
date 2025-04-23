import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedTabService {
  private _selectedTab = new BehaviorSubject<string>('');

  getSelectedTab(): Observable<string> {
    return this._selectedTab.asObservable();
  }

  setSelectedTab(tab: string): void {
    this._selectedTab.next(tab);
  }
}
