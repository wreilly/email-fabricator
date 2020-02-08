import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NYTimesComponent} from './nytimes.component';
import { TopStoriesComponent } from './top-stories/top-stories.component';
import { BookReviewsComponent } from './book-reviews/book-reviews.component';

const myNYTimesRoutes: Routes = [
    {
        path: 'nytimes',
        component: NYTimesComponent,
        children: [
            {
                path: 'top-stories',
                component: TopStoriesComponent
            },
            {
                path: 'book-reviews',
                component: BookReviewsComponent
            },
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
