import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import {BehaviorSubject, Observable, Subscription} from 'rxjs'; // Subject << not used

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// YES the above NEED to be imported here in Component
// NO it isn't "enough" that they are imported as Modules in my-material.module.ts
// o well

import { HbspService } from '../../hbsp.service';

import { ThreePropsUser, ThreePropsUserFlat } from '../../three-props-user.model';


@Component({
    selector: 'app-heat-http-dotpipe',
    templateUrl: './heat-http-dotpipe.component.html',
    styleUrls: ['./heat-http-dotpipe.component.css'],
})
export class HeatHttpDotPipeComponent implements OnInit, AfterViewInit, OnDestroy {

    myEducatorsDataSource = new MatTableDataSource();
    myColumnsToDisplay = ['username', 'email', 'institutionName'];
    @ViewChild(MatPaginator) myPaginator: MatPaginator; // {static: false } nor true either. didn't help. leaving out. cheers?

    @ViewChild(MatSort, {static: false}) mySort: MatSort;


    myHeatAuthorizationsObservableInComponentDotPipe: Observable<object[]>; // << keep as <object[]> y not
/* Hmm, 'any' looseness didn't gain anything re: template not recognizing that '.email'
  {{ three.profile.email }}  o well

    myHeatAuthorizationsObservableInComponentDotPipe: Observable<any>; // << Nah
*/
    myHeatAuthorizationsSubscription: Subscription;

/* BEWARE !! Don't just *Declare* yer durned observables, matey!
*Define* 'em, too! (Go on, give 'em a value! New 'em up! Shiver me timbers.)

    isLoadingBehaviorSubjectInComponent: Subject<boolean>; // << No, not enough
*/
/* Yes re: defining. ok. But no re: we need BehaviorSubject, not Subject. ok.
    isLoadingBehaviorSubjectInComponent = new Subject<boolean>(); // << Yes, that's what you gotta do.
*/
    isLoadingBehaviorSubjectInComponent = new BehaviorSubject<boolean>(false);

    threeUserPropertiesForTableArray: ThreePropsUserFlat[]; // any;
    threeUserPropertiesForTableArrayLength = 0; // for counter on template

    constructor(
        private myHbspService: HbspService,
    ) {
    }

    ngOnInit() {
        // Note: Uses ' | async' off the returned Observable, so, no need to .subscribe
        // to an Observable in the Service, over here in Component ngOnInit().

//        this.isLoadingBehaviorSubjectInComponent.next(false); // ??? Nope not here (silly)
    }

    ngAfterViewInit() {
        this.myEducatorsDataSource.sort = this.mySort;
        this.myEducatorsDataSource.paginator = this.myPaginator;
    }

