import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { authEmitters } from '../emmiters/authEmmiter';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  showError = false;

  form: FormGroup
  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    if (token != '') {
      authEmitters.authEmitter.emit(true)
      this.router.navigate([''])
    }
    this.form = this.formBuild.group(
      {
        username: '',
        password: ''
      }
    );
  }
  login(): void {
    this.authService.loginUser(this.form.getRawValue()).subscribe(
      res => {
        console.log();
        let user = JSON.stringify(res.user)
        this.cookieService.set('token', res.jwt);
        this.cookieService.set('user', user)
        this.cookieService.set('username', res.user.username)
        this.router.navigate([''])
      },
      (error: HttpErrorResponse) => {
        this.showError = true
      }
    );
  }
}
