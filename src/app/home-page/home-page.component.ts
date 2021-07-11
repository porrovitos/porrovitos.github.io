import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Fanfic } from 'src/app/model/fanfic';
import { FanficService } from 'src/app/service/fanfic.service';
import { authEmitters } from '../emmiters/authEmmiter';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public fanfics: Fanfic[];
  constructor(
    private fanficService: FanficService,
    private cookieService : CookieService){}

  ngOnInit(){
    let token = this.cookieService.get('token');
    if(token != ''){
      authEmitters.authEmitter.emit(true)
    }
    else(
      authEmitters.authEmitter.emit(false)
    )
    
    this.getFanfics();
  }

    public getFanfics() : void{
      this.fanficService.getFanfics().subscribe(
      (response: Fanfic[]) =>{
        this.fanfics = response;
        
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
      );
    }

    sortByLikes() : void{
      this.fanfics.sort(function (a, b) {
        return b.count_likes - a.count_likes;
        });
    }
}
