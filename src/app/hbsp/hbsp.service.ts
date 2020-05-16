/* tslint:disable:no-string-literal */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {ThreePropsUser} from './three-props-user.model';

import { environment } from '../../environments/environment';


/*
@Injectable({
    providedIn: 'root'
}) // t.b.d { providedIn: root }
*/
@Injectable() // Testing: providers: [] in CoreModule << seemstabe ok
export class HbspService {

    sampleUserFromHbspService: ThreePropsUser[] = [{
        username: 'sampleFromHbspService',
        profile: {
            email: 'emailFromHbspService',
            institutionName: 'skoolFromHbspService',
        }
    }];

    private myHeatUserInfoObservableInService$ = new BehaviorSubject<any>(this.sampleUserFromHbspService);
    currentUserInfoInService$ = this.myHeatUserInfoObservableInService$.asObservable();
    // https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/

    constructor(
        private myHttp: HttpClient,
    ) {  }

    giveMeHeatUsersDotNext(): void {

        this.myHttp.get(
            'https://services.hbsp.harvard.edu/api/admin/users/authorization-status/PENDING',
            {
                params: {
                    size: '115', // arbitrarily "big enough" magic number ;o)
                },
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${environment['hbsp-admin-user-token']}`,
                },
            }
        ).subscribe(
            (userInfoWeSubscribedToInService) => {

                /* N.B. TSLint complaint:
                "(no-string-literal)" allowed
                ['data']['users'][0]['username'] <<
                I chose "Suppress no-string-literal for current file"
                 */
                // tslint:disable-next-line:max-line-length
                console.log('NOGO 01-A ? GOES :o)userInfoWeSubscribedToInService[\'data\'][\'users\'][0][\'username\']) ', userInfoWeSubscribedToInService['data']['users'][0]['username']); // << Very nice. My buddy, arkangel.cordero

                // tslint:disable-next-line:max-line-length
                console.log('NIFTY 03 HEY (userInfoWeSubscribedToInService as any).data.users[0].username ', (userInfoWeSubscribedToInService as any)
                    .data.users[0].username); // nifty 03

                this.myHeatUserInfoObservableInService$.next( (userInfoWeSubscribedToInService as any).data.users);

            }
        ); // /.subscribe()
    } // /giveMeHeatUsersDotNext()

}
