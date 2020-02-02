import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  myListOfStrings: string;
  myStackOfStrings: string;

  constructor() { }

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

  }

  fabricateEmailAddresses() {
    console.log('inside fabricate()! ', this.myStudentIncrementerCounter); // yep e.g. 1
    console.log('inside fabricate()! ', this.myNumberOfRows); // yep e.g. 100
    console.log('inside fabricate()! ', this.myGroup); // yep e.g. 'studentgroupname'

  }

}

/*
HEW-2461.txt
======================
JAVASCRIPT to create e-mail addresses to paste into Excel
======================
// TODO:
myStudentIncrementerCounter = 0
let myNumberOfRows = 25

let myGroup = '01'

const mySeparator = '-'
const myPrefix = 'student'
const mySuffix = '@hbsp.harvard.edu'

let myListOfStrings = ''
let myStackOfStrings = ''


// Populate Array with string concatenated, counter-incremented, invented user e-mail addresses.

myArray = Array(myNumberOfRows - myCounter).fill().map(() => `student-${myGroup}-${myCounter++}@hbsp.harvard.edu`)

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
