import { Component, OnInit } from '@angular/core';

import { ParadeService } from './parade.service';

@Component({
    selector: 'app-parade',
    templateUrl: './parade.component.html',
    styleUrls: ['./parade.component.css'],
})
export class ParadeComponent implements OnInit {

    constructor(
        private myParadeService: ParadeService,
    ) {
    }

    ngOnInit() {
        console.log('Parade component here... (ngOnInit())');

/* WORKS FINE, but ...
        this.myParadeService.getFieldNames();
*/
        // We'll fire this off instead:
        this.myParadeService.seeIfWeNeedFieldNames();
    }

    clearFieldnamesFromJira() {
        this.myParadeService.clearFieldNames(); // fire 'n ferget from here
    }

} // /class ParadeComponent
