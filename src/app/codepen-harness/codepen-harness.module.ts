import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
// I use ReactiveForms everywhere else; "Layout Align" demo needs plain Forms. MBU.

import { CodepenHarnessRoutingModule } from './codepen-harness-routing.module';
import { CodepenHarnessComponent } from './codepen-harness.component';
import { PostpenComponent } from './postpen/postpen.component';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { FlexAaComponent } from './flex-aa/flex-aa.component';
import { FlexBbComponent } from './flex-bb/flex-bb.component';

@NgModule({
  declarations: [
    CodepenHarnessComponent,
    PostpenComponent,
    FlexLayoutComponent,
    FlexAaComponent,
    FlexBbComponent,
  ],
  imports: [
    SharedModule,
    // CommonModule,
    FormsModule,
    CodepenHarnessRoutingModule,
  ]
})
export class CodepenHarnessModule { }
