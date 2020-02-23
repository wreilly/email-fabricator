import { Component, OnInit } from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {Observable, Subject} from 'rxjs';
import * as UIActions from './shared/ui.actions';
// import * as fromUI from './shared/ui.reducer'; // seemingly NO.
import * as fromRoot from './app.reducer'; // ? instead of fromUI ? yes tink so
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'email-fabricator';
  // myOpenedSidenav = true; // TODONOPE hard-coded open for now
  myIsMatSidenavOpenAppComponent = false; // wtf etc >> true; // << Surprise. when you first get exposed to this, it is actually TRUE
  // = false; // : boolean; // = true; // TODO w-i-p (bit mad)
  // https://material.angular.io/components/sidenav/overview#opening-and-closing-a-sidenav

/* No. Here in App it's just a Boolean, not an Observable.
  private isThemeDarkInApp$: Subject<boolean>;

  On Init() we .subscribe() to an Observable,
  over in the Service, but the data
  that arrives here we just consume the boolean
  value - no longer handle as observable.
*/
  public isThemeDarkInApp: boolean; // << Don't have this 'private' (!)

  isSidenavOpenInApp$: Observable<boolean>; // ?
  isSidenavOpenInApp: boolean; // ?

  ngOnInit(): void {
    // TODO Auth Service initAuthListener, later ....
    this.myThemeService.isThemeDarkInServicePublic$
        .subscribe(
        (lightOrDark) => {
          this.isThemeDarkInApp = lightOrDark;
        }
    );

    // Moved ( ? ) from ngOnInit() (too late?) to constructor() ( ? )
    // Seems to be okay in either... I'll leave in ngOnInit() for now...
    // this.isSidenavOpenInApp$ = this.myStore.select(fromUI.getIsSidenavOpen); // << No. (Why not?)
    this.isSidenavOpenInApp$ = this.myStore.select(stateWeGot => stateWeGot.ui.sidenavIsOpen); // << YES. "Hallelujah!"
  }

  constructor(
      private myThemeService: ThemeService,
      // private myStore: Store<fromUI.MyState>,
      private myStore: Store<fromRoot.MyOverallState>,
  ) {
/* Yeah. Sorta. 01 anyway; not 02
    myStore.select(
        (stateWeGot) => {
          console.log('01 constructor. stateWeGot ', stateWeGot); // ?
          /!*
          { ui: { sidenavIsOpen: false } }
           *!/
        }).subscribe((stateWeGotNested) => {
      console.log('02 constructor. stateWeGotNested ', stateWeGotNested); // ? undefined
    });*/

    myStore.select(stateWeGot => stateWeGot.ui.sidenavIsOpen).subscribe(stateWeGotNested => {
      console.log('02 constructor. stateWeGotNested ', stateWeGotNested); // Finally got false !  ? undefined
    });

    // Moved ( ? ) from ngOnInit() (too late?) to constructor() ( ? )
    // Seems to be okay in either... I'll leave up in ngOnInit() for now...
    // this.isSidenavOpenInApp$ = this.myStore.select(fromRoot.getIsSidenavOpen); // << No. (Why not?)
    // this.isSidenavOpenInApp$ = this.myStore.select(stateWeGot => stateWeGot.ui.sidenavIsOpen); // << YES. "Hallelujah!"
  }

  myTellPseudoEmitHeaderAboutSidenavToggle() { // MO' MADNESS (METHINKS)
    console.log('pseudo!');
/*
    console.log('BEFORE this.myIsMatSidenavOpenAppComponent ', this.myIsMatSidenavOpenAppComponent);
    this.myIsMatSidenavOpenAppComponent = !this.myIsMatSidenavOpenAppComponent; // !?
    console.log('AFTER this.myIsMatSidenavOpenAppComponent ', this.myIsMatSidenavOpenAppComponent);
*/
  }

  myTellStoreAboutSidenavToggle() {
    console.log('BEFORE what does Store have ?');
    console.log(this.isSidenavOpenInApp$);
    this.myStore.dispatch(new UIActions.SetSidenavToOppositeState());
    console.log('AFTER what does Store have ?');
  }

}
