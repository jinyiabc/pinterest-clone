import { Component, OnInit } from '@angular/core';
import { MyInterestService } from '../my-interest.service';

@Component({
  selector: 'app-allinterests',
  templateUrl: './allinterests.component.html',
  styleUrls: ['./allinterests.component.css']
})
export class AllinterestsComponent implements OnInit {

  constructor(private myinterests:MyInterestService) { }
  allInterests;
  errorMsg;
  ngOnInit() {
      this.myinterests.getAllInterests()
            .subscribe( data => {this.allInterests = data;
                        console.log(data);},
                        err => this.errorMsg = err);
  }

}
