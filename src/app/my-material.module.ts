import {NgModule} from '@angular/core';

import {
    MatSidenavModule,
} from '@angular/material';

const myMaterialModulesImported = [
    MatSidenavModule,
];

@NgModule({
    declarations: [],
    imports: [], // Not needed, actually!
    exports: myMaterialModulesImported,
    providers: [],
})
export class MyMaterialModule {

}
