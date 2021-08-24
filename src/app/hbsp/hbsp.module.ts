import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'; // << Needed for Routing to work !!!
import { HbspRoutingModule } from './hbsp-routing.module'; // << Needed for Routing to work !!! (no surprise hye? yeesh)

import { HbspComponent } from './hbsp.component';
import { HeatHttpComponent } from './heat-http/heat-http.component';
import { HeatHttpDotPipeComponent } from './heat-http/heat-http-dotpipe/heat-http-dotpipe.component';
import { HeatHttpDotNextComponent } from './heat-http/heat-http-dotnext/heat-http-dotnext.component';
import { HeatJsonComponent } from './heat-json/heat-json.component';
import { RShinyComponent } from './r-shiny/r-shiny.component';

@NgModule({
    declarations: [
        HbspComponent,
        HeatHttpComponent,
        HeatHttpDotPipeComponent,
        HeatHttpDotNextComponent,
        HeatJsonComponent,
        RShinyComponent,
    ],
    imports: [
        SharedModule,
        HbspRoutingModule,
    ],
    exports: [

    ],
    providers: [

    ],
})
export class HbspModule {

}
