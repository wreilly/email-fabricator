import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective  } from '@angular/forms';
/* Hmm, do we need NgForm? (for error matcher)
Seems not so far. FormGroupDirective for Reactive Forms, NgForm for Template-Driven?
 */

import { Router } from '@angular/router';

import { FabricatorService } from '../fabricator.service';

import {ErrorStateMatcher} from '@angular/material'; // MatInput property
/*
Example above where v. specific Material Design best imported
just here in Component where used,
rather than in app-wide MyMaterialModule.

- "new() up in ngOnInit()
- Then used here by this.myResetForm()
(See .HTML matInput fields too).
 */

class MyErrorStateMatcherClass implements ErrorStateMatcher {
  isErrorState(controlPassedIn: FormControl | null, form: FormGroupDirective | null): boolean {
    // Experiment: left off NgForm above
    return !!(
        controlPassedIn
        &&
        controlPassedIn.invalid
        &&
        (
            controlPassedIn.dirty
            ||
            controlPassedIn.touched
        )
    );
/* We OMIT to include form.submitted (which is the default, and which is causing us the trouble trying to RESET the form after submission.
 */
  }
}

@Component({
  selector: 'app-new-fabricator',
  templateUrl: './new-fabricator.component.html',
  styleUrls: ['./new-fabricator.component.css']
})
export class NewFabricatorComponent implements OnInit {

  myFabricatorFormGroup: FormGroup;
  myFabricatorFormControlStudentIncrementerCounter: FormControl;
  myFabricatorFormControlNumberOfRows: FormControl;
  /* N.B. Slightly unfortunate naming here.
  I am using "Group" for my own purposes in the app, while Angular Reactive Forms of course uses Group for their "FormGroup". Sorry!
   */
  myFabricatorFormControlGroup: FormControl; // << It's a Control, not a "Group"

  myOwnErrorStateMatcher: MyErrorStateMatcherClass;
  // My own implementation. Cheers.


/* BETTER Prob. Just "TYPE" them:
  myStudentIncrementerCounter: number; // e.g. 1 (instead of 0 ? t.b.d.)
  myNumberOfRows: number; // e.g. 25
  myGroup: string; // e.g. '01'
*/
/* LESS GREAT: "INITIALIZE" w. values (that reveal/determine TYPE anyway)
 */
  myStudentIncrementerCounter = 1; // probably going to make ONE-based vs. Zero-based; t.b.d.
  myNumberOfRows = 25;
  myGroup = '01';


  mySeparator = '-';
  myPrefix = 'student';
  mySuffix = '@hbsp.harvard.edu';

  myArrayOfAddresses: string[];
  myListOfStringsOfAddresses: string;
  myStackOfStringsOfAddresses: string;

  constructor(
      private myRouter: Router,
      private myFabricatorService: FabricatorService,
  ) { }

  ngOnInit(): void {

    this.myFabricatorFormControlStudentIncrementerCounter = new FormControl(
        '',
        { validators: [
            Validators.required,
            /* Curious. 0 as entry is INVALID, viz. LENGTH.
That is NOT Intuitive!
(Hmmph. I guess 0 is non-truthy or such? Sheesh.)

errors:
Object  minlength:
Object
 requiredLength: 1
 actualLength: 0

            Validators.minLength(1),
*/
              Validators.min(1),
          ]}
    );

    this.myFabricatorFormControlNumberOfRows = new FormControl(
        '',
        {validators: [
            Validators.required,
            Validators.min(1),
          ]}
    );

    this.myFabricatorFormControlGroup = new FormControl(
        '',
        {validators: [
            Validators.required
          ]}
    );

    this.myFabricatorFormGroup = new FormGroup({
      myFabricatorFormControlStudentIncrementerCounterName: this.myFabricatorFormControlStudentIncrementerCounter,
      myFabricatorFormControlNumberOfRowsName  : this.myFabricatorFormControlNumberOfRows,
      myFabricatorFormControlGroupName: this.myFabricatorFormControlGroup

    });

    this.myOwnErrorStateMatcher = new MyErrorStateMatcherClass();

  } // /ngOnInit()

