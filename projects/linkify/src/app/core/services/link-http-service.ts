import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LinkCardInterface} from '@interfaces/link-card.interface';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class LinksHttpService {
  private readonly baseUrl = `${environment.apiUrl}/api/profiles`;

  constructor(private http: HttpClient) {}

  public getLinks(profileId: number): Observable<LinkCardInterface[]> {
    return this.http.get<LinkCardInterface[]>(
      `${this.baseUrl}/${profileId}/links`,
    );
  }

  public createLinks(  profileId: number,links: LinkCardInterface[]): Observable<LinkCardInterface> {
    return this.http.post<LinkCardInterface>(
      `${this.baseUrl}/${profileId}/links`,
      links,
    );
  }

  public updateLink(profileId: number, linkId: number, link: LinkCardInterface): Observable<LinkCardInterface> {
    return this.http.put<LinkCardInterface>(
      `${this.baseUrl}/${profileId}/links/${linkId}`,
      link,
    );
  }

  public deleteLink(profileId: number, linkId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${profileId}/links/${linkId}`,
    );
  }
}
