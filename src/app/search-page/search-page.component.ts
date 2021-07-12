import { Component, OnInit } from '@angular/core';
import { Fandom } from '../model/fandom';
import { Fanfic } from 'src/app/model/fanfic';
import { FormGroup, FormControl } from '@angular/forms';
import { FanficService } from 'src/app/service/fanfic.service';
import { UserService } from 'src/app/service/user.service';
import { ProfileService } from 'src/app/service/profile.service';
import { SearchService } from 'src/app/service/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { authEmitters } from '../emmiters/authEmmiter';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/user';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  myControl = new FormControl();
  searchType = 'fandom'
  public fandoms: Fandom[];
  public fanfics: Fanfic[];
  public users: User[];
  public user: User;
  public username: string;
  public usersString: string[] = [];
  public orderForm: FormGroup;
  public fanficFandom: Fandom;
  selectedFandom: string = '';
  filteredOptions: Observable<string[]>;

  constructor(
    private profileService: ProfileService,
    private fanficService: FanficService,
    private searchService: SearchService,
    private cookieService: CookieService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    if (token != '') {
      authEmitters.authEmitter.emit(true)
    }
    else (
      authEmitters.authEmitter.emit(false)
    )



    this.fanficService.getFandoms().subscribe(
      (response: Fandom[]) => {
        this.fandoms = response;
        console.log(this.fandoms);
        this.selectedFandom = this.fandoms[0].fandom_name
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  selectChangeHandler(event: any) {
    this.selectedFandom = event.target.value;
  }

  searchFanfics() {
    for (let element of this.fandoms) {
      if (element.fandom_name == this.selectedFandom) {
        this.fanficFandom = element
      }
    }
    this.searchService.getFanficsByFandom(this.fanficFandom).subscribe(
      (response: Fanfic[]) => {
        this.fanfics = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchFanficsByUser() {
    this.userService.getUser(this.username).subscribe(
      (response: User) => {
        this.user = response;
        this.searchService.getFanficsByUser(this.user).subscribe(
          (response: Fanfic[]) => {
            this.fanfics = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  findByFandom() {
    this.searchType = 'fandom'
  }

  findByUser() {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = []
        this.usersString = []
        this.users = response;
        console.log(this.users);
        this.users.forEach(user => {
          this.usersString.push(user.username)
        });
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.searchType = 'user'
  }


  private _filter(value: string): string[] {
    console.log(value)
    this.username = value;
    const filterValue = value.toLowerCase();
    return this.usersString.filter(user => user.toLowerCase().includes(filterValue));
  }

}