  myOnSubmit() {
    /*
    Okay, magic of Angular Reactive Forms means:
    - ngOnSubmit() over in .HTML needs no passed parameter
    - myOnSubmit() here in .TS needs no passed-in parameter
    - We use the FormGroup's FormControls to access form values here
    - We assign those form values from HTML to class members here in TypeScript (cool)
    - And on we go with logic!
     */

    /* REMEMBER! You use the ___NAME to the FormControl, in both the .get('___') and in the .controls.___
    */
    this.myStudentIncrementerCounter = this.myFabricatorFormGroup
        .get('myFabricatorFormControlStudentIncrementerCounterName').value;
/* YES works: */
    this.myNumberOfRows = this.myFabricatorFormGroup.controls.myFabricatorFormControlNumberOfRowsName.value;

/* YES works:
    this.myNumberOfRows = this.myFabricatorFormGroup
        .get('myFabricatorFormControlNumberOfRowsName').value;
*/

    this.myGroup = this.myFabricatorFormGroup.get('myFabricatorFormControlGroupName').value;

    console.log(this.myStudentIncrementerCounter); // yep e.g. 1
    console.log(this.myNumberOfRows); // yep e.g. 100
    console.log(this.myGroup); // yep e.g. 'studentgroupname'

    this.fabricateEmailAddresses();

    // Maybe can put first? but still, Prob not needed ... since navigate away hey?
    this.myResetForm();

    this.myRouter.navigate(['fabricator/results-fabricator'])
        .then(() => {
          // empty Promise
          // btw, yeah, you do need the encompassing folder there above 'fabricator/' Not entirely sure how come. cheers.
        });

    // Prob not needed ... since navigate away hey?
    // this.myResetForm();

  }

  fabricateEmailAddresses() {

    console.log('inside fabricate()! ', this.myStudentIncrementerCounter); // yep e.g. 1
    console.log('inside fabricate()! ', this.myNumberOfRows); // yep e.g. 100
    console.log('inside fabricate()! ', this.myGroup); // yep e.g. 'studentgroupname'

    // let myArray = []; // << OK initialized as (empty) []
    // let myArray; // << OK just declared
    // let myArray: []; // << NOT OK - ts-lint complained when I'd "typed" it. hmmph.
/* This two-part thing was complain-y.

    let myArray = Array(this.myNumberOfRows - this.myStudentIncrementerCounter);

    myArray.fill(null).map(() => `student-${this.myGroup}-${this.myStudentIncrementerCounter++}@hbsp.harvard.edu`);
*/

/* No. Wrong logic. (worked for simplest, first case: 1 to 25 and such...

    let myArrayOfAddresses = Array(this.myNumberOfRows - ( this.myStudentIncrementerCounter - 1 ) )
*/
    this.myArrayOfAddresses = Array(this.myNumberOfRows ) // << Array length is simply number of rows !!!
        .fill(null).map(() => `student-${this.myGroup}-${this.myStudentIncrementerCounter++}@hbsp.harvard.edu`);
    // N.B. MINUS ONE!

    // Get all Strings out of Array, into a single comma-separated string
    this.myListOfStringsOfAddresses = this.myArrayOfAddresses.toString();

    // Turn comma-separated LIST of Strings into carriage-return-separated STACK (as 'twere) of Strings, via RegEx:
    this.myStackOfStringsOfAddresses = this.myListOfStringsOfAddresses.replace(/(student-[0-9]+-[0-9]+@hbsp.harvard.edu),/g, '$1\n');

    console.log('HERE IT IS! (whoa) \n =================\n');
    console.log(this.myStackOfStringsOfAddresses);
    console.log('\n =================\n');

    /* Hmm...
    Should we reset those consts herein?
    Hmm.
     */
/* Hmm, let's NOT do that, here ?  Reset Form is expected to, yes ?
    myArrayOfAddresses = [];
    myListOfStringsOfAddresses = '';
    myStackOfStringsOfAddresses = '';
*/

    this.myFabricatorService.sendInStackResults(this.myStackOfStringsOfAddresses);

  }

  myResetForm() {
    this.myFabricatorFormGroup.reset();
    /*
    Curious bug/issue with resetting - does not "reset" VALIDATION. (sigh)
    Happily, Max tackled this for us in Udemy Angular Material Design course (thank god/God). See LoginComponent
    Needs whole custom "ErrorStateMatcher"; see also HTML input matInput

    DOCK-O (quel idée!?)
https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown

     */
  }

}

