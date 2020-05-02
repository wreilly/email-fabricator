import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodepenHarnessComponent} from './codepen-harness.component';
import { PostpenComponent } from './postpen/postpen.component';
import {FlexLayoutComponent} from './flex-layout/flex-layout.component';
import {FlexAaComponent} from './flex-aa/flex-aa.component';
import {FlexBbComponent} from './flex-bb/flex-bb.component';

const routes: Routes = [
  {
    path: 'codepen-harness',
    component: CodepenHarnessComponent,
    children: [
      {
        path: 'postpen',
        component: PostpenComponent,
      },
      {
        path: 'flex-layout',
        component: FlexLayoutComponent,
      },
      {
        path: 'flex-aa',
        component: FlexAaComponent,
      },
      {
        path: 'flex-bb',
        component: FlexBbComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodepenHarnessRoutingModule { }
