import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('myToggleMatSidenavEventEmitterSidenavName') myToggleMatSidenavEventEmitterSidenav: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  myCloseSidenav() {
    this.myToggleMatSidenavEventEmitterSidenav.emit(null);
  }

}
