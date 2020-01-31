import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'email-fabricator';
  myOpenedSidenav = true; // TODO hard-coded open for now
  // https://material.angular.io/components/sidenav/overview#opening-and-closing-a-sidenav

  ngOnInit(): void {
    // nothing yet. Auth Service initAuthListener, later ....
  }
}
