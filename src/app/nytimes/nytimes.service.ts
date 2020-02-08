import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subject, Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NYTimesService {

    nytimesApiUrlStub = 'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=';

    // myTopStoriesObservableInService: Observable<any>;
    // myTopStoriesObservableInService: Subject<any>;

    myTopStoriesObservableInService: BehaviorSubject<any> = new BehaviorSubject<any>('');

    constructor(
        private myHttp: HttpClient,
    ) { }

    /* **************************

    1. Get (all?) Top Stories
    1.A. Get Top Stories (no Observable)
    2. Get Topmost Top Story

       **************************
     */

    //     1. Get (all?) Top Stories
    getTopStories() {
        return this.myHttp.get(
            `${this.nytimesApiUrlStub}${environment['nytimes-api-key-top-stories']}`,
        ).subscribe(
            (topStoriesWeGotJSON: any) => {
                console.log('topStoriesWeGotJSON ', topStoriesWeGotJSON);
                console.log('topStoriesWeGotJSON.results (ARRAY) ', topStoriesWeGotJSON.results);
                /*

                {status: "OK",
                copyright: "Copyright (c) 2020 The New York Times Company. All Rights Reserved.",
                section: "U.S. News",
                last_updated: "2020-02-07T11:08:37-05:00",
                num_results: 28, …}
results: Array(28)
0: {section: "us",
subsection: "",
title: "Former ... Admissions Case",
abstract: "Most ... say.",
url: "https://www.nytimes.com/2020/02/07/us/douglas-hodge-college-admissions-scandal.html",
1: {section: "us",
subsection: "",
title: "After Di... Claims",
abstract: "Homeowners ... flying.",
url: "https://www.nytimes.com/2020/02/06/us/puerto-rico-insurance-tsunami.html", …}

                 */
//                return topStoriesWeGotJSON.results;

                this.myTopStoriesObservableInService.next(topStoriesWeGotJSON.results);
                console.log('this.myTopStoriesObservableInService ', this.myTopStoriesObservableInService);
                // YES. Array of results.
            }
        );
    }

    //     1.A. Get Top Stories, No Observable
    getTopStoriesNoObservable() {
        return this.myHttp.get(
            `${this.nytimesApiUrlStub}${environment['nytimes-api-key-top-stories']}`,
        ).subscribe(
            (topStoriesWeGotJSON: any) => {
                console.log('topStoriesWeGotJSON ', topStoriesWeGotJSON);
                console.log('topStoriesWeGotJSON.results (ARRAY) ', topStoriesWeGotJSON.results);
                return topStoriesWeGotJSON.results;
            }
        );
    }

    //     1.B. Get Top Stories, Dot Pipe ??
    getTopStoriesDotPipe() {
        return this.myHttp.get(
            `${this.nytimesApiUrlStub}${environment['nytimes-api-key-top-stories']}`,
        ).pipe(
            tap(
                (topStoriesWeGotJSONDotPipe: any) => {
                    console.log('TAP topStoriesWeGotJSONDotPipe ', topStoriesWeGotJSONDotPipe);
                    /* Hey! finally (w-t-f ?) worked ?
                    {status: "OK", copyright: "Copyright (c) 2020 The New York Times Company.  ...
                     */
                    console.log('TAP topStoriesWeGotJSONDotPipe.results (ARRAY) ', topStoriesWeGotJSONDotPipe.results);
                  //  return topStoriesWeGotJSONDotPipe.results;
                    /* Ya. whoa.
                    JSONDotPipe.results (ARRAY)  (28) [{…}, {…},
                     */
                }
            ),
            map(
                (topStoriesWeGotJSONDotPipe: any) => {
                    console.log('MAP topStoriesWeGotJSONDotPipe ', topStoriesWeGotJSONDotPipe);
                    // Yes, as above in TAP

                    console.log('MAP topStoriesWeGotJSONDotPipe.results (ARRAY) ', topStoriesWeGotJSONDotPipe.results);
                    // Yes, as above in TAP

                    return topStoriesWeGotJSONDotPipe.results;

/* NO. We don't do ".json()" on this, what we got back from API.
This page was kind of interesting, but not what I needed:
https://forum.ionicframework.com/t/solved-ngfor-only-supports-binding-to-iterables-such-as-arrays/59597/2

                    const stuffToReturn = topStoriesWeGotJSONDotPipe.json(); // NOPE  ERROR .json() is not a function !
                    const stuffToReturnResults = topStoriesWeGotJSONDotPipe.json().results;
                    console.log('MAP stuffToReturnResults ', stuffToReturnResults);

/!* Hmm, no...
                    return Array.of(topStoriesWeGotJSONDotPipe.results);
*!/
                    return stuffToReturnResults; // || [];
*/
                }
            ), // /map()
/*
            tap(console.log) // ?? https://blog.angular-university.io/debug-rxjs/ // << HMM did NOT do anything, for me. At first anyway.
            // Bottom line, seems I don't seem to need it.
*/
        ); // /.pipe()
    }


    //     2. Get Topmost Top Story
    getTopmostTopStory() {}
}
