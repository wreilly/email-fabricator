import {Component, Directive, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective  } from '@angular/forms';
/* Hmm, do we need NgForm? (for error matcher)
Seems not so far. FormGroupDirective for Reactive Forms, NgForm for Template-Driven?
 */

import { Router } from '@angular/router';


import {FabricatorService, MyThreePropsUser, MyThreePropsUserFlat} from '../fabricator.service';
// Couple interfaces refactored over to the Service

import { ErrorStateMatcher } from '@angular/material/core'; // MatInput property
/*
Example above where v. specific Material Design best imported
just here in Component where used,
rather than in app-wide MyMaterialModule. MBU

- "new() up this ErrorStateMatcher in ngOnInit()
- Then used here by this.myResetForm()
(See .HTML matInput fields too).
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
/* NO LONGER USED  see hbsp/heat-json/heat-json.component.ts
import * as data from './myjson-20200512-65.json';
*/

import {Observable, Subscription} from 'rxjs';

// 2. "dataFromChooser" will be from FileReader, below


// 1. YES WORKS:
/*
const myHeatAuthorizations: any = (data as any).default;
*/
/* Note: ".default" is name of OBJECT { } holding all content in the .json file, as seen apparently from a JSON "import" OK.
*/

// 2. W-I-P
/*
A. We'll declare the "from chooser" data variable up here y not. It's UNDEFINED up here btw fwiw.
B. But the assignment from it to the "myHeatAuthorizations" should not happen here; down below in myOnChangeFileInput() instead. cheers.
C. (Update) Okay, guess it's all right to *declare* those "Heat Authorizations" up here, just don't *assign* to them here. cheers.
 */
// A. Ok
let dataFromChooser: string | ArrayBuffer; // FileReader.result type
/* B. No not up here. below instead
const myHeatAuthorizations: any = (dataFromChooser as any);
*/
// C. Ok
let myHeatAuthorizations: any; // Q. What is this? A. [{},{}]
// [{"username":"arkangel.cordero" ...}]

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

// Issue was: IDE/TSLint complaining, though code still worked, re: matHeaderRowDef and columns. o well. ABANDONED
// https://stackoverflow.com/questions/51085422/property-binding-matheaderrowdef-not-used-by-any-directive-on-an-embedded-templa
@Directive({ // ABANDONED
    // tslint:disable-next-line:directive-selector
    selector: '[matHeaderRowDef]',
    // tslint:disable-next-line:no-inputs-metadata-property
    inputs: ['columns: matHeaderRowDef'],
})
// tslint:disable-next-line:directive-class-suffix
export class MatHeaderRowDef { }

/*
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[matRowDef]',
    // tslint:disable-next-line:no-inputs-metadata-property
    // inputs: ['columns: matRowDef'],
})
// tslint:disable-next-line:directive-class-suffix
export class MatRowDef { }
*/


@Component({
  selector: 'app-new-fabricator',
  templateUrl: './new-fabricator.component.html',
  styleUrls: ['./new-fabricator.component.css']
})
export class NewFabricatorComponent implements OnInit, AfterViewInit, OnDestroy {

    // HTTP 'GET HEAT USERS' API CALL
    // myHeatAuthorizationsObservableInComponentDotPipe: Observable<MyThreePropsUser[]>; // << NO Not just ThreeProps.
    // It is ENTIRE User {}. Needs that <any>, or perhaps <object> bit better:
    // myHeatAuthorizationsObservableInComponentDotPipe: Observable<any>; // YES forgiving n'est-ce pas? ye gods ASYNC
    // myHeatAuthorizationsObservableInComponentDotPipe: Observable<object>; // << NO not iterable
    myHeatAuthorizationsObservableInComponentDotPipe: Observable<object[]>; // ?? << NO!
    /*
    ERROR in src/app/fabricator/new-fabricator/new-fabricator.component.ts:570:9 - error TS2322:
    Type 'Observable<object>' is not assignable to type 'Observable<object[]>'.
      Type '{}' is missing the following properties
      from type 'object[]': length, pop, push, concat, and 26 more.
     */
    // Hmm, for | async, does need to be iterable

/* Hmm, not an "Observable" ?? Hmm. (see NYTimes Top Stories)
    myHeatAuthorizationsObservableInComponentDotNext: Observable<any>; // ye gods NO ASYNC
*/
    myHeatAuthorizationsObservableInComponentDotNext: MyThreePropsUser[]; // or, easier, any // ye gods NO ASYNC
/*
    myHeatAuthorizationsObservableInComponentDotNext: []; // or, easier, any // ye gods NO ASYNC
*/
    // keeping the name but changing the type. cheers.
    // TODO CHANGE THE NAME Remove 'Observable' for it ain't one. Yeesh.
    //  AND get this DotNext data onto the MatTableDataSource okay? Okay. 20200514-1736 whew <<
    //  well, it only works if you click "Dot-Next" an embarrassing TWO TIMES (yeesh-issimo)


