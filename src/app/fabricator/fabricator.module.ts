import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricatorRoutingModule } from './fabricator-routing.module';
import { FabricatorComponent } from './fabricator.component';
import {MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [FabricatorComponent],
  imports: [
    CommonModule,
    FabricatorRoutingModule,
    MatTabsModule
  ]
})
export class FabricatorModule { }
