import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookReviewsService } from './book-reviews.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css']
})
export class BookReviewsComponent implements OnInit {

  myFormControlAuthorFName: FormControl;
  myFormControlAuthorLName: FormControl;
  myFormGroup: FormGroup;

  myAuthorFName: string;
  myAuthorLName: string;

    // myBookReviewsResults: Observable<any>; // ENTIRE Object
    myBookReviewsResults: Observable<{ status: string; copyright: string; num_results: number; results: []}>; // ENTIRE Object
    myBookReviewResultsDataValuesHereInComponent: { status: string; copyright: string; num_results: number; results: []};

  // 01 - { status: "OK", ... results: [ {}, {} ] }
  // 02 - [ {}, {} ]
  // myBookReviewsResultsArray: any; // The Array of Book Review {}s in that Object << NO. Needs to be an Observable, methinks.
  // myBookReviewsResultsArray: []; // The Array of Book Review {}s in that Object << NO. Needs to be an Observable, methinks.


  myBookReviewsResultsArrayObservable$; // << This turns out to be NOT an Observable. Just []
    // TODO Rename myBookReviewsResultsArrayObservable$ to myBookReviewsResultsArraySimply (or something like that)
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

  }

  myFAKEOnSubmitAuthor() { // FAKE
      this.myBookReviewsResults = this.myBookReviewsService.getAuthorFNameLName(
          'Annie',
          'Dillard'
/*
          this.myAuthorFName,
          this.myAuthorLName
*/
      ).pipe(
          tap( // << Just pass through the desired results
              (whatWeGot) => {
                  console.log('whatWeGot by gumbo FAKE ', whatWeGot); // Yes [ {},
              }));
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
    this.myBookReviewsResults = this.myBookReviewsService.getAuthorFNameLName(
        this.myAuthorFName,
        this.myAuthorLName
    ).pipe(
        tap( // << Just pass through the desired results
            (whatWeGot) => {
              console.log('whatWeGot by gumbo ', whatWeGot); // Yes [ {}, {} ]

                // No. Seems to cause Service HTTP call to NOT get fired
                // this.myBookReviewsResultsArray = whatWeGot.results; // whamma-jamma ?
              this.myBookReviewsResultsArrayObservable$ = whatWeGot.results; // whamma-jamma ?
              console.log('999 this.myBookReviewsResultsArrayObservable$ ', this.myBookReviewsResultsArrayObservable$);
              // yep array (but NOT an Observable !!!)

                /* 002

                 */
              this.myBookReviewResultsDataValuesHereInComponent = whatWeGot; // whamma-jamma ??

                /* 001
                Hmm. I just better defined the TYPE for 'myBookReviewResults' (above).
                Now the property .num_results *IS* recognized (by the IDE) over on the TEMPLATE (via | async )
                But - the property . num_results is still *NOT* recognized right here
                in the Component TS:   Hmm.
                Do I have to .subscribe() ??? to it herein, to get at the property? Oi.
                 */
                // this.myBookReviewsResults.num_results; // << ??
                // console.log(this.myBookReviewsResults.num_results); // << ??


/* NO. Caused Infinite Loop. sigh.
              this.myBookReviewsResults.subscribe(
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

    this.myBookReviewsResults = this.myBookReviewsService.getAuthorFNameLName(
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
          this.myBookReviewsResults = whatWeGot;
        }
    );
*/
/* Hmm 01. Looks like we should NOT do .PIPE() but instead .SUBSCRIBE() here

        .pipe(
        map(
            (whatWeGot) => {
              console.log('whatWeGot ', whatWeGot);
              // this.myBookReviewsResults = whatWeGot;
            }
        )
    );
*/
  }



}
