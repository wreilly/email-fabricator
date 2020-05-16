import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HbspComponent} from './hbsp.component';
import { HeatHttpComponent } from './heat-http/heat-http.component';
import { HeatHttpDotPipeComponent } from './heat-http/heat-http-dotpipe/heat-http-dotpipe.component';
import { HeatHttpDotNextComponent } from './heat-http/heat-http-dotnext/heat-http-dotnext.component';
import { HeatJsonComponent } from './heat-json/heat-json.component';

const myHbspRoutes: Routes = [
    {
        path: 'hbsp',
        component: HbspComponent,
        children: [
            {
                path: 'heat-http',
                component: HeatHttpComponent,
                children: [
                    {
                        path: 'dot-pipe',
                        component: HeatHttpDotPipeComponent,
                    },
                    {
                        path: 'dot-next',
                        component: HeatHttpDotNextComponent,
                    },
                ]
            },
            {
                path: 'heat-json',
                component: HeatJsonComponent,
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(myHbspRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class HbspRoutingModule { }
