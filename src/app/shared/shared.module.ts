// COPIED (WHOLESALE) FROM OTHER PROJECT! (fitness-tracer-wr3)
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; // Kind of subset of BrowserModule (as I understand it; hmm)
// yep: https://guide.freecodecamp.org/angular/ngmodules/

import {ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule  } from '@angular/flex-layout';
import { MyMaterialModule } from '../my-material.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MyMaterialModule,
    ],
    exports: [ // << This is WHOLE POINT of the "Sharing" drill, people!
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MyMaterialModule,
    ], // Don't Forget To Do!!!
    providers: [], // << none

})
export class SharedModule { }
