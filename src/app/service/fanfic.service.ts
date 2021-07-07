import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Fanfic } from '../model/fanfic';
import { environment } from 'src/environments/environment';
import { Fandom } from '../model/fandom';
@Injectable({
  providedIn: 'root'
})
export class FanficService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

    public getFanfics() : Observable<Fanfic[]> {
      return this.http.get<Fanfic[]>('http://localhost:97/fanfic')
    }

    public addFanfics(fanfic : Fanfic) : Observable<Fanfic> {
      return this.http.post<Fanfic>('${this.apiServiceUrl}/fanfic/add', fanfic)
    }

    public readFanfics(id : Number) : Observable<Fanfic> {
      return this.http.get<Fanfic>('http://localhost:97/fanfic/id/' + id)
    }

    public getFandoms() : Observable<Fandom[]> {
      return this.http.get<Fandom[]>('http://localhost:97/fandom')
    }
    
}
