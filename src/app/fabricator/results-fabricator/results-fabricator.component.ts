import { Component, OnInit, OnDestroy } from '@angular/core';
import { FabricatorService } from '../fabricator.service';
import {Subscription} from 'rxjs';

import { saveAs } from 'file-saver';
/*
Trying directly here in ResultsFabricatorComponent, not in FabricatorModule. hmm
 */

@Component({
  selector: 'app-results-fabricator',
  templateUrl: './results-fabricator.component.html',
  styleUrls: ['./results-fabricator.component.css']
})
export class ResultsFabricatorComponent implements OnInit, OnDestroy {

    mySimpleSubscription: Subscription;
    myStackOfStringsOfAddressesToDisplayRaw: string;
    myStackOfStringsOfAddressesToDisplayUlLiArray: string[];

    filenameToSave: string;

    constructor(
        private myFabricatorService: FabricatorService,
/* Guess not
        private mySaveAs: saveAs, // no. "saveAs refers to a value, but is being used as a type here" Hmm
*/
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
                    this.myMakeFilenameToSave();
                }
            );
    } // ngOnInit()

    myMakeFilenameToSave() {
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
        filenameSuffix = 'AT-hbsp.harvard.edu'; // hard-code for now (REPLACE '@')

        // NO: filenameGroupArrayThing = sampleFirstStringFromArray.match(/[.]*-([0-9a-zA-Z.-]-[.]*)/);
        // TODO YEAH : THINKING TO DROP HYPHEN (complicates things as HYPHEN is separator)
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

        this.filenameToSave = `${filenamePrefix}-${filenameGroup}-${filenameStartNumber}-${filenameEndNumber}-${filenameSuffix}.txt`;
        console.log('this.filenameToSave ', this.filenameToSave);
    }

    myDownloadSomeFile() {
        saveAs(new Blob([this.myStackOfStringsOfAddressesToDisplayRaw], { type: 'text' }), this.filenameToSave); // 'somedatafilename.txt'
    }

    myCopyToClipboard() {
        // TODO
    }

    ngOnDestroy() {
        this.mySimpleSubscription.unsubscribe();
    }
}
