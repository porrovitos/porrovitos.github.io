import { Component, OnInit } from '@angular/core';
import { FanficService } from 'src/app/service/fanfic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Fanfic } from 'src/app/model/fanfic';
import { User } from 'src/app/model/user';
import { ProfileService } from '../service/profile.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-fanfic-page',
  templateUrl: './my-fanfic-page.component.html',
  styleUrls: ['./my-fanfic-page.component.css']
})
export class MyFanficPageComponent implements OnInit {

  public user: User;
  public fanfics: Fanfic[];

  constructor(
    private profileService: ProfileService,
    private cookieService : CookieService,
    private fanficService: FanficService
  ) { }

  ngOnInit(): void {
    this.user= JSON.parse(this.cookieService.get('user'))
    this.profileService.getFanficsByUSer(this.user).subscribe(
      (response: Fanfic[]) =>{
        this.fanfics = response;
        console.log(this.fanfics[0].user);
        
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
      );
  }

  public deleteFanfic(fanficId : Number){
    this.fanficService.deleteFanfic(fanficId);
  }

}
