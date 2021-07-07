import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private authService: AuthService,
    private router: Router,
    private cookieService : CookieService) { }

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    if(token != ''){
      this.router.navigate([''])
    }
    
    this.form = this.formBuilder.group(
      {
        username : '',
        email : '',
        password : ''
      }
    );
  }


  register() : void {
    console.log(this.form)
    this.authService.createNewUser(this.form.getRawValue())
  }
}
