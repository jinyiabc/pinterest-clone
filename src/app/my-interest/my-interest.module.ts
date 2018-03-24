import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { myInterestRoutingComponents, MyInterestRoutingModule } from './myinterest-routing.module';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MyInterestRoutingModule,
    FormsModule
  ],
  declarations: [myInterestRoutingComponents]
})
export class MyInterestModule { }
