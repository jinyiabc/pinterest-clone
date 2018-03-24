import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-mason',
  templateUrl: './mason.component.html',
  styleUrls: ['./mason.component.css']
})
export class MasonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // external js: masonry.pkgd.js, imagesloaded.pkgd.js
      // init Masonry
      var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
      });
      // layout Masonry after each image loads
      $grid.imagesLoaded().progress( function() {
        $grid.masonry();
      });

  }

}
