import { Action } from '@ngrx/store';

export const SETSIDENAVTOOPPOSITESTATE = '[UI] Set Sidenav To Opposite State'; // i.e. Open vs. Closed (Toggle)
/* HMM
re: use of NGRX for "toggle" concept...
In **previous** project I'd quit it, and (sorta) concluded that:

/Users/william.reilly/dev/Angular/Udemy-AngularMaterial-MaxS/2019/WR__2/fitness-tracker-wr3/src/app/training/training.service.ts

"NGRX ?
        Hmm, does not seem to lend itself ( ? )
        // to this "toggle" notion.
        // I'd have to do if() test logic, to know
        current status, to then dispatch the
        opposite action. Seems to defeat purpose
        of easy-to-use "toggle", no?"

Googling finds me an example I think is making use of toggle idea: (we shall see)
https://gist.github.com/btroncone/a6e4347326749f938510
case TOGGLE_ATTENDING:
      if(state.id === action.payload){
          return Object.assign({}, state, {attending: !state.attending});
      }
      return state;
 */

export class SetSidenavToOppositeState implements Action {
    readonly type = SETSIDENAVTOOPPOSITESTATE;
    // No payload
    constructor() { }
}

export type UIActions = SetSidenavToOppositeState;
