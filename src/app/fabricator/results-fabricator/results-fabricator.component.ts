import { Component, OnInit, OnDestroy } from '@angular/core';
import { FabricatorService } from '../fabricator.service';
import {Subscription} from 'rxjs';

import { saveAs } from 'file-saver';
/* Yes, line above did work:
Trying directly here in ResultsFabricatorComponent, not in FabricatorModule. hmm
Interesting - no Angular Module etc.
These 2 installs made it work:
1)
$ npm install --save file-saver
2)
$ npm install --save-dev @types/file-saver

N.B. I did *not* use the seemingly appropriate (but in my estimation, not) 'ngx-' wrapper for file-saver:
>>> NO: https://www.npmjs.com/package/ngx-filesaver
 */

import { Papa } from 'ngx-papaparse'; // This DID need this 'ngx-' wrapper to get it to work in Angular (for me anyway)

@Component({
  selector: 'app-results-fabricator',
  templateUrl: './results-fabricator.component.html',
  styleUrls: ['./results-fabricator.component.css']
})
export class ResultsFabricatorComponent implements OnInit, OnDestroy {

    mySimpleSubscription: Subscription;
    myStackOfStringsOfAddressesToDisplayRaw: string;
    myStackOfStringsOfAddressesToDisplayUlLiArray: string[];

    // NO:
    // myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings: [string[]] = [['']]; // No. empty init ? hmm.
    // myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings: [string[]] = new Array(); // No.
    // myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings: [string[]] = []; // No.
    // myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings: [] = new Array(); // No.

    // YES:
    myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings = []; // Yes.
    // myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings: [] = []; // Yes. (including typing)
    // myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings = new Array(); // Yes.

    filenameToSaveTXT: string;
    filenameToSaveCSV: string;

    constructor(
        private myFabricatorService: FabricatorService,
/* Guess not
        private mySaveAs: saveAs, // no. "saveAs refers to a value, but is being used as a type here" Hmm
*/
        private myPapaCSVParser: Papa,
    ) { }

    ngOnInit() {
        this.mySimpleSubscription = this.myFabricatorService.myStackOfStringsOfAddressesInServiceBehaviorSubject
            .subscribe(
                (whatWeGot) => {
                    console.log('whatWeGot BEHAVIOR ', whatWeGot);
                    this.myStackOfStringsOfAddressesToDisplayRaw = whatWeGot;
                    /* Appears it has that '\n' = good
                    whatWeGot BEHAVIOR  student-01-1@hbsp.harvard.edu
student-01-2@hbsp.harvard.edu
student-01-3@hbsp.harvard.edu
student-01-4@hbsp.harvard.edu
                     */
                    this.myStackOfStringsOfAddressesToDisplayUlLiArray = this.myStackOfStringsOfAddressesToDisplayRaw.split('\n');
                    // We split on that '\n' = good
                    // That .split, on the STRING, yields you an ARRAY:
                    // myStackOfStringsOfAddressesToDisplayUlLiArray

/* OK here, but not if user clicks to navigate to this page immediately. Hits error.
Moving to the two button methods instead (.txt, .csv).

                    this.myMakeFilenameToSave();
*/
                }
            );
    } // ngOnInit()

