import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject, Subscription, Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

// NO: << Hmm. May be?    Not used. This is small subset of entire "user" with many more properties
export interface MyThreePropsUser {
    username: string; // hmm, removing didn't break anything
    profile: {
        email: string;
        institutionName: string;
    };
    // broken: string; // hmm, adding didn't break anything
}

// YES: Used for MatTableDataSource.
export interface MyThreePropsUserFlat {
    username: string;
    email: string;
    institutionName: string;
}


@Injectable({
    providedIn: 'root'
})
export class FabricatorService {
/* NEW: HTTP
For trying to get HEAT data from services.hbsp.harvard.edu
 */
/* WR__TEMP  Used with "DOT-NEXT" */
    // myHeatUserInfoObservableInService$ = new Subject<any>();

    sampleUserFromService = [{
        username: 'sampleFromService',
        profile: {
            email: 'emailFromService',
            institutionName: 'skoolFromService',
        }
    }];

    private myHeatUserInfoObservableInService$ = new BehaviorSubject<any>(this.sampleUserFromService);
    currentUserInfo$ = this.myHeatUserInfoObservableInService$.asObservable();
    // https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/
    // (['defaultBehaviorSubjectValueHereInService']);
/*
private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
 */
    constructor(
        private myHttpClient: HttpClient,
    ) { }

    /* Not Using
    myStackOfStringsOfAddressesInServiceSubject = new Subject<string>();
*/
    myStackOfStringsOfAddressesInServiceBehaviorSubject = new BehaviorSubject<string>(''); // 'BehaviorSubject fake initial _value'

    sendInStackResults(stuffSentInToService: string) {
        console.log('stuffSentInToService ', stuffSentInToService); // yep

        /* Not Using
                this.myStackOfStringsOfAddressesInServiceSubject.next(stuffSentInToService);
        */
        this.myStackOfStringsOfAddressesInServiceBehaviorSubject.next(stuffSentInToService);
    } // /sendInStackResults()

