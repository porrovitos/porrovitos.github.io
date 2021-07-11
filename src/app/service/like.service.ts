import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Comment } from '../model/comment';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Favorite } from '../model/favorite';
import { Fanfic } from '../model/fanfic';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class LikeService {

  constructor(
    private http: HttpClient) { }

    public getLikeByFanficAndUser(id : Number, user : User) : Observable<Favorite> {
      return this.http.post<Favorite>('http://localhost:97/like/fanfic/' + id,user)
    }

    public addLike(favorite : FormGroup){
        let serializedForm = JSON.parse(JSON.stringify(favorite));
        console.log(serializedForm);
        
        return this.http.post('http://localhost:97/like/add', serializedForm).subscribe(
          res => {
            alert("Like add!");
          },
          (error : HttpErrorResponse) =>{
            alert(error.message);
          }
        );
      }

      public deleteLikeByFanficAndUser(id : Number,user : User)  {
        console.log(user)
        return this.http.delete('http://localhost:97/like/fanfic/' + id + '/delete/' + user.id).subscribe(
          res => {
            alert("Like delete!");
          },
          (error : HttpErrorResponse) =>{
            alert(error.message);
          }
        );
      }

    
}