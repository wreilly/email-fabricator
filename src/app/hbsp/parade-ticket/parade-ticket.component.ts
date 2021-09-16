import { Component, OnInit } from '@angular/core';

import { ParadeService } from '../parade/parade.service';

/*
From
~/dev/JavaScript/CSCI-E31/Assignments/07-e31-combo-2020/client/src/app/articles/article-detail-two/article-detail-two.component.ts
*/
import { Observable } from 'rxjs';
import {ActivatedRoute, UrlSegment} from '@angular/router';
import {map, tap} from 'rxjs/operators'; // Router ??

@Component({
  selector: 'app-parade-ticket',
  templateUrl: './parade-ticket.component.html',
  styleUrls: ['./parade-ticket.component.css']
})
export class ParadeTicketComponent implements OnInit {

  urlHere: string;
  ticketIdHere: string;
  hewUserId: string; // HEW UserId is 'customfield_10029'
  // value e.g. "123456" => which after HEAT lookup, that is:
  // HE Services User Microservice => Shared Platform User API query, becomes:
  // e.g. HEW Username: william.reilly@hbsp.harvard.edu  "ta-da!" (whew)
  hewUsername: string; // e.g. william.reilly@hbsp.harard.edu
  hardCodedHewUsername = 'william.reilly@hbsp.harvard.edu';

  availabilityId: string; // e.g. 4040-PDF-ENG
  availabilityTitle: string; // e.g. "Blaine"
  hardCodedAvailabilityTitle = 'Blaine Kitchenware';

  urlHereObservable$: Observable<string>;
  // This just gets 'PARD-3', LAST part of "URL". Hmm, where is the REST of the URL ??

  constructor(
      private myActivatedRoute: ActivatedRoute,
      private myParadeService: ParadeService,
  ) {
    /*
    https://angular.io/api/router/ActivatedRoute
     */
    this.urlHereObservable$ = myActivatedRoute.url
        .pipe(
            tap((whatIGot) => {
                console.log('TAP next() - urlHereObservable$ whatIGot is ', whatIGot);
                /* [UrlSegment]
                0: UrlSegment
                parameters:
                path: "PARD-3"
                 */
                return whatIGot;
            }),
            map((mySegments: UrlSegment[]) => {
                console.log('MAP project() - urlHereObservable$ mySegments is ', mySegments);
                /* seems same (?) as above w. tap()
                [UrlSegment]
                0: UrlSegment
                parameters:
                path: "PARD-3"
                 */
                return mySegments.join('/'); // yeah needed
            })
        );
  }

  ngOnInit(): void {
    console.log('parade-ticket here ngOnInit() ');
    this.getParadeTicket();
  }

  getParadeTicket() {
      console.log('Here in getParadeTicket() ');
      this.urlHereObservable$.subscribe(
          (urlFromActivatedRoute: string) => {
              console.log('urlFromActivatedRoute here getParadeTicket() ', urlFromActivatedRoute);
              /* // This just gets 'PARD-3', LAST part of "URL". Hmm, where is the REST of the URL ??
              PARD-3
               */
              this.urlHere = urlFromActivatedRoute; // whamma-jamma
              // console.log('this.urlHere in getParadeTicket() ', this.urlHere);
              /* Same as above.
              // This just gets 'PARD-3', LAST part of "URL". Hmm, where is the REST of the URL ??
              PARD-3
               */
          }
      );

      this.myActivatedRoute.params.subscribe(
          (paramsIGot) => {
              console.log('paramsIGot in getParadeTicket() ', paramsIGot);
              /*
              {ticket_id: "PARD-3"}
              Recall that `ticket_id` naming convention for final part of the URL
              comes from hbsp-routing.module.ts
               */
              this.ticketIdHere = paramsIGot.ticket_id;
/* ** NO LONGER USED **
              this.getParadeTicketPseudoService(this.ticketIdHere)
*/
              // NOW USING ACTUAL SERVICE = More Better
              this.myParadeService.getIssue(this.ticketIdHere)
                  .subscribe(
                      (whatIGot: { myJiraDataProperty: any } ) => {
                          console.log('getIssue() from ParadeService 88888 JIRA whatIGot: ', whatIGot);
                          // console.log('getParadeTicketPseudoService 99999 JIRA whatIGot: ', whatIGot);
                          /*
                          // I did my own "wrapping" of the data object, over in my Proxy Server:
                          const myWrappedJiraDataObject = { myJiraDataProperty: data }
                          res.status(200).send(myWrappedJiraDataObject); // << Working fine, sends whole object. All set.
                          */

                          console.log('JIRA whatIGot.myJiraDataProperty: ', whatIGot.myJiraDataProperty);
                          console.log('JIRA whatIGot.myJiraDataProperty.fields.customfield_10029: ',
                              whatIGot.myJiraDataProperty.fields.customfield_10029); // YES. e.g. 123456
                          this.hewUserId = whatIGot.myJiraDataProperty.fields.customfield_10029; // e.g. 123456
                          this.hewUsername = this.fakeHeatHeServicesSharedPlatformUserAPILookup(this.hewUserId);
                          // brings back hard-coded 'william.reilly@hbsp.harvard.edu' cheers
                          this.availabilityId = whatIGot.myJiraDataProperty.fields.customfield_10030; // e.g. 4040-PDF-ENG
                          this.availabilityTitle = this.fakeCatalogApiAvailabilityIdLookup(this.availabilityId);

                      },
                      (err) => {
                          console.log('myCallJiraPROXY err: ', err);
                      },
                      () => {
                          // done
                          console.log('myCallJiraPROXY Complete ...');
                      }
                  ); // /.subscribe()  getParadeTicketPseudoService()
          }
      );

  }

  //  *** NO LONGER USED **
/*
  getParadeTicketPseudoService(ticketIdInService: string ) {
      /!*
Here inside Component we are lazily running a
method that belongs properly over in a Service = TODO
 *!/
      console.log('wtf 2 getParadeTicketPseudoService() ', ticketIdInService);

      return this.myHttpClient.get(
          // `http://0.0.0.0:3000/issue/${ticketIdInService}`); // << Worked just fine.
      `http://0.0.0.0:3000/api/v1/issue/${ticketIdInService}`); // Hey! Works just fine, too.
      // Request URL: http://0.0.0.0:3000/api/v1/issue/PARD-3

  }
  */

  fakeHeatHeServicesSharedPlatformUserAPILookup(hewUserIdPassedIn) {
      console.log(hewUserIdPassedIn); // just pretending to use this variable ...
      return this.hardCodedHewUsername; // really we return this hard-coded name: 'william.reilly@hbsp.harvard.edu'
  }

  fakeCatalogApiAvailabilityIdLookup(availabilityIdPassedIn) {
      console.log('this.fakeCatalogApiAvailabilityIdLookup() ', availabilityIdPassedIn);
      return this.hardCodedAvailabilityTitle; // "Blaine Kitchenware"
  }

} // /ParadeTicketComponent { }