    myMakeFilenameToSave() {
        /*
        TODO Consider a MODEL for these data bits
        - Right now, they initially come from NewFabricatorComponent
        - But they are NOT passed over, through FabricatorService,
        to this FabricatorResultsComponent.
        - All that comes over is the string, '\n'-separated,
        of all the newly-fabricated e-mail addresses.
        - So, we can read that, grab a sample line, and
        "reverse engineer" our few data bits w. a bit of
        RegEx activity.
         */
        let filenamePrefix: string;
        let filenameGroupArrayThing: RegExpMatchArray;
        let filenameGroup: string;
        let filenameStartNumberArrayThing: RegExpMatchArray;
        let filenameStartNumber: string;
        let filenameEndNumberArrayThing: RegExpMatchArray;
        let filenameEndNumber: string;
        let filenameSuffix: string;

        const sampleFirstStringFromArray: string = this.myStackOfStringsOfAddressesToDisplayUlLiArray[0];
        // e.g. student-e34r-26@hbsp.harvard.edu
        console.log('sampleFirstStringFromArray ', sampleFirstStringFromArray);
        // yep: student-r45-.8-1@hbsp.harvard.edu

        filenamePrefix = 'student'; // hard-code for now
        filenameSuffix = 'AT-hbsp.harvard.edu'; // hard-code for now
        // (REPLACE '@' w 'AT', as the '@' symbol may well confuse a bit, used as a filename character.)

        // NO: filenameGroupArrayThing = sampleFirstStringFromArray.match(/[.]*-([0-9a-zA-Z.-]-[.]*)/);
        // TODONE YEAH :  DROPPED HYPHEN (complicates things as HYPHEN is separator)
        filenameGroupArrayThing = sampleFirstStringFromArray.match(/.*-([a-zA-Z0-9.]*)-/); // << NO HYPHEN allowed in Group name. Cheers.
        console.log('HUUUUH ', filenameGroupArrayThing);
        /* HUUUUH
0: "student-we.were.4.5-"
1: "we.were.4.5"  <<<<<<<< YES Group
index: 0
input: "student-we.were.4.5-1@hbsp.harvard.edu"
groups: undefined
length: 2
         */
        filenameGroup = filenameGroupArrayThing[1];

        filenameStartNumberArrayThing = sampleFirstStringFromArray.match(/.*-([0-9]*)@/);
        console.log('filenameStartNumberArrayThing ', filenameStartNumberArrayThing);
        /*
0: "student-a.W33-2@"
1: "2"  <<<<<<<< YES  Start Number
index: 0
input: "student-a.W33-2@hbsp.harvard.edu"
groups: undefined
length: 2
         */
        filenameStartNumber = filenameStartNumberArrayThing[1];

        const howLongIsThatDamnedArrayAnyway: number = this.myStackOfStringsOfAddressesToDisplayUlLiArray.length;
        console.log('howLongIsThatDamnedArrayAnyway ', howLongIsThatDamnedArrayAnyway);
        const sampleLastStringFromArray: string = this.myStackOfStringsOfAddressesToDisplayUlLiArray[howLongIsThatDamnedArrayAnyway - 1];
        console.log('sampleLastStringFromArray ', sampleLastStringFromArray);

        filenameEndNumberArrayThing = sampleLastStringFromArray.match(/.*-([0-9]*)@/);
        filenameEndNumber = filenameEndNumberArrayThing[1];

        this.filenameToSaveTXT = `${filenamePrefix}-${filenameGroup}-${filenameStartNumber}-${filenameEndNumber}-${filenameSuffix}.txt`;
        console.log('this.filenameToSaveTXT ', this.filenameToSaveTXT);

        this.filenameToSaveCSV = `${filenamePrefix}-${filenameGroup}-${filenameStartNumber}-${filenameEndNumber}-${filenameSuffix}.csv`;
        console.log('this.filenameToSaveCSV ', this.filenameToSaveCSV);

    }

    myDownloadSomeFile() {
        this.myMakeFilenameToSave();

        saveAs(new Blob([this.myStackOfStringsOfAddressesToDisplayRaw], { type: 'text' }), this.filenameToSaveTXT);
        /* btw:
        Just in case you thought you could save down the Array of Strings. << NOT!
        (new Blob([this.myStackOfStringsOfAddressesToDisplayUlLiArray] ...) << NOPE!
        "Type 'string[]' is not assignable to type 'BlobPart'.
  Type 'string[]' is not assignable to type 'string'."
         */
    }

