import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, WritableSignal} from '@angular/core';
import {LinkCardInterface} from '@interfaces/link-card.interface';
import {LinkUpdateService} from '@services/link-update.service';
import {TitleCasePipe} from '@angular/common';
import {ProfileUpdateService} from '@services/profile-update.service';
import {ProfileDataInterface} from '@interfaces/profile-data.interface';
import {ProfileHttpService} from 'src/app/core/services/profile-http.service';
import {LinksHttpService} from 'src/app/core/services/link-http-service';

@Component({
  selector: 'lf-profile-card',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent {
  public savedLinks: LinkCardInterface[] = [];
  public profileData: WritableSignal<ProfileDataInterface>;

  constructor(private _linkUpdateService: LinkUpdateService,
              private _linksHttpService: LinksHttpService,
              private _profileHttpService: ProfileHttpService,
              private _profileUpdateService: ProfileUpdateService,
              private _cd: ChangeDetectorRef) {
    this._listenToLinkService();
    this.profileData = this._profileUpdateService.profile;
  }

  public openLink(url: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }

  ngOnInit() {
     this._profileHttpService.getProfile(2).subscribe({
       next: (profile) => {
         this._profileUpdateService.updateProfile(profile);
       },
       error: (error) => {
         console.error('Error getting profile:', error);
       },
     });

     this._linksHttpService.getLinks(2).subscribe({
       next: (links) => {
         this._linkUpdateService.setSavedLinks(links);
       },
       error: (error) => {
         console.error('Error getting saved links:', error);
       },
     });
  }

  private _listenToLinkService(): void {
    effect(() => {
      this.savedLinks = this._linkUpdateService.getSavedLinks()();
      this._cd.markForCheck();
    });
  }
}
