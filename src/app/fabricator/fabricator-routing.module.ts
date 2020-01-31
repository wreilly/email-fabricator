import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FabricatorComponent} from './fabricator.component';

const routes: Routes = [
  {
    path: 'fabricator',
    component: FabricatorComponent,
/*
    children: [
      {
        path: 'new-fabricator',
        component: NewFabricatorComponent
      }
    ]
*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricatorRoutingModule { }
