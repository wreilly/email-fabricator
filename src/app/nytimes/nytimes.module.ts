import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { CommonModule } from '@angular/common'; // << MUST HAVE! (Routing failed, without. Yeesh!) // << SharedModule now
import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms'; // << SharedModule now
// import { FlexLayoutModule } from '@angular/flex-layout'; // << SharedModule now
// import { MyMaterialModule } from '../my-material.module'; // << SharedModule now
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
        SharedModule,
        // CommonModule, // << SharedModule now
        HttpClientModule,
        // ReactiveFormsModule, // << SharedModule now
        // FlexLayoutModule, // << SharedModule now
        // MyMaterialModule, // << SharedModule now
        NYTimesRoutingModule,
    ],
    // exports: [
    //     NYTimesRoutingModule, // << Apparently not needed ?
    // ],
})
export class NYTimesModule { }
