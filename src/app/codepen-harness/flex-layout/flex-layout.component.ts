import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-layout',
  templateUrl: './flex-layout.component.html',
  styleUrls: ['./flex-layout.component.css']
})
export class FlexLayoutComponent implements OnInit {

  // JSFIDDLE:
  calc2Cols = '2 2 calc(10em + 10px);';
  /** 10px is the missing margin of the missing box */
  calc3Cols = '3 3 calc(15em + 20px)';
  /** 20px is the missing margin of the two missing boxes */
  /*
  /Users/william.reilly/dev/Angular/FlexLayout/flex-layout
  /src/apps/demo-app/src/app/stack-overflow/grid-column-span/grid-column-span.component.html

https://tburleson-layouts-demos.firebaseapp.com/#/stackoverflow
   */



  // LAYOUT ALIGN
  options = {
    direction :  'row',
    mainAxis  : 'space-around',
    crossAxis :  'center'
  };

  layoutAlign() {
    return `${this.options.mainAxis} ${this.options.crossAxis}`;
  }

  constructor() { }

  ngOnInit(): void {
  }



}
