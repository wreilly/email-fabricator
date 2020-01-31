import {NgModule} from '@angular/core';

import {
    MatSidenavModule,
    MatListModule,
    MatIconModule,
} from '@angular/material';

const myMaterialModulesImported = [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
];

@NgModule({
    declarations: [],
    imports: [], // Not needed, actually!
    exports: myMaterialModulesImported,
    providers: [],
})
export class MyMaterialModule {

}
