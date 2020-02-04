import {Injectable} from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FabricatorService {

/* Not Using
    myStackOfStringsOfAddressesInServiceSubject = new Subject<string>();
*/
    myStackOfStringsOfAddressesInServiceBehaviorSubject = new BehaviorSubject<string>(''); // 'BehaviorSubject fake initial _value'

    sendInStackResults(stuffSentInToService: string) {
        console.log('stuffSentInToService ', stuffSentInToService); // yep

/* Not Using
        this.myStackOfStringsOfAddressesInServiceSubject.next(stuffSentInToService);
*/
        this.myStackOfStringsOfAddressesInServiceBehaviorSubject.next(stuffSentInToService);
    }

}
