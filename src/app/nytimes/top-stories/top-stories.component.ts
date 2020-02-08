import {Component, OnDestroy, OnInit} from '@angular/core';
import { NYTimesService } from '../nytimes.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-top-stories',
    templateUrl: './top-stories.component.html',
    styleUrls: ['./top-stories.component.css'],
})
export class TopStoriesComponent implements OnInit, OnDestroy {

    // myAllStoriesObservableInComponent: Observable<any>; // << No
    myAllStoriesObservableInComponent: any;
    /* TODO Hmm, BAD Variable name. Seems to be, not any Observable,
    just an array ? (of objects, of the NYTimes stories, the results array []
     */
    // NOT BehaviorSubject<any>, hey?

    myAllStoriesObservableInComponentDotPipe; // ? seemstabe an Observable; see below YEP - use | async

    myAllStoriesObservableInComponentDotPipeBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(''); // ?? NAH

    myAllStoriesSubscription: Subscription;
    myAllStoriesNoObservableSubscription: Subscription;
    myAllStoriesDotPipeObservable: Observable<any>;

    constructor(
        private myNYTimesService: NYTimesService,
    ) { }

    ngOnInit() {
        this.myAllStoriesSubscription = this.myNYTimesService.myTopStoriesObservableInService.subscribe(
            (whatWeGot) => {
                this.myAllStoriesObservableInComponent = whatWeGot;
            }
        );
    }

    getAllStories() { // 1.
        // Just a trigger - fire & forget...
        this.myNYTimesService.getTopStories();
    }

    getAllStoriesNoObservable() { // 1.A.
        // Fire, & await results!
        this.myAllStoriesNoObservableSubscription = this.myNYTimesService.getTopStoriesNoObservable();
    }

    getAllStoriesDotPipe() { // 1.B.
        // Fire, & await results!
/* Nope.
"TopStoriesComponent.html:42 ERROR Error:
Cannot find a differ supporting object '[object Object]'
of type 'object'. NgFor only supports binding to
Iterables such as Arrays."

        this.myAllStoriesDotPipeObservabl = this.myNYTimesService.getTopStoriesDotPipe();
*/
        this.myAllStoriesObservableInComponentDotPipe = this.myNYTimesService.getTopStoriesDotPipe();
/* Hmm, seems no...
        this.myAllStoriesObservableInComponentDotPipeBehaviorSubject = this.myNYTimesService.getTopStoriesDotPipe();
*/
        console.log('999 this.myAllStoriesObservableInComponentDotPipe ', this.myAllStoriesObservableInComponentDotPipe);
        /* Oh yeah. It's an OBSERVABLE. Yeesh.
        999 this.myAllStoriesObservableInComponentDotPipe  Observable {_isScalar: false, source: Observable, operator: MapOperator}
         */
        const whatToShow = this.myAllStoriesObservableInComponentDotPipe.valueOf(); // .value;
        console.log('888 whatToShow ', whatToShow);
        // .value => undefined
        // .valueOf() => same Observable again. yeesh.

        this.myAllStoriesObservableInComponentDotPipe.subscribe(
            ( whatTheHey ) => { console.log('777 whatTheHey ', whatTheHey); }
            /* YES finally. sheesh
            [ {}, {} ]
             */
        );

/*
        this.myAllStoriesDotPipeObservable = this.myNYTimesService.getTopStoriesDotPipe().subscribe(
                    (whatWeGot) => {
                        console.log('DOT PIPE? whatWeGot ', whatWeGot);
//                this.myAllStoriesDotPipeObservable

            }
        );
*/
    } // /getAllStoriesDotPipe()


    ngOnDestroy(): void {
        this.myAllStoriesSubscription.unsubscribe();
    }
}
