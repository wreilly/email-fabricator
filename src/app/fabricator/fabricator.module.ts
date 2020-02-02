import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { FabricatorRoutingModule } from './fabricator-routing.module';

import { MyMaterialModule } from '../my-material.module';
/* Hmm, rather than just this one for MatTabs,
   let's grab whole MyMaterialModule.
(TODO The which will likely later get refactored to a SharedModule.)

import {MatTabsModule} from '@angular/material';
*/

import { FabricatorComponent } from './fabricator.component';
import { NewFabricatorComponent } from './new-fabricator/new-fabricator.component';
import { ResultsFabricatorComponent } from './results-fabricator/results-fabricator.component';


@NgModule({
  declarations: [
    FabricatorComponent,
    NewFabricatorComponent,
    ResultsFabricatorComponent
  ],
  imports: [
    CommonModule,
    FabricatorRoutingModule,
    ReactiveFormsModule,
    // MatTabsModule, // << We bring in whole Material module instead
    MyMaterialModule,
    FlexLayoutModule,
  ]
})
export class FabricatorModule { }
