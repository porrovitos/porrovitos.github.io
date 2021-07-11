import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Fanfic } from '../model/fanfic';
import { Fandom } from '../model/fandom';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FanficService {

  constructor(
    private http: HttpClient,
    private router: Router,) { }

    public getFanfics() : Observable<Fanfic[]> {
      return this.http.get<Fanfic[]>('http://localhost:97/fanfic')
    }

    public addFanfics(fanfic : FormGroup){
      let serializedForm = JSON.parse(JSON.stringify(fanfic));
      return this.http.post('http://localhost:97/fanfic/add', serializedForm).subscribe(
        res => {
          this.router.navigate([''])
          alert("Fanfic saved!");
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }

    public readFanfics(id : Number) : Observable<Fanfic> {
      return this.http.get<Fanfic>('http://localhost:97/fanfic/id/' + id)
    }

    public getFandoms() : Observable<Fandom[]> {
      return this.http.get<Fandom[]>('http://localhost:97/fandom')
    }

    public deleteFanfic(id : Number)  {
      return this.http.delete('http://localhost:97/fanfic/delete/' + id).subscribe(
        res => {
          alert("Fanfic delete!");
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }

}
