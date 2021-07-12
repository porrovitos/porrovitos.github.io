import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { authEmitters } from '../emmiters/authEmmiter';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  public user: User;

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    if(token != ''){
      authEmitters.authEmitter.emit(true)
    }
    else(
      this.router.navigate([''])
    )
    
    this.user = JSON.parse(this.cookieService.get('user'))
  }

}
