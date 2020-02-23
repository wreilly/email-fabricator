import {Component, OnInit} from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {Observable, Subject, Subscription} from 'rxjs';
import * as UIActions from './shared/ui.actions';
// NO: import * as fromUI from './shared/ui.reducer'; // seemingly NO.
import * as fromRoot from './app.reducer'; // ? instead of fromUI ? yes tink so
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'email-fabricator';

/* No. Here in App it's just a Boolean, not an Observable nor Subject.
  private isThemeDarkInApp$: Subject<boolean>;

  On Init() we .subscribe() to an Observable,
  over in the Service, but the data
  that arrives here we just consume the boolean
  value - no longer handle as observable.
*/
  public isThemeDarkInApp: boolean; // << public. Don't have this 'private' (!)

  // https://material.angular.io/components/sidenav/overview#opening-and-closing-a-sidenav
  isSidenavOpenInApp$: Observable<boolean>; // YES

  ngOnInit(): void {
    // TODO Auth Service initAuthListener, later ....

    this.myThemeService.isThemeDarkInServicePublic$
        .subscribe(
        (lightOrDark) => {
          this.isThemeDarkInApp = lightOrDark;
        }
    );

    // this.isSidenavOpenInApp$ = this.myStore.select(fromUI.getIsSidenavOpen); // << No. (hmm)
    // this.isSidenavOpenInApp$ = this.myStore.select(fromRoot.getIsSidenavOpen); // << No. (Why not?)
    this.isSidenavOpenInApp$ = this.myStore.select(stateWeGot => stateWeGot.ui.sidenavIsOpen); // << YES. "Hallelujah!"

  } // /ngOnInit()

  constructor(
      private myThemeService: ThemeService,
      // private myStore: Store<fromUI.MyState>, // No. (Why not?)
      private myStore: Store<fromRoot.MyOverallState>,
  ) {

    // This code does nothing; just exploring how to get at value in Observable.
/* Yeah. Sorta. 01 anyway; 02 only appears first time. sigh. */
/*
    myStore.select(
        (stateWeGot) => {
          console.log('01 constructor. stateWeGot ', stateWeGot); // yes:
          /!* Yes:
          { ui: { sidenavIsOpen: false } }   (or, true)
           *!/
          return stateWeGot; // << kinda important !!!
        }).subscribe((stateWeGotNested) => {
      console.log('02 constructor. stateWeGotNested ', stateWeGotNested); // ? { ui: { sidenavIsOpen: false } } << 1st time only
    });
*/

    // This code does nothing; just exploring how to get at value in Observable.
    myStore.select(stateWeGot => stateWeGot.ui.sidenavIsOpen).subscribe(stateWeGotNested => {
      console.log('03 constructor. stateWeGotNested ', stateWeGotNested); // Yes false / true
    });
    /*
    Above emulates AppComponent code in:
    https://medium.com/@holtkam2/angular-ngrx-store-understanding-the-data-flow-28566a2d6b4b
     */

  }

  myTellStoreAboutSidenavToggle() {
    console.log('this.isSidenavOpenInApp$ : ', this.isSidenavOpenInApp$); // Store object ... (!)
    this.myStore.dispatch(new UIActions.SetSidenavToOppositeState());
  }

}