    /* Okay - the class member variables declared above are:

    "DOT-PIPE"
    1.A.) In myGetHttpHeatUsersDotPipe(), it is going to be assigned (LHS) what
    is returned from the Service's "DotPipe()" method for getting Heat Users,
    the which will be an Observable<object>
    1.B.) Also in same myGetHttpHeatUsersDotPipe(), we do an explicit
    ".subscribe()" *off of* this Observable, right here in the Component!
    We can then get at the data inside and use etc.
    (e.g. MatTableDataSource, or non-'async' rendering to HTML template. very cool.)

    "DOT-NEXT/SUBSCRIBE"
    2) The "DotNext" variant is going to, in ngOnInit(), explicitly ".subscribe()"to this
    Observable created over in the Service: myHeatUserInfoObservableInService$
    (Note that the "DotPipe" version makes NO use nor reference to that Service Observable.)
     */
    private myHeatUsersSubscription: Subscription;

    // FILE CHOOSER / SELECTOR
    // https://stackblitz.com/edit/angular-material-file-select?file=src%2Fapp%2Fapp.component.ts
    @ViewChild('myFileInput') myFileInput;
    myFile: File | null = null;

    // For simple MatList we had simple array of objects [{username, email, institutionName}]
    educators: MyThreePropsUserFlat[]; // << myParseOutEmails() triggers this, to write to List
    // educators: any[]; // << myParseOutEmails() triggers this, to write to List
    educatorsLength = 0; // Needed for a 'count' on template
    // For MatTable, we need this MatTableDataSource thingie:
    // DATASOURCE.data is that educators array thingie
    myEducatorsDataSource = new MatTableDataSource();
    myColumnsToDisplay = ['username', 'email', 'institutionName'];
    @ViewChild(MatPaginator)myPaginator: MatPaginator; // {static: false } nor true either. didn't help. leaving out. cheers?

    @ViewChild(MatSort, { static: false }) mySort: MatSort;

    showTableDataIsHere = false; // Not using
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

    // private threeUserPropertiesForTableArray: any;
    threeUserPropertiesForTableArray: MyThreePropsUserFlat[]; // any;
    threeUserPropertiesForTableArrayLength = 0; // for counter on template
/* We assign data to this in the "DotPipe()" method
     let threeUserPropertiesForTableArray: [];
     { username, email, institutionName }

     Interesting Error, re: 'private'
     "Private field cannot be resolved when using the AOT compiler"  << interesting. hmm.

     error TS2341: Property 'threeUserPropertiesForTableArray' is private
     and only accessible within class 'NewFabricatorComponent'.

    279         <mat-list-item *ngFor="let oneguy of threeUserPropertiesForTableArray">
 */

  constructor(
      private myRouter: Router,
      private myFabricatorService: FabricatorService,
  ) { }

