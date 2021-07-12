import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Comment } from '../model/comment';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(
    private http: HttpClient) { }

  public getCommentsByFanfic(id: Number): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:97/comment/fanfic/' + id)
  }

  public addComment(comment: FormGroup) {
    let serializedForm = JSON.parse(JSON.stringify(comment));
    console.log(serializedForm);

    return this.http.post('http://localhost:97/comment/add', serializedForm).subscribe(
      res => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}