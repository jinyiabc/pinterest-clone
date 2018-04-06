import { Component, OnInit } from '@angular/core';
import { MyInterestService } from '../my-interest.service';
import { AuthService } from '../auth.service';
import { GlobalEventsManager } from '../GlobalEventsManager';

@Component({
  selector: 'app-allinterests',
  templateUrl: './allinterests.component.html',
  styleUrls: ['./allinterests.component.css']
})
export class AllinterestsComponent implements OnInit {

  constructor(private myinterests:MyInterestService,
              private authservice:AuthService,
              private globalEventsManager:GlobalEventsManager) { }
  allInterests;
  errorMsg;
  ngOnInit() {
      this.myinterests.getAllInterests()
            .subscribe( data => {this.allInterests = data;
                        console.log(data);},
                        err => this.errorMsg = err);

        this.authservice.checkedLogin().subscribe(data =>
          this.globalEventsManager.showNavBar(data))
  }

}
