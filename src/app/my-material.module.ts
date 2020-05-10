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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import {MatHeaderRowDef} from './fabricator/new-fabricator/new-fabricator.component';
// import {MatRowDef} from './fabricator/new-fabricator/new-fabricator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

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
    MatSlideToggleModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
];

@NgModule({
    declarations: [
        MatHeaderRowDef,
        // MatRowDef,
    ],
    imports: [], // Not needed, actually!
    // exports: myMaterialModulesImported, // << Yes
    exports: [
        ...myMaterialModulesImported,
        MatHeaderRowDef, // abandoned this biz; see MatTable etc.
        // MatRowDef
    ], // Yes aussi, w Spread Operator inside literal [ ]
    providers: [],
})

export class MyMaterialModule {

}
