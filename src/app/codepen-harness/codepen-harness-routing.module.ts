import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodepenHarnessComponent} from './codepen-harness.component';
import { PostpenComponent } from './postpen/postpen.component';

const routes: Routes = [
  {
    path: 'codepen-harness',
    component: CodepenHarnessComponent,
    children: [
      {
        path: 'postpen',
        component: PostpenComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodepenHarnessRoutingModule { }
