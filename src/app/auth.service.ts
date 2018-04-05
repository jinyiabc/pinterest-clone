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
logIn(user:User):Observable<Auth>{
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
        })
    };
    const myUrl = environment.app_url + "/login";
    return this.http.post<User>(myUrl, user, httpOptions)
                    .map(user => {
                        if(user){
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            this.isLoggedIn = true;
                        }
                        return user;
                    })
                    .catch(this.errorHandler);
}
logout(): void {
    localStorage.removeItem('currentUser');
}

errorHandler(error: HttpErrorResponse){
  return Observable.throw(error.message || "Server Error");
}

}
/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