  ngOnInit(): void {

    this.myFabricatorFormControlStudentIncrementerCounter = new FormControl(
        // N.B. HTML Input field is type="number" (non-numbers not allowed)
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
        // N.B. HTML Input field is type="number" (non-numbers not allowed)
        '',
        {validators: [
            Validators.required,
            Validators.min(1),
          ]}
    );

    const myRegExRightHere = new RegExp(/^[0-9a-zA-Z.]+$/);
    /*
    working correctly ( I do believe )
    Essentially: Correctly shows error, if you've introduced a
    hyphen into your Group name.
    It had been that it only showed the error when you typed
    a hyphen in the leftmost position. A hyphen introduced
    subsequently was not getting detected, no error thrown. Not good.
    Now it does.

    Background re: hyphen:
    We are not allowing hyphen within the
    Group name. We allow the period, if you need a separator.
    (The hyphen is reserved for the separator for all the parts
    of the filename.)

    Important:
    1. Yes better as new up a RegEx (than inline pattern below)
    2. Use / /  not " " or '  ' to send in your pattern parameter
    3. Do not use /g  nor , flag: 'g'
    4. Needed ^ at beginning and $ at end
     */

    this.myFabricatorFormControlGroup = new FormControl(
        // N.B. HTML Input field is type="text" (all sorts of stuff allowed)
        '',
        // ALPHA-NUMERIC, PERIOD ('.'), and HYPHEN ('-') are O.K.: /[0-9a-zA-Z.-]/
        // e.g. 'Abc-123.75' or '01.AG-Econ-200' etc.
        // TODONE DROPPED HYPHEN (complicates things as HYPHEN is separator) /[0-9a-zA-Z.]/
        // e.g. 'Abc.123.75' or '01.AG.Econ.200' etc.
        {validators: [
                Validators.required,
                Validators.pattern(myRegExRightHere),
/* Trying to new up a RegEx instead
                Validators.pattern(/[0-9a-zA-Z.]+/), // << No more /g ? // << No (more) hyphen // /[0-9a-zA-Z.]+/g
*/
            // N.B. Pattern matches/supports .fabricateEmailAddresses() regex
            // used to convert LIST of strings into STACK of strings (see below)

                /* ISSUE I AM FACING (<< NOW Fixed, above with the new RegExp())
                I believe above RegEx to be correct (see https://regexr.com)
                And, when I enter a hyphen as first character, it correctly catches it (good).
                But, when I enter other characters, the subsequent re-run of Angular
                Validation "updateOn" "change" does NOT correctly catch this string,
                that now DOES have a hyphen. Hmm!!

                https://github.com/angular/angular/issues/14028

Hmm, something about "don't use global '/g' !!" (who k-new)
https://github.com/angular/angular/issues/14028#issuecomment-487524943
https://stackoverflow.com/questions/2141974/javascript-regex-literal-with-g-used-multiple-times

                 */
          ]}
    );

    this.myFabricatorFormGroup = new FormGroup({
      myFabricatorFormControlStudentIncrementerCounterName: this.myFabricatorFormControlStudentIncrementerCounter,
      myFabricatorFormControlNumberOfRowsName  : this.myFabricatorFormControlNumberOfRows,
      myFabricatorFormControlGroupName: this.myFabricatorFormControlGroup

    });

    this.myOwnErrorStateMatcher = new MyErrorStateMatcherClass();


    /*
    JSON FING
    https://www.techiediaries.com/import-local-json-files-in-typescript/

    JSON Data! ?
Module
default:
data: {users: Array(112), size: 115, totalElements: 112, totalPages: 1, number: 0}
errors: []
     */
/* No Longer Used Here. See HeatJsonComponent
    console.log('JSON Data! ? ', data);
*/
    /* SAMPLE USER
    {"errors":[],"data":{
"users":[
{
"username":"arkangel.cordero",
"profile":{
	"firstName":"ARKANGEL",
	"lastName":"CORDERO",
	"email":"ARKANGEL.CORDERO@INCAE.EDU",
	"institutionId":"001U000000BfHWSIA3",
	"institutionName":"INCAE Business School",
	"institutionWebSiteUrl":"Pending",
	"department":"Management",
	"title":"Visiting Professor",
	"authorizationStatus":"ACTIVE",
	"authorizationDate":"2018-10-14 22:15:33.568",
	"phones":[],
	"addresses":[
		{"id":140810,
		"street1":"INCAE Business School",
		"street2":"Km. 10 1/2 Carretera Sur",
		"city":"Managua",
		"zip":"00000",
		"state":"Managua, Nicaragua",
		"country":"NI",
		"verified":false,
		"shipping":false}
		],
	"expirationDate":"2019-10-14 22:15:33.568",
	"fullName":"ARKANGEL CORDERO",
	"id":8327370
	},
"primaryRole":"ROLE_EDU_PREM",
"primaryRoleName":"Educator Premium",
"roles":["ROLE_EDU_PREM"],
"userPermissions":[],
"rolePermissions":[
	"PERM_VIEW_TEST_BANK",...,"PERM_VIEW_COLLECTION"
	],
"createdDate":"2018-04-25T23:50:02.000+0000",
"lastModifiedDate":"2018-04-25T23:50:07.000+0000",
"id":8346445
},
     */
      // tslint:disable-next-line:max-line-length
      // console.log('FING-01 data FromHardCoded myHeatAuthorizations.data.users[0].username ', myHeatAuthorizations.data.users[0].username);
    console.log('FING-02 dataFromChooser myHeatAuthorizations.data.users[0].username ');
    // NOT NOW, NOT in INIT: myHeatAuthorizations.data.users[0].username);

    // Trying here in ngOnInit ( yeah woiks )
    // this.myParseOutEmails(); // Just run it automatically. not wait for user button click
      // Seems to be okay (vs. in ngAfterViewInit())

    // noinspection UnnecessaryLocalVariableJS
    const sampleUserForDataSource = [{
        username: 'sampleForDataSource',
        email: 'emailForDataSource',
        institutionName: 'skoolForDataSource',
    }];
    this.myEducatorsDataSource.data = sampleUserForDataSource; // complains in template if empty at init. sigh.

/* WR__TEMP DOT-NEXT !!! */
    this.myHeatUsersSubscription = this.myFabricatorService.currentUserInfo$.subscribe( // << Now .subscribe() to .asObservable()
        // https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/
   // this.myHeatUsersSubscription = this.myFabricatorService.myHeatUserInfoObservableInService$.subscribe(
        // << made that Service$ BehaviorSubject private
        (yeahWhatWeGot) => {
            console.log('0000 ngOnInit yeahWhatWeGot ', yeahWhatWeGot);
            // TODONE Not Seen ! 20200514-0839
            // OK Now seen (using BehaviorSubject)
            /*
            0000 ngOnInit yeahWhatWeGot  'defaultBehaviorSubjectValueHereInService' // << string to begin

            Now: looks pretty good, on INITIAL LOAD
            0: [{}]
username: "sampleFromService",
profile: { institutionName: "skoolFromService",
           email: "emailFromService"
          }
             */
            this.myHeatAuthorizationsObservableInComponentDotNext = yeahWhatWeGot; // array of users[]
            this.mySharedSubscribeBothDotPipeAndDotNext(yeahWhatWeGot);

            // tslint:disable-next-line:max-line-length
            console.log('0000-BBBB ngOnInit this.myHeatAuthorizationsObservableInComponentDotNext ', this.myHeatAuthorizationsObservableInComponentDotNext);
            /* Yes.
            - Initial load, the one sampleFromService entry (same as above)
            - After user clicks "DOT-NEXT"
            we do get whole [] array of full user {} = :o)
            BUT ( problem is ) that is TOO LATE
             */
        }
    ); // /.subscribe()

    // console.log('4444-NGONINIT this be ? ', this); // YES: NewFabricatorComponent {}

      // console.log('5555-NGONINIT. this.threeUserPropertiesForTableArray ', this.threeUserPropertiesForTableArray); // YES: undefined

  } // /ngOnInit()

