import { Component, OnInit, OnDestroy } from '@angular/core';
import { FabricatorService } from '../fabricator.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-results-fabricator',
  templateUrl: './results-fabricator.component.html',
  styleUrls: ['./results-fabricator.component.css']
})
export class ResultsFabricatorComponent implements OnInit, OnDestroy {

  mySimpleSubscription: Subscription;
  myStackOfStringsOfAddressesToDisplay: string;

  constructor(
      private myFabricatorService: FabricatorService,
  ) { }

  ngOnInit() {
    this.mySimpleSubscription = this.myFabricatorService.myStackOfStringsOfAddressesInServiceBehaviorSubject
        .subscribe(
            (whatWeGot) => {
              console.log('whatWeGot BEHAVIOR ', whatWeGot);
              this.myStackOfStringsOfAddressesToDisplay = whatWeGot;
            }
        );
  }

  ngOnDestroy() {
    this.mySimpleSubscription.unsubscribe();
  }
}
