import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
// Above rare example of MaterialDesign item NOT in (shared) MyMaterialModule. Cheers.

import { BookReviewsService } from './book-reviews.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class MyErrorStateMatcherNotSubmitted implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(control && control.invalid && ( control.dirty || control.touched ));
        // Here in My Custom we OMIT the form.isSubmitted (which is default)
        // https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054
        // TL;DR "The !! (double bang) logical operators return a value’s truthy value."

        // https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown
    }
}

interface MyBookReviewsResultsArray {
    /* E.g.
    book_author: "Annie Dillard"
book_title: "For the Time Being"
byline: "WENDY LESSER"
isbn13: ["9780375403804"]
publication_dt: "1999-03-28"
summary: ""
uri: "nyt://book/00000000-0000-0000-0000-000000000000"
url: "http://www.nytimes.com/1999/03/28/books/deliver-us-from-evil.html"
uuid: "00000000-0000-0000-0000-000000000000"
     */
    book_author: string;
    book_title: string;
    byline: string;
    isbn13: string[];
    publication_dt: string;
    summary: string;
    uri: string;
    url: string;
    uuid: string;
}

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css']
})
export class BookReviewsComponent implements OnInit {

  myFormControlAuthorFName: FormControl;
  myFormControlAuthorLName: FormControl;
  myFormGroup: FormGroup;
  myVeryOwnErrorStateMatcherNotSubmitted: ErrorStateMatcher;

  myAuthorFName: string;
  myAuthorLName: string;

    // myBookReviewsResults$: Observable<any>; // ENTIRE Object
    myBookReviewsResults$: Observable<{
        status: string;
        copyright: string;
        num_results: number;
        results: MyBookReviewsResultsArray[]
    }>; // ENTIRE Object

    myBookReviewResultsDataValuesHereInComponent: {
        status: string;
        copyright: string;
        num_results: number;
        results: MyBookReviewsResultsArray[]
    };

  // 01 - { status: "OK", ... results: [ {}, {} ] }
  // 02 - [ {}, {} ]
  // myBookReviewsResultsArray: any; // The Array of Book Review {}s in that Object << NO. Needs to be an Observable, methinks.
  // myBookReviewsResultsArray: []; // The Array of Book Review {}s in that Object << NO. Needs to be an Observable, methinks.


  myBookReviewsResultsArraySimply: MyBookReviewsResultsArray[]; // << This turns out to be NOT an Observable. Just []
    // TODONE ! :o) Rename myBookReviewsResultsArrayObservable$ to myBookReviewsResultsArraySimply (or something like that)
  // : Observable<any>[]; // The Array of Book Review {}s in that Object

  // *******  IS LOADING *******
  // Working! (albeit humbly) :o)
  // Very simple logic, right within Component
  // Next: TODO NGRX & SharedModule & Service Etc.

  // YES works
  myIsLoadingPlainBool = false; // = true; // : boolean; // = false ?

  /* No, re: 'Subject' - I think I do need to initialize, w falsy value (see BehaviorSubject)

    myIsLoadingObservableInComponent$: Subject<boolean> = new Subject<boolean>();
  */

