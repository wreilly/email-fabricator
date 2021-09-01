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

    constructor(
        private myHttpClient: HttpClient,
    ) {
    }

    ngOnInit() {
        console.log('PardBasic (Parade) component here... (ngOnInit())'); // Browser console, mind.
        this.myJiraAuthObservable = this.myCallJiraCORS();
        // console.log('whatIGotBackFromJira: any turns out to be: ', this.whatIGotBackFromJira);
        /*
        Getting Somewhere!

        whatIGotBackFromJira: any turns out to be:
          Observable {_isScalar: false, source: Observable, operator: MapOperator}
         */

        this.myJiraAuthSubscription = this.myJiraAuthObservable.subscribe(
            (whatWeGotSubscription) => {
                console.log('whatWeGotSubscription ', whatWeGotSubscription);
                if (whatWeGotSubscription?.error?.error) {
                    /* Ye Olde Elvis Operator ?.
                    Lets us query the object with care.
                    This thing might be an HTTPErrorResponse. It might be an Array of User objects.
                    Just crazy.
                     */
                    console.log('Aw shucks HTTP error!', whatWeGotSubscription);
                } else {
                    console.log('O GOOD not an error. whatWeGotSubscription ', whatWeGotSubscription);
                }
            }
        );
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
