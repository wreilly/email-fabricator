import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { CommonModule } from '@angular/common';

import { CodepenHarnessRoutingModule } from './codepen-harness-routing.module';
import { CodepenHarnessComponent } from './codepen-harness.component';
import { PostpenComponent } from './postpen/postpen.component';

@NgModule({
  declarations: [
    CodepenHarnessComponent,
    PostpenComponent,
  ],
  imports: [
    SharedModule,
    // CommonModule,
    CodepenHarnessRoutingModule
  ]
})
export class CodepenHarnessModule { }
