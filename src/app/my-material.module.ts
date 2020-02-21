import {NgModule} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClipboardModule } from '@angular/cdk/clipboard'; // << 1st time from CDK

// MatFormFieldModule, // seems it is needed ?
/* WHEN I get MatInputModule into this, I'll no longer need MatFormFieldModule. Cheers.

"MatFormFieldModule is included in MatInputModule, so you don't need to import it again"
https://stackoverflow.com/questions/50328751/angular-6-error-show-to-mat-form-field-is-not-a-known-element
*/


const myMaterialModulesImported = [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    // MatFormFieldModule, // Not needed: part of MatInputModule
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ClipboardModule,
];

@NgModule({
    declarations: [],
    imports: [], // Not needed, actually!
    // exports: myMaterialModulesImported, // << Yes
    exports: [...myMaterialModulesImported], // Yes aussi, w Spread Operator inside literal [ ]
    providers: [],
})

export class MyMaterialModule {

}
