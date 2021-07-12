import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService) { }


  public createNewUser(newUser: FormGroup): Observable<any> {
    let serializedForm = JSON.parse(JSON.stringify(newUser));
    return this.http.post('http://localhost:97/registration', serializedForm)
  }

  public loginUser(newUser: FormGroup): Observable<Article> {
    let serializedForm = JSON.parse(JSON.stringify(newUser));
    return this.http.post<Article>('http://localhost:97/login', serializedForm)
  }
}
interface Article {
  jwt: string;
  user: User;
}
