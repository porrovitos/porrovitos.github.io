import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'; 
import { Emitters } from '../emmiters/emmiters';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form : FormGroup
  constructor(
    private formBuild : FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService : CookieService
  ) { }

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    if(token != ''){
      Emitters.authEmitter.emit(true)
      this.router.navigate([''])
    }
    this.form = this.formBuild.group(
      {
        username : '',
        password : ''
      }
    );
  }
  login() : void{
    this.authService.loginUser(this.form.getRawValue())
  }
}
