import {ChangeDetectionStrategy, Component, effect, ElementRef, output, ViewChild, WritableSignal} from '@angular/core';
import {LfButtonComponent} from '@ui/lf-button/lf-button.component';
import {LfPlatformsList} from '@utils/lf-platforms-list.constant';
import {LfDropDownOption} from '@interfaces/lf-drop-down-option.interface';
import {LinkCardInterface} from '@interfaces/lf-link-card.interface';
import {LinkUpdateService} from '@services/link-update.service';
import {timer} from 'rxjs';
import {LinkCardComponent} from '../../components/link-card/link-card.component';

@Component({
  selector: 'lf-links-edition',
  templateUrl: './links-edition.component.html',
  styleUrl: './links-edition.component.scss',
  imports: [
    LfButtonComponent,
    LinkCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LinksEditionComponent {
  @ViewChild('linksContainer') public linksContainerRef!: ElementRef<HTMLDivElement>;

  public linksList:  WritableSignal<LinkCardInterface[]>
  public emptyListEmitter = output<boolean>();

  readonly LF_PLATFORMS_LIST: LfDropDownOption[] = LfPlatformsList;

  constructor(private _linkUpdateService: LinkUpdateService) {
    this.linksList = this._linkUpdateService.getSavedLinks();

    effect(() => {this.linksList()});
  }

  public addLinkCard(): void {
    const updatedList = [...this.linksList(), {
      id: this._generateId(),
      platform: '',
      link: '',
    }];
    this._linkUpdateService.setSavedLinks(updatedList);
    this._emitIsEmptyList();
    this._scrollToBottom();
  }

  public deleteLinkCard(deletedCardId: string) {
    const updatedList = this.linksList().filter(link => link.id !== deletedCardId);
    this._linkUpdateService.setSavedLinks(updatedList);
    this._emitIsEmptyList();
  }

  public updateLinkData(updatedLink: LinkCardInterface) {
    const updatedList = this.linksList().map(link =>
      link.id === updatedLink.id ? updatedLink : link
    );
    this._linkUpdateService.setSavedLinks(updatedList);
  }

  public saveLinks(): void {
    const validLinks = this.linksList().filter(linkCard => linkCard.platform !== '' && linkCard.link !== '');
    this._linkUpdateService.setSavedLinks(validLinks);
  }

  private _generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private _emitIsEmptyList(): void {
    this.linksList.length === 0 ? this.emptyListEmitter.emit(true) : this.emptyListEmitter.emit(false);
  }

  private _scrollToBottom(): void {
    if (!this.linksContainerRef?.nativeElement) return;
    timer(20).subscribe(() => {
      this.linksContainerRef.nativeElement.scrollTo({
        top: this.linksContainerRef.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
}
