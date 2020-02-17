import { Injectable } from '@angular/core';
/* Apparently not ...
import {NYTimesModule} from '../nytimes.module';
*/
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root' // << Q.2. Does this work ??
    // providedIn: NYTimesModule // << Q.1. Does this work ??
    /* A.1. Apparently Not !!!

    WARNING in Circular dependency detected:
src/app/nytimes/book-reviews/book-reviews.component.ts ->
 src/app/nytimes/book-reviews/book-reviews.service.ts ->
  src/app/nytimes/nytimes.module.ts ->
   src/app/nytimes/nytimes-routing.module.ts ->
    src/app/nytimes/book-reviews/book-reviews.component.ts

     */
})
export class BookReviewsService {
    /* ***************************
       TABLE of CONTENTS

       1. Get Author's Books by FName, LName
       2. t.b.d.
      ****************************
     */

    constructor(
        private myHttp: HttpClient,
    ) { }

    /*
    1. Get Author's Books by FName, LName

    E.g.,
    'https://api.nytimes.com/svc/books/v3/reviews.json?author=Mark%20Lilla&api-key=STMA4A1DcdjKxY68rwVzYFAlC2EficSF'

    'https://api.nytimes.com/svc/books/v3/reviews.json?
    author=Mark%20Lilla&
    api-key=STMA4A1DcdjKxY68rwVzYFAlC2EficSF'

     */

    // 1.
    getAuthorFNameLName(theFName, theLName)  {
        console.log('this.getAuthorFNameLName() ', theFName + ' ' + theLName);
        const authorURLStub = 'https://api.nytimes.com/svc/books/v3/reviews.json?author=';
        const myKey = environment['nytimes-api-key-top-stories'];

        console.log(`${authorURLStub}${theFName}%20${theLName}&api-key=${myKey}`);
        console.log('WTF!');

        return this.myHttp.get(
            `${authorURLStub}${theFName}%20${theLName}&api-key=${myKey}`,
        ).pipe(
            // 02 - .pipe() HERE in Service
            map(
                (whatWeGot: any) => {
                    // !!! N.B. Make 'whatWeGot' to be of type  : any, NOT the mere default : Object  Cheers.

                    console.log(whatWeGot);
                    /* Yes - whole Object
                    {status: "OK", copyright: "Copyright (c) 2020 The New York Times Company.
                    All Rights Reserved.", num_results: 4, results: Array(4)}
status: "OK" ...
                     */

                    return whatWeGot; // The WHOLE object. NOT just that desired ARRAY (of BookReviews objects)
/* NO. Short-sighted. We need OTHER info than just that array. */
                    // return whatWeGot.results; // that desired ARRAY (of BookReviews objects)

                }
            )
        ); // /.pipe()
        // 01 - Nah  .subscribe(); // << We .pipe() on Component instead... << WRONG. See 02 just above.
    } // /getAuthorFNameLName()

}
