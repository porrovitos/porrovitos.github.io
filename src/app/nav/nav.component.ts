import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emmiters/emmiters';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService : CookieService) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  logout(): void {
    this.cookieService.delete( 'token');
    this.cookieService.delete('user')
    this.router.navigate([''])
    this.authenticated = false
  }

}
