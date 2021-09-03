import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

/*
- FAILED on attempts to reach JIRA Software Cloud API directly from this browser-based Angular app
  -- Owing to no "CORS" allowed @ JIRA. okay
- Next up: Instead call my own "proxy-server-jira" back-end, to avoid CORS issue from browser front-end.
cheers.
 */

@Component({
    selector: 'app-pard-basic',
    templateUrl: './pard-basic.component.html',
    styleUrls: ['./pard-basic.component.css'],
})
export class PardBasicComponent implements OnInit {

    // whatIGotBackFromJira: any; // woot the foist
    myJiraAuthObservable: Observable<any>; // woot encore
    myJiraAuthSubscription: Subscription;

    fakeApiStuff;

    constructor(
        private myHttpClient: HttpClient,
    ) {
    }

    ngOnInit() {
        console.log('PardBasic (Parade) component here... (ngOnInit())'); // Browser console, mind.

/* NO. CORS issue
        this.myJiraAuthObservable = this.myCallJira();
*/

/* NO. STILL CORS issue
        this.myJiraAuthObservable = this.myCallJiraCORS();
*/

        /*
        Trying PROXY to avoid CORS ...
        Simplifying - just .subscribe() for now, don't worry about Observable etc.
         */
        // this.myJiraAuthObservable = this.myCallJiraPROXY('PARD-3');
        // *****************************************************
        // * COMMENTING OUT FOR NOW * (sad)
        // *****************************************************
/*
        this.myCallJiraPROXY('PARD-3')
            .subscribe(
                (whatIGot: { myJiraDataProperty: any } ) => {
                    console.log('JIRA whatIGot: ', whatIGot);
                  /!*
                    // I did my own "wrapping" of the data object, over in my Proxy Server:
                    const myWrappedJiraDataObject = { myJiraDataProperty: data }
                    res.status(200).send(myWrappedJiraDataObject); // << Working fine, sends whole object. All set.
                *!/

                    console.log('JIRA whatIGot.myJiraDataProperty: ', whatIGot.myJiraDataProperty);

                },
                (err) => {
                    console.log('myCallJiraPROXY err: ', err);
                },
                () => {
                    // done
                    console.log('myCallJiraPROXY Complete ...');
                }
            ); // /.subscribe()  myCallJiraPROXY()
*/
        // *****************************************************
        // * /COMMENTING OUT FOR NOW * (sad)
        // *****************************************************

// console.log('whatIGotBackFromJira: any turns out to be: ', this.whatIGotBackFromJira);
        /*
        Getting Somewhere!

        whatIGotBackFromJira: any turns out to be:
          Observable {_isScalar: false, source: Observable, operator: MapOperator}
         */

        // *****************************************************
        // * NOT USING *
        // *****************************************************
/*
        this.myJiraAuthSubscription = this.myJiraAuthObservable.subscribe(
            (whatWeGotSubscription) => {
                console.log('whatWeGotSubscription ', whatWeGotSubscription);
                if (whatWeGotSubscription?.error?.error) {
                    /!* Ye Olde Elvis Operator ?.
                    Lets us query the object with care.
                    This thing might be an HTTPErrorResponse. It might be an Array of User objects.
                    Just crazy.
                     *!/
                    console.log('Aw shucks HTTP error!', whatWeGotSubscription);
                } else {
                    console.log('O GOOD not an error. whatWeGotSubscription ', whatWeGotSubscription);
                }
            }
        ); // /.subscribe() myJiraAuthObservable
*/
        // *****************************************************

    } // /ngOnInit()



    /* ******************************* */
    /* *******  FAKEAPI ************** */
    /* ******************************* */
    getFakeAPI(event) {
        this.get100FakeAPI()
            .subscribe(
                (response: any) => {
                    console.log('FAKE - Ng HTTP response is ', response);
                  //  lilInspector(response[0], '');
                    /*
                      [ 0: {userId: 1, id: 1, title: "sunt aut facere ..."}
                    */
                    this.fakeApiStuff = response;
                    console.log('FAKE - Ng HTTP this.fakeApiStuff is ', this.fakeApiStuff); // [{},{}...]
                },
                (err) => {
                    console.log('FAKE - Ng HTTP err ', err);
                },
                () => { console.log('FAKE - Complete .......'); }
            );
    }


    get100FakeAPI() {
        /* FakeAPI.com
        Just put here for comparison purpose. Simpler API call, no "CORS" issues.
         */
        // "100" is the default return for "get ALL" from this free, open, "fake" API.

        return this.myHttpClient.get('https://jsonplaceholder.typicode.com/posts');

        /* Note: Here, Angular HttpClient GENERATES an Observable.
               In the calling app.component.ts, we SUBSCRIBE to that Observable.
        */
    }

    callMyCallJiraPROXY(issueIdFromForm) {
        console.log('wtf callMyCallJiraPROXY');
        this.myCallJiraPROXY(issueIdFromForm)
            .subscribe(
                (whatIGot: { myJiraDataProperty: any } ) => {
                    console.log('JIRA whatIGot: ', whatIGot);
                    /*
                    // I did my own "wrapping" of the data object, over in my Proxy Server:
                    const myWrappedJiraDataObject = { myJiraDataProperty: data }
                    res.status(200).send(myWrappedJiraDataObject); // << Working fine, sends whole object. All set.
                    */

                    console.log('JIRA whatIGot.myJiraDataProperty: ', whatIGot.myJiraDataProperty);

                },
                (err) => {
                    console.log('myCallJiraPROXY err: ', err);
                },
                () => {
                    // done
                    console.log('myCallJiraPROXY Complete ...');
                }
            ); // /.subscribe()  callMyCallJiraPROXY()
    }


    myCallJiraPROXY(issueId: string): any {
        /*
        Here inside Component we are lazily running a
        method that belongs properly over in a Service = TODO
         */

        console.log('wtf 2 myCallJiraPROXY', issueId);

        return this.myHttpClient.get(
            `http://0.0.0.0:3000/issue/${issueId}`);
    }

    myCallJiraCORS(): any {
        /*
        THIS FAILED. ATTEMPT TO USE SOME 3RD PARTY'S "CORS PROXY". FUGGHEDABOUDID.
         */
        /*
Request URL: https://cors-anywhere.herokuapp.com/https://wreilly2001.atlassian.net/rest/api/3/issue/PARD-3
Request Method: GET
Status Code: 404 Not Found

         errorMessages: ["Issue does not exist or you do not have permission to see it."]

         */

        return this.myHttpClient.get(
            'https://cors-anywhere.herokuapp.com/https://wreilly2001.atlassian.net/rest/api/3/issue/PARD-333',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${environment['atlassian-jira-basic-auth']}`,
                }
            }
        ).pipe(
            map(
                (whatWeGot: any) => {
                    console.log('myCallJiraCORS() .pipe map() whatWeGot ', whatWeGot);
                    return whatWeGot;
                }
            ),
            catchError(
                (myCatchError): Observable<any> => {
                    console.log('CORS ERROR - myCatchError: ', myCatchError);

                    return of(myCatchError);
                }
            )


        );
    }

    myCallJira(): any {
        /*
        THIS HIT "NO CORS" ISSUE ON JIRA SOFTWARE
         */
        return this.myHttpClient.get(
            'https://wreilly2001.atlassian.net/rest/api/3/issue/PARD-3',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${environment['atlassian-jira-basic-auth']}`,
                }
            }
        ).pipe(
            map(
                (whatWeGot: any) => {
                    console.log('myCallJira() .pipe map() whatWeGot ', whatWeGot);
                    return whatWeGot;
                }
            )
        );
    }

}
