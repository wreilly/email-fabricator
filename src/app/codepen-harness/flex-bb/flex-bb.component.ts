import { Component, OnInit, HostListener } from '@angular/core';

import {CodepenHarnessService} from '../codepen-harness.service';
/*
Q. Is this a good idea? To refactor to a Service?
A. NO!
Hah!
The "onWindowResize()" is a POOR candidate to put over in a
Service, like done below.
Why?
Performance is BAD. // << Firefox BAD.  Chrome, not as bad. fwiw.
Resizing the window responds slowly for this centering functionality.
It leaves the element NOT centered, and the user
has to REFRESH the page to get it to center again! (whoa)

So - leave it in the component, even if you have to non-D.R.Y. repeat yourself with bit of utility code. C'est la vie.
 */


/*
https://stackoverflow.com/questions/39300526/how-i-can-detect-window-resize-instantly-in-angular-2/39300671
 */

@Component({
  selector: 'app-flex-bb',
  templateUrl: './flex-bb.component.html',
  styleUrls: ['./flex-bb.component.css']
})
export class FlexBbComponent implements OnInit {

  myWidthThing = window.innerWidth;
  myOffsetForPseudoCenteringCalculation: number;
  myHardCodedFxFlexWidth = 200; // 200px
  // myResizeTimeout; // not too pretty simply declaring o well.

  @HostListener('window:resize', ['$event'])
  myServiceCallOnWindowResize(event) {
    console.log('BB-COMPONENT myHardCodedFxFlexWidth be: ', this.myHardCodedFxFlexWidth);
    this.myCodePenHarnessService.myOnWindowResize(event, this.myHardCodedFxFlexWidth);
  }



  constructor(
      private myCodePenHarnessService: CodepenHarnessService,
  ) { }

  ngOnInit(): void {
    console.log('this.myWidthThing ', this.myWidthThing);

    // Run Window Size right off the bat... (@HostListener will update it, upon user resizing)
    this.myOffsetForPseudoCenteringCalculation  = this.myCodePenHarnessService.myPseudoCalculator(
        this.myWidthThing, this.myHardCodedFxFlexWidth
    );

  }



}
