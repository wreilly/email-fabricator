import {Injectable} from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FabricatorService {

    myStackOfStringsOfAddressesInServiceSubject = new Subject<string>();
    myStackOfStringsOfAddressesInServiceBehaviorSubject = new BehaviorSubject<string>('fake');

    sendInStackResults(stuffSent: string) {
        console.log('stuffSent ', stuffSent); // yep

        this.myStackOfStringsOfAddressesInServiceSubject.next(stuffSent);
        this.myStackOfStringsOfAddressesInServiceBehaviorSubject.next(stuffSent);
    }

}
