import { Component, OnInit } from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'email-fabricator';
  // myOpenedSidenav = true; // TODONOPE hard-coded open for now
  myIsMatSidenavOpenAppComponent = true; // << Surprise. when you first get exposed to this, it is actually TRUE
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

  ngOnInit(): void {
    // TODO Auth Service initAuthListener, later ....
    this.myThemeService.isThemeDarkInServicePublic$
        .subscribe(
        (lightOrDark) => {
          this.isThemeDarkInApp = lightOrDark;
        }
    );
  }

  constructor(
      private myThemeService: ThemeService,
  ) { }

  myTellPseudoEmitHeaderAboutSidenavToggle() {
    console.log('pseudo!');
    console.log('BEFORE this.myIsMatSidenavOpenAppComponent ', this.myIsMatSidenavOpenAppComponent);
    this.myIsMatSidenavOpenAppComponent = !this.myIsMatSidenavOpenAppComponent; // !?
    console.log('AFTER this.myIsMatSidenavOpenAppComponent ', this.myIsMatSidenavOpenAppComponent);
  }
}
