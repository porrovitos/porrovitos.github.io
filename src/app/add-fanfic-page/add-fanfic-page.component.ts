import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Fandom } from '../model/fandom';
import { FanficService } from 'src/app/service/fanfic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';
import { authEmitters } from '../emmiters/authEmmiter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fanfic-page',
  templateUrl: './add-fanfic-page.component.html',
  styleUrls: ['./add-fanfic-page.component.css']
})
export class AddFanficPageComponent implements OnInit {



  public fandoms: Fandom[];
  public fanficFandom: Fandom;
  public user: User;
  selectedFandom: string = '';
  public orderForm: FormGroup;
  public fanficForm: FormGroup;

  constructor(
    private fanficService: FanficService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
  ) { }


  ngOnInit() {

    let token = this.cookieService.get('token');
    if (token != '') {
      authEmitters.authEmitter.emit(true);
    }
    else (
      this.router.navigate([''])
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

    this.orderForm = this.formBuilder.group({
      fanficName: '',
      fanficDescription: '',
      items: this.formBuilder.array([this.createItem(1)])
    });
  }


  createItem(id: number): FormGroup {
    return this.formBuilder.group({
      partId: id,
      partName: '',
      partText: '',
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  };

  addItem(): void {
    this.items.push(this.createItem(this.items.length + 1));
  }

  removeItem(partId: any): void {
    console.log(partId);
    this.items.removeAt(partId - 1)
  }

  public OnSubmit(formValue: any) {
    console.log(this.selectedFandom)
    let fullFanfic = '';
    for (let i = 0; i < this.items.length; i++) {
      const text = this.items.at(i).get('partText')?.value;
      const name = this.items.at(i).get('partName')?.value;
      fullFanfic += name
      fullFanfic += ":;!"
      fullFanfic += text
      fullFanfic += ":;!"
    }

    this.user = JSON.parse(this.cookieService.get('user'))

    for (let element of this.fandoms) {
      if (element.fandom_name == this.selectedFandom) {
        this.fanficFandom = element
      }
    }
    console.log(this.selectedFandom);
    this.fanficForm = this.formBuilder.group(
      {
        fanfic: fullFanfic,
        fanfic_name: this.orderForm.get('fanficName')?.value,
        user: this.user,
        fandom: this.fanficFandom,
        user_username: this.user.username,
        description: this.orderForm.get('fanficDescription')?.value
      }
    );
    this.fanficService.addFanfics(this.fanficForm.getRawValue())
  }

  selectChangeHandler(event: any) {
    this.selectedFandom = event.target.value;
    console.log(this.selectedFandom);
  }


}