/*
HEW-2461.txt
======================
JAVASCRIPT to create e-mail addresses to paste into Excel
======================
// TODO:
let myStudentIncrementerCounter = 0
let myCounter = 0

let myNumberOfRows = 25

let myGroup = '01'

const mySeparator = '-'
const myPrefix = 'student'
const mySuffix = '@hbsp.harvard.edu'

let myListOfStrings = ''
let myStackOfStrings = ''


// Populate Array with string concatenated, counter-incremented, invented user e-mail addresses.

myArray = Array(myNumberOfRows - myCounter).fill(null).map(() => `student-${myGroup}-${myCounter++}@hbsp.harvard.edu`)
// About that NULL (in .fill())
https://medium.com/@wisecobbler/4-ways-to-populate-an-array-in-javascript-836952aea79f

myArray
// tslint:disable-next-line:max-line-length
["student-01-0@hbsp.harvard.edu", "student-01-1@hbsp.harvard.edu", "student-01-2@hbsp.harvard.edu", "student-01-3@hbsp.harvard.edu", "student-01-4@hbsp.harvard.edu", "student-01-5@hbsp.harvard.edu", "student-01-6@hbsp.harvard.edu", "student-01-7@hbsp.harvard.edu", "student-01-8@hbsp.harvard.edu", "student-01-9@hbsp.harvard.edu", "student-01-10@hbsp.harvard.edu", "student-01-11@hbsp.harvard.edu", "student-01-12@hbsp.harvard.edu", "student-01-13@hbsp.harvard.edu", "student-01-14@hbsp.harvard.edu", "student-01-15@hbsp.harvard.edu", "student-01-16@hbsp.harvard.edu", "student-01-17@hbsp.harvard.edu", "student-01-18@hbsp.harvard.edu", "student-01-19@hbsp.harvard.edu", "student-01-20@hbsp.harvard.edu", "student-01-21@hbsp.harvard.edu", "student-01-22@hbsp.harvard.edu", "student-01-23@hbsp.harvard.edu", "student-01-24@hbsp.harvard.edu"]



// Get all Strings out of Array, into a single comma-separated string

myListOfStrings = myArray.toString()

myListOfStrings
"student-01-0@hbsp.harvard.edu,student-01-1@hbsp.harvard.edu,student-01-2@hbsp.harvard.edu,student-01-3@hbsp.harvard.edu,student-01-4@hbsp.harvard.edu,student-01-5@hbsp.harvard.edu,student-01-6@hbsp.harvard.edu,student-01-7@hbsp.harvard.edu,student-01-8@hbsp.harvard.edu,student-01-9@hbsp.harvard.edu,student-01-10@hbsp.harvard.edu,student-01-11@hbsp.harvard.edu,student-01-12@hbsp.harvard.edu,student-01-13@hbsp.harvard.edu,student-01-14@hbsp.harvard.edu,student-01-15@hbsp.harvard.edu,student-01-16@hbsp.harvard.edu,student-01-17@hbsp.harvard.edu,student-01-18@hbsp.harvard.edu,student-01-19@hbsp.harvard.edu,student-01-20@hbsp.harvard.edu,student-01-21@hbsp.harvard.edu,student-01-22@hbsp.harvard.edu,student-01-23@hbsp.harvard.edu,student-01-24@hbsp.harvard.edu"


// Turn comma-separated LIST of Strings into carriage-return-separated STACK (as 'twere) of Strings, via RegEx:

myStackOfStrings = myListOfStrings.replace(/(student-[0-9]+-[0-9]+@hbsp.harvard.edu),/g, '$1\n')

myStackOfStrings
"student-01-0@hbsp.harvard.edu
student-01-1@hbsp.harvard.edu
student-01-2@hbsp.harvard.edu
student-01-3@hbsp.harvard.edu
student-01-4@hbsp.harvard.edu
student-01-5@hbsp.harvard.edu
student-01-6@hbsp.harvard.edu
student-01-7@hbsp.harvard.edu
student-01-8@hbsp.harvard.edu
student-01-9@hbsp.harvard.edu
student-01-10@hbsp.harvard.edu
student-01-11@hbsp.harvard.edu
student-01-12@hbsp.harvard.edu
student-01-13@hbsp.harvard.edu
student-01-14@hbsp.harvard.edu
student-01-15@hbsp.harvard.edu
student-01-16@hbsp.harvard.edu
student-01-17@hbsp.harvard.edu
student-01-18@hbsp.harvard.edu
student-01-19@hbsp.harvard.edu
student-01-20@hbsp.harvard.edu
student-01-21@hbsp.harvard.edu
student-01-22@hbsp.harvard.edu
student-01-23@hbsp.harvard.edu
student-01-24@hbsp.harvard.edu"

// Above (after you manually chop off first character double-quotes, and last character double-quotes), is
what you need to Paste into Excel!
======================
 */