    myDownloadSomeCSVFile() {
        this.myMakeFilenameToSave();

        /*
        PAPAPARSE TIME
         */
/* No. Not string.
        const myStackOfStringsOfAddressesToSaveCSVIHope = this.myPapaCSVParser.unparse(this.myStackOfStringsOfAddressesToDisplayRaw);
        // << Kid. No. Not the damned "raw" string. Here, you NEED that Array!
*/
// Yes? (I hope.) Pipe in an ARRAY:
/* Hah! Kind of naive. I have an Array, yes, but of just STRINGS.
You need:
- An Array of Arrays.
- (Or, an Array of Objects.)
- (Or an {} Object w. "fields": [] and "data": []).
See below.
https://www.papaparse.com/docs#json-to-csv
         */
/* NO! << kind of naive!
        const myStackOfStringsOfAddressesToSaveCSVIHope = this.myPapaCSVParser.unparse(this.myStackOfStringsOfAddressesToDisplayUlLiArray);
*/

        // Quick Cheat? Just stick it all in an [] ? << Yeah. But. Not really results you want. (All on one Row in spreadsheet!)
        const myStackOfStringsOfAddressesToSaveCSVQuickCheat = this.myPapaCSVParser
            .unparse([this.myStackOfStringsOfAddressesToDisplayUlLiArray]);
        console.log('myStackOfStringsOfAddressesToSaveCSVQuickCheat ', myStackOfStringsOfAddressesToSaveCSVQuickCheat);

/*  *******   No longer used, this "Local" array, for testing. ********* */
        /* OK But...
                const myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsLocal = [[]]; // yields empty first row
        */
/* No.
        // tslint:disable-next-line:prefer-const
        let myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsLocal; // undefined
*/
/* No.
        // tslint:disable-next-line:prefer-const
        let myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsLocal: [string[]]; // undefined
*/
/* Yes. Yeesh. Finally. Yeesh. */
        // const myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsLocal = []; // YES
        // const myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsLocal = new Array(); // YES


/* WHAT YOU NEED TO DO:
        For each string in array of strings,
          put it into its own little array, which gets pushed into the new array,
            which is composed of these little arrays,
              each containing that one string apiece.
         */
        this.myStackOfStringsOfAddressesToDisplayUlLiArray.map(
            (eachAddressString) => {
                this.myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings
                    .push([eachAddressString]); // << YES # 01. (Also set to # 01 when doing # 03)
                 // .push( { 'Email Address': eachAddressString } ); // << YES # 02
/* # 01:
[
	["student-asdf-1@hbsp.harvard.edu"],
	["student-asdf-2@hbsp.harvard.edu"]
]
 */
/* # 02: You get spreadsheet column header.
[	{
		"Email Address": "student-asdf-1@hbsp.harvard.edu"
	},
	{
		"Email Address": "student-asdf-2@hbsp.harvard.edu"
	}
]
*/
/* # 03: You also get spreadsheet column header.
{
	"fields": ["Email Address"],
	"data": [
		["student-asdf-1@hbsp.harvard.edu"],
		["student-asdf-2@hbsp.harvard.edu"]
	]
}
 */

/* No longer used, this "Local" array, for testing.
                myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsLocal.push([eachAddressString]);
*/

            }
        ); // /.map()

        // Okay now we have a rudimentary [string[]] to hand to .unparse()
        // Hmm, first try was .unparse([myVar])   << No. Yielded all on one Row again. hmm.
        // Now second try remove that []  >>  .unparse(myVar) << OH YEAH BAByKIN OH yeAH.

        // YES for # 01 and for # 02
/* WORKS - but we're going to leave in place the # 03 mode.
        const myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsUnparsed = this.myPapaCSVParser
            .unparse(this.myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings);
*/

        // for # 03 (which makes use of # 01)
        const myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsUnparsed03 = this.myPapaCSVParser
            .unparse({
                fields: ['Email Address'],
                data: this.myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStrings // << from # 01
            }
                );


        /* No longer used, this "Local" array, for testing.
                const myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsUnparsed = this.myPapaCSVParser
                    .unparse(myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsLocal);
        */

        // tslint:disable-next-line:max-line-length
        console.log('myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsUnparsed03\n', myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsUnparsed03);

        saveAs(new Blob([myStackOfStringsOfAddressesToSaveCSVArrayOfArrayOfStringsUnparsed03], {type: 'text'}), this.filenameToSaveCSV);
    }

    myCopyToClipboard() {
        // TODO
    }

    ngOnDestroy() {
        this.mySimpleSubscription.unsubscribe();
    }
}
