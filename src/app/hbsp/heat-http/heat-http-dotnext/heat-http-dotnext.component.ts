import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import {Observable, Subscription} from 'rxjs';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// YES the above NEED to be imported here in Component
// NO it isn't "enough" that they are imported as Modules in my-material.module.ts
// o well

import { HbspService } from '../../hbsp.service';

import { ThreePropsUser, ThreePropsUserFlat } from '../../three-props-user.model';

@Component({
  selector: 'app-heat-http-dotnext',
  templateUrl: './heat-http-dotnext.component.html',
  styleUrls: ['./heat-http-dotnext.component.css']
})
export class HeatHttpDotNextComponent implements OnInit, AfterViewInit, OnDestroy {

  // myHeatAuthorizationsObservableInComponentDotNext: MyThreePropsUser[]; // << VERY BAD ORIGINAL NAME
  myHeatAuthorizationsArrayInComponentDotNext: ThreePropsUser[]; // NO ASYNC

/*
  "DOT-NEXT/SUBSCRIBE"
  2) The "DotNext" variant is going to, in ngOnInit(), explicitly ".subscribe()"to this
  Observable created over in the Service: myHeatUserInfoObservableInService$
(Note that the "DotPipe" version makes NO use nor reference to that Service Observable.)
*/
  private myHeatUsersSubscription: Subscription;

  myEducatorsDataSource = new MatTableDataSource();
  myColumnsToDisplay = ['username', 'email', 'institutionName'];
  @ViewChild(MatPaginator)myPaginator: MatPaginator; // {static: false } nor true either. didn't help. leaving out. cheers?

  @ViewChild(MatSort, { static: false }) mySort: MatSort;
  // SEE NGAFTERVIEWINIT()
  /* Notes from class: fitness-tracker-wr3
https://www.udemy.com/angular-full-app-with-angular-material-angularfire-ngrx/learn/lecture/9120380#questions/7276854
The "static" option is an Angular 8 thing. Wasn't in 7, and in Angular 9 won't be needed...
Also:
BTW: If the element (MatSort, MatPaginator) would be used in ngOnInit(), you would have to write { static: true }.
(We use it in ngAfterViewInit(), so false is okay)
https://angular.io/guide/static-query-migration
(*) https://angular.io/guide/static-query-migration#what-does-this-flag-mean-and-why-is-it-necessary
*/

  threeUserPropertiesForTableArray: ThreePropsUserFlat[]; // any;
  threeUserPropertiesForTableArrayLength = 0; // for counter on template


  constructor(
      private myHbspService: HbspService,
  ) { }

  ngOnInit(): void {
    this.myHbspService.currentUserInfoInService$.subscribe(
        (currentUserArrayWeGot) => {
          /* Q. Hmm, put the data received onto:
          1) myHeatAuthorizationsArrayInComponentDotNext: ThreeUserProps[]
          2) threeUserPropertiesForTableArray: ThreeUserPropsFlat[] ?
          (subsequently onto the MatTableDataSource)
          (hmm maybe flaw in thinking here - see differing type ("flat") hmm.
          -- OR --
          3) just directly onto the MatTableDataSource? (same deal: "flat" needed)

          A. t.b.d. ...
           */
          // 1. hmm, ill fit? (not "flat")
/*
          this.threeUserPropertiesForTableArray = currentUserArrayWeGot; // whamma-jamma
*/
          // 2.
/*
          this.myHeatAuthorizationsArrayInComponentDotNext = currentUserArrayWeGot; //
          whamma-jamma (oughter work, fit-wise) BUT SEE # 4 below ISS BETTAH !!!
*/
          /* N.B. incoming data has MORE fields than target type,
             but, there is "subset/superset alignment" if you know what I mean, so it works. MBU
          */
          // 3.
/*
          this.myEducatorsDataSource.data = currentUserArrayWeGot;
*/
          // Q. hmm. ill fit? A. Oh yeah.

          // 3.A. (from 2)
/*          this.myEducatorsDataSource.data = this.myHeatAuthorizationsArrayInComponentDotNext;*/

          this.mySharedSubscribeBothDotPipeAndDotNext(currentUserArrayWeGot);

        }
    ); // /.subscribe()
  } // /ngOnInit()

  ngAfterViewInit() {
    this.myEducatorsDataSource.sort = this.mySort;
    this.myEducatorsDataSource.paginator = this.myPaginator;
  }

  myGetHttpHeatUsersFromServiceDotNext() {
    // Fire & Forget InFamy!
    this.myHbspService.giveMeHeatUsersDotNext();
    /*
    Q. What, pray tell, does that do?
    A. Well, TODO fill in ze blank(s) christamitey!
     */

    /* PHASE I
    We'll just do Mr. F&F above there, and leave off
    worrying about Mr. "Let's Also .subscribe()"
    Here In The Component biz.
    That'll be any Phase II (presuming there ever is any Phase II).
     */
  }

  mySharedSubscribeBothDotPipeAndDotNext(userInfoWeGotFromBothDotPipeAndDotNext) { // << that ARRAY of users [{...},{...}]
    // CALLED FROM NGONINIT(). Jus' sayin'

    /* Hey Guys, Little Finding Here
    (I know, I know, "kindergarten" level, what can you do.)

    1. NO:    mySharedSubscribeBothDotPipeAndDotNext
    (userInfoWeGotFromBothDotPipeAndDotNext) {
    // << WHEN IN *NESTED* FUNCTION (e.g. callback) fails
        but when in "normal" level function call, like here,
         works A-OK without .bind() Cheers.

    2. YES:   mySharedSubscribeBothDotPipeAndDotNext =
    (userInfoWeGotFromBothDotPipeAndDotNext) => {

    3. YES: (NEEDS .bind())   mySharedSubscribeBothDotPipeAndDotNext
    (userInfoWeGotFromBothDotPipeAndDotNext) { // << WHEN IN NESTED FUNCTION succeeds (with .bind())

    Q. What?
    A. # 1 is old skool function, and it handles 'this' in old skool way. Tlicky!
       # 2 is uptown "arrow" function (very groovy) and it Takes Care of 'this' For You. Veddy nice.
       # 3 requires *calling* function to use *** .bind(this) ***. Then it'll work even w. old skool. Bene.
    Q.2. Why? Wha-a-a? What's happening here?
    A.2. This method **WAS***is being used in a **nested** fashion. It is passed in as a **parameter** to
    another function here in this Component. (Two other functions in fact. That's the point. This
    here method is getting some *re-use* (nice)).
    But watch out: when doing this "pass in a function as a parameter" biz, the 'this'
    reference ain't what you think no more, in that new, nested context. You got to take care.
     */

    this.threeUserPropertiesForTableArray = userInfoWeGotFromBothDotPipeAndDotNext
        .map( (eachUserInfo) => {
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
  }  // /mySharedSubscribeBothDotPipeAndDotNext()

  ngOnDestroy(): void {
    if (this.myHeatUsersSubscription) {
      this.myHeatUsersSubscription.unsubscribe();
    }
  }

}
