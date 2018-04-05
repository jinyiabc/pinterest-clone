import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert/alert.service';
import { GlobalEventsManager } from '../GlobalEventsManager';

@Component({
  selector: 'app-login',
  templateUrl:'./login-component.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

    public auth;
    public isAuthenticated;
    public errorMsg;
    public user = new User('','');
                    // {email: '123@123.com',
                    // password: '123'}

  constructor(public authservice: AuthService,
              public router: Router,
              private AuthGuard: AuthGuard,
              private alertservice: AlertService,
              private globalEventsManager: GlobalEventsManager
              ) { }
  // isLoggedin(){
  //     this._bookService.isLoggedin().subscribe(data =>this.auth = data,
  //     error => this.errorMsg = error);
  // }

  logIn(){
      this.authservice.logIn().subscribe(data => {

          console.log(data);
          if(this.authservice.isLoggedIn){
              // Get the redirect URL from our auth service
              // If no redirect has been set, use the default
              let redirect = this.authservice.redirectUrl ? this.authservice.redirectUrl : '/myInterest';
              this.authservice.isLoggedIn = true;
              let navigationExtras: NavigationExtras = {
                  queryParams: { 'isLoggedIn':  true},
                  fragment: 'anchor',
                  skipLocationChange: false
              };
              // Redirect the user
              this.alertservice.success('login successful', true);
              this.globalEventsManager.showNavBar(true);
                  this.router.navigate([redirect],navigationExtras);

          }


          },
        error => {this.errorMsg = error;
            this.alertservice.success('Login failed', true);
        });

  }

  onSubmit(){

      // this.user.email = event.target[0].value;
      // this.user.password = event.target[1].value;
      this.logIn();
      // if (this.isAuthenticated){
      //     console.log('The user is authorized.')
      // }
  }

  ngOnInit() {
  }

}
