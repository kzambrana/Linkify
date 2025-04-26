import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LinkCardInterface} from '../../../interfaces/lf-link-card.interface';
import {LinkUpdateService} from '../../../services/link-update.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LfPlatformsList} from '../../../utils/lf-platforms-list.constant';
import {TitleCasePipe} from '@angular/common';
import {ProfileUpdateService} from '../../../services/profile-update.service';
import {LfProfileDataInterface} from '../../../interfaces/lf-profile-data.interface';

@Component({
  selector: 'lf-profile-preview',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './lf-profile-preview.component.html',
  styleUrl: './lf-profile-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LfProfilePreviewComponent {
  savedLinks: LinkCardInterface[] = [];
  profileData: LfProfileDataInterface = {
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  };

  constructor(private _linkUpdateService: LinkUpdateService,
              private _profileUpdateService: ProfileUpdateService,
              private _cd: ChangeDetectorRef) {
    this._listenToLinkService();
    this._listenToProfileService();
  }

  public openLink(url: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }

  private _listenToLinkService(): void {
    this._linkUpdateService.getSavedLinks()
      .pipe(takeUntilDestroyed())
      .subscribe(links => this._mapSavedLinks(links));
  }

  private _listenToProfileService(): void {
    this._profileUpdateService.getProfile()
      .pipe(takeUntilDestroyed())
      .subscribe(profile => {
        this.profileData = profile;
        this._cd.markForCheck();
      });
  }

  private _mapSavedLinks(links: LinkCardInterface[]): void {
    this.savedLinks = links.map(link => {
      const platformData = LfPlatformsList.find(platform => platform.value === link.platform);
      return {
        ...link,
        iconPath: platformData?.iconPath || '',
        color: platformData?.color || ''
      };
    });
    this._cd.markForCheck();
  }
}
