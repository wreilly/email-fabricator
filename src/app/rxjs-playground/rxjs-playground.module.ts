import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsPlaygroundComponent } from './rxjs-playground.component';
import { RxjsPlaygroundRoutingModule } from './rxjs-playground-routing.module';

@NgModule({
  declarations: [
      RxjsPlaygroundComponent,
  ],
  imports: [
    CommonModule,
    RxjsPlaygroundRoutingModule,
  ],
  exports: [
      // RxjsPlaygroundRoutingModule, // apparently not needed hmm.
  ]
})
export class RxjsPlaygroundModule { }
