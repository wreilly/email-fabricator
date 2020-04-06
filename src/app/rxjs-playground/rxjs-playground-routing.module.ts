import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { RxjsPlaygroundComponent } from './rxjs-playground.component';

const myRxjsPlaygroundRoutes: Routes = [
  {
    path: 'rxjs-playground',
    component: RxjsPlaygroundComponent
  }
];

@NgModule({
  declarations: [], // Not needed in Router...
  imports: [
      RouterModule.forChild(myRxjsPlaygroundRoutes),
  ],
  exports: [
      RouterModule,
  ]
})
export class RxjsPlaygroundRoutingModule { }
