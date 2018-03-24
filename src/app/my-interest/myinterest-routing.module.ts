import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyInterestComponent } from './my-interest.component';


// import { AuthGuard }                from '../auth-guard.service';


const myInterestRoutes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
          { path: '', component: MyInterestComponent }
        ]

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(myInterestRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MyInterestRoutingModule {}
export const myInterestRoutingComponents = [
                                  MyInterestComponent
                               ];

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
