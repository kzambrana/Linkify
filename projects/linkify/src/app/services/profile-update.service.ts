import {Injectable, signal, WritableSignal} from '@angular/core';
import { LfProfileDataInterface } from '../interfaces/lf-profile-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  private _profile: WritableSignal<LfProfileDataInterface> = signal<LfProfileDataInterface>({
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  });

  public get profile(): WritableSignal<LfProfileDataInterface> {
    return this._profile;
  }

  public updateProfile(profile: LfProfileDataInterface): void {
    this._profile.set(profile);
  }
}
