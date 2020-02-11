import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // << MUST HAVE! (Routing failed, without. Yeesh!)
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyMaterialModule } from '../my-material.module';
import { NYTimesRoutingModule } from './nytimes-routing.module';

import { NYTimesComponent } from './nytimes.component';
import { TopStoriesComponent} from './top-stories/top-stories.component';
import { BookReviewsComponent } from './book-reviews/book-reviews.component';

@NgModule({
    declarations: [
        NYTimesComponent,
        TopStoriesComponent,
        BookReviewsComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MyMaterialModule,
        NYTimesRoutingModule,
    ],
    // exports: [
    //     NYTimesRoutingModule, // << Apparently not needed ?
    // ],
})
export class NYTimesModule { }
