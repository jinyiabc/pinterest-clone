import { Component, OnInit } from '@angular/core';
import { MyInterestService } from '../my-interest.service';
import { AuthService } from '../auth.service';
import { GlobalEventsManager } from '../GlobalEventsManager';
import { NgxMasonryOptions } from '../ngx-masonry/ngx-masonry-options.interface';

@Component({
  selector: 'app-allinterests',
  templateUrl: './allinterests.component.html',
  styleUrls: ['./allinterests.component.css']
})
export class AllinterestsComponent implements OnInit {

    public masonryOptions: NgxMasonryOptions = {
      transitionDuration: '0.2s',
      gutter: 3,
      resize: true,
      initLayout: true,
      fitWidth: true
    };

    currentUser;
    isLiked;

    switchLikes(i){
        console.log(i);
        this.allInterests[i].isLiked =  !this.allInterests[i].isLiked;
        this.myinterests.switchLikes(this.allInterests[i]).subscribe();

    }
  constructor(private myinterests:MyInterestService,
              private authservice:AuthService,
              private globalEventsManager:GlobalEventsManager) { }
  allInterests;
  errorMsg;
  ngOnInit() {
      this.myinterests.getAllInterests()
            .subscribe( data => {this.allInterests = data;
                        console.log(data);
                    },
                        err => this.errorMsg = err);

        this.authservice.checkedLogin().subscribe(data =>
            {
                if(data){
                    this.globalEventsManager.showNavBar(true);
                    this.currentUser = data;
                } else {
                    this.globalEventsManager.showNavBar(false);
                    this.currentUser = '';
                }
                console.log(this.currentUser);
            });
  }

}