    giveMeHeatUsersDotNext(): void { // << : NO return ?? Seems not needed/used/doing-anything
        // Seems also the Component invokes this in FIRE & FORGET manner, right? right.

 // giveMeHeatUsersDotNext(): object { // << : return type ??
        this.myHttpClient.get( // << N.B. no 'return' = ok. No <typing> either
        // this.myHttpClient.get<MyThreePropsUser>( // << this <typing> didn't work out. Seems unneeded.
        // The complete response body is
        //  far larger than my little 3-prop interface

        // return this.myHttpClient.get<MyThreePropsUser>( // << Q. should this be 'return'? (wasn't) hmm.
            'https://services.hbsp.harvard.edu/api/admin/users/authorization-status/PENDING',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${environment['admin-user-token']}`,
                },
                params: {
                    size: '115'
                }
            }
        ).subscribe(
            (userInfoWeSubscribedToInService) => { // WR__ Wondering... Not 'any'. Default seems to be : Object
                // Guess that holds the JSON of the HTTP Response entire. okay...

            // (userInfoWeSubscribedToInService: any) => { // WR__ Warning: More loosey, more goosey. Read 'em and weep.
                console.log('userInfoWeSubscribedToInService ', userInfoWeSubscribedToInService);
                /* Yes: This is JSON Response entire (body of HTTP Response)
                {errors: Array(0), data: {users: Array(35)...…}}
                 */

                // Yes [''] bracket notation works
                console.log('NOGO 01 ? GOES :o) userInfoWeSubscribedToInService[\'data\'] ', userInfoWeSubscribedToInService['data']);

                // tslint:disable-next-line:max-line-length
                console.log('NOGO 01-A ? GOES :o)userInfoWeSubscribedToInService[\'data\'][\'users\'][0][\'username\']) ', userInfoWeSubscribedToInService['data']['users'][0]['username']); // << Very nice. My buddy, arkangel.cordero
                // NO? YES! Does work; albeit TSLint complainy.
                // "TSLint object access via string-literals is disallowed"
                /* YES:
                {users: Array(62), size: 115, totalElements: 62, totalPages: 1, number: 0}
                 */

               // BREAKS COMPILATION !!! "." dot-notation
                // NO: console.log('NOGO 02 ? userInfoWeSubscribedToInService.data ',
                // userInfoWeSubscribedToInService.data);
                // ERROR "Property 'data' does not exist on type 'Object'"

// https://angular.io/guide/http#requesting-a-typed-response
                console.log('NIFTY 01 HEY (userInfoWeSubscribedToInService as any).data ', (userInfoWeSubscribedToInService as any).data);
                // 01 nifty trick. wtf.
                /* YES!
                {users: Array(60), size: 115, totalElements: 60, totalPages: 1, number: 0}
                 */
                console.log('NIFTY 02 HEY (userInfoWeSubscribedToInService as any).data.users ', (userInfoWeSubscribedToInService as any)
                    .data.users);
                // nifty 02
                /* YES!
                [{…}, {…},]
                 */
                // tslint:disable-next-line:max-line-length
                console.log('NIFTY 03 HEY (userInfoWeSubscribedToInService as any).data.users[0].username ', (userInfoWeSubscribedToInService as any)
                    .data.users[0].username); // nifty 03
                /* YES!
                arkangel.cordero << My buddy
                 */

/* WR__TEMP */
                this.myHeatUserInfoObservableInService$.next( (userInfoWeSubscribedToInService as any).data.users); // << Yes works
                // this.myHeatUserInfoObservableInService$.next(userInfoWeSubscribedToInService.data.users);
                // Yes also works; TSLint complainy
                // ERROR: data is not a property...

                // ?? return userInfoWeSubscribedToInService.data.users; // << Q. should this be 'return'? (wasn't) hmm.
            }
        ); // /.subscribe()
    } // /giveMeHeatUsersDotNext()

    // giveMeHeatUsersDotPipe(): Observable<object> {
    giveMeHeatUsersDotPipe(): Observable<object[]> {
        /*  << Yeah, returns an Observable to the Component
        We return an ARRAY (as an Observable, MBU)
    [{…}, {…}, {…}, ] username: "angel..."
       */
        /*
import { environment } from '../../../environments/environment';
  environment['admin-user-token']

  GET ADMIN USER TOKEN e.g. 2020-05-12-0820AM good for 24 hours
    curl --location --request GET 'https://services.hbsp.harvard.edu/api/admin/users/authorization-status/PENDING?size=115' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer eyJjdHkiO ... JUuEQ'
     */
        return this.myHttpClient.get(
            'https://services.hbsp.harvard.edu/api/admin/users/authorization-status/PENDING',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${environment['admin-user-token']}`,
                },
                params: {
                    size: '115'
                }
            }
        )
            /* O LA
            Q. To ".pipe()" or to ".subscribe()" ???
            A. TL;DR: Here, for me, today: .pipe()
            A.2. But! don't forget to SUBSCRIBE on the CALLING COMPONENT !!!
            https://stackoverflow.com/questions/51269372/difference-between-the-methods-pipe-and-subscribe-on-a-rxjs-observable
            "The pipe method is for chaining observable operators,
            and the subscribe is for activating the observable and listening for emitted values."
             */
/* NOPE
            .subscribe( (whatWeGotAsNext) => {
*/
            .pipe(
                tap(
                    (whatWeGotAsNext: any) => {
                        // WR__ SELF-WARNING: Flying kinda loosey-goosey with 'any' there, pardner
            console.log('PIPE | TAP SERVICE HTTP-Land whatWeGotAsNext ', whatWeGotAsNext);
            /*
            {errors: Array(0), data: {…}}
data:
number: 0
size: 115
totalElements: 12
totalPages: 1
users: Array(12)
0: {username: "arkangel.cordero" ...
             */
            console.log('02 PIPE | TAP SERVICE HTTP-Land whatWeGotAsNext.data.users ', whatWeGotAsNext.data.users);
                        /* YES:
             [{…}, {…}, {…}, ]
            0: {username: "arkangel.cordero",...
             */

/* Q. Does 'return' even work from inside tap() ? sheesh
   A. NAAAAOOAHHH  IT DON'TTTT!!!!
            return whatWeGotAsNext.data.users;
*/

                    } // /next()
                ), // /tap()
                map(
                    (fromTapToMap) => {
                        console.log('03 PIPE | MAP SERVICE HTTP-Land fromTapToMap.data.users ', fromTapToMap.data.users);
                        /* YES: we *return* an ARRAY
                        (as an Observable, MBU)
                         [{…}, {…}, {…}, ]
                        0: {username: "arkangel.cordero",...
                         */
                        return fromTapToMap.data.users;
                    }
                ) // /map()
            ); // /.pipe()
    } // /giveMeHeatUsersDotPipe()

} // /FabricatorService {}
