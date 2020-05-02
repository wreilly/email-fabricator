import { Component, OnInit, HostListener } from '@angular/core';
import {CodepenHarnessService} from '../codepen-harness.service';

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
