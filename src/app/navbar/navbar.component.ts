import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalEventsManager } from '../GlobalEventsManager';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    errorMsg: any;
    showNavBar: boolean = false;
    isLoggedIn;


  constructor(public authservice: AuthService,
              private route: ActivatedRoute,
              private zone:NgZone,
              private globalEventsManager: GlobalEventsManager) { }
  // email = JSON.parse(localStorage.getItem('currentUser')).email;

  logout() {
      this.authservice.logout();
  }
  ngOnInit() {
      this.zone.run(() =>
            this.authservice.checkedLogin().subscribe(
                data => this.isLoggedIn = data,
                err => this.errorMsg = err ));

        this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
            this.showNavBar = mode;
            });
  }

}
