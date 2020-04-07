import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common'; // from SHARED instead
import { SharedModule } from '../shared/shared.module';

import { RxjsPlaygroundComponent } from './rxjs-playground.component';
import { RxjsPlaygroundRoutingModule } from './rxjs-playground-routing.module';

@NgModule({
  declarations: [
      RxjsPlaygroundComponent,
  ],
  imports: [
    SharedModule,
    // CommonModule,
    RxjsPlaygroundRoutingModule,
  ],
  exports: [
      // RxjsPlaygroundRoutingModule, // apparently not needed hmm.
  ]
})
export class RxjsPlaygroundModule { }