  /* YES works */
  myIsLoadingObservableInComponent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
      private myBookReviewsService: BookReviewsService,
  ) { }

  ngOnInit() {
    console.log('this.myIsLoadingObservableInComponent$.value ', this.myIsLoadingObservableInComponent$.value);
    // Yes: false  N.B. important to get the ".value"

    this.myFormControlAuthorFName = new FormControl(
        '',
        [
            Validators.required,
            Validators.minLength(2),
            ]
    );

    this.myFormControlAuthorLName = new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
        ]
    );

    this.myFormGroup = new FormGroup({
      myFormControlAuthorFNameName: this.myFormControlAuthorFName,
      myFormControlAuthorLNameName: this.myFormControlAuthorLName
    });

    this.myVeryOwnErrorStateMatcherNotSubmitted = new MyErrorStateMatcherNotSubmitted();

  }

  myOnSubmitAuthorAnnieDillard(fNameHardCoded, lNameHardCoded) {
      this.myIsLoadingPlainBool = true;
      this.myIsLoadingObservableInComponent$.next(true);
      this.myBookReviewsResults$ = this.myBookReviewsService.getAuthorFNameLName(
          fNameHardCoded,
          lNameHardCoded
      ).pipe(
          tap(
              (whatWeGotHardCoded) => {
                  this.myBookReviewsResultsArraySimply = whatWeGotHardCoded.results;
                  this.myBookReviewResultsDataValuesHereInComponent = whatWeGotHardCoded;
                  setTimeout(
                      () => {
                          this.myIsLoadingPlainBool = false;
                          this.myIsLoadingObservableInComponent$.next(false);
                      }
                      , 1000
                  );
              }
          )
      );
  }

  myOnSubmitAuthor() {
    this.myIsLoadingPlainBool = true;
    this.myIsLoadingObservableInComponent$.next(true);
    console.log('this.myOnSubmitAuthor() ');
    console.log(this.myFormControlAuthorFName.value);
    console.log(this.myFormControlAuthorLName.value);
    this.myAuthorFName = this.myFormControlAuthorFName.value;
    this.myAuthorLName = this.myFormControlAuthorLName.value;

    /* # 04 Do .pipe( tap() ) here. Huh.
    Q. Why?
    A. To allow logic herein viz. isLoading
    */
    // The ENTIRE Object (includes 'num_results')
    this.myBookReviewsResults$ = this.myBookReviewsService.getAuthorFNameLName(
        this.myAuthorFName,
        this.myAuthorLName
    ).pipe(
        tap( // << Just pass through the desired results
            (whatWeGot) => {
              console.log('whatWeGot by gumbo ', whatWeGot); // Yes [ {}, {} ]

                // No. Seems to cause Service HTTP call to NOT get fired
                // this.myBookReviewsResultsArray = whatWeGot.results; // whamma-jamma ?
              this.myBookReviewsResultsArraySimply = whatWeGot.results; // whamma-jamma ? YEP
              console.log('999 this.myBookReviewsResultsArraySimply ', this.myBookReviewsResultsArraySimply);
              // yep array (but NOT an Observable !!!)

                /* 002

                 */
              this.myBookReviewResultsDataValuesHereInComponent = whatWeGot; // whamma-jamma ?? YEP

                /* 001
                Hmm. I just better defined the TYPE for 'myBookReviewResults' (above).
                Now the property .num_results *IS* recognized (by the IDE) over on the TEMPLATE (via | async )
                But - the property . num_results is still *NOT* recognized right here
                in the Component TS:   Hmm.
                Do I have to .subscribe() ??? to it herein, to get at the property? Oi.
                 */
                // this.myBookReviewsResults$.num_results; // << ??
                // console.log(this.myBookReviewsResults$.num_results); // << ??


/* NO. Caused Infinite Loop. sigh.
              this.myBookReviewsResults$.subscribe(
*/
                  /*
                  INTERESTING.
                  Apparently this .subscribe() above, within the .pipe(tap()),
                  is causing a LOOP, INFINITE (sigh), and I wind up calling NYTimes API
                  some 10 times in a row (till they kick me out).

                  I'm sorta on the right track, that you need to .subscribe() to "get at"
                  the Observable values, here in the TS Component. Bueno.
                  Just doing it miserably wrong to do so here inside .pipe(tap()).

                  Here is a note from S.O., on using .subscribe() like that:
https://stackoverflow.com/questions/36803389/async-pipe-does-not-fill-object-data-into-template
"It is probably easier to assign the object
(that is inside the Observable, hero$ below) to a property of the component,
using component logic:

this._heroService.hero$.subscribe(data => this.hero = data.json());

and then use NgIf or the Elvis/safe navigation operator to display the data in the view:

<div *ngIf="hero">{{hero.name}}</div>
 or
<div>{{hero?.name}}</div>"
                   */
/* BOTTOM of our Infinite Loop-causing biz.
                    (whatTheHell) => {
                        console.log(whatTheHell);
                        console.log(whatTheHell.num_results);
                    }
                ); // << ??
*/

              // Fake that our (real) network call, took a whole 1 second (so we can see spinners!)
              setTimeout(() => {
                    this.myIsLoadingPlainBool = false;
                    this.myIsLoadingObservableInComponent$.next(false);
                  },
                  1000);
            }
        )
    );
/* # 03 (I think?) YES worked. No .subscribe() here. Use | async in template. Cheers.

    this.myBookReviewsResults$ = this.myBookReviewsService.getAuthorFNameLName(
        this.myAuthorFName,
        this.myAuthorLName
    );
*/
    // this.myIsLoadingPlainBool = false; // << No, gonna be too quick. Sync, not async. Not right.
    // Need to tuck this above, INSIDE the return .subscribe() or similar. sheesh. okay TODO

/* Hmm 02 Looks like instead of .subscribe()
immediately to the return from the Service << No
Instead (above 03) we should ASSIGN the return
from the Service to our (local, Component) Observable.
Let THAT do a .subscribe(). Hmm

No, not right here:
        .subscribe(
        (whatWeGot) => {
          console.log('whatWeGot as "NestedResults" ', whatWeGot);
          /!* Yes
          [{…}, {…}, {…}, {…}]
           *!/
          this.myBookReviewsResults$ = whatWeGot;
        }
    );
*/
/* Hmm 01. Looks like we should NOT do .PIPE() but instead .SUBSCRIBE() here

        .pipe(
        map(
            (whatWeGot) => {
              console.log('whatWeGot ', whatWeGot);
              // this.myBookReviewsResults$ = whatWeGot;
            }
        )
    );
*/

    this.myResetForm();

  } // /myOnSubmitAuthor()

    myResetForm() {
      this.myFormGroup.reset();
      /* ErrorStateMatcher
      Needed, because default is to call the Form INVALID if it HAS BEEN SUBMITTED.
      Our state is just that - we just Submitted.
      So we want to OMIT the "Submitted" test/requirement from our (custom) ErrorStateMatcher. Cheers.
      https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown

       */
    }



}
