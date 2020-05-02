import { Component, OnInit, HostListener } from '@angular/core';

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
  myResizeTimeout; // not too pretty simply declaring o well.

  @HostListener('window:resize', ['$event'])
  myOnWindowResize(event) {
    if (this.myResizeTimeout) {
      clearTimeout(this.myResizeTimeout);
      console.log('myWidthThing on resize: ', window.innerWidth);
      this.myWidthThing = event.target.innerWidth;
      this.myOffsetForPseudoCenteringCalculation = this.myPseudoCalculator(this.myWidthThing);
      console.log('this.myOffsetForPseudoCenteringCalculation' , this.myOffsetForPseudoCenteringCalculation);
    }
    this.myResizeTimeout = setTimeout(( () => {
      console.log('myOnWindowResize complete 1000ms btw');
    }).bind(this) , 1000000);
  }

  myPseudoCalculator(whatTheWidthIsRightNow: number): number {
    let answerToReturn: number;
/*
myHardCodedFxFlexWidth   i.e. 200
whatTheWidthIsRightNow   e.g. 700, or 440
A.
200 / 2 = 100
700 / 2 = 350
350 - 100 = 250 << Left-most point for flexbox
250/750 << % to left-most point
33%
 */
/*
    console.log('whatTheWidthIsRightNow / 2 ', whatTheWidthIsRightNow / 2);
    console.log('this.myHardCodedFxFlexWidth / 2 ', this.myHardCodedFxFlexWidth / 2);
*/
    answerToReturn = Math.round(
        ((whatTheWidthIsRightNow / 2) - (this.myHardCodedFxFlexWidth / 2))
        / (whatTheWidthIsRightNow) * 100
    );
    console.log('answerToReturn !!!! ', answerToReturn);
    return (answerToReturn);
  }

  constructor() { }

  ngOnInit(): void {
    console.log('this.myWidthThing ', this.myWidthThing);

    // Run it right off the bat... (@HostListener will update it, upon user resizing)
    this.myOffsetForPseudoCenteringCalculation  = this.myPseudoCalculator(this.myWidthThing);

  }



}
