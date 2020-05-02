import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/*
https://stackoverflow.com/questions/13142635/how-can-i-create-an-object-based-on-an-interface-file-definition-in-typescript
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

    constructor() {
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
