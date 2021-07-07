import { Component, OnInit } from '@angular/core';
import { Fanfic } from 'src/app/model/fanfic';
import { FanficService } from 'src/app/service/fanfic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-fanfic-page',
  templateUrl: './read-fanfic-page.component.html',
  styleUrls: ['./read-fanfic-page.component.css']
})
export class ReadFanficPageComponent implements OnInit {

  public fanfic: Fanfic;
  public fanficToReadArray: String[];
  public id: number;
  
  constructor(private fanficService: FanficService, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.setFanfic();
  }

    public setFanfic() : void{
      this.fanficService.readFanfics(this.id).subscribe(
      (response: Fanfic) =>{
        this.fanfic = response
        this.fanficToReadArray = response.fanfic.split(":;!")

      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
      );
    }
}
