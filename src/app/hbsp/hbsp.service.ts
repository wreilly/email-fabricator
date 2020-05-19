/* tslint:disable:no-string-literal */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subject, Observable, ObservableInput, of, throwError} from 'rxjs';
import {catchError, map, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
/* Nah - I think this 'UIReducer' level is wrong.
You want "fromRoot" (see other 2 Angular projects: fitness; recipes)
import * as fromUIReducer from '../shared/ui.reducer';
*/
import * as fromRoot from '../app.reducer';
import * as fromUIActions from '../shared/ui.actions';

import {ThreePropsUser} from './three-props-user.model';

import { environment } from '../../environments/environment';
import set = Reflect.set;


/*
@Injectable({
    providedIn: 'root'
}) // t.b.d { providedIn: root }
*/
@Injectable() // Testing: providers: [] in CoreModule << seemstabe ok
export class HbspService {

/* We do still use (see note below).
Also: this is only seen on DotNext, not DotPipe.
Q. Why?
A. Because DotNext is a Component invoking a Service
to do HTTP call and .subscribe to the results and to
update (.next()) an Observable on the Service to which
the Component has .subscribed(), in its ngOnInit().
So, it is in the course of the Component processing the
Observable's data, in the Component, that we update
the Component's MatDataTableSource.
So, the Component's very first initialization *also*
updates the MatDataTableSource, with this "sample" record.
Hence we get "1 of 1" (whether empty '' string or 'sample')
Less mysterious to have visible 'sample'.
(you know, maybe debatable which is better way to go
re: UX confusion on this pretty tiny point.)
Maybe depends how much of a perfectionist one is.
O la!

DotPipe by contrast is a Component invoking a Service
to do HTTP call, and NOT to .subscribe() to it, but to
instead just directly *return* the received Observable.
That is done via RxJs .pipe().map() return.
This means the Component *must* do .subscribe on that
returned Observable, right when it gets it (not set up
earlier in ngOnInit()) - to access its data.
So, this Component never has an initial "empty" or "sample"
version of the MatTableDataSource to display on initialization.

    sampleUserFromHbspServiceBAK: ThreePropsUser[] = [{
        username: 'sample', // sample-fromService',
        profile: {
            email: 'record', // email-fromService',
            institutionName: 'placeholder', // univ-fromService',
        }
    }];
*/
/* Urgh. Well, turns out this "invisible" entry is fine
for the table row (not seen), BUT, the durned
table "1 of 1" does display :o(
*/
    sampleUserFromHbspService: ThreePropsUser[] = [{
        username: '', // yeah works well as empty string
        profile: {
            email: '',
            institutionName: '',
        }
    }];
/* */

    private myHeatUserInfoObservableInService$ = new BehaviorSubject<any>(this.sampleUserFromHbspService);
    currentUserInfoInService$ = this.myHeatUserInfoObservableInService$.asObservable();
    // https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/

/* No Longer Used
    isLoadingObservableInService$ = new Subject<boolean>();
*/
    /*
    Hmm, used by BOTH DotPipe and DotNext ? At least, when doing RxJs.
    Now doing NgRx - comment out for both ? Hmm.
     */

    constructor(
        private myHttpClient: HttpClient,
        private myStore: Store<fromRoot.MyOverallState>
    ) {  }

    giveMeHeatUsersDotNext(): void {
        // Does **NOT** use ' | async'

        // RxJs (used w. boolean back in Component)
/* No Longer Used?
        this.isLoadingObservableInService$.next(true);
*/
        // Now NgRx
        this.myStore.dispatch(new fromUIActions.StartIsLoading());

        // N.B. **NO** 'return' on next line
        this.myHttpClient.get(
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

                setTimeout(
                    // Kinda unneeded artificial delay, to ensure we see Spinner a bit...
                    () => {
                        // RxJs
/* No Longer Used
                        this.isLoadingObservableInService$.next(false);
*/
                        // NgRx
                        this.myStore.dispatch(new fromUIActions.StopIsLoading());
                    },
                    1000
                );
            },
            (httpGetError) => {
                console.log('httpGetError DotNext ', httpGetError);
                // RxJs
/* No Longer Used
                this.isLoadingObservableInService$.next(false);
*/
                // NgRx
                this.myStore.dispatch(new fromUIActions.StopIsLoading());
            }
        ); // /.subscribe()
    } // /giveMeHeatUsersDotNext()

    giveMeHeatUsersDotPipe(): Observable<object[]> {
        // USES ' | async'

        // For "DotPipe" - no NgRx isLoading biz here.
        // It's over in Component. (Contrast "DotNext")
        // hmm y not here?
        // NgRx
        this.myStore.dispatch(new fromUIActions.StartIsLoading());

        // N.B. **YES** a 'return' on next line.
        return this.myHttpClient.get(
            'https://services.hbsp.harvard.edu/api/admin/users/authorization-status/PENDING',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${environment['hbsp-admin-user-token']}`,
                },
                params: {
                    size: '115'
                }
            }
        ).pipe(
            map(
                (fromTapToMap: any) => { // WR__ Warning bit loosey goosey w any
                    console.log('03 PIPE | MAP SERVICE HTTP-Land fromTapToMap.data.users ', fromTapToMap.data.users);
                    /* YES: we *return* an ARRAY
                    (as an Observable, MBU)
                     [{…}, {…}, {…}, ]
                    0: {username: "arkangel.cordero",...
                     */
                    return fromTapToMap.data.users;
                }
            ), // /map()
            catchError(
                // (err, caught). Can throw error?
                // https://rxjs-dev.firebaseapp.com/api/operators/catchError
                (httpGetErrorDotPipe): ObservableInput<any> => {
                    /* Q. Can I call that 'httpGetErrorDotPipe' ?
                    Or do I have to call it 'err' ?
                    A. t.b.d. Mebbe yah
                     */
                    console.log('err as in httpGetErrorDotPipe ', httpGetErrorDotPipe);
                    /* Yep:
                    err as in httpGetErrorDotPipe
                    HttpErrorResponse {headers: HttpHeaders, status: 401, statusText: "Unauthorized",
                     */
                    // RxJs
/* No Longer Used
                    this.isLoadingObservableInService$.next(false);
*/
                    // NgRx
                    this.myStore.dispatch(new fromUIActions.StopIsLoading());

/* No. Error message is not what you want to 'return' to
calling function in Component. No way.
*/
                    return of(httpGetErrorDotPipe); // ? NO
/* Didn't work hmm.
                    return throwError(httpGetErrorDotPipe);
*/
                }
            ) // /catchError()
        ); // /.pipe()

    } // /giveMeHeatUsersDotPipe()

}
