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

  myStudentIncrementerCounter: number; // e.g. 0
  myNumberOfRows: number; // e.g. 25
  myGroup: string; // e.g. '01'

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
            Validators.minLength(1)
          ]}
    );

    this.myFabricatorFormControlNumberOfRows = new FormControl(
        '',
        {validators: [
            Validators.required
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
