import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HbspComponent} from './hbsp.component';
import { HeatHttpComponent } from './heat-http/heat-http.component';
import { HeatHttpDotPipeComponent } from './heat-http/heat-http-dotpipe/heat-http-dotpipe.component';
import { HeatHttpDotNextComponent } from './heat-http/heat-http-dotnext/heat-http-dotnext.component';
import { HeatJsonComponent } from './heat-json/heat-json.component';
import { RShinyComponent } from './r-shiny/r-shiny.component';
import {PardBasicComponent} from './pard-basic/pard-basic.component';
import { ParadeTicketComponent } from './parade-ticket/parade-ticket.component';
import {ParadeComponent} from './parade/parade.component';

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
            },
            {
                path: 'r-shiny',
                component: RShinyComponent,
            },
            {
              path: 'parade',
              component: ParadeComponent,
                children: [
                    {
                        path: 'pard-basic',
                        component: PardBasicComponent,
                    },
                    {
                        // NO: Error: Invalid configuration of route 'hbsp//parade-ticket:ticket_id': path cannot start with a slash
                        // path: '/parade-ticket:ticket_id',
                        // NO: Error: Cannot match any routes. URL Segment: 'hbsp/parade-ticket/123'
                        // path: 'parade-ticket:ticket_id',
                        // YES: http://0.0.0.0:4200/hbsp/1235 JUST the param, NO leading "directory" e.g. '/parade-ticket/'
                        path: ':ticket_id',
                        component: ParadeTicketComponent,
                    },
                ]
            },
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