    showMeThreeUserPropertiesForTableArray() {
        console.log('5555-SHOWME. (after) this.threeUserPropertiesForTableArray ', this.threeUserPropertiesForTableArray);
        // YES: undefined (as expected!!) :)
    }

    ngAfterViewInit() {
      /* HIGHLY USEFUL:
      https://blog.angular-university.io/angular-debugging/
      Angular Debugging "Expression has changed after it was checked": Simple Explanation (and Fix)
       */
        this.myEducatorsDataSource.sort = this.mySort;
        this.myEducatorsDataSource.paginator = this.myPaginator;


        // this.myParseOutEmails(); // Just run it automatically. not wait for user button click
      // NO. Not good place to run this, here in "AfterView"

      // ***** EXPERIMENT **************************
/*
      if (this.myEducatorsDataSource.data.length === 0) {
          // Wrong IF test: console.log('999 ngAfterViewInit() this.myEducatorsDataSource.data not null'); // Yep.
          // this.showTableDataIsHere = true; // << Caused "Expression has changed after it was checked"
          console.log('998');
          setTimeout(() => { // << Yes this did prevent the debugging bug. ok.
              this.showTableDataIsHere = true;
          }); // N.B. Don't even need to specify 2nd param, "how long?"
          // We just need this to await single JavaScript "turn" !
          // Angular-University blog page (URL above)
      }
*/
        // *******************************
    } // /ngAfterViewInit()

