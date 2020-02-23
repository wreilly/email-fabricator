import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'; // Reducer, (not Actions), here in Component. ('pparently)
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  myIsMatSidenavOpen = false; // : boolean;
  // myIsMatSidenavOpenFromParent: boolean; // ???
  /* Bit mad.
  https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding
   */

  // tslint:disable-next-line:no-output-rename
  @Output('myToggleMatSidenavEventEmitterHeaderName') myToggleMatSidenavEventEmitterHeader: EventEmitter<any> = new EventEmitter<any>();

  @Input() myIsMatSidenavOpenFromParent: boolean; // That madness you keep hearing about.
  @Input() oLaFromParent: boolean;

  myIsSidenavOpenInHeader$: Observable<boolean>;
  // myIsSidenavOpenInHeader$: BehaviorSubject<boolean>;
  myDamnedTempBoolean: boolean;

  constructor(
      private myThemeService: ThemeService,
      private myStore: Store<fromRoot.MyOverallState>
  ) {
    // ? here vs. ngOnInit() ?
    this.myIsSidenavOpenInHeader$ = this.myStore.select(fromRoot.getIsSidenavOpen);
  }

  ngOnInit() {
    // hmm ...
    // this.myIsSidenavOpenInHeader$ = this.myStore.select(fromRoot.getIsSidenavOpen);
    console.log('INIT this.myIsSidenavOpenInHeader$ ', this.myIsSidenavOpenInHeader$);
    // this.myDamnedTempBoolean =
    this.myIsSidenavOpenInHeader$.pipe(
        tap ((whatGotBool) => {
          console.log('pipe tap this.myIsSidenavOpenInHeader$ ', whatGotBool);
          this.myDamnedTempBoolean = whatGotBool;
    }));
  }

  myToggleMatSidenavNew() {
    this.myToggleMatSidenavEventEmitterHeader.emit(null);
  }

  myToggleMatSidenav() {
    console.log('toggle!');
    console.log('BEFORE this.myIsMatSidenavOpen ', this.myIsMatSidenavOpen);
    console.log('BEFORE this.myIsMatSidenavOpenFromParent ', this.myIsMatSidenavOpenFromParent);
    // N.B. We get true v. first time. hmm. ok I guess?
// ?? MAD as all get out. In sum, AIN'T GETTING NOWHERES.
    this.myIsMatSidenavOpen = !this.myIsMatSidenavOpen;
/* O la.
    this.myIsMatSidenavOpen = !this.myIsMatSidenavOpenFromParent;
    this.myIsMatSidenavOpen = this.myIsMatSidenavOpenFromParent;
*/
    this.myToggleMatSidenavEventEmitterHeader.emit(null); // try this up here now, "before" the "AFTER" pronouncements (fer chrissake)
    /*
    As we (kinda at least) already know, the above line triggers the following:
    - This <app-header> component is placed in the <app-component> HTML.
    - There, it has this EventEmitter "listener" placed on it, like so:
      <app-header on-myToggleMatSidenavEventEmitterHeaderName="myMatSidenav_ref.toggle()" ... >
    - When ("on") that "user clicks on header button" event occurs,
        the listener uses the "ref" it has there, to the mat-sidenav,
        to run the mat-sidenav's native .toggle() method.
    - Opens/Closes the mat-sidenav. Cheers.
     */

    console.log('9999 AFTER this.myIsMatSidenavOpen ', this.myIsMatSidenavOpen);
    console.log('AFTER this.myIsMatSidenavOpenFromParent ', this.myIsMatSidenavOpenFromParent); // << Hmm, still showing true; ought not
    // this.myToggleMatSidenavEventEmitterHeader.emit(null);
  } // /myToggleMatSidenav()

  myToggleTheme(lightOrDark) {
    this.myThemeService.setTheme(lightOrDark);
  }

}
