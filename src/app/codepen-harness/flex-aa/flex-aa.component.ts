import { Component, OnInit } from '@angular/core';

const DIRECTIONS01 = ['row', 'row-reverse', 'column', 'column-reverse'];
const DIRECTIONS = ['', '-reverse'];

@Component({
  selector: 'app-flex-aa',
  templateUrl: './flex-aa.component.html',
  styleUrls: ['./flex-aa.component.css']
})
export class FlexAaComponent implements OnInit {

  direction01 = 'row';
  direction = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleDirection01() {
    const next = (DIRECTIONS01.indexOf(this.direction01) + 1 ) % DIRECTIONS01.length;
    this.direction01 = DIRECTIONS01[next];
  }

  toggleDirection() {
    const next = (DIRECTIONS.indexOf(this.direction) + 1 ) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }

}