    /* HTTP to get the file :o) WUL << See the SERVICE
     */
    myGetHttpHeatUsersDotNext() {
        /* // Fire & Forget!
        That's right. From here in Component, you just kick off
        this method over on the Service.

        You do *not* get anything directly back. No.

        Over on the Service, that method does ".subscribe()"
        on its own Observable (in the Service), and its own
        ".next()" to supply data (gotten from HTTP) to
        that Service Observable.
        myHeatUserInfoObservableInService$

        Meantime, here in the Component ngOnInit(), we have
        ".subscribed()" to that Service Observable, and we
        therefore instantly get its data updates.
        Those updates are provided to this Observable here in this Component:
        * myHeatAuthorizationsObservableInComponentDotNext *
         */

/* What (The Hell) Was This. Ignore:
        let whatServiceSent; // ? : Subscription;
        whatServiceSent = this.myFabricatorService.giveMeHeatUsersDotNext();
*/

        this.myFabricatorService.giveMeHeatUsersDotNext();

        /* Q. What About Data Access Here in TypeScript?
           A. So, while it is true the above line is "Fire & Forget", and is enough
        to get the data delivered to the Component here, to our big ol' Observable:
        * myHeatAuthorizationsObservableInComponentDotNext *
        such that it can be rendered to the HTML template -- all good ...
           BUT - We may have need for that data here in the TS. Read on:
           Easy-peasy, no?
           That same big ol' Observable with the unwieldy name can be used,
           * myHeatAuthorizationsObservableInComponentDotNext *
           you just have to ***".subscribe()"*** to it. cheers.
         */

// **************************************
/* CWAZY !!! We do NOT do a ".subscribe()"
on this semi-sorta-pseudo-"Observable" (it's not)
we get for our "DotNext" doings.
No.

        this.myHeatAuthorizationsObservableInComponentDotNext.subscribe(
            // this.mySharedSubscribeBothDotPipeAndDotNext); // /.subscribe() to DotNext !
        this.mySharedSubscribeBothDotPipeAndDotNext.bind(this));
        // That refactored-out method we are calling *IS* Old Skool; gotta use .bind()
*/

// /**************************************

        /* OK. We need to .map() or whatever
        the data we have in this thing:
        myHeatAuthorizationsObservableInComponentDotNext
        [ {}, {} ] array of full user {}

        to be in this thing:
        threeUserPropertiesForTableArray
        {
          username: eachUserInfo.username,
          email: eachUserInfo.profile.email,
          institutionName: eachUserInfo.profile.institutionName,
        }
        Then we use it in the TypeScript like so:
   this.myEducatorsDataSource.data = this.threeUserPropertiesForTableArray; // whamma-jamma
   this.threeUserPropertiesForTableArrayLength = this.threeUserPropertiesForTableArray.length;
         */
        /*
        To do that, we could:
        1) write that code again here (but, D.R.Y. right?)
        2) re-use that mad method below:
          "mySharedSubscribeBothDotPipeAndDotNext()"

          We'll try # 2.
         */
        // Param passed in is big ol' [{},{}]
// https://javascript.info/settimeout-setinterval
/*
Q. Hmm, this setTimeout() biz did not seem to make the difference I was looking for... o well.
A. Hah! (you silly)
The value held in that HeatAuth...DotNext thing
is merely the SampleUserFromService
And even after 9 seconds it is STILL
that same Sample user only.
So forget about "setTimeout()"...
*/
/*
        setTimeout(
            this.mySharedSubscribeBothDotPipeAndDotNext,
            9000,
            this.myHeatAuthorizationsObservableInComponentDotNext); // Crazy Artificial Delay
*/
/* */
// Cool. This is (sorta) working (even though you have to click "Dot-Next" button twice) (ouch)
        this.mySharedSubscribeBothDotPipeAndDotNext(this.myHeatAuthorizationsObservableInComponentDotNext);


        // Above is (I think?) sort of fire & forget. cheers.

    } // /myGetHttpHeatUsersDotNext()

