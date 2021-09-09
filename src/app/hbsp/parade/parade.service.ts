import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import * as punycode from 'punycode';

/*
https://angular.io/guide/providers
*/

/* DEFAULT WAS:
@Injectable({
  providedIn: 'root'
})
*/
// We'll put as provider in Core Module (like we did for hbsp.service.ts)
@Injectable()
export class ParadeService {

  allThoseFieldNamesFromJira; // t.b.d. : [any];
  myCustomFieldNames; // [] array of some objects/model t.b.d.

  constructor(
      private myHttpClient: HttpClient,
  ) { }

    seeIfWeNeedFieldNames() {
      if (typeof this.allThoseFieldNamesFromJira === 'undefined') {
          // We DO Need them! :)
          console.log('seeIfWeNeedFieldNames() = Yep! Here we go to getFieldNames()...');
          this.getFieldNames(); // fire 'n ferget, from here...
      } else {
          // We do NOT need to re-run, it would seem:
          console.log('seeIfWeNeedFieldNames() = Nope. this.allThoseFieldNamesFromJira: ', this.allThoseFieldNamesFromJira);
      }
    }
  /*
  Get Field Names (from Field Codes)
   */
  getFieldNames(): void { // t.b.d. just what we return. [] array of something(s)
    console.log('getFieldNames() in ParadeService');
    // return 'TEXAS'; // worked fine, thx.

    console.log('Env stuff? ', `${environment.jiraProxyServer.apiUrl}`); // yep. 'http://0.0.0.0'

/* WORKS JUST FINE: (that is, simply returning to calling Component)
    return this.myHttpClient.get(
        // 'http://0.0.0.0:3000/api/v1/field'
    `${environment.jiraProxyServer.apiUrl}:${environment.jiraProxyServer.apiPort}/${environment.jiraProxyServer.apiVersion}/field`,
*/
/* No. .pipe .tap did not console log anything etc. Hmmph.
    return this.myHttpClient.get(
        // 'http://0.0.0.0:3000/api/v1/field'
        `${environment.jiraProxyServer.apiUrl}:${environment.jiraProxyServer.apiPort}/${environment.jiraProxyServer.apiVersion}/field`,
    )
        .pipe(
            tap(
                (allThoseFieldNames: any) => {
                  this.allThoseFieldNamesFromJira = allThoseFieldNames; // whamma-jamma
                  console.log('this.allThoseFieldNamesFromJira: ', this.allThoseFieldNamesFromJira);
                  return this.allThoseFieldNamesFromJira;
                }
            )
        );
*/
      /* Yes.
      Here, the ParadeComponent simply calls and "kicks off" this method in the Service.
      The Component does not get back (does not ask to get back) any result.
      The Service hits the Proxy Server,
       */
    this.myHttpClient.get(
          // 'http://0.0.0.0:3000/api/v1/field'
          `${environment.jiraProxyServer.apiUrl}:${environment.jiraProxyServer.apiPort}/${environment.jiraProxyServer.apiVersion}/field`,
      )
        .subscribe(
            (allThoseFieldNames: any) => {
                this.allThoseFieldNamesFromJira = allThoseFieldNames; // whamma-jamma
                console.log('this.allThoseFieldNamesFromJira: ', this.allThoseFieldNamesFromJira);
                // ??  return this.allThoseFieldNamesFromJira; // << NO NEED to return apparently. bueno.

                // Now time to "select out" my custom field names, from allThoseFieldNames
                this.selectOutMyCustomFields();
            }
          );
  } // /getFieldNames()

  selectOutMyCustomFields() {
      this.myCustomFieldNames = 'foobar';
      this.myCustomFieldNames = this.allThoseFieldNamesFromJira.filter(
          (eachItem) => {
              if (eachItem.id.match(/^customfield/)) {
                  return eachItem;1
              }
          }
      );
      console.log('selectOutMyCustomFields() this.myCustomFieldNames: ', this.myCustomFieldNames);
  }


  clearFieldNames() {
      this.allThoseFieldNamesFromJira = undefined;
      this.myCustomFieldNames = undefined;
  }
} // /class ParadeService {}
