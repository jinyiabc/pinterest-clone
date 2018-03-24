import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyInterestService } from '../my-interest.service';
import { Interest } from '../interest';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-my-interest',
  templateUrl: './my-interest.component.html',
  styleUrls: ['./my-interest.component.css']
})
export class MyInterestComponent implements OnInit {
    user = 'TBD';
    myInterests;
    errorMsg;
    public newInterest = new Interest('as','');


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


  constructor(private myinterests:MyInterestService) { }

  ngOnInit() {
      this.myinterests.getMyInterests(this.user)
            .subscribe( data => this.myInterests = data,
                        err => this.errorMsg = err);

        // init Masonry
        var $grid = $('.grid').masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: '.grid-sizer',
          gutter: 4
        });
        // layout Masonry after each image loads
        $grid.imagesLoaded().progress( function() {
          $grid.masonry();
        });

}

}
