import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ProfileDataInterface} from "@interfaces/profile-data.interface";
import {Observable} from "rxjs";
import {environment} from "src/environments/environments";

@Injectable({ providedIn: 'root' })
export class ProfileHttpService {
  private readonly baseUrl = `${environment.apiUrl}/api/profiles`;

  constructor(private http: HttpClient) {}

  public getAllProfiles(): Observable<ProfileDataInterface[]> {
    return this.http.get<ProfileDataInterface[]>(this.baseUrl);
  }

  public getProfile(id: number): Observable<ProfileDataInterface> {
    return this.http.get<ProfileDataInterface>(`${this.baseUrl}/${id}`);
  }

  public createProfile(profile: Partial<ProfileDataInterface>): Observable<ProfileDataInterface> {
    return this.http.post<ProfileDataInterface>(this.baseUrl, profile);
  }

  public updateProfile(id: number, profile: ProfileDataInterface): Observable<ProfileDataInterface> {
    return this.http.put<ProfileDataInterface>(`${this.baseUrl}/${id}`, profile);
  }

  public deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