    myGetHttpHeatUsersDotPipe() {
        // Note: Below, LHS, is an Observable<object>, not a Subscription. ("LHS" friend, is "Left-Hand Side")

        /* (below)
        ERROR in src/app/fabricator/new-fabricator/new-fabricator.component.ts:570:9 - error TS2322: Type 'Observable<object>'
        is not assignable to type 'Observable<object[]>'.
      Type '{}' is missing the following properties from type 'object[]': length, pop, push, concat, and 26 more.

      TO FIX: (seemingly?)
      Both are now Observable<object[]>
      - The Service's giveMeHeatUsersDotPipe()
      - The Component's myHeatAuthorizationsObservableInComponentDotPipe
         */
        this.myHeatAuthorizationsObservableInComponentDotPipe = this.myFabricatorService
            .giveMeHeatUsersDotPipe();
        /*
        1. Great. From the above line, we obtain "observable" data,
        the which we can get *out* of that observable,
        so it can be rendered in the HTML template, by means of the Angular magic ' | async ' biz. Ok.
        YOU DON'T NEED TO .subscribe() TO IT.
        ASYNC DOES THAT FOR YOU.

        2. Now, if, for the hell of it, in addition to the
        above async biz, we would ALSO like to use,
        to get out, the
         same "observable" data right here in TS.
         (not making use of magic 'async').
        We want to assign the actual data to the MatTableDataSource. woot.
        The secret-if-not-quite-magical sauce is:
        ".subscribe()" to the observable. cheers.
         */
        this.myHeatAuthorizationsObservableInComponentDotPipe.subscribe(
            /* Whoa. Some interesting (re)-learning:
            A. Plan "A" had entire inline function right here in the .subscribe()
            B. Plan "B" became: since we do Same Thing for bot DotPipe and DotNext, let us
            *refactor* to a separate callable function. cheers.

            A. INLINE
            Okay, 2 ways to deal with this Inline function:
            A.1. ARROW () => {}
            A.2. OLD SKOOL function() {}

            So, for A.1., the usual inline function is an arrow => function. The 'this' handling all set.

            But, to do a little A.2. biz, William being William and all,
            he/I wished to explore the vagaries of ".bind()" & Etc.
            I'd recalled a variant vagary that featured this:
            ----------------------------
                    }.bind(this));
            ----------------------------
The odd bit is: hmm, how come a "." dot function thing, hanging off of a "}" ?? That's just weird.

Google didn't recall that line very well, and it took keen eyes and heaps o' patience to find this
ONLY PAGE ON THE INTERNET that shows it in use:
https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
Wot They Had:
-----------
render: function () {
    this.getAsyncData(function () {
        this.specialFunction();
        this.anotherSpecialFunction();
    }.bind(this)); // <<<<<<<<<<  THAR SHE BLOWS!!
}
-----------
Question became: How The Hell To Get This To Work, For Me.
Key things to note:
- It is an INLINE function
- It is (of course) old skool: "function() {}"
- And so yeah that .bind() crazy thing can hang directly right off that closing brace: }.bind(this)); whoa.


PLAN B. = "REFACTORING" / "RE-USE" / NIRVANA !!! !!!
PARAMETER PASS IN A FUNCTION
B.1. Try to make that work WITHOUT any use of .bind() << Hah!
B.2. Figger out how to get .bind() to work right & Etc. << OK

N.B. To do this stuff, we COMMENT OUT the entire A. Inline Function
B.1. The thing worth noting here, when I did *not* use .bind(this),
was the CONFUSION I created for myself.

In the refactored-out method, I had two "this." class members to try to access.
In sum, I was not accessing either one of them.
But (insert CONFUSION here) I Did Not Know That. oi!
- One of them was just an Array. So, I just assigned data to it and NOBODY COMPLAINED. oi!
- The other was an Object. I tried to assign data to a ".data" property off that Object, and
the system DID COMPLAIN. ok. ok. I get it. Kinda. Sorta.
(was bugging me why one was "working" (hah!) while the other was, well,
trying to show me how stupid I really was.) oi!
As you can imagine, the Array one turned out to be me very simply
and very stupidly just MAKING AN ENTIRELY NEW VARIABLE down in
the context of my refactored-out method. Same name

B.2. Once the .bind(this) was added to the calling function, things were FINE.
oi!


             */

            /*
            PLAN B.  REFACTOR
             */
// When refactored-out method we're calling is Old Skool, you gotta use .bind()
             // this.mySharedSubscribeBothDotPipeAndDotNext); // NO. << N.B. WITHOUT .bind() here...
             // this.mySharedSubscribeBothDotPipeAndDotNext.bind(this)); // YES. << N.B. .bind() here...
/* */
            // (userInfoWeGot) => { // << INLINE uptown arrow => function; no need for .bind anything
            function(userInfoWeGot) { // << INLINE old skool function; can use }.bind(this)); at end

                this.threeUserPropertiesForTableArray = userInfoWeGot.map( (eachUserInfo) => {
                    // console.log('777 eachUserInfo.username ', eachUserInfo.username); // Yes
                    return {
                        username: eachUserInfo.username,
                        email: eachUserInfo.profile.email,
                        institutionName: eachUserInfo.profile.institutionName,
                    };
                });
                // console.log('888 this.threeUserPropertiesForTableArray ', this.threeUserPropertiesForTableArray); // Yes, whole array

                this.myEducatorsDataSource.data = this.threeUserPropertiesForTableArray; // whamma-jamma
                this.threeUserPropertiesForTableArrayLength = this.threeUserPropertiesForTableArray.length;
            // } // << Inline arrow => function; no need for .bind()
            }.bind(this) // <<<<<<<<<<<< THAR SHE BLOWS !!! :o)  INLINE old skool function(). Needs .bind()
        ); // /.subscribe()
 /* */
    } // /myGetHeatUsersDotPipe()

