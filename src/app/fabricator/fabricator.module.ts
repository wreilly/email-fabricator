import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
/* From SharedModule now
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
*/
// import {FormsModule} from '@angular/forms'; // << Q. ?? what is using this? A. Don't (yet) know.

/* Hmm NAH:
import { saveAs } from '../../../node_modules/file-saver/src/FileSaver';
*/
import { saveAs } from 'file-saver';
/*
Trying directly over in ResultsFabricatorComponent, not here in a Module. hmm
 */
/*
Needed both:
$ npm install --save file-saver
$ npm install --save-dev @types/file-saver
 */

import { FabricatorRoutingModule } from './fabricator-routing.module';

import { MyMaterialModule } from '../my-material.module';
/* Hmm, rather than just this one for MatTabs,
   let's grab whole MyMaterialModule.
(TODONE The which will likely later get refactored to a SharedModule.)

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
    SharedModule,
    // CommonModule, // << from SharedModule now
    FabricatorRoutingModule,
    // ReactiveFormsModule, // << from SharedModule now
    // MatTabsModule, // << We bring in whole Material module instead
    // MyMaterialModule, // << from SharedModule now
    // FlexLayoutModule, // << from SharedModule now
    // FormsModule,  // << from SharedModule ???? ????
  ]
})
export class FabricatorModule { }
