import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookReviewsService } from './book-reviews.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  constructor(
      private myBookReviewsService: BookReviewsService,
  ) { }

  ngOnInit() {

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
    console.log('this.myOnSubmitAuthor() ');
    console.log(this.myFormControlAuthorFName.value);
    console.log(this.myFormControlAuthorLName.value);
    this.myAuthorFName = this.myFormControlAuthorFName.value;
    this.myAuthorLName = this.myFormControlAuthorLName.value;

    this.myBookReviewsResults = this.myBookReviewsService.getAuthorFNameLName(
        this.myAuthorFName,
        this.myAuthorLName
    );
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