    mySharedSubscribeBothDotPipeAndDotNext(userInfoWeGotFromBothDotPipeAndDotNext) { // << that ARRAY of users [{...},{...}]
        /* Hey Guys, Little Finding Here
        (I know, I know, "kindergarten" level, what can you do.)
        1. NO:    mySharedSubscribeBothDotPipeAndDotNext(userInfoWeGotFromBothDotPipeAndDotNext) {
        2. YES:   mySharedSubscribeBothDotPipeAndDotNext = (userInfoWeGotFromBothDotPipeAndDotNext) => {
        3. YES: (NEEDS .bind())   mySharedSubscribeBothDotPipeAndDotNext(userInfoWeGotFromBothDotPipeAndDotNext) {

        Q. What?
        A. # 1 is old skool function, and it handles 'this' in old skool way. Tlicky!
           # 2 is uptown "arrow" function (very groovy) and it Takes Care of 'this' For You. Veddy nice.
           # 3 requires *calling* function to use *** .bind(this) ***. Then it'll work even w. old skool. Bene.
        Q.2. Why? Wha-a-a? What's happening here?
        A.2. This method is being used in a **nested** fashion. It is passed in as a **parameter** to
        another function here in this Component. (Two other functions in fact. That's the point. This
        here method is getting some *re-use* (nice)).
        But watch out: when doing this "pass in a function as a parameter" biz, the 'this'
        reference ain't what you think no more, in that new, nested context. You got to take care.
         */
        console.log('7777 userInfoWeGotFromBothDotPipeAndDotNext ', userInfoWeGotFromBothDotPipeAndDotNext);
        // Yes Array of users ...

        console.log('5555-AAAA early? this.threeUserPropertiesForTableArray ', this.threeUserPropertiesForTableArray); // undefined
        // But apparently okay for use in next line. hmm.
        console.log('4444 this be ? ', this);
        /* Hmm. NOT the "NewFabricatorComponent {}" No suh.
        'this' is:
        SafeSubscriber {
          myEducatorDataSource: Array(94) [{}],
          threeUserPropertiesForTableArray: Array(94) [{}],
        }
         */

        this.threeUserPropertiesForTableArray = userInfoWeGotFromBothDotPipeAndDotNext.map( (eachUserInfo) => {
            return {
                username: eachUserInfo.username,
                email: eachUserInfo.profile.email,
                institutionName: eachUserInfo.profile.institutionName,
            };
        });
        console.log('5555-BBBB after. this.threeUserPropertiesForTableArray ', this.threeUserPropertiesForTableArray);
        // yes. 3 properties. good.

        console.log('6666-AAAA this.myEducatorsDataSource ', this.myEducatorsDataSource);
        /* WITH BIND: Huh! It DOES find it, with our initial sample record:
         {username: "sample", email: "email", institutionName: "skool"}
         */
        /* WITHOUT BIND:
        undefined :o( << When NO BIND.  We are (trying to) be fixing that. :o) w-i-p
         */
        // fwiw" MatTableDataSource.filteredData is the Array of 3 property items. Also _data._value too. cheers.

/*
        this.myEducatorsDataSource.data = this.threeUserPropertiesForTableArray.map(
            eachThing => eachThing // map it on, instead of whamma-jamma (?) << YES WORKED
        );
*/

        this.myEducatorsDataSource.data = this.threeUserPropertiesForTableArray; // whamma-jamma
        /*
        For above line to work, the .BIND() must be in place, properly used. Cheers.
        (Without BIND, you get "cannot find 'data' of undefined")
         */

        // this.myEducatorsDataSource = this.threeUserPropertiesForTableArray; // whamma-jamma
        /*
        The above line ain't right. Was an experiment. We are *not* to whamma-jamma an array right
        onto a MatTableDataSource. No.
         */

        console.log('6666-BBBB Now? this.myEducatorsDataSource ', this.myEducatorsDataSource);
        /* WITHOUT BIND --> No. (sad)
        core.js:5873 ERROR TypeError: Cannot set property 'data' of undefined
         */

        this.threeUserPropertiesForTableArrayLength = this.threeUserPropertiesForTableArray.length;
    }  // /mySharedSubscribeBothDotPipeAndDotNext()
    // >>>>  }.bind(this);  <<<< Hmm, apparently you don't put the bind biz here, on the function that is called. No.
    // You instead put the bind biz up on the *calling* of this function. Hmm.
    // https://github.com/microsoft/TypeScript/wiki/'this'-in-TypeScript#functionbind

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
    // "GROUP" MUST BE NUMBER
/* WORKS FINE
    this.myStackOfStringsOfAddresses = this.myListOfStringsOfAddresses
        .replace(/(student-[0-9]+-[0-9]+@hbsp.harvard.edu),/g, '$1\n');
*/
    // "GROUP" MAY BE ALPHA-NUMERIC
/* WORKS FINE
    this.myStackOfStringsOfAddresses = this.myListOfStringsOfAddresses
        .replace(/(student-[0-9a-zA-Z]+-[0-9]+@hbsp.harvard.edu),/g, '$1\n');
*/
    // "GROUP" MAY BE ALPHA-NUMERIC, PERIOD ('.'), HYPHEN ('-'): [0-9a-zA-Z.-]+
    // TODONE  DROPPED HYPHEN (complicates things as HYPHEN is separator) [0-9a-zA-Z.]+
    // N.B. Pattern matches/supports Form Input Validator for GROUP (see above)
    this.myStackOfStringsOfAddresses = this.myListOfStringsOfAddresses
        .replace(/(student-[0-9a-zA-Z.]+-[0-9]+@hbsp.harvard.edu),/g, '$1\n'); // << No longer hyphen in Group
    // N.B. NOTE THE '\n' ADDED HERE = good

