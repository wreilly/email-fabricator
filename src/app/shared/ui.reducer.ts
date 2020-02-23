import {SETSIDENAVTOOPPOSITESTATE, UIActions} from './ui.actions';

export interface MyState {
    sidenavIsOpen: boolean;
}

const myInitialState: MyState = {
    sidenavIsOpen: false
};

export function UIReducer(state = myInitialState,
                          action: UIActions) {
    // noinspection JSRedundantSwitchStatement
    switch (action.type) {
        case SETSIDENAVTOOPPOSITESTATE:
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
