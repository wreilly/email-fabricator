import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { HbspService } from '../hbsp.service';


/*
- Q. Can I omit to (re)-import here MatPaginator and MatSort?
Kinda hoping so, since already imported (as 'Module') in my-material.module.ts
  A. No! Can't omit to import. Solly!
- But MatTableDataSource seems to have to be imported here in Component. hmm. MBU
 */
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// YES the above NEED to be imported here in Component
// NO it isn't "enough" that they are imported as Modules in my-material.module.ts
// o well

/* GETTING FILE DATA (JSON)
1. HardCoded Filenames
2. File Chooser/Selector widget
 */
/*
HECS-6195  We have large JSON file of 115 Pending Educator Profiles
 */
// TSCONFIG.JSON ==> https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#new---resolvejsonmodule
// https://www.techiediaries.com/import-local-json-files-in-typescript/  "Step 4"
// import { myJSON } from './hecs-6195-pending-educators.json'; // << NO I think IIRC
// import myjsontwo from './myjsontwo.json'; // << NO  :(
// import * as data from './myjsontwo.json'; // << YES :)
// 1. THREE HARD-CODED FILES I CAN USE (Comment Out two)
// import * as data from './myjson-20200508-112.json';
// import * as data from './myjson-20200510-59.json';
import * as data from './myjson-20200512-65.json';
import {Observable, Subscription} from 'rxjs';
// 2. "dataFromChooser" will be from FileReader, below

// A. Ok
let dataFromChooser: string | ArrayBuffer; // FileReader.result type
// C. Ok
let myHeatAuthorizations: any; // Q. What is this? A. [{},{}]
// [{"username":"arkangel.cordero" ...}]


@Component({
  selector: 'app-heat-json',
  templateUrl: './heat-json.component.html',
  styleUrls: ['./heat-json.component.css']
})
export class HeatJsonComponent implements OnInit, AfterViewInit {

  // FILE CHOOSER / SELECTOR
  // https://stackblitz.com/edit/angular-material-file-select?file=src%2Fapp%2Fapp.component.ts
  @ViewChild('myFileInput') myFileInput;
  myFile: File | null = null;



  // For simple MatList we had simple array of objects [{username, email, institutionName}]
  educators: []; // MyThreePropsUserFlat[]; // << myParseOutEmails() triggers this, to write to List
  // educators: any[]; // << myParseOutEmails() triggers this, to write to List
  educatorsLength = 0; // Needed for a 'count' on template
  // For MatTable, we need this MatTableDataSource thingie:
  // DATASOURCE.data is that educators array thingie
  myEducatorsDataSource = new MatTableDataSource();
  myColumnsToDisplay = ['username', 'email', 'institutionName'];
  @ViewChild(MatPaginator)myPaginator: MatPaginator; // {static: false } nor true either. didn't help. leaving out. cheers?

  @ViewChild(MatSort, { static: false }) mySort: MatSort;

  // SEE NGAFTERVIEWINIT()
  /* Notes from class: fitness-tracker-wr3
https://www.udemy.com/angular-full-app-with-angular-material-angularfire-ngrx/learn/lecture/9120380#questions/7276854
The "static" option is an Angular 8 thing. Wasn't in 7, and in Angular 9 won't be needed...
Also:
BTW: If the element (MatSort, MatPaginator) would be used in ngOnInit(), you would have to write { static: true }.
(We use it in ngAfterViewInit(), so false is okay)
https://angular.io/guide/static-query-migration
(*) https://angular.io/guide/static-query-migration#what-does-this-flag-mean-and-why-is-it-necessary
*/

  constructor(
      private myHbspService: HbspService,
  ) { }

  ngOnInit(): void {

    console.log('JSON Data! ? ', data);

  }

  ngAfterViewInit() {
    /* HIGHLY USEFUL:
    https://blog.angular-university.io/angular-debugging/
    Angular Debugging "Expression has changed after it was checked": Simple Explanation (and Fix)
     */
    this.myEducatorsDataSource.sort = this.mySort;
    this.myEducatorsDataSource.paginator = this.myPaginator;
  }

  // FILE SELECTOR CHOOSER
  // https://stackblitz.com/edit/angular-material-file-select?file=src%2Fapp%2Fapp.component.ts
  myOnClickFileInputButton(): void {
    this.myFileInput.nativeElement.click();
  }
  myOnChangeFileInput(): void {
    const myFiles: { [key: string]: File } = this.myFileInput.nativeElement.files;
    this.myFile = myFiles[0];
    console.log('9999999 ', this.myFile);
    /*
    File
lastModified: 1588616258106
lastModifiedDate: Mon May 04 2020 14:17:38 GMT-0400 (Eastern Daylight Time) {}
name: "HEAE-375-bulk-educator-registration-workflow.png"
size: 1993270
type: "image/png"
webkitRelativePath: ""
     */
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    // https://stackoverflow.com/questions/47936183/angular-file-upload

    // NAH not pursuing FormData so much. FileReader() instead.
    // let myFormDataHoldingMyFile = new FormData();
    /* Hmm, what I *really* want is:
    https://developer.mozilla.org/en-US/docs/Web/API/FileReader
     */

    const myFileReaderToReadMyFile = new FileReader();
    myFileReaderToReadMyFile.onload = (myEvent: any) => {
      console.log('myEvent ', myEvent);
      /* ProgressEvent
      currentTarget: FileReader
      srcElement: FileReader
      target: FileReader
      result: "{"errors":[],"data":{"users":[{"username":"arkange...
      readyState: 2
       */

      dataFromChooser = myFileReaderToReadMyFile.result;
      console.log('dataFromChooser ', dataFromChooser);
      /*
      {"errors":[],"data":{"users":[{"username":"arkangel.cordero"...
       */

      myHeatAuthorizations = (dataFromChooser as any);
      console.log('myOnChangeFileInpu() ONLOAD Result: myHeatAuthorizations ', myHeatAuthorizations);
      /* (Same Object)
      {"errors":[],"data":{"users":[{"username":"arkangel.cordero",
       */
    };
    myFileReaderToReadMyFile.readAsText(this.myFile);
  }

  myParseOutEmails() {
    // NAH: this.showTableDataIsHere = true; // No matter whether top or bottom here...

    // console.log('myParseOutEmails() myHeatAuthorizations.data ', myHeatAuthorizations.data); // undefined
    // console.log('myParseOutEmails() myHeatAuthorizations.data.users ', myHeatAuthorizations.data.users);
    console.log('myParseOutEmails() myHeatAuthorizations ', myHeatAuthorizations);
    /* wtf? looks to be right ?
    {
"errors": [],
"data": {
"users": [{"username": "arkangel.cordero"

Q. Hmm, I think I need to JSON.parse() this string into JSON. Hmm
A. OH YEAH BABY-KIN OH YEAH!
     */
    const myHeatAuthorizationsAsJson = JSON.parse(myHeatAuthorizations);
    console.log('myParseOutEmails() myHeatAuthorizationsAsJson ', myHeatAuthorizationsAsJson);
    // core.js:5873 ERROR TypeError: Cannot read property 'users' of undefined at NewFabricatorComponent.myParseOutEmails
    this.educators = myHeatAuthorizationsAsJson.data.users
        .map((eachUser) => {
          let oneEducator;
          oneEducator = {
            username: eachUser.username,
            email: eachUser.profile.email,
            institutionName: eachUser.profile.institutionName,
          };
          return oneEducator;
        });
    this.myEducatorsDataSource.data = this.educators; // whamma-jamma
    this.educatorsLength = this.educators.length;
    // NAH:  this.showTableDataIsHere = true;
  } // /myParseOutEmails()


}
