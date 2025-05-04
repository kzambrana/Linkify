import {Injectable, signal, WritableSignal} from '@angular/core';
import { ProfileDataInterface } from '@interfaces/profile-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService {
  private _profile: WritableSignal<ProfileDataInterface> = signal<ProfileDataInterface>({
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  });

  public get profile(): WritableSignal<ProfileDataInterface> {
    return this._profile;
  }

  public updateProfile(profile: Partial<ProfileDataInterface>): void {
    const current = this._profile();
    this._profile.set({ ...current, ...profile });
  }
}
