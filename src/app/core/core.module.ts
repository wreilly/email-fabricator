import { NgModule } from '@angular/core';

import { ThemeService } from './services/theme.service';

import { HbspService } from '../hbsp/hbsp.service';

import { ParadeService } from '../hbsp/parade/parade.service';

@NgModule({
    imports: [

    ],
    exports: [

    ],
    declarations: [

    ],
    providers: [
        ThemeService,
        HbspService,
        ParadeService,
    ],
})
export class CoreModule { }
