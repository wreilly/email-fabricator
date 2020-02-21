import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';

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

  constructor(
      private myThemeService: ThemeService,
  ) { }

  ngOnInit() {
  }

  myToggleMatSidenav() {
    console.log('toggle!');
    console.log('BEFORE this.myIsMatSidenavOpen ', this.myIsMatSidenavOpen);
    console.log('BEFORE this.myIsMatSidenavOpenFromParent ', this.myIsMatSidenavOpenFromParent);
// ?? MAD as all get out. In sum, AIN'T GETTING NOWHERES.
    this.myIsMatSidenavOpen = !this.myIsMatSidenavOpen;
/* O la.
    this.myIsMatSidenavOpen = !this.myIsMatSidenavOpenFromParent;
    this.myIsMatSidenavOpen = this.myIsMatSidenavOpenFromParent;
*/
    console.log('AFTER this.myIsMatSidenavOpen ', this.myIsMatSidenavOpen);
    console.log('AFTER this.myIsMatSidenavOpenFromParent ', this.myIsMatSidenavOpenFromParent);
    this.myToggleMatSidenavEventEmitterHeader.emit(null);
  } // /myToggleMatSidenav()

  myToggleTheme(lightOrDark) {
    this.myThemeService.setTheme(lightOrDark);
  }

}
