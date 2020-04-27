import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodepenHarnessComponent} from './codepen-harness.component';


const routes: Routes = [
  {
    path: 'codepen-harness',
    component: CodepenHarnessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodepenHarnessRoutingModule { }
