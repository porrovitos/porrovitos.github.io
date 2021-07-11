import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Fanfic } from '../model/fanfic';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient) { }

    public getFanficsByUSer(user : User ) : Observable<Fanfic[]> {
      return this.http.post<Fanfic[]>('http://localhost:97/fanfic/my_fanfics', user)
    }

    
}
