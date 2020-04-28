import {Component} from '@angular/core';

/*
https://stackoverflow.com/questions/13142635/how-can-i-create-an-object-based-on-an-interface-file-definition-in-typescript

Q.
Hmm. Odd. Why not before seen (in MAX code etc).
Below, some 6 or so different ways I am
more or less initiating/whatever
an Object that holds my 3-part info:
- age
- height
- income

A.
I think answer is: in MAX code etc. yeah
we used interfaces and so forth, but the actual
data passed in to the component, method, etc.
was *already actually assembled elsewhere*
And the interface was just used for proper typing. OK.

Whereas I here am quite *artificially* just trying within
this immediate component / class / method whatever
to *boom* assemble data / an object right here on
the spot, and TypeScript doesn't like that kind of
use of an interface. No 'whamma-jamma' of value onto
an interface object property. I think.
Hmm. Sort of. Hmm.
 */
interface CompareYourselfInfo { // - 01, 02, 03 -
    age: number;
    height: number;
    income: number;
}

class MyCYUClassOutside implements CompareYourselfInfo { // - 04 -
    age: number;
    height: number;
    income: number;
}

@Component({
    selector: 'app-postpen',
    templateUrl: './postpen.component.html',
    styleUrls: [ './postpen.component.css' ],
})
export class PostpenComponent {

    /* 1) PLAIN OLD JAVASCRIPT & XMLHTTPREQUEST
    ( 2) Next up: Angular HttpClient & Etc.)

     */

    myXhr = new XMLHttpRequest();
    myMethod = 'POST';
    myApiUrl = 'https://z20go3ghcg.execute-api.us-east-1.amazonaws.com/dev/compare-yourself';
    myCompareYourselfFormInfo: CompareYourselfInfo; // - 01 - << class member
    myCompareYourselfFormInfoObject: CompareYourselfInfo = { // - 05 -
        age: 50,
        height: 60,
        income: 70,
    }; // << class member, instantiated? initiated?
/* Nah etc.
Doesn't work up here. Does work down in a method (like mySendIt()). Hmm.
    myCompareYourselfFormInfo.age = 22; // << no whamma-jamma
    my2ndCompare: CompareYourselfInfo = { }; // << no can't use empty { }
*/
    // myCompareYourselfFormInfoObject.age = 22; // << Nope not neither. Sheesh! // << no whamma-jamma
    myAge = 22;
    myHeight = 33;
    myIncome = 44;

    mySendIt() {
        console.log(this.myIncome);
        console.log('this.mySendIt() METHOD: ', this.myMethod);

        // *** - 01 - ******************
        this.myCompareYourselfFormInfo = new class implements CompareYourselfInfo {
            age: number;
            height: number;
            income: number;
        }();

        this.myCompareYourselfFormInfo.age = this.myAge;
        this.myCompareYourselfFormInfo.height = this.myHeight;
        this.myCompareYourselfFormInfo.income = this.myIncome;
        console.log('01 - this.myCompareYourselfFormInfo ', this.myCompareYourselfFormInfo);
        /*
        01 - this.myCompareYourselfFormInfo  {age: 22, height: 33, income: 44}
         */

        // *** - 02 - *******************
        const myInsideCompareYourselfFormInfo: CompareYourselfInfo = new class implements CompareYourselfInfo {
            age: number;
            height: number;
            income: number;
        }();
        myInsideCompareYourselfFormInfo.age = this.myAge + 1;
        myInsideCompareYourselfFormInfo.height = this.myHeight + 1;
        myInsideCompareYourselfFormInfo.income = this.myIncome + 1;

        console.log('02 - myInsideCompareYourselfFormInfo + 1 ', myInsideCompareYourselfFormInfo);
        /*
        02 - myInsideCompareYourselfFormInfo  {age: 23, height: 34, income: 45}
         */

        // *** - 03 - *******************
        class MyCYUClassInside implements CompareYourselfInfo {
            age: number;
            height: number;
            income: number;
        }

        const myCYUConstVariableInside = new MyCYUClassInside();
        myCYUConstVariableInside.age = this.myAge + 10;
        myCYUConstVariableInside.height = this.myHeight + 10;
        myCYUConstVariableInside.income = this.myIncome + 10;

        console.log('03 - myCYUConstVariableInside + 10 ', myCYUConstVariableInside);
        /*
        03 - myCYUConstVariableInside + 10  MyCYUClassInside {age: 32, height: 43, income: 54}
         */


        // *** - 04 - *******************
        const myCYUConstVariableOutside: CompareYourselfInfo = new MyCYUClassOutside();
        myCYUConstVariableOutside.age = this.myAge + 100;
        myCYUConstVariableOutside.height = this.myHeight + 100;
        myCYUConstVariableOutside.income = this.myIncome + 100;
        console.log('04 - myCYUConstVariableOutside + 100 ', myCYUConstVariableOutside);
        /*
        04 - myCYUConstVariableOutside + 100  MyCYUClassOutside {age: 122, height: 133, income: 144}
         */


        // *** - 05 - *******************
        this.myCompareYourselfFormInfoObject.age = this.myAge + 1000;
        console.log('05 - this.myCompareYourselfFormInfoObject + 1000 age! ', this.myCompareYourselfFormInfoObject);
        /*
        05 - this.myCompareYourselfFormInfoObject + 1000 age!  {age: 1022, height: 60, income: 70}
         */


        // *** - 06 - *******************
        const myAsInsideCompareYourselfFormInfo: CompareYourselfInfo = {} as CompareYourselfInfo; // "type assertion" - that "as"
        myAsInsideCompareYourselfFormInfo.age = this.myAge + 77;
        // N.B. You **LOSE** type validation this way! We get away with only having age (not height nor income). tsk, tsk.
        console.log('06 - myAsInsideCompareYourselfFormInfo + 77 age! ~= 99 yes? ', myAsInsideCompareYourselfFormInfo);
        /*
         06 - myAsInsideCompareYourselfFormInfo + 77 age! ~= 99 yes?  {age: 99}
         */
    }
}
/* CONSOLE LOG:
01 - this.myCompareYourselfFormInfo  {age: 22, height: 33, income: 44}
02 - myInsideCompareYourselfFormInfo + 1  {age: 23, height: 34, income: 45}
03 - myCYUConstVariableInside + 10  MyCYUClassInside {age: 32, height: 43, income: 54}
04 - myCYUConstVariableOutside + 100  MyCYUClassOutside {age: 122, height: 133, income: 144}
05 - this.myCompareYourselfFormInfoObject + 1000 age!  {age: 1022, height: 60, income: 70}
06 - myAsInsideCompareYourselfFormInfo + 77 age! ~= 99 yes?  {age: 99}
 */
