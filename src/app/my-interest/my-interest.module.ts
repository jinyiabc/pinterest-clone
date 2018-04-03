import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { myInterestRoutingComponents, MyInterestRoutingModule } from './myinterest-routing.module';
import { FormsModule }   from '@angular/forms';
import { NgxMasonryModule } from '../ngx-masonry/ngx-masonry.module';


@NgModule({
  imports: [
    CommonModule,
    MyInterestRoutingModule,
    NgxMasonryModule,
    FormsModule
  ],
  declarations: [myInterestRoutingComponents]
})
export class MyInterestModule { }