    console.log('HERE IT IS! Stack of Strings of Addresses:\n =================\n');
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

  /*
  2020-05-08
  https://jira.hbsp.harvard.edu/browse/HECS-6095

   */

    ngOnDestroy() {
        if (this.myHeatUsersSubscription) {
            this.myHeatUsersSubscription.unsubscribe();
        }
        // doubtless unneeded; just sanity check
        this.educatorsLength = 0;
        this.threeUserPropertiesForTableArrayLength = 0;
    }

} // /class NewFabricatorComponent

/*
HEW-2461.txt
======================
JAVASCRIPT to create e-mail addresses to paste into Excel
======================
// TODOOLD:
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
*/

/*myArray

["student-01-0@hbsp.harvard.edu", "student-01-1@hbsp.harvard.edu",
"student-01-2@hbsp.harvard.edu", "student-01-3@hbsp.harvard.edu",
"student-01-4@hbsp.harvard.edu", "student-01-5@hbsp.harvard.edu", "student-01-6@hbsp.harvard.edu",
"student-01-7@hbsp.harvard.edu", "student-01-8@hbsp.harvard.edu", "student-01-9@hbsp.harvard.edu",
"student-01-10@hbsp.harvard.edu", "student-01-11@hbsp.harvard.edu",
"student-01-12@hbsp.harvard.edu", "student-01-13@hbsp.harvard.edu",
"student-01-14@hbsp.harvard.edu", "student-01-15@hbsp.harvard.edu", "student-01-16@hbsp.harvard.edu",
"student-01-17@hbsp.harvard.edu", "student-01-18@hbsp.harvard.edu",
"student-01-19@hbsp.harvard.edu", "student-01-20@hbsp.harvard.edu", "student-01-21@hbsp.harvard.edu",
"student-01-22@hbsp.harvard.edu", "student-01-23@hbsp.harvard.edu", "student-01-24@hbsp.harvard.edu"]*/
/*

// Get all Strings out of Array, into a single comma-separated string

myListOfStrings = myArray.toString()

*/



/*
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
