import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-parade',
    templateUrl: './parade.component.html',
    styleUrls: ['./parade.component.css'],
})
export class ParadeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log('Parade component here... (ngOnInit())');
    }
} // /class