    myGetHttpHeatUsersFromServiceDotPipe() {
        this.isLoadingBehaviorSubjectInComponent.next(true); // YES

        this.myHeatAuthorizationsObservableInComponentDotPipe = this.myHbspService
            .giveMeHeatUsersDotPipe();
        /*
        Hmm, what if Error is returned?
         */
        console.log('9999 this.myHeatAuthorizationsObservableInComponentDotPipe ', this.myHeatAuthorizationsObservableInComponentDotPipe);
        /* FOOBAR
        this.myHeatAuthorizationsObservableInComponentDotPipe  Observable {_isScalar: false,
        source: Observable, operator: CatchOperator}
         */
        /* NO FOOBAR
        this.myHeatAuthorizationsObservableInComponentDotPipe  Observable {_isScalar: false,
        source: Observable, operator: CatchOperator}
         */
        /* When catchError() Commented Out: N.B. MapOperator
        this.myHeatAuthorizationsObservableInComponentDotPipe  Observable {_isScalar: false,
        source: Observable, operator: MapOperator}
         */

        // this.isLoadingBehaviorSubjectInComponent.next(false); // NO

        this.myHeatAuthorizationsSubscription = this.myHeatAuthorizationsObservableInComponentDotPipe.subscribe(
            (currentUserArrayWeGotDotPipe: any) => {
                /*
                O boy. That use of : any above here is just
                TERRIBLE.
                I am anti-pattern-ing away here.
                This .subscribe() of mine expects an object[] of
                users, and I am cramming/overloading it
                to *also* accept my homegrown crap-o-la
                error message from the Service.
                Q. And why (the hell) is that?
                A. Because I am anti-pattern-ing away,
                as I invent these scenarios like:
                - Component invokes Service method
                that expects an Observable returned by "DotPipe"
                 (vs. my "DotNext").
                That DotPipe on the Service "returning"
                the HTTP results here to the Component
                MEANS that that same Service method cannot
                simultaneously .subscribe() to those HTTP results.
                If it could, then it could neatly use the
                .subscribe() 3 calls: next(), err(), complete().

                Here's what we see on this page:
Note
                ------------
                https://blog.angular-university.io/rxjs-error-handling/
                -------------
                const http$ = this.http.get<Course[]>('/api/courses');

// WR__ Comment:
// Note this 'http$' is *not* "return-ing" anything.
// My "DotPipe" Service method does. That's the anti-pattern. MBU.
// This is why I'm forced to the cheat of ': any' above - o well!

                http$
    .pipe(
        catchError(err => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
        })
    )
    .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
                -------------

                 */

                /*
                O la. Do we have a data array of users? good
                Do we have an error object of some sort? hmm
                 */

                console.log('9999-8888 currentUserArrayWeGotDotPipe ', currentUserArrayWeGotDotPipe);
/* Yeah
 [{…}, {…}, {…}, {…}, {…}, {…}]

Nah ? << Hmm, veddy interesting
9999-8888 currentUserArrayWeGotDotPipe
HttpErrorResponse {headers: HttpHeaders, status: 401, statusText: "Unauthorized", url:
 */

                if (currentUserArrayWeGotDotPipe?.error?.error) {
                    /* Ye Olde Elvis Operator ?.
                    Lets us query the object with care.
                    This thing might be an HTTPErrorResponse. It might be an Array of User objects.
                    Just crazy.
                     */
                    console.log('Aw shucks HTTP error!', currentUserArrayWeGotDotPipe);
                    this.isLoadingBehaviorSubjectInComponent.next(false);
                } else if (currentUserArrayWeGotDotPipe[0]) { // we're good, here comes arkangel cordero, my buddy
                    this.mySharedSubscribeBothDotPipeAndDotNext(currentUserArrayWeGotDotPipe);
                    // this.isLoadingBehaviorSubjectInComponent.next(false); // NO not where this logic goes.
                    // (It goes inside at bottom of that "Shared..." method)
                } else {
                    // ? who knows ?
                }
            }
        );

    }

    mySharedSubscribeBothDotPipeAndDotNext(userInfoWeGotFromBothDotPipeAndDotNext) {

        this.threeUserPropertiesForTableArray = userInfoWeGotFromBothDotPipeAndDotNext
            .map((eachUserInfo) => {
                return {
                    username: eachUserInfo.username,
                    email: eachUserInfo.profile.email,
                    institutionName: eachUserInfo.profile.institutionName,
                };
            });

        this.myEducatorsDataSource.data = this.threeUserPropertiesForTableArray.map(
            eachThing => eachThing // map it on, instead of whamma-jamma << YES WORKED
        );
        this.threeUserPropertiesForTableArrayLength = this.threeUserPropertiesForTableArray.length;

        this.isLoadingBehaviorSubjectInComponent.next(false); // YES. This is where you put it.

    } // /mySharedSubscribeBothDotPipeAndDotNext()

    ngOnDestroy() {
        if (this.myHeatAuthorizationsSubscription) {
            this.myHeatAuthorizationsSubscription.unsubscribe();
        }
    }

}
