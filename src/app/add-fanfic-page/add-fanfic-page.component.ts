import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Fandom } from '../model/fandom';
import { FanficService } from 'src/app/service/fanfic.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-fanfic-page',
  templateUrl: './add-fanfic-page.component.html',
  styleUrls: ['./add-fanfic-page.component.css']
})
export class AddFanficPageComponent implements OnInit {

  public fandoms: Fandom[];

  constructor(
    private fanficService: FanficService,
    private formBuilder: FormBuilder
    ) { }
  public orderForm: FormGroup;
  
  ngOnInit() {
    this.fanficService.getFandoms().subscribe(
      (response: Fandom[]) =>{
        this.fandoms = response;
        console.log(this.fandoms);
        
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
      }
      );

    this.orderForm = this.formBuilder.group({
      fanficName: '',
      email: '',
      items: this.formBuilder.array([ this.createItem()])
    });
}

createItem(): FormGroup {
  return this.formBuilder.group({
    partName: '',
    partText: '',
  });
}

 get items(): FormArray {
  return this.orderForm.get('items') as FormArray;
};

addItem(): void {
this.items.push(this.createItem());
}

public OnSubmit(formValue: any) {
      console.log(formValue);
  }

}