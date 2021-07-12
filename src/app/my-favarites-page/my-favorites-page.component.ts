import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/model/favorite';
import { User } from 'src/app/model/user';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { FavoriteService } from '../service/favorite.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fanfic } from '../model/fanfic';
import { authEmitters } from '../emmiters/authEmmiter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-favarites-page',
  templateUrl: './my-favorites-page.component.html',
  styleUrls: ['./my-favorites-page.component.css']
})
export class MyFavaritesPageComponent implements OnInit {

  public user: User;
  public favorites: Favorite[];
  public favoriteForm: FormGroup;
  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private favoriteService: FavoriteService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    let token = this.cookieService.get('token');
    if (token != '') {
      authEmitters.authEmitter.emit(true)
    }
    else (
      this.router.navigate([''])
    )

    this.user = JSON.parse(this.cookieService.get('user'))
    this.favoriteService.getFavoriteByUser(this.user).subscribe(
      (response: Favorite[]) => {
        this.favorites = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public removeFromFavorite(fanfic: Fanfic) {
    this.user = JSON.parse(this.cookieService.get('user'));
    this.favoriteForm = this.formBuilder.group({
      user: this.user,
      fanfic: fanfic
    });
    this.favoriteService.deleteFavoriteByFanficAndUser(fanfic.id, this.user)
  }

}
