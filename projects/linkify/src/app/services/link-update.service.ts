import {Injectable, signal, WritableSignal} from '@angular/core';
import {LinkCardInterface} from '../interfaces/lf-link-card.interface';

@Injectable({
  providedIn: 'root'
})
export class LinkUpdateService {
  private _savedLinks: WritableSignal<LinkCardInterface[]> = signal<LinkCardInterface[]>([]);

  public getSavedLinks(): WritableSignal<LinkCardInterface[]> {
    return this._savedLinks;
  }

  public setSavedLinks(links: LinkCardInterface[]): void {
    const validLinks = links.filter(link =>
      link.platform?.trim() && link.link?.trim()
    );
    this._savedLinks.set(validLinks);
  }
}
