import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { HbspService } from '../hbsp.service';
import { ThreePropsUserFlat } from '../three-props-user.model';


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
/*
import * as dataFromHardCodedFile from './myjson-20200512-65.json';
*/
import * as dataFromHardCodedFile from '../../../../../email-fabricator-assets-out-of-git/myjson-20200512-65.json';
/* Go UP and OUT of Git to store this file:
$ pwd
/Users/william.reilly/dev/Angular/projects
$ ls
email-fabricator // << Git
email-fabricator-assets-out-of-git // << Out of Git
$ ls email-fabricator-assets-out-of-git/
myjson-20200512-65.json

Alternative of course: Keep within project folder, but put into .gitignore
*/
/* N.B. import as JSON actually DOES get you JSON. (quel idée)
No need to JSON.parse() for HARD-CODED FILE import * as data (it's ALREADY JSON!) << YEP! :)
*/
import {Observable, Subscription} from 'rxjs';
// 2. "dataFromChooser" will be from FileReader, below

// A. Ok
let dataFromChooser: string | ArrayBuffer; // FileReader.result type

// C. Ok
/*
let myHeatAuthorizations: any; // Q. What is this? A. [{},{}]
*/
// [{"username":"arkangel.cordero" ...}]
// Pint-sized finding: Q. Why is this declaration way up here, outside class?
// A. No good reason (MBU). Let's move it INSIDE class. Then, can be SEEN in template
//       where we use it for [disabled] logic on button. cheers.

@Component({
  selector: 'app-heat-json',
  templateUrl: './heat-json.component.html',
  styleUrls: ['./heat-json.component.css']
})
export class HeatJsonComponent implements OnInit, AfterViewInit {

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

  // FILE CHOOSER / SELECTOR
  // https://stackblitz.com/edit/angular-material-file-select?file=src%2Fapp%2Fapp.component.ts
  @ViewChild('myFileInput') myFileInput;
  myFile: File | null = null;



  // For simple MatList we had simple array of objects [{username, email, institutionName}]
  educators: ThreePropsUserFlat[]; // << myParseOutEmails() triggers this, to write to List
  // educators: any[]; // << myParseOutEmails() triggers this, to write to List
  educatorsLength = 0; // Needed for a 'count' on template
  // For MatTable, we need this MatTableDataSource thingie:
  // DATASOURCE.data is that educators array thingie
  myEducatorsDataSource = new MatTableDataSource();
  myColumnsToDisplay = ['username', 'email', 'institutionName'];
  @ViewChild(MatPaginator)myPaginator: MatPaginator; // {static: false } nor true either. didn't help. leaving out. cheers?

  @ViewChild(MatSort, { static: false }) mySort: MatSort;
  myHeatAuthorizations: any; // WAS declared above outside class.

  ngOnInit(): void {

    console.log('JSON dataFromHardCodedFile! ? ', dataFromHardCodedFile);

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

    // This next block DEFINES the File Reader's ".onload()" method
    // Just below is the call to INVOKE this onload runner...
    myFileReaderToReadMyFile.onload = (myEvent: any) => {
      console.log('myEvent ', myEvent);
      /* ProgressEvent
      currentTarget: FileReader
      srcElement: FileReader
      target: FileReader
      result: "{"errors":[],"data":{"users":[{"username":"arkange...
      readyState: 2
       */

      /* CHOOSER vs. HARD-CODED - getting at the array of users data
      Chooser needs ".result" :)
      Hard-Coded needs ".default" :)
       */
      dataFromChooser = myFileReaderToReadMyFile.result; // << .result needed! :)
      console.log('dataFromChooser ', dataFromChooser);
      /*
      {"errors":[],"data":{"users":[{"username":"arkangel.cordero"...
       */

      this.myHeatAuthorizations = (dataFromChooser as any);
      // tslint:disable-next-line:max-line-length
      console.log('myOnChangeFileInput() ONLOAD Result 01 dataFromChooser: this.myHeatAuthorizations ', this.myHeatAuthorizations);
      /* (Same Object)
      {"errors":[],"data":{"users":[{"username":"arkangel.cordero",
       */

      // ***** TESTING **********
      // ** DONE. PASSED. Veddy nice. **
      // We'll temporarily *HIJACK* here:  (DONE)
      // this.myHeatAuthorizations = (dataFromHardCodedFile as any); // << Nope!
      // tslint:disable-next-line:max-line-length
      // this.myHeatAuthorizations = (dataFromHardCodedFile as any).default.data.users; // << .default needed!  PLUS ".data.users". okay << NOPE!
/* WORKED:
      this.myHeatAuthorizations = (dataFromHardCodedFile as any).default; // << .default needed! :) No - don't do .data.users here << YEP
*/
      // 1. YES WORKS:
      /*
      const myHeatAuthorizations: any = (data as any).default;
      */
      /* Note: ".default" is name of OBJECT { } holding all content in the .json file, as seen apparently from a JSON "import" OK.
      */

/* No longer needed (was for hijack testing)
      console.log('myOnChangeFileInput() ONLOAD Result 02 dataFromHardCodedFile: this.myHeatAuthorizations ', this.myHeatAuthorizations);
*/

    }; // /.onload()

    myFileReaderToReadMyFile.readAsText(this.myFile);
    // This line RUNS the File Reader's  .onload() method, just above
    // That is, I guess .readAsText() is one method (among a few) that in essence invokes .onload(). cheers
  }

  myParseOutEmails() {
    // NAH: this.showTableDataIsHere = true; // No matter whether top or bottom here...

    // console.log('myParseOutEmails() myHeatAuthorizations.data ', myHeatAuthorizations.data); // undefined
    // console.log('myParseOutEmails() myHeatAuthorizations.data.users ', myHeatAuthorizations.data.users);
    console.log('myParseOutEmails() this.myHeatAuthorizations ', this.myHeatAuthorizations);
    /* wtf? looks to be right ?
    {
"errors": [],
"data": {
"users": [{"username": "arkangel.cordero"

Q. Hmm, I think I need to JSON.parse() this string into JSON. Hmm
A. OH YEAH BABY-KIN OH YEAH!
     */

/* YES do JSON.parse() for FILE CHOOSER .result (it's a STRING!)
*/
    const myHeatAuthorizationsAsJson = JSON.parse(this.myHeatAuthorizations);

/* BUT do NOT do JSON.parse() for HARD-CODED FILE import * as data (it's ALREADY JSON!) (I think/hope/whatever) << YEP! :)

    const myHeatAuthorizationsAsJson = this.myHeatAuthorizations; // whamma
*/

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
