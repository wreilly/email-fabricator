import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-r-shiny',
    templateUrl: './r-shiny.component.html',
    styleUrls: ['./r-shiny.component.css'],
})
export class RShinyComponent implements OnInit {

    constructor(
        // private ... // not used (yet?)
    ) {
    }

    ngOnInit() {
        console.log('R Shiny component here... (ngOnInit())'); // Browser console, mind.
    }
}
