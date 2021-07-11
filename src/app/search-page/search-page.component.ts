import { Component, OnInit } from '@angular/core';
import { Fandom } from '../model/fandom';
import { Fanfic } from 'src/app/model/fanfic';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FanficService } from 'src/app/service/fanfic.service';
import { SearchService } from 'src/app/service/search.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public fandoms: Fandom[];
  public fanfics: Fanfic[];
  public orderForm: FormGroup;
  public fanficFandom : Fandom;
  selectedFandom: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private fanficService: FanficService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.fanficService.getFandoms().subscribe(
      (response: Fandom[]) =>{
        this.fandoms = response;
        console.log(this.fandoms);
        this.selectedFandom = this.fandoms[0].fandom_name
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
      );
  }
    selectChangeHandler (event: any) {
      this.selectedFandom = event.target.value;
    }

    searchFanfics(){
      for (let element of this.fandoms) {
        if(element.fandom_name == this.selectedFandom){
          this.fanficFandom = element
        }
      }
      this.searchService.getFanficsByFandom(this.fanficFandom).subscribe(
        (response: Fanfic[]) =>{
          this.fanfics = response;
        },
        (error : HttpErrorResponse) =>{
          alert(error.message);
        }
        );
    }
}
