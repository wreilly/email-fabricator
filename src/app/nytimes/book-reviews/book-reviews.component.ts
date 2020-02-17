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

  myBookReviewsResults: Observable<any>;
  // 01 - { status: "OK", ... results: [ {}, {} ] }
  // 02 - [ {}, {} ]

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
    )

    this.myFormControlAuthorLName = new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(2),
        ]
    )

    this.myFormGroup = new FormGroup({
      myFormControlAuthorFNameName: this.myFormControlAuthorFName,
      myFormControlAuthorLNameName: this.myFormControlAuthorLName
    });

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
    this.myBookReviewsResults = this.myBookReviewsService.getAuthorFNameLName(
        this.myAuthorFName,
        this.myAuthorLName
    ).pipe(
        tap( // << Just pass through the desired results
            (whatWeGot) => {
              console.log(whatWeGot); // Yes [ {}, {} ]
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
