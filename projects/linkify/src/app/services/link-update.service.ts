import {Injectable, signal, WritableSignal} from '@angular/core';
import {LinkCardInterface} from '@interfaces/link-card.interface';

@Injectable({
  providedIn: 'root'
})
export class LinkUpdateService {
  private _savedLinks: WritableSignal<LinkCardInterface[]> = signal<LinkCardInterface[]>([]);

  public getSavedLinks(): WritableSignal<LinkCardInterface[]> {
    return this._savedLinks;
  }

  public setSavedLinks(links: LinkCardInterface[]): void {
    this._savedLinks.set([...links]);
  }
}
