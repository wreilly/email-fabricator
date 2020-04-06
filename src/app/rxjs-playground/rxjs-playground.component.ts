import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-rxjs-playground',
  templateUrl: './rxjs-playground.component.html',
  styleUrls: ['./rxjs-playground.component.css']
})
export class RxjsPlaygroundComponent implements OnInit {

  somethingToShow: string;

  constructor() { }

  ngOnInit(): void {

    // stuff, playground-ish
    // https://ultimatecourses.com/learn/rxjs-masterclass
    const mySubjectOne = new Subject();
    const mySubscriptionOne = mySubjectOne.subscribe(
        (observerOneWeGot: string) => {
          console.log('observerOneWeGot ', observerOneWeGot);
          this.somethingToShow = observerOneWeGot;
        }
    );
    mySubjectOne.next('a bit of string');

    // const mySubjectOne = new Subject();
    const mySubscriptionTwo = mySubjectOne.subscribe(
        (observerTwoWeGot: string) => {
          console.log('observerTwoWeGot ', observerTwoWeGot);
          this.somethingToShow = observerTwoWeGot;
        }
    );
    mySubjectOne.next('a SECOND bit of string');

  }

}
