import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';


/*
https://angular.io/guide/providers
*/
/* DEFAULT WAS:
@Injectable({
  providedIn: 'root'
})
*/
// We put as provider into the Core Module (like we did for hbsp.service.ts)
@Injectable()
export class ParadeService {
    
  allThoseFieldNamesFromJira; // t.b.d. : [any];
  myCustomFieldNames; // [] array of some objects/model t.b.d.

  private classVariableForJiraNamingConvention = '\^customfield'; // used in RegExp() in selectOutMyCustomFields()
    // ? '^customfield' OR '\^customfield' ? // << BOTH Worked! (kinda surprising - o well)

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
  getFieldNames(): void { // No 'return'. Instead, assign data gotten, to a local variable.
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

      // const localNamingConvention = 'customfield'; // Nah. see just below.

      // const localRegExVariable = '\^customfield'; // ? OR '^customfield' ? // << BOTH Worked! (kinda surprising - o well)
      // const localRegExItself = new RegExp(localRegExVariable); // << YES Worked fine.
      const localRegExItself = new RegExp(this.classVariableForJiraNamingConvention); // YES Works. Bon!

      this.myCustomFieldNames = this.allThoseFieldNamesFromJira.filter(
          (eachItem) => {
              if (eachItem.id.match(localRegExItself)) {
              // if (eachItem.id.match(/^customfield/)) { // Yes, of course plain Regex works :)
                  return eachItem;
              }
          }
      );
      console.log('selectOutMyCustomFields() this.myCustomFieldNames: ', this.myCustomFieldNames);
  }
/* Kinda stupy:
  // ^^^^ No, all these attempts to use `backticks` and ${interpolated-variable},
              inside a '(/regex/)' with literal '/' boundaries = Fuhggedaboudid. oi!

              if (eachItem.id.match(`/^${localNamingConvention}/`)) {
              if (eachItem.id.match(`/^${this.ilMioLocalNamingConvention}/`)) {
              if (eachItem.id.match(`/\^${this.ilMioLocalNamingConvention}/`)) {
 */

  clearFieldNames() {
      this.allThoseFieldNamesFromJira = undefined;
      this.myCustomFieldNames = undefined;
  }
} // /class ParadeService {}
