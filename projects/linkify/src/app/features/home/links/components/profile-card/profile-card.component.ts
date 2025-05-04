import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, WritableSignal} from '@angular/core';
import {LinkCardInterface} from '@interfaces/link-card.interface';
import {LinkUpdateService} from '@services/link-update.service';
import {PlatformsList} from '@utils/platforms-list.constant';
import {TitleCasePipe} from '@angular/common';
import {ProfileUpdateService} from '@services/profile-update.service';
import {ProfileDataInterface} from '@interfaces/profile-data.interface';

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
              private _profileUpdateService: ProfileUpdateService,
              private _cd: ChangeDetectorRef) {
    this._listenToLinkService();
    this.profileData = this._profileUpdateService.profile;
  }

  public openLink(url: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }

  private _listenToLinkService(): void {
    effect(() => {
      const links = this._linkUpdateService.getSavedLinks()();
      this._mapSavedLinks(links);
    });
  }

  private _mapSavedLinks(links: LinkCardInterface[]): void {
    this.savedLinks = links.map(link => {
      const platformData = PlatformsList.find(platform => platform.value === link.platform);
      return {
        ...link,
        iconPath: platformData?.iconPath || '',
        color: platformData?.color || ''
      };
    });
    this._cd.markForCheck();
  }
}
