import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {LfProfileDataInterface} from '../interfaces/lf-profile-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  private _profileSubject = new BehaviorSubject<LfProfileDataInterface>({
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  });

  getProfile(): Observable<LfProfileDataInterface> {
    return this._profileSubject.asObservable();
  }

  updateProfile(profile: Partial<LfProfileDataInterface>): void {
    const current = this._profileSubject.getValue();
    this._profileSubject.next({ ...current, ...profile });
  }
}
