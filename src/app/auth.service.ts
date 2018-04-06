import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { User } from './user';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';



@Injectable()
export class AuthService {
//   isLoggedIn = false;
//
  // store the URL so we can redirect after logging in
  redirectUrl: string;
//
//   login(): Observable<boolean> {
//     return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
//   }
//
//   logout(): void {
//     this.isLoggedIn = false;
//   }
// }
constructor(private http: HttpClient) { } // DI

isLoggedIn = false;
logIn():Observable<User>{

    const myUrl =  "https://sprinterest-fcc.herokuapp.com/auth/twitter";
    return this.http.get<User>(myUrl)
                    // .map(user => {
                    //     if(user){
                    //         localStorage.setItem('currentUser', JSON.stringify(user));
                    //         this.isLoggedIn = true;
                    //     }
                    //     return user;
                    // })
                    .catch(this.errorHandler);
}
logout(): void {
    localStorage.removeItem('currentUser');
}

errorHandler(error: HttpErrorResponse){
  return Observable.throw(error.message || "Server Error");
}

checkedLogin():Observable<any>{
    const status = JSON.parse(localStorage.getItem('currentUser'));
    if (status === null || status.length === 0){
        return Observable.of(false);
    }
    return Observable.of(status.withCredentials);
}

}
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
