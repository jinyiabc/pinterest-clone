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
  logIn(){
      this.authservice.logIn().subscribe()
  }


  ngOnInit() {
  }

}
