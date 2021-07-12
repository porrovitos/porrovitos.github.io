import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Fanfic } from '../model/fanfic';
import { Fandom } from '../model/fandom';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient) { }

  public getFanficsByFandom(fandom: Fandom): Observable<Fanfic[]> {
    return this.http.post<Fanfic[]>('http://localhost:97/fanfic/search/fandom', fandom)
  }

  public getFanficsByUser(user: User): Observable<Fanfic[]> {
    return this.http.post<Fanfic[]>('http://localhost:97/fanfic/my_fanfics', user)
  }
}
