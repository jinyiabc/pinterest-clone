import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mason',
  template: `
     <ngx-masonry>
       <ngx-masonry-item class="masonry-item" *ngFor="let item of masonryItems">{{item.title}}</ngx-masonry-item>
     </ngx-masonry>
     `,
  styles: [
    `
       .masonry-item { width: 200px; }
     `
  ]
})
export class MasonComponent implements OnInit {

    masonryItems = [
      { title: 'item 1' },
      { title: 'item 2' },
      { title: 'item 3' },
      { title: 'item 4' },
      { title: 'item 5' },
      { title: 'item 6' }
    ];

  constructor() { }

  ngOnInit() {}

}
