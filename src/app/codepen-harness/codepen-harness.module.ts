import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodepenHarnessRoutingModule } from './codepen-harness-routing.module';
import { CodepenHarnessComponent } from './codepen-harness.component';


@NgModule({
  declarations: [CodepenHarnessComponent],
  imports: [
    CommonModule,
    CodepenHarnessRoutingModule
  ]
})
export class CodepenHarnessModule { }
