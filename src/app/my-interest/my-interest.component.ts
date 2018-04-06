import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyInterestService } from '../my-interest.service';
import { Interest } from '../interest';
import { NgxMasonryOptions } from '../ngx-masonry/ngx-masonry-options.interface';
import { AuthService } from '../auth.service';
import { GlobalEventsManager } from '../GlobalEventsManager';
declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-my-interest',
  templateUrl: './my-interest.component.html',
  styleUrls: ['./my-interest.component.css']
})
export class MyInterestComponent implements OnInit {
    user = 'jinyiabc';
    myInterests;
    errorMsg;
    isAuthenticated;
    public newInterest = new Interest('as','');

    updLayout: boolean = false;
    updateLayout() {
      this.updLayout = !this.updLayout;
    }


    deleteInterest(title){
        this.myInterests = this.myInterests.filter(interest => interest.title !== title);
        console.log(this.myInterests);
        this.myinterests.deleteInterest(title)
                         .subscribe();
    }

    onSubmit(event){
          this.newInterest.title = event.target[0].value ;
          this.newInterest.imageUrl = event.target[1].value;
          console.log(this.newInterest);  //  {title: "as", imageUrl: "image"}
          console.log(this.myInterests.push(this.newInterest));
          this.myinterests.addInterest(this.newInterest)
                          .subscribe( data => console.log(data),
                            err => this.errorMsg = err);

  }

   readURL(event) {
        console.log(event.target.value)
        $('#image_upload_preview').attr('src', event.target.value);
  }


  public masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    gutter: 3,
    resize: true,
    initLayout: true,
    fitWidth: true
  };


  constructor(private myinterests:MyInterestService,
              private authservice:AuthService,
              private globalEventsManager:GlobalEventsManager) { }

  ngOnInit() {
      // this.myinterests.getMyInterests(this.user)
      //       .subscribe( data => {this.myInterests = data;
      //                   console.log(data);},
      //                   err => this.errorMsg = err);

      this.authservice.logIn().subscribe(data =>
          {this.isAuthenticated = data;
        this.user = data.username;
        this.globalEventsManager.showNavBar(true);

        this.myinterests.getMyInterests(this.user)
              .subscribe( data => {this.myInterests = data;
                          console.log(data);},
                          err => this.errorMsg = err);},   //'jinyiabc'
          err => this.errorMsg = err);



}

}
