import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FabricatorComponent} from './fabricator.component';
import { NewFabricatorComponent } from './new-fabricator/new-fabricator.component';
import { ResultsFabricatorComponent } from './results-fabricator/results-fabricator.component';

const routes: Routes = [
  {
    path: 'fabricator',
    component: FabricatorComponent,
    children: [
      {
        path: 'new-fabricator',
        component: NewFabricatorComponent
      },
      {
        path: 'results-fabricator',
        component: ResultsFabricatorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricatorRoutingModule { }
