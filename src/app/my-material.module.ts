import {NgModule} from '@angular/core';

import {
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    // MatFormFieldModule, // seems it is needed ?
    /* WHEN I get MatInputModule into this, I'll no longer need MatFormFieldModule. Cheers.

"MatFormFieldModule is included in MatInputModule, so you don't need to import it again"
https://stackoverflow.com/questions/50328751/angular-6-error-show-to-mat-form-field-is-not-a-known-element
 */
    MatInputModule,

} from '@angular/material';

const myMaterialModulesImported = [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    // MatFormFieldModule, // ? not needed ??
    MatInputModule,
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
