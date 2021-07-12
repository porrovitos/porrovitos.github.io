import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Fandom } from '../model/fandom';
import { FanficService } from 'src/app/service/fanfic.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/model/user';
import { Fanfic } from '../model/fanfic';
import { ActivatedRoute } from '@angular/router';
import { authEmitters } from '../emmiters/authEmmiter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-fanfic-page',
  templateUrl: './edit-fanfic-page.component.html',
  styleUrls: ['./edit-fanfic-page.component.css']
})
export class EditFanficPageComponent implements OnInit {


  public fanfic: Fanfic;
  public fandoms: Fandom[];
  public fanficFandom: Fandom;
  public user: User;
  selectedFandom: string = '';
  public loadFanficForm: FormGroup;
  public fanficForm: FormGroup;
  public fanficArray: String[];
  public id: number;

  constructor(
    private fanficService: FanficService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router) { }


  ngOnInit() {

    let token = this.cookieService.get('token');
    if (token != '') {
      authEmitters.authEmitter.emit(true)
    }
    else (
      this.router.navigate([''])
    )

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fanficService.getFandoms().subscribe(
      (response: Fandom[]) => {
        this.fandoms = response;
        console.log(this.fandoms);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    this.loadFanficForm = this.formBuilder.group({
      fanficName: '',
      fanficDescription: '',
      items: this.formBuilder.array([])
    });

    this.setFanfic();
  }

  createItem(id: number): FormGroup {
    return this.formBuilder.group({
      partId: id,
      partName: null,
      partText: null,
    });
  }

  setItemData(id: number, name: String, text: String): FormGroup {
    return this.formBuilder.group({
      partId: id,
      partName: name,
      partText: text,
    });
  }

  get items(): FormArray {
    return this.loadFanficForm.get('items') as FormArray;
  };

  addItem(): void {
    this.items.push(this.createItem(this.items.length + 1));
  }

  private setItem(name: String, text: String): void {
    this.items.push(this.setItemData(this.items.length + 1, name, text));
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
    this.fanficForm = this.formBuilder.group(
      {
        id: this.id,
        fanfic: fullFanfic,
        fanfic_name: this.loadFanficForm.get('fanficName')?.value,
        user: this.user,
        fandom: this.fanficFandom,
        user_username: this.user.username,
        description: this.loadFanficForm.get('fanficDescription')?.value
      }
    );
    this.fanficService.addFanfics(this.fanficForm.getRawValue())
  }

  public setFanfic(): void {
    this.fanficService.readFanfics(this.id).subscribe(
      (response: Fanfic) => {
        this.fanfic = response
        console.log(this.fanfic)
        this.fanficArray = response.fanfic.split(":;!");
        this.loadFanficForm = this.formBuilder.group({
          fanficName: this.fanfic.fanfic_name,
          fanficDescription: this.fanfic.description,
          items: this.formBuilder.array([])
        });
        for (var _i = 0; _i <= (this.fanficArray.length - 1) / 2; _i += 2) {
          this.setItem(this.fanficArray[_i], this.fanficArray[_i + 1])
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  selectChangeHandler(event: any) {
    console.log(event);

    this.selectedFandom = event.target.value;
  }


}