import {ChangeDetectionStrategy, Component, effect, ElementRef, OnInit, output, ViewChild, WritableSignal} from '@angular/core';
import {ButtonComponent} from '@ui/button/button.component';
import {PlatformsList} from '@utils/platforms-list.constant';
import {DropDownOption} from '@interfaces/drop-down-option.interface';
import {LinkCardInterface} from '@interfaces/link-card.interface';
import {LinkUpdateService} from '@services/link-update.service';
import {timer} from 'rxjs';
import {LinkCardComponent} from '../../components/link-card/link-card.component';
import {LinksHttpService} from 'src/app/core/services/link-http-service';

@Component({
  selector: 'lf-links-edition',
  templateUrl: './links-edition.component.html',
  styleUrl: './links-edition.component.scss',
  imports: [ButtonComponent, LinkCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LinksEditionComponent implements OnInit {
  @ViewChild('linksContainer') public linksContainerRef!: ElementRef<HTMLDivElement>;

  public linksList: WritableSignal<LinkCardInterface[]>;
  public emptyListEmitter = output<boolean>();

  readonly LF_PLATFORMS_LIST: DropDownOption[] = PlatformsList;

  constructor(private _linkUpdateService: LinkUpdateService,
              private _linksHttpService: LinksHttpService) {
    this.linksList = this._linkUpdateService.getSavedLinks();
    effect(() => this.linksList());
  }

  ngOnInit(): void {
      this._linksHttpService.getLinks(2).subscribe(links => this._linkUpdateService.setSavedLinks(links));
  }

  public addLinkCard(): void {
    const updatedList = [
      ...this.linksList(),
      {
        id: this._generateId(),
        platform: '',
        link: '',
      },
    ];
    this._linkUpdateService.setSavedLinks(updatedList);
    this._emitIsEmptyList();
    this._scrollToBottom();
  }

  public deleteLinkCard(deletedCardId: number) {
    const updatedList = this.linksList().filter((link) => link.id !== deletedCardId);
    this._linkUpdateService.setSavedLinks(updatedList);

    this._linksHttpService.deleteLink(2, deletedCardId).subscribe();
    this._emitIsEmptyList();
  }

  public updateLinkData(updatedLink: LinkCardInterface) {
    const updatedList = this.linksList().map((link) => link.id === updatedLink.id ? updatedLink : link);
    this._linkUpdateService.setSavedLinks(updatedList);
  }

  public saveLinks(): void {
    let validLinks = this.linksList().filter((linkCard) => linkCard.platform !== '' && linkCard.link !== '');
    validLinks = this._mapSavedLinks(validLinks);

    this._linksHttpService.createLinks(2, validLinks).subscribe();
    this._linkUpdateService.setSavedLinks(validLinks);
  }

  private _mapSavedLinks(links: LinkCardInterface[]): LinkCardInterface[] {
    return links.map((link) => {
      const platformData = PlatformsList.find(
        (platform) => platform.value === link.platform,
      );
      return {
        ...link,
        iconPath: platformData?.iconPath || '',
        color: platformData?.color || '',
      };
    });
  }

  private _generateId(): number {
    return Math.random();
  }

  private _emitIsEmptyList(): void {
    this.linksList.length === 0? this.emptyListEmitter.emit(true) : this.emptyListEmitter.emit(false);
  }

  private _scrollToBottom(): void {
    if (!this.linksContainerRef?.nativeElement) return;
    timer(20).subscribe(() => {
      this.linksContainerRef.nativeElement.scrollTo({
        top: this.linksContainerRef.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    });
  }
}
