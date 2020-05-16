import { Component, OnInit, OnDestroy } from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';

// https://ultimatecourses.com/learn/rxjs-masterclass

@Component({
  selector: 'app-rxjs-playground',
  templateUrl: './rxjs-playground.component.html',
  styleUrls: ['./rxjs-playground.component.css']
})
export class RxjsPlaygroundComponent implements OnInit, OnDestroy {

    somethingToShow: string;
    somethingBehaviorToShow: string;

/*
I *think* (~MBU~) we do *not* want Subject, BehaviorSubject
up here declared as "class members."
NOPE:
    mySubjectOne: Subject<string>;
    mySubjectTwo: Subject<string>;
    myBehaviorSubject: BehaviorSubject<string>;
Instead the above are declared and defined as 'const', down
in ngOnInit(). (MBU)

We *do* that for Subscription(s) - we declare here as class member(s).
Q. Y?
A. We need to reference those Subscription(s) down in ngOnDestroy()
*/
    mySubscriptionOne: Subscription;
    mySubscriptionTwo: Subscription;
    myBehaviorSubscriptionOne: Subscription;

    constructor() { }

    ngOnInit(): void {

        // stuff, playground-ish
        // https://ultimatecourses.com/learn/rxjs-masterclass

        const mySubjectOne = new Subject();
        // this.mySubjectOne = new Subject(); // Nope

        this.mySubscriptionOne = mySubjectOne.subscribe(
            (observerOneWeGot: string) => {
                console.log('observerOneWeGot ', observerOneWeGot);
                this.somethingToShow = observerOneWeGot;
            }
        );

        mySubjectOne.next('a bit of string');

        const myBehaviorSubjectOne = new BehaviorSubject('that first bit of Behavior string');

        this.myBehaviorSubscriptionOne = myBehaviorSubjectOne.subscribe((observerFromBehaviorSubjectWeGot) => {
            console.log('observerFromBehaviorSubjectWeGot ', observerFromBehaviorSubjectWeGot);
            this.somethingBehaviorToShow = observerFromBehaviorSubjectWeGot; // << Yep. 'that first bit of Behavior string'
        });

        this.mySubscriptionTwo = mySubjectOne.subscribe(
            (observerTwoWeGot: string) => {
                console.log('observerTwoWeGot ', observerTwoWeGot);
                this.somethingToShow = observerTwoWeGot;
            }
        );
        mySubjectOne.next('a SECOND bit of string');

        setTimeout(() => {
            console.log('myBehaviorSubjectOne.getValue(): ', myBehaviorSubjectOne.getValue()); // << Yep.
            // 'that first bit of Behavior string'

            this.somethingToShow = myBehaviorSubjectOne.getValue();
            /* NOTE
            Use of .getValue() off of BehaviorSubject not such great idea. That is synchronous, kinda anti-pattern for RxJS.
            Consider operator like "WithLatestFrom()" instead.
            "Master / Slave"
            https://scotch.io/tutorials/rxjs-operators-for-dummies-forkjoin-zip-combinelatest-withlatestfrom
            #toc-withlatestfrom-the-master-slave-operator

             */
        }, 2000);

    }

    ngOnDestroy(): void {
        if (this.mySubscriptionOne) {
            this.mySubscriptionOne.unsubscribe();
        }
        if (this.mySubscriptionTwo) {
            this.mySubscriptionTwo.unsubscribe();
        }
        if (this.myBehaviorSubscriptionOne) {
            this.myBehaviorSubscriptionOne.unsubscribe();
        }
    }
}
