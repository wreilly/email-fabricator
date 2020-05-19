/*
import {SETSIDENAVTOOPPOSITESTATE, UIActions} from './ui.actions';
*/
import * as fromUIActions from './ui.actions';


export interface MyState {
    sidenavIsOpen: boolean;
    isLoading: boolean;
}

const myInitialState: MyState = {
    sidenavIsOpen: false,
    isLoading: false,
};

export function UIReducer(
    state: MyState = myInitialState,
    action: fromUIActions.UIActions
): MyState {
    /*
    From Max's Angular "2020" course, we are told to NOT MUTATE
    the State in the Store, so, make a COPY first.

    /Users/william.reilly/dev/Angular/Udemy-Angular5-MaxS/2019/WR__/prj-recipes-wr2/src/app/shopping-list/store/shopping-list.reducer.ts
     */

    console.log('state in UIReducer: ', state);

    // noinspection JSRedundantSwitchStatement
    switch (action.type) {
        case fromUIActions.START_IS_LOADING:

            console.log('START_IS_LOADING');

            return {
                ...state,
                isLoading: true,
            };

        case fromUIActions.STOP_IS_LOADING:
            console.log('STOP_IS_LOADING');
            return {
                ...state,
                isLoading: false,
            };

        case fromUIActions.SETSIDENAVTOOPPOSITESTATE:
            /*
            MAKE A COPY. DON'T MUTATE. ETc.
            Hmm, in that Max example, we could use spread operator.
            Here, not so much.
            The MyState here is just an Object : { sidenavIsOpen: true }
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
            Object does not have a Symbol.iterator() function
            (Array does, String does, etc.)
            Okay, we'll keep on simpler side, re: Copy
             */

            // NOPE const myStateToBeUpdatedACopySpread = [...state]; // << Can't use ... spread operator here
            const myStateToBeUpdatedACopyObject = state; // whamma-jamma ? don't think so. hmm.
            // I mean, it does the assignment, but you don't get a copy, you get a pointer, right ??
            console.log('myStateToBeUpdatedACopyObject ', myStateToBeUpdatedACopyObject); // yeah: {sidenavIsOpen: false}


            const myStateToBeUpdatedACopyObjectViaAssign: MyState = {
                ...state,
                sidenavIsOpen: null
            };
            // huh, who knew that null could work here (for boolean) hmm.

            Object.assign(myStateToBeUpdatedACopyObjectViaAssign, state);

            // WR__ Dreadful pseudo-toggle if/else code. Yish.
            // See also Comments in ACTIONS file
            if (state.sidenavIsOpen === true) {
                console.log('1111 state.sidenavIsOpen === true ', state.sidenavIsOpen);
                console.log('1111A state === true ', state);
                console.log('1111B myStateToBeUpdatedACopyObjectViaAssign.sidenavIsOpen === true ', myStateToBeUpdatedACopyObjectViaAssign);
                state.sidenavIsOpen = false;
                myStateToBeUpdatedACopyObjectViaAssign.sidenavIsOpen = false;
            } else {
                if (state.sidenavIsOpen === false) {
                    console.log('2222 state.sidenavIsOpen === false ', state.sidenavIsOpen);
                    // tslint:disable-next-line:max-line-length
                    console.log('2222B myStateToBeUpdatedACopyObjectViaAssign.sidenavIsOpen === false ', myStateToBeUpdatedACopyObjectViaAssign);
                    state.sidenavIsOpen = true;
                    myStateToBeUpdatedACopyObjectViaAssign.sidenavIsOpen = true;
                }
            }

/*
TEST FUN
Basically, does it work, this simple whamma-jamma assignment
(up above) of an Object onto a variable?
Is that pass-by-reference, or pass-by-value?

3rd bullet below helpful "changing a PROPERTY of an Object DOES "change" the Object. Hmm.
I do tink that is what I am doing...

https://stackoverflow.com/questions/6605640/javascript-by-reference-vs-by-value
"- Javascript is always pass by value, but when a variable refers to an object (including arrays),
  the "value" is a reference to the object.
- Changing the value of a variable never changes the underlying primitive or object,
  it just points the variable to a new primitive or object.
- However, changing a property of an object referenced by a variable does change the underlying object."
 */
            const whatItWas: MyState = {
                ...state,
            };
            console.log('0 whatItWas ', whatItWas);
            state = {
                ...state,
                sidenavIsOpen: true
            }; // CHANGE A
            console.log('1A sidenavbiz set to TRUE state ', state);
            console.log('2A myStateToBeUpdatedACopyObject ', myStateToBeUpdatedACopyObject);
            state = {
                ...state,
                sidenavIsOpen: false
            }; // CHANGE B
            console.log('1B sidenavbiz set to FALSE state ', state);
            console.log('2B myStateToBeUpdatedACopyObject ', myStateToBeUpdatedACopyObject);
            state = {
                ...state,
                sidenavIsOpen: whatItWas.sidenavIsOpen
            };
            /*
            /TEST FUN

            TEST FINDINGS:
            Well, seems right:
            CHANGE A:
             - yes DOES (of course) modify 1A, but
             - does NOT modify the copied/whamma-jammaed 2A
            CHANGE B: (Same Story)
             - yes DOES (of course) modify 1B, but
             - does NOT modify the copied/whamma-jammaed 2B

             */

            // return state; // works but perhaps suspect
            // return myStateToBeUpdatedACopyObject; // works
            return myStateToBeUpdatedACopyObjectViaAssign; // works. prob best, hey?

        default:
            return state;
    }
}

export function UIReducerBACKUPORIG(
    state = myInitialState,
    action: fromUIActions.UIActions
) {

    // This ORIG version does NOT create a COPY of State
    // See above revised version of function instead.

    // noinspection JSRedundantSwitchStatement
    switch (action.type) {
        case fromUIActions.SETSIDENAVTOOPPOSITESTATE:
            // WR__ Dreadful pseudo-toggle if/else code. Yish.
            // See also Comments in ACTIONS file
            if (state.sidenavIsOpen === true) {
                console.log('1111 state.sidenavIsOpen === true ', state.sidenavIsOpen);
                console.log('1111A state.sidenavIsOpen === true ', state);
                state.sidenavIsOpen = false;
            } else {
                if (state.sidenavIsOpen === false) {
                    console.log('2222 state.sidenavIsOpen === false ', state.sidenavIsOpen);
                    state.sidenavIsOpen = true;
                }
            }
            return state;

        default:
            return state;
    }
}


export const getIsSidenavOpen = (statePassedIn: MyState) => {
    console.log('8888 UI Reducer - getIsSidenavOpen() - statePassedIn ', statePassedIn);
    /*
    {sidenavIsOpen: false}
     */
    return statePassedIn.sidenavIsOpen; // ?
};

export const getIsLoading = (state: MyState) => { // returns (I think) : MyState['isLoading']
    console.log('7777 UI REDUCER getIsLoading  state passed in?? : ', state);
    /*
    t.b.d.
     */
    return state.isLoading;
};

// *****  From OTHER Project  ************************
/* EXAMPLE USE OF .SELECT()
    this.myUIIsLoadingStore$ = this.myStore.select(fromRoot.getIsLoading);
    src/app/auth/login/login.component.ts:197
 */
/* EXAMPLE USE OF .DISPATCH()
this.myStore.dispatch(new UI.StartLoading());
src/app/auth/auth.service.ts:255
 */
// *************************************
/*
/Users/william.reilly/dev/Angular/Udemy-AngularMaterial-MaxS/2019/WR__2/fitness-tracker-wr3/src/app/shared/ui.actions.ts
*/
