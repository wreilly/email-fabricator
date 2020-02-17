import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    // nothing yet. Auth Service initAuthListener, later ....
  }

  myTellPseudoEmitHeaderAboutSidenavToggle() {
    console.log('pseudo!');
    console.log('BEFORE this.myIsMatSidenavOpenAppComponent ', this.myIsMatSidenavOpenAppComponent);
    this.myIsMatSidenavOpenAppComponent = !this.myIsMatSidenavOpenAppComponent; // !?
    console.log('AFTER this.myIsMatSidenavOpenAppComponent ', this.myIsMatSidenavOpenAppComponent);
  }
}
