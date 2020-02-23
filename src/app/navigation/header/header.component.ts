import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'; // Yes. Also: Reducer, (not Actions), here in Component. ('pparently)
// import * as fromUI from '../../shared/ui.reducer'; // No
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /*
  https://angular.io/guide/component-interaction#pass-data-from-parent-to-child-with-input-binding
   */

  // tslint:disable-next-line:no-output-rename
  @Output('myToggleMatSidenavEventEmitterHeaderName') myToggleMatSidenavEventEmitterHeader: EventEmitter<any> = new EventEmitter<any>();

  @Input() myIsMatSidenavOpenFromParent: boolean; // That madness you keep hearing about.

  myIsSidenavOpenInHeader$: Observable<boolean>;

  constructor(
      private myThemeService: ThemeService,
      private myStore: Store<fromRoot.MyOverallState>, // Yes
      // private myStore: Store<fromUI.MyState> // No
  ) { }

  ngOnInit() {
    // this.myIsSidenavOpenInHeader$ = this.myStore.select(fromRoot.getIsSidenavOpen); // << NO
    this.myIsSidenavOpenInHeader$ = this.myStore.select(stateWeGot => stateWeGot.ui.sidenavIsOpen); // << YES Hallelujah aussi.
    // this.myIsSidenavOpenInHeader$ = this.myStore.select(stateWeGot => stateWeGot.sidenavIsOpen); // << NO. Not sure why
  }

  myToggleMatSidenav() {
    this.myToggleMatSidenavEventEmitterHeader.emit(null);
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
  } // /myToggleMatSidenav()

  myToggleTheme(lightOrDark) {
    this.myThemeService.setTheme(lightOrDark);
  }

}
