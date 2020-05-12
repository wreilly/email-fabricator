import {Injectable} from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FabricatorService {
/* NEW: HTTP
For trying to get HEAT data from services.hbsp.harvard.edu
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
    }



    giveMeHeatUsers() {
    // giveMeHeatUsers(): Observable<Object> { // << ?? Hmm
        /*
import { environment } from '../../../environments/environment';
  environment['admin-user-token']

  GET ADMIN USER TOKEN 2020-05-12-0820AM good for 24 hours
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
        ).subscribe( (whatWeGotAsNext) => {
            console.log('SERVICE HTTP-Land whatWeGotAsNext ', whatWeGotAsNext);
            return whatWeGotAsNext;
        });

    }


}
