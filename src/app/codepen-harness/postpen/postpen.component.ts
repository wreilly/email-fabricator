import {Component, OnInit, HostListener} from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/* ERROR-STATE MATCHER ****************************
Copied from the ever useful "fitness-tracker-wr3" Angular
application created in that Udemy MAX course on Material Design.
Thank goodness.
/Users/william.reilly/dev/Angular/Udemy-AngularMaterial-MaxS/2019/WR__2/fitness-tracker-wr3/src/app/auth/login/login.component.ts
 */
/*
This "matcher" is used because w. Angular Material and form reset(), the default is to call it an error if the form was ever submitted.
With the custom matcher, we can omit that default criterion.
 */
class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(
            control && control.invalid &&
            (control.dirty || control.touched)
        );
        // N.B. We OMIT to include form.submitted

        // https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054
        // TL;DR "The !! (double bang) logical operators return a value’s truthy value."
    }
}
/*
DOCK-O (quel idée!?)
https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown

See also: another way...
            https://github.com/angular/components/issues/4190#issuecomment-305222426
"Error state is calculated like this:
isInvalid && (isTouched || isSubmitted)" // << maybe isDirty, too?

<form [formGroup]="fg">
  ...
</form>
@ViewChild(FormGroupDirective) myForm;
sendDataToBackendAndResetForm() {
  // ...send data to backend
  if (this.myForm) {
    this.myForm.resetForm();
  }
}
*/

// ***********************************************

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

    myOwnThisTimeErrorStateMatcher: MyErrorStateMatcher;

    // myDebugTrace = true; // for CSS that shows borders
    myDebugTrace = false;


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

        this.myOwnThisTimeErrorStateMatcher = new MyErrorStateMatcher();

        console.log('this.myWidthThing ', this.myWidthThing);

        // Run Window Size right off the bat... (@HostListener will update it, upon user resizing)
        this.myOffsetForPseudoCenteringCalculation  = this.myPseudoCalculator(this.myWidthThing);

    } // /ngOnInit()

    mySendIt() {
        console.log('this.mySendIt() this.myMethod METHOD: ', this.myMethod);
        // *** - 05 - *******************

        // console.log('01 this.myCyuFormGroup.getRawValue(); ', this.myCyuFormGroup.getRawValue());
        // {myAgeFormControlName: 12, myHeightFormControlName: 13, myIncomeFormControlName: 14}

        // console.log('02 this.myCyuFormGroup.get(\'myAgeFormControlName\'); ', this.myCyuFormGroup.get('myAgeFormControlName'));
        /*
        FormControl {asyncValidator: null, pristine: false, touche ...   value: 9
         */

/*
        console.log('03 this.myCyuFormGroup.controls.myAgeFormControlName.value; ', this.myCyuFormGroup
            .controls.myAgeFormControlName.value); // Yes e.g. 4
*/
        this.myCompareYourselfFormInfoObject.age = this.myCyuFormGroup.controls.myAgeFormControlName.value;

        // this.myCompareYourselfFormInfoObject.height = this.myHeight;
        this.myCompareYourselfFormInfoObject.height = this.myCyuFormGroup.controls.myHeightFormControlName.value;

        // this.myCompareYourselfFormInfoObject.income = this.myIncome;
        this.myCompareYourselfFormInfoObject.income = this.myCyuFormGroup.controls.myIncomeFormControlName.value;


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
        /* HARD CODED 'allow'
        Just for development, testing. FAKE "authorization" !!!
         */

        this.myXhr.send(JSON.stringify(this.myCompareYourselfFormInfoObject));

        this.myCyuFormGroup.reset();

    }
}
