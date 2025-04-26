import {ChangeDetectionStrategy, Component, output} from '@angular/core';
import {LfButtonComponent} from '../../../ui/lf-button/lf-button.component';
import {LfLinkCardComponent} from '../lf-link-card/lf-link-card.component';
import {LfPlatformsList} from '../../../utils/lf-platforms-list.constant';
import {LfDropDownOption} from '../../../interfaces/lf-drop-down-option.interface';
import {LinkCardInterface} from '../../../interfaces/lf-link-card.interface';
import {LinkUpdateService} from '../../../services/link-update.service';

@Component({
  selector: 'lf-customize-links',
  templateUrl: './lf-customize-links.component.html',
  styleUrl: './lf-customize-links.component.scss',
  imports: [
    LfButtonComponent,
    LfLinkCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LfCustomizeLinksComponent {
  public linksList: LinkCardInterface[] = [];
  public emptyListEmitter = output<boolean>();

  public readonly LF_PLATFORMS_LIST: LfDropDownOption[] = LfPlatformsList;

  constructor(private _linkUpdateService: LinkUpdateService) {
  }

  public addLinkCard(): void {
    this.linksList.push({
      id: this._generateId(),
      platform: '',
      link: '',
    });
    this._emitIsEmptyList();
  }

  public deleteLinkCard(deletedCardId: string) {
    this.linksList = this.linksList.filter(link => link.id !== deletedCardId);
    this.saveLinks();
    this._emitIsEmptyList();
  }

  public updateLinkData(updatedLink: LinkCardInterface) {
    const index = this.linksList.findIndex(link => link.id === updatedLink.id);
    if (index > -1) {
      this.linksList[index] = updatedLink;
    }
  }

  public saveLinks(): void {
    const validLinks = this.linksList.filter(linkCard => linkCard.platform !== '' && linkCard.link !== '');
    this._linkUpdateService.updateSavedLinks(validLinks);
  }

  private _generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private _emitIsEmptyList(): void {
    this.linksList.length === 0 ? this.emptyListEmitter.emit(true) : this.emptyListEmitter.emit(false);
  }
}
