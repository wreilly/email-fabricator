import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // << MUST HAVE! (Routing failed, without. Yeesh!)
import { MyMaterialModule } from '../my-material.module';
import { NYTimesRoutingModule } from './nytimes-routing.module';

import { NYTimesComponent } from './nytimes.component';
import { TopStoriesComponent} from './top-stories/top-stories.component';

@NgModule({
    declarations: [
        NYTimesComponent,
        TopStoriesComponent,
    ],
    imports: [
        CommonModule,
        MyMaterialModule,
        NYTimesRoutingModule,
    ],
    // exports: [
    //     NYTimesRoutingModule, // << Apparently not needed ?
    // ],
})
export class NYTimesModule { }
