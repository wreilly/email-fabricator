import {Component, OnInit, HostListener} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/*
https://stackoverflow.com/questions/13142635/how-can-i-create-an-object-based-on-an-interface-file-definition-in-typescript

https://stackoverflow.com/questions/39300526/how-i-can-detect-window-resize-instantly-in-angular-2/39300671
 */
interface CompareYourselfInfo {
    age: number;
    height: number;
    income: number;
}

@Component({
    selector: 'app-postpen',
    templateUrl: './postpen.component.html',
    styleUrls: [ './postpen.component.css' ],
})
export class PostpenComponent implements OnInit {

    constructor() {
    }

    // *** ON WINDOW RE-SIZE  **********
    myWidthThing = window.innerWidth;
    myOffsetForPseudoCenteringCalculation: number;
    myHardCodedFxFlexWidth = 300; // 200; // 200px
    myResizeTimeout; // not too pretty simply declaring o well.


    // *********************



    /* 1) PLAIN OLD JAVASCRIPT & XMLHTTPREQUEST << YEP. WORKED! :o)
       2) Next up: Angular Reactive Forms, and HttpClient & Etc.
     */

    myXhr = new XMLHttpRequest();
    myMethod = 'POST';
    myApiUrl = 'https://z20go3ghcg.execute-api.us-east-1.amazonaws.com/dev/compare-yourself';
    myCompareYourselfFormInfoObject: CompareYourselfInfo = { // - 05 -
        // DEFAULT initialization values. Code checks for "three zeroes" not allowed y not.
        age: 0,
        height: 0,
        income: 0,
    };

    // Emulating passed-in values from form
    myAge = 22;
    myHeight = 33;
    myIncome = 44;

    myAgeFormControl: FormControl;
    myHeightFormControl: FormControl;
    myIncomeFormControl: FormControl;
    myCyuFormGroup: FormGroup; // 'Cyu' - Compare Yourself, Udemy

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

    ngOnInit(): void {
        this.myAgeFormControl = new FormControl(
            '',
            [
                Validators.required,
                Validators.min(1),
            ]);
        this.myHeightFormControl = new FormControl(
            '',
            [
                Validators.required,
                Validators.min(1),
            ]
        );
        this.myIncomeFormControl = new FormControl(
            '',
            [
                Validators.required,
                Validators.min(1),
            ]);

        this.myCyuFormGroup = new FormGroup({
            // TSLint complaining: "Unnecessarily quoted property" (object-literal-key-quotes)
            // tslint:disable-next-line: object-literal-key-quotes
            'myAgeFormControlName': this.myAgeFormControl,
            myHeightFormControlName: this.myHeightFormControl,
            myIncomeFormControlName: this.myIncomeFormControl,

        });

        console.log('this.myWidthThing ', this.myWidthThing);

        // Run Window Size right off the bat... (@HostListener will update it, upon user resizing)
        this.myOffsetForPseudoCenteringCalculation  = this.myPseudoCalculator(this.myWidthThing);

    } // /ngOnInit()

    mySendIt() {
        console.log('this.mySendIt() this.myMethod METHOD: ', this.myMethod);
        // *** - 05 - *******************
        this.myCompareYourselfFormInfoObject.age = this.myAge;
        this.myCompareYourselfFormInfoObject.height = this.myHeight;
        this.myCompareYourselfFormInfoObject.income = this.myIncome;
        console.log('05 - this.myCompareYourselfFormInfoObject ', this.myCompareYourselfFormInfoObject);
        /*
        05 - this.myCompareYourselfFormInfoObject  {age: 22, height: 33, income: 44}
         */

        this.myXhr.open(this.myMethod, this.myApiUrl);
        this.myXhr.onreadystatechange = (eventPassedIn) => {
            console.log('eventPassedIn.target ', eventPassedIn.target);
            // console.log('eventPassedIn.target.response ', eventPassedIn.target.response);
        };
        this.myXhr.setRequestHeader('Content-Type', 'application/json');
        this.myXhr.setRequestHeader('Authorization', 'allow');
        this.myXhr.send(JSON.stringify(this.myCompareYourselfFormInfoObject));
    }
}
