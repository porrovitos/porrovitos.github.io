import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService : CookieService) { }

    public createNewUser(newUser : FormGroup) {
      let serializedForm = JSON.parse(JSON.stringify(newUser));
      
      return this.http.post('http://localhost:97/registration', serializedForm).subscribe(
        res => {
          this.router.navigate(['/login'])
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }

    public loginUser(newUser : FormGroup) {
      let serializedForm = JSON.parse(JSON.stringify(newUser));

 
      return this.http.post<Article>('http://localhost:97/login', serializedForm)
      .subscribe(
        res => {
          console.log();
          let user = JSON.stringify(res.user)
          this.cookieService.set( 'token',  res.jwt);
          this.cookieService.set('user',user)
          this.cookieService.set('username',res.user.username)
          this.router.navigate([''])
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
      );
    }
    
  
  }
  interface Article {
    jwt: string;
    user : User;
}
