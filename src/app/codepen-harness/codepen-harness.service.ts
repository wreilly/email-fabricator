import {Injectable} from '@angular/core';

@Injectable()
export class CodepenHarnessService {
/*
Q. Is this a good idea? To refactor to a Service?
A. NO!
Hah!
The "onWindowResize()" is a POOR candidate to put over in a
Service, like done below.
Why?
Performance is BAD.
Resizing the window responds slowly for this centering functionality.
It leaves the element NOT centered, and the user
has to REFRESH the page to get it to center again! (whoa)

So - leave it in the component, even if you have to non-D.R.Y. repeat yourself with bit of utility code. C'est la vie.
 */
    /* Giving a shot

    Same code in both
    /flex-bb.component  << For Learning/Finding, will leave it in!
    /postpen.component << For showing the better performance in Component vs. Service, this one remains as it was. cheers.
     */

    myResizeTimeout; // not too pretty simply declaring o well

    myOnWindowResize(event, myHardCodedFxFlexWidth) {
        console.log('SERVICE myHardCodedFxFlexWidth be: ', myHardCodedFxFlexWidth);
        if (this.myResizeTimeout) {
            clearTimeout(this.myResizeTimeout);
            console.log('SERVICE myWidthThing on resize: ', window.innerWidth);
            const myServiceWidthThing = event.target.innerWidth;
            const myOffsetForPseudoCenteringCalculation = this.myPseudoCalculator(myServiceWidthThing, myHardCodedFxFlexWidth);
            console.log('SERVICE this.myOffsetForPseudoCenteringCalculation' , myOffsetForPseudoCenteringCalculation);
        }
        this.myResizeTimeout = setTimeout(( () => {
            console.log('myOnWindowResize complete 1000ms btw');
        }).bind(this) , 1000000);
    }


    myPseudoCalculator(whatTheWidthIsRightNow: number, myHardCodedFxFlexWidth: number): number {
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
            console.log('myHardCodedFxFlexWidth / 2 ', myHardCodedFxFlexWidth / 2);
        */
        answerToReturn = Math.round(
            ((whatTheWidthIsRightNow / 2) - (myHardCodedFxFlexWidth / 2))
            / (whatTheWidthIsRightNow) * 100
        );
        console.log('answerToReturn !!!! ', answerToReturn);
        return (answerToReturn);
    }


}
