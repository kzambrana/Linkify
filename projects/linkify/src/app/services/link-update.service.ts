import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LinkCardInterface} from '../interfaces/lf-link-card.interface';

@Injectable({
  providedIn: 'root'
})
export class LinkUpdateService {
  private _savedLinksSubject = new BehaviorSubject<LinkCardInterface[]>([]);

  getSavedLinks(): Observable<LinkCardInterface[]> {
    return this._savedLinksSubject.asObservable();
  }

  updateSavedLinks(links: LinkCardInterface[]): void {
    const validLinks = links.filter(link =>
      link.platform?.trim() && link.link?.trim()
    );
    this._savedLinksSubject.next(validLinks);
  }
}
