import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NYTimesComponent} from './nytimes.component';
import { TopStoriesComponent } from './top-stories/top-stories.component';

const myNYTimesRoutes: Routes = [
    {
        path: 'nytimes',
        component: NYTimesComponent,
        children: [
            {
                path: 'top-stories',
                component: TopStoriesComponent
            }
        ]
    },
];

@NgModule({
    // declarations: [
    //     TopStoriesComponent, //  << Nope, not needed in Router...
    // ],
    imports: [
        RouterModule.forChild(myNYTimesRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class NYTimesRoutingModule { }
