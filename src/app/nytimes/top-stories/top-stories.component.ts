import {Component, OnDestroy, OnInit} from '@angular/core';
import { NYTimesService } from '../nytimes.service';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';

@Component({
    selector: 'app-top-stories',
    templateUrl: './top-stories.component.html',
    styleUrls: ['./top-stories.component.css'],
})
export class TopStoriesComponent implements OnInit, OnDestroy {

    showDotPipe = true;

    // https://kimsereyblog.blogspot.com/2018/05/async-pipe-versus-subscribe-in-angular.html

    // "1."
    // myAllStoriesObservableInComponent: Observable<any>; // << No
    myAllStoriesObservableInComponent: any;
    /* TODO Hmm, BAD Variable name. Seems to be, not any Observable,
    just an array ? (of objects, of the NYTimes stories, the results array []
     */
    // NOT BehaviorSubject<any>, hey?

    // "1.B."
    // WAS: myAllStoriesObservableInComponentDotPipe; // no init, no type
    // ? seemstabe an Observable; see below YEP - use | async
    myAllStoriesObservableInComponentDotPipe: Observable<any>; // YES
    myAllStoriesObservableInComponentDotPipeSubscription: Subscription;
    /* UPDATE 2: Nope. It is just an Observable. Cheers. */

    /* UPDATE 1: (WRONG) Let's make this bad boy a SUBJECT on purpose,
    not merely default to it becoming an Observable, the which it
    does, as the result from the Service call (to HTTP etc.)
    seems to make it into an Observable.
    */
/* THESE BOTH DID *NOT* WORK
    // NOW IS: TODONOPE RENAME to reflect Subject, hey?
    myAllStoriesObservableInComponentDotPipe: Subject<[{}]> = new Subject<[{}]>();
    // NOW IS: TODONOPE RENAME to reflect BehaviorSubject, hey?
    myAllStoriesObservableInComponentDotPipe: BehaviorSubject<[{}]> = new BehaviorSubject<[{}]>([{}]);
*/



/* NAH
    myAllStoriesObservableInComponentDotPipeBehaviorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(''); // ?? NAH
*/

    myAllStoriesSubscription: Subscription;
    myAllStoriesNoObservableSubscription: Subscription;
/* NAH
    myAllStoriesDotPipeObservable: Observable<any>;
*/

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

        this.myAllStoriesDotPipeObservable = this.myNYTimesService.getTopStoriesDotPipe();
*/
        this.myAllStoriesObservableInComponentDotPipe = this.myNYTimesService.getTopStoriesDotPipe(); // << Returns an Observable!
        // (not Subject, not BehaviorSubject). No ".next()" available on Observable.

        /* NAH Hmm, seems no...
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

        // N.B. Don't really need this subscription. async unsubscribes on its own. cheers.
        this.myAllStoriesObservableInComponentDotPipeSubscription = this.myAllStoriesObservableInComponentDotPipe.subscribe(
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
        this.showDotPipe = true;
    } // /getAllStoriesDotPipe()

    clearAllStories() {
        // 1.  Non-Async Pipe Stories ("1.")
        this.myAllStoriesObservableInComponent = []; // << YES.
        /* Also, don't forget to ".next()" to empty value the Observable (BehaviorSubject) over on the Service:
        */
        this.myNYTimesService.myTopStoriesObservableInService.next([]);

        /* And, what the hey/hay, let's .unsubscribe() to boot. */
        /* Hmm, 2nd thought: seems to kill subsequent clicks to get stories again! */
/* Nah let's not, hey?
        if (this.myAllStoriesSubscription) {
            this.myAllStoriesSubscription.unsubscribe();
        }
*/

// ----------------------------

        // 1.B.  Async Pipe Stories ("1.B.")
        // this.myAllStoriesObservableInComponentDotPipe.next([]); // << No! ".next() not a function"!
        /*
        https://stackoverflow.com/questions/50099517/observable-next-is-not-a-function
        Bit of "ah-hah" momentino:
        "There is no next() on Observable; only on Subject and BehaviorSubject, which extends Subject (and both extend Observable)."
         */
        // TAKE TWO (Now it is a SUBJECT, not merely an OBSERVABLE)
/* Nope. Still .next() is not a function. sigh.
        this.myAllStoriesObservableInComponentDotPipe.next([{}]);
*/

        // TAKE THREE (Now it is a BEHAVIORSUBJECT, not merely an OBSERVABLE)
/* Nope. Still .next() is not a function. sigh.
        this.myAllStoriesObservableInComponentDotPipe.next([{}]);
*/
        /* What the hey/hay, let's .unsubscribe()?! */
        if (this.myAllStoriesObservableInComponentDotPipeSubscription) {
            // tslint:disable-next-line:max-line-length
            console.log('this.myAllStoriesObservableInComponentDotPipeSubscription ', this.myAllStoriesObservableInComponentDotPipeSubscription);
            /* Already done!
            closed: true
            isStopped: true
             */

            this.myAllStoriesObservableInComponentDotPipeSubscription.unsubscribe();
            // << Seemingly no need - Yeah, async biz unsubscribes all on its own
            // Instead, we just use boolean show/hide (sheesh)
            this.showDotPipe = false;
        }
    }

    ngOnDestroy(): void {
        if (this.myAllStoriesSubscription) {
            this.myAllStoriesSubscription.unsubscribe();
        }

        if (this.myAllStoriesObservableInComponentDotPipeSubscription) {
            this.myAllStoriesObservableInComponentDotPipeSubscription.unsubscribe();
            // << Probably no need - Yeah, async biz unsubscribes all on its own
        }
    }
}
