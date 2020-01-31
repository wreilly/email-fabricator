import {NgModule} from '@angular/core';

import {
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
} from '@angular/material';

const myMaterialModulesImported = [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
];

@NgModule({
    declarations: [],
    imports: [], // Not needed, actually!
    exports: myMaterialModulesImported,
    providers: [],
})
export class MyMaterialModule {

}
