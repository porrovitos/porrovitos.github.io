import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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

export class FavoriteService {

  constructor(
    private http: HttpClient) { }

  public getFavoriteByFanficAndUser(id: Number, user: User): Observable<Favorite> {
    return this.http.post<Favorite>('http://localhost:97/favorite/fanfic/' + id, user)
  }

  public getFavoriteByUser(user: User): Observable<Favorite[]> {
    return this.http.post<Favorite[]>('http://localhost:97/favorite/my_favorite_fanfics', user)
  }

  public addToFavorite(favorite: FormGroup) {
    let serializedForm = JSON.parse(JSON.stringify(favorite));
    console.log(serializedForm);

    return this.http.post('http://localhost:97/favorite/add', serializedForm).subscribe(
      res => {

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteFavoriteByFanficAndUser(id: Number, user: User) {
    console.log(user)
    return this.http.delete('http://localhost:97/favorite/fanfic/' + id + '/delete/' + user.id).subscribe(
      res => {

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}