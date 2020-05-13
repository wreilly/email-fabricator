import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject, Subscription, Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FabricatorService {
/* NEW: HTTP
For trying to get HEAT data from services.hbsp.harvard.edu
 */
/* WR__TEMP  Used with "DOT-NEXT" */
    myHeatUserInfoObservableInService$ = new Subject<any>();

    // will be kit AND caboodle:
    // {errors: [], data: {users:[]...}

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
    }

    giveMeHeatUsersDotNext() {
        this.myHttpClient.get(
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
            (userInfoWeSubscribedToInService: any) => { // WR__ Warning: More loosey, more goosey. Read 'em and weep.
                console.log('userInfoWeSubscribedToInService ', userInfoWeSubscribedToInService);
                /* Yes:
                {errors: Array(0), data: {users: Array(35)...…}}
                 */

/* WR__TEMP */
                this.myHeatUserInfoObservableInService$.next(userInfoWeSubscribedToInService.data.users);

            }
        );
    } // /giveMeHeatUsersDotNext()

    giveMeHeatUsersDotPipe(): Observable<object> {
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